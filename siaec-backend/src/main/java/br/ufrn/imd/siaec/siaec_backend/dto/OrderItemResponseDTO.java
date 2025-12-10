package br.ufrn.imd.siaec.siaec_backend.dto;

import br.ufrn.imd.siaec.siaec_backend.model.OrderItem;
import lombok.Data;

@Data
public class OrderItemResponseDTO {
    private String productName;
    private int quantity;
    private double unitPrice;
    private double subtotal;

    public static OrderItemResponseDTO fromEntity(OrderItem item) {
        OrderItemResponseDTO dto = new OrderItemResponseDTO();
        dto.setProductName(item.getProduct().getName());
        dto.setQuantity(item.getQuantity());
        dto.setUnitPrice(item.getUnitPrice());
        dto.setSubtotal(item.getQuantity() * item.getUnitPrice());
        return dto;
    }
}