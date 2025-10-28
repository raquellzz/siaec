package br.ufrn.imd.siaec.siaec_backend.model;

import io.micrometer.common.lang.Nullable;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String productImageId;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "product_id")
    private Product product;

    @Nullable
    private String imagePath;

}
