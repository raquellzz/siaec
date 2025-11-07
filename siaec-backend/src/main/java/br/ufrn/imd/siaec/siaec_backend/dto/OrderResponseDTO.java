package br.ufrn.imd.siaec.siaec_backend.dto;

import br.ufrn.imd.siaec.siaec_backend.enums.PaymentMethodEnum;
import br.ufrn.imd.siaec.siaec_backend.model.Order;
import lombok.Data;
import java.util.Date;

@Data
public class OrderResponseDTO {
    private String orderId;
    // private String userId;
    private double subtotal;
    private double shippingFee;
    private double total;
    private boolean status;
    private PaymentMethodEnum paymentMethod;
    private Date createdAt;
    private int totalItems;

    public static OrderResponseDTO fromEntity(Order order) {
        OrderResponseDTO dto = new OrderResponseDTO();
        dto.setOrderId(order.getOrderId());
        //dto.setUserId(order.getUser().getId()); // Se houver usuário
        dto.setSubtotal(order.getSubtotal());
        dto.setShippingFee(order.getShippingFee());
        dto.setTotal(order.getTotal());
        dto.setStatus(order.isStatus());
        // Order does not define getPaymentMethod(); set to null for now and map when a getter exists
        dto.setPaymentMethod(order.getRole());
        dto.setCreatedAt(order.getCreatedAt());
        dto.setTotalItems(order.getItems() != null ? order.getItems().size() : 0);
        return dto;
    }
}