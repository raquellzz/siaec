package br.ufrn.imd.siaec.siaec_backend.model;

import br.ufrn.imd.siaec.siaec_backend.enums.PagamentMethodEnum;
import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String orderId;

    @Nonnull
    private double subtotal;

    @Nonnull
    private double shippingFee; // frete

    @Nonnull
    private double total;

    @Nonnull
    private boolean status;

    @Enumerated(EnumType.STRING)
    @Nonnull
    private PagamentMethodEnum role;

    @Nonnull
    @Temporal(TemporalType.TIMESTAMP)
    private String createdAt;

    @Nullable
    @Temporal(TemporalType.TIMESTAMP)
    private String deletedAt;
}
