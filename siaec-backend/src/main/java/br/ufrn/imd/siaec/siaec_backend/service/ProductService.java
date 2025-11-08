package br.ufrn.imd.siaec.siaec_backend.service;

import br.ufrn.imd.siaec.siaec_backend.dto.ProductDTO;
import br.ufrn.imd.siaec.siaec_backend.exception.ResourceNotFoundException; // Importar
import br.ufrn.imd.siaec.siaec_backend.model.Artisan;
import br.ufrn.imd.siaec.siaec_backend.model.Catalog;
import br.ufrn.imd.siaec.siaec_backend.model.Product;
import br.ufrn.imd.siaec.siaec_backend.model.ProductImage;
import br.ufrn.imd.siaec.siaec_backend.repository.ArtisanRepository; // Importar
import br.ufrn.imd.siaec.siaec_backend.repository.CatalogRepository; // Importar
import br.ufrn.imd.siaec.siaec_backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ArtisanRepository artisanRepository;

    @Autowired
    private CatalogRepository catalogRepository;

    @Transactional
    public ProductDTO create(ProductDTO productDTO) {
        Artisan artisan = artisanRepository.findById(productDTO.getArtisanId())
                .orElseThrow(() -> new ResourceNotFoundException("Artesão não encontrado com id: " + productDTO.getArtisanId()));

        Catalog catalog = catalogRepository.findByArtisanArtisanId(artisan.getArtisanId())
                .orElseGet(() -> {
                    Catalog newCatalog = new Catalog();
                    newCatalog.setArtisan(artisan);
                    artisan.setCatalog(newCatalog); // Mantém a relação bidirecional
                    return catalogRepository.save(newCatalog); // Salva o novo catálogo
                });

        Product product = productDTO.toEntity();
        product.setCreatedAt(new Date()); // Define a data de criação
        product.setCatalog(catalog);
        
        // CascadeType.ALL no model fará com que as imagens sejam salvas junto
        Product savedProduct = productRepository.save(product);
        return ProductDTO.fromEntity(savedProduct);
    }

    @Transactional(readOnly = true)
    public ProductDTO findById(String productId) { 
        Product product = productRepository.findById(productId)
                .filter(p -> p.getDeletedAt() == null) 
                .orElseThrow();
                // .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado com id: " + productId));
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
        Product product = productRepository.findById(productId)
                .filter(p -> p.getDeletedAt() == null)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado com id: " + productId));

        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setStock(productDTO.getStock());
        product.setMaterial(productDTO.getMaterial());
        product.setStatus(productDTO.isStatus());

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
        Product product = productRepository.findById(productId)
                .filter(p -> p.getDeletedAt() == null) 
                .orElse(null);
                // .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado com id: " + productId));
        
        product.setDeletedAt(new Date());
        product.setStatus(false); 
        productRepository.save(product);
        
    }
}