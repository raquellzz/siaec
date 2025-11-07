package br.ufrn.imd.siaec.siaec_backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class OrderItemRequestDTO {
    @NotBlank
    private String productId; 

    @Min(1)
    private Integer quantity;
}