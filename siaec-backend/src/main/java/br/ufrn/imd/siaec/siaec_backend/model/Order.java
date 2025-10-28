package br.ufrn.imd.siaec.siaec_backend.model;

import br.ufrn.imd.siaec.siaec_backend.enums.PagamentMethodEnum;
import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

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

    @Enumerated(EnumType.ORDINAL)
    @Nonnull
    private PagamentMethodEnum role;

    @Nonnull
    @Temporal(TemporalType.TIMESTAMP)
    private String createdAt;

    @Nullable
    @Temporal(TemporalType.TIMESTAMP)
    private String deletedAt;
}
