package br.ufrn.imd.siaec.siaec_backend.dto;

import br.ufrn.imd.siaec.siaec_backend.model.Product;
import br.ufrn.imd.siaec.siaec_backend.model.ProductImage;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class ProductDTO {

    private String productId; 

    @NotBlank(message = "O nome é obrigatório")
    private String name; 

    @NotBlank(message = "A descrição é obrigatória")
    private String description; 

    @DecimalMin(value = "0.01", message = "O preço deve ser maior que zero")
    private Double price; 

    @Min(value = 0, message = "O estoque não pode ser negativo")
    private int stock; 

    @NotBlank(message = "O material é obrigatório")
    private String material; 

    private boolean status;
    private Date createdAt;

    private List<String> imagePaths;

    public ProductDTO() {}

    public static ProductDTO fromEntity(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setProductId(product.getProductId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setStock(product.getStock());
        dto.setMaterial(product.getMaterial());
        dto.setStatus(product.isStatus());
        dto.setCreatedAt(product.getCreatedAt());
        
        if (product.getProductImages() != null) {
            dto.setImagePaths(product.getProductImages().stream()
                    .map(ProductImage::getImagePath)
                    .collect(Collectors.toList()));
        }
        return dto;
    }

    public Product toEntity() {
        Product product = new Product();
        product.setName(this.name);
        product.setDescription(this.description);
        product.setPrice(this.price);
        product.setStock(this.stock);
        product.setMaterial(this.material);
        product.setStatus(this.status);
        
        if (this.imagePaths != null) {
            List<ProductImage> images = this.imagePaths.stream().map(path -> {
                ProductImage img = new ProductImage();
                img.setImagePath(path);
                img.setProduct(product); 
                return img;
            }).collect(Collectors.toList());
            product.setProductImages(images);
        }
        return product;
    }
}