package br.ufrn.imd.siaec.siaec_backend.controller;

import br.ufrn.imd.siaec.siaec_backend.dto.ProductDTO;
import br.ufrn.imd.siaec.siaec_backend.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products") 
public class ProductController {

    @Autowired
    private ProductService productService;

    @PreAuthorize("hasRole('ROLE_ARTISAN') or hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@Valid @RequestBody ProductDTO productDTO) {
        ProductDTO newProduct = productService.create(productDTO);
        return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<ProductDTO>> getProducts(
            @RequestParam(required = false) String name,
            Pageable pageable) {
        
        Page<ProductDTO> pageOfProducts;
        if (name != null && !name.isEmpty()) {
            pageOfProducts = productService.findByName(name, pageable); 
        } else {
            pageOfProducts = productService.findAll(pageable);
        }
        return ResponseEntity.ok(pageOfProducts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable String id) { 
        ProductDTO product = productService.findById(id);
        return ResponseEntity.ok(product);
    }

    @PreAuthorize("hasRole('ROLE_ARTISAN') or hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable String id, @Valid @RequestBody ProductDTO productDTO) { 
        ProductDTO updatedProduct = productService.update(id, productDTO);
        return ResponseEntity.ok(updatedProduct);
    }

    @PreAuthorize("hasRole('ROLE_ARTISAN') or hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) { 
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}