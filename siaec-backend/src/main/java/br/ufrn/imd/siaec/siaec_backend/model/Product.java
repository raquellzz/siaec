package br.ufrn.imd.siaec.siaec_backend.model;

import java.util.Date;

import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String productId;

    @Nonnull
    private String name;

    @Nonnull
    private String description;

    @Nonnull
    private Double price;

    @Nonnull
    private int stock;

    @Nonnull
    private String material;

    @Nonnull
    private boolean status;

    @Temporal(TemporalType.TIMESTAMP)
    @Nullable
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Nullable
    private Date deletedAt;
}
