package br.ufrn.imd.siaec.siaec_backend.service;

import br.ufrn.imd.siaec.siaec_backend.dto.ProductDTO;
import br.ufrn.imd.siaec.siaec_backend.exception.BusinessRuleException;
import br.ufrn.imd.siaec.siaec_backend.exception.NotFoundException;
import br.ufrn.imd.siaec.siaec_backend.exception.UnauthorizedException;
import br.ufrn.imd.siaec.siaec_backend.model.Artisan;
import br.ufrn.imd.siaec.siaec_backend.model.Catalog;
import br.ufrn.imd.siaec.siaec_backend.model.Product;
import br.ufrn.imd.siaec.siaec_backend.model.ProductImage;
import br.ufrn.imd.siaec.siaec_backend.repository.ArtisanRepository;
import br.ufrn.imd.siaec.siaec_backend.repository.CatalogRepository;
import br.ufrn.imd.siaec.siaec_backend.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import br.ufrn.imd.siaec.siaec_backend.model.User;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    private ProductRepository productRepository;
    private ArtisanRepository artisanRepository;
    private CatalogRepository catalogRepository;
    private UserService userService;

    public ProductService(
        ProductRepository productRepository,
        ArtisanRepository artisanRepository,
        CatalogRepository catalogRepository,
        UserService userService
    ) {
        this.artisanRepository = artisanRepository;
        this.catalogRepository = catalogRepository;
        this.productRepository = productRepository;
        this.userService = userService;
    }

    @Transactional
    public ProductDTO create(ProductDTO productDTO) {
        Artisan artisan = artisanRepository.findById(productDTO.getArtisanId())
                .orElseThrow(() -> new NotFoundException("Artesão não encontrado com id: " + productDTO.getArtisanId()));

        Catalog catalog = catalogRepository.findByArtisanArtisanId(artisan.getArtisanId())
                .orElseGet(() -> {
                    Catalog newCatalog = new Catalog();
                    newCatalog.setArtisan(artisan);
                    return catalogRepository.save(newCatalog);
                });

        Product product = productDTO.toEntity();
        product.setCreatedAt(new Date());
        product.setCatalog(catalog);
        
        
        Product savedProduct = productRepository.save(product);
        return ProductDTO.fromEntity(savedProduct);
    }

    @Transactional(readOnly = true)
    public ProductDTO findById(String productId) { 
        Product product = productRepository.findById(productId)
                .filter(p -> p.getDeletedAt() == null) 
                .orElseThrow(() -> new NotFoundException("Produto não encontrado com id: " + productId)); 
        return ProductDTO.fromEntity(product);
    }

    @Transactional(readOnly = true)
    public Page<ProductDTO> findAll(Pageable pageable) {
        Page<Product> page = productRepository.findAllByDeletedAtIsNull(pageable);
        return page.map(ProductDTO::fromEntity); 
    }
    
    @Transactional(readOnly = true)
    public Page<ProductDTO> findByName(String name, Pageable pageable) {
        Page<Product> page = productRepository.findByNameContainingIgnoreCaseAndDeletedAtIsNull(name, pageable);
        return page.map(ProductDTO::fromEntity);
    }

    @Transactional
    public ProductDTO update(String productId, ProductDTO productDTO) { 
        User currentUser = userService.getCurrentAuthenticatedUser();
        Artisan artisan = artisanRepository.findByUserUserId(currentUser.getUserId())
            .orElseThrow(() -> new BusinessRuleException("O usuário logado não é um artesão."));
        Catalog catalog = catalogRepository.findByArtisanArtisanId(artisan.getArtisanId())
            .orElseThrow(() -> new NotFoundException("Catálogo não encontrado para este artesão."));
            
        Product product = productRepository.findById(productId)
                .filter(p -> p.getDeletedAt() == null)
                .orElseThrow(() -> new NotFoundException("Produto não encontrado com id: " + productId));

        if (!product.getCatalog().getId().equals(catalog.getId())) {
            throw new UnauthorizedException("Você não tem permissão para editar este produto.");
        }

        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        if (product.getProductImages() != null) {
            product.getProductImages().clear();
        }
        if (productDTO.getImagePaths() != null) {
            List<ProductImage> images = productDTO.getImagePaths().stream().map(path -> {
                ProductImage img = new ProductImage();
                img.setImagePath(path);
                img.setProduct(product);
                return img;
            }).collect(Collectors.toList());
            product.setProductImages(images);
        }

        Product updatedProduct = productRepository.save(product);
        return ProductDTO.fromEntity(updatedProduct);
    }

    @Transactional
    public void delete(String productId) { 
        User currentUser = userService.getCurrentAuthenticatedUser();
        Artisan artisan = artisanRepository.findByUserUserId(currentUser.getUserId())
            .orElseThrow(() -> new BusinessRuleException("O usuário logado não é um artesão."));
        Catalog catalog = catalogRepository.findByArtisanArtisanId(artisan.getArtisanId())
            .orElseThrow(() -> new NotFoundException("Catálogo não encontrado para este artesão."));

        Product product = productRepository.findById(productId)
                .filter(p -> p.getDeletedAt() == null) 
                .orElseThrow(() -> new NotFoundException("Produto não encontrado com id: " + productId)); 
        
        if (!product.getCatalog().getId().equals(catalog.getId())) {
            throw new UnauthorizedException("Você não tem permissão para deletar este produto.");
        }
        product.setDeletedAt(new Date());
        product.setStatus(false); 
        productRepository.save(product);
    }

    @Transactional(readOnly = true)
    public Page<ProductDTO> findMyProducts(Pageable pageable) {
        User currentUser = userService.getCurrentAuthenticatedUser();
        Artisan artisan = artisanRepository.findByUserUserId(currentUser.getUserId())
            .orElseThrow(() -> new BusinessRuleException("O usuário logado não é um artesão."));
        Catalog catalog = catalogRepository.findByArtisanArtisanId(artisan.getArtisanId())
            .orElseThrow(() -> new NotFoundException("Catálogo não encontrado para este artesão."));
        
        // Busca os produtos desse catálogo
        Page<Product> page = productRepository.findByCatalogAndDeletedAtIsNull(catalog, pageable);
        return page.map(ProductDTO::fromEntity);
    }

    
}