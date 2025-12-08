package br.ufrn.imd.siaec.siaec_backend.controller;

import br.ufrn.imd.siaec.siaec_backend.dto.ProductDTO;
import br.ufrn.imd.siaec.siaec_backend.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products") 
public class ProductController {

    @Autowired
    private ProductService productService;

    @PreAuthorize("hasRole('ARTISAN') or hasRole('ADMIN')")
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

    @PreAuthorize("hasRole('ARTISAN') or hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable String id, @Valid @RequestBody ProductDTO productDTO) { 
        ProductDTO updatedProduct = productService.update(id, productDTO);
        return ResponseEntity.ok(updatedProduct);
    }

    @PreAuthorize("hasRole('ARTISAN') or hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) { 
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/my-products")
    @PreAuthorize("hasRole('ARTISAN')")
    public ResponseEntity<Page<ProductDTO>> getMyProducts(@PageableDefault(size = 10, page = 0) Pageable pageable) {
        Page<ProductDTO> myProducts = productService.findMyProducts(pageable);
        return ResponseEntity.ok(myProducts);
    }

    @PreAuthorize("hasRole('ARTISAN') or hasRole('ADMIN')")
    @PutMapping("/my-products/{id}")
    public ResponseEntity<ProductDTO> update(@PathVariable String id, @Valid @RequestBody ProductDTO productDTO) { 
        // O service vai verificar se o produto pertence ao artesão logado
        ProductDTO updatedProduct = productService.update(id, productDTO);
        return ResponseEntity.ok(updatedProduct);
    }

    @PreAuthorize("hasRole('ARTISAN') or hasRole('ADMIN')")
    @DeleteMapping("/my-products/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) { 
        // O service vai verificar se o produto pertence ao artesão logado
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-artisan/{artisanId}")
    public ResponseEntity<Page<ProductDTO>> getProductsByArtisanId(
            @PathVariable String artisanId,
            Pageable pageable) {

        Page<ProductDTO> pageOfProducts = productService.findByArtisanId(artisanId, pageable);
        return ResponseEntity.ok(pageOfProducts);
    }
}