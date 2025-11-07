package br.ufrn.imd.siaec.siaec_backend.dto;

import br.ufrn.imd.siaec.siaec_backend.enums.PaymentMethodEnum;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import lombok.Data;
import java.util.List;

@Data
public class OrderRequestDTO {
    @NotNull
    private PaymentMethodEnum paymentMethod;

    @NotNull
    @Min(0)
    private Double shippingFee; 

    @NotEmpty
    @Valid 
    private List<OrderItemRequestDTO> items;
}