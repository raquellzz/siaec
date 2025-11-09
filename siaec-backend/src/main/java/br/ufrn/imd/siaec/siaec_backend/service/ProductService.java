package br.ufrn.imd.siaec.siaec_backend.service;

import br.ufrn.imd.siaec.siaec_backend.dto.ProductDTO;
import br.ufrn.imd.siaec.siaec_backend.model.Product;
import br.ufrn.imd.siaec.siaec_backend.model.ProductImage;
import br.ufrn.imd.siaec.siaec_backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public ProductDTO create(ProductDTO productDTO) {
        Product product = productDTO.toEntity();
        product.setCreatedAt(new Date()); // Define a data de criação
        
        // CascadeType.ALL no model fará com que as imagens sejam salvas junto
        Product savedProduct = productRepository.save(product);
        return ProductDTO.fromEntity(savedProduct);
    }

    @Transactional(readOnly = true)
    public ProductDTO findById(String productId) { 
        Product product = productRepository.findById(productId)
                .filter(p -> p.getDeletedAt() == null) 
                .orElseThrow();
                // .orElseThrow(() -> new NotFoundException("Produto não encontrado com id: " + productId));
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
                .orElse(null);

        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setStock(productDTO.getStock());
        product.setMaterial(productDTO.getMaterial());
        product.setStatus(productDTO.isStatus());

        product.getProductImages().clear(); 
        if (productDTO.getImagePaths() != null) {
            product.getProductImages().clear(); 
            product.getProductImages().addAll(
                productDTO.getImagePaths().stream().map(path -> {
                    ProductImage img = new ProductImage();
                    img.setImagePath(path);
                    img.setProduct(product); 
                    return img;
                }).collect(Collectors.toList()) 
            );
}

        Product updatedProduct = productRepository.save(product);
        return ProductDTO.fromEntity(updatedProduct);
    }

    @Transactional
    public void delete(String productId) { 
        Product product = productRepository.findById(productId)
                .filter(p -> p.getDeletedAt() == null) 
                .orElse(null);
                // .orElseThrow(() -> new NotFoundException("Produto não encontrado com id: " + productId));
        
        product.setDeletedAt(new Date());
        product.setStatus(false); 
        productRepository.save(product);
        
    }
}