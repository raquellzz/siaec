package br.ufrn.imd.siaec.siaec_backend.dto;

import br.ufrn.imd.siaec.siaec_backend.model.Order;
import lombok.Data;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class SaleResponseDTO {
    private String orderId;
    private String clientName;
    private Date createdAt;
    private boolean status;
    private String address;
    private double myTotal;
    private List<OrderItemResponseDTO> myItems;

    public static SaleResponseDTO fromEntity(Order order, String artisanUserId) {
        SaleResponseDTO dto = new SaleResponseDTO();
        dto.setOrderId(order.getOrderId());
        
        if (order.getUser() != null) {
            dto.setClientName(order.getUser().getName());
        } else {
            dto.setClientName("Cliente Desconhecido");
        }
        
        dto.setCreatedAt(order.getCreatedAt());
        dto.setStatus(order.isStatus());
        dto.setAddress(order.getAddress());

        var artisanItems = order.getItems().stream()
                .filter(item -> {
                    try {
                        return item.getProduct()
                                   .getCatalog()  
                                   .getArtisan()
                                   .getUser()
                                   .getUserId()
                                   .equals(artisanUserId);
                    } catch (NullPointerException e) {
                        return false; 
                    }
                })
                .collect(Collectors.toList());

        double total = artisanItems.stream()
                .mapToDouble(item -> item.getUnitPrice() * item.getQuantity())
                .sum();

        dto.setMyTotal(total);
        dto.setMyItems(artisanItems.stream()
                .map(OrderItemResponseDTO::fromEntity)
                .collect(Collectors.toList()));

        return dto;
    }
}