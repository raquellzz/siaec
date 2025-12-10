package br.ufrn.imd.siaec.siaec_backend.dto;

import br.ufrn.imd.siaec.siaec_backend.enums.PaymentMethodEnum;
import br.ufrn.imd.siaec.siaec_backend.model.Order;
import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
public class OrderResponseDTO {
    private String artisanId;
    private String artisanName;
    private String orderId;
    private double subtotal;
    private double shippingFee;
    private double total;
    private boolean status;
    private PaymentMethodEnum paymentMethod;
    private Date createdAt;
    private int totalItems;
    private List<OrderItemResponseDTO> items;
    private String address;

    public static OrderResponseDTO fromEntity(Order order) {
        OrderResponseDTO dto = new OrderResponseDTO();
        if (order.getArtisan() != null) {
          dto.setArtisanId(order.getArtisan().getArtisanId());
          dto.setArtisanName(order.getArtisan().getUser().getName());
        }
        dto.setOrderId(order.getOrderId());
        dto.setSubtotal(order.getSubtotal());
        dto.setShippingFee(order.getShippingFee());
        dto.setTotal(order.getTotal());
        dto.setStatus(order.isStatus());
        dto.setPaymentMethod(order.getPaymentMethod());
        dto.setCreatedAt(order.getCreatedAt());
        dto.setTotalItems(order.getItems() != null ? order.getItems().size() : 0);
        dto.setItems(order.getItems().stream()
                .map(OrderItemResponseDTO::fromEntity)
                .toList());
        dto.setAddress(order.getAddress());
        return dto;
    }
}