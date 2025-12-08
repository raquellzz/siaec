package br.ufrn.imd.siaec.siaec_backend.dto;

import br.ufrn.imd.siaec.siaec_backend.enums.PaymentMethodEnum;
import br.ufrn.imd.siaec.siaec_backend.model.Order;
import lombok.Data;
import java.util.Date;

@Data
public class OrderResponseDTO {
    private String orderId;
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
        dto.setSubtotal(order.getSubtotal());
        dto.setShippingFee(order.getShippingFee());
        dto.setTotal(order.getTotal());
        dto.setStatus(order.isStatus());
        dto.setPaymentMethod(order.getPaymentMethod());
        dto.setCreatedAt(order.getCreatedAt());
        dto.setTotalItems(order.getItems() != null ? order.getItems().size() : 0);
        return dto;
    }
}