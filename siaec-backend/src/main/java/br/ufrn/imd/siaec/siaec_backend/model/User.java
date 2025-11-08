package br.ufrn.imd.siaec.siaec_backend.model;

import java.time.LocalDate;
import java.util.Date;

import br.ufrn.imd.siaec.siaec_backend.enums.AccountStatusEnum;
import br.ufrn.imd.siaec.siaec_backend.enums.RoleEnum;
import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;
import jakarta.persistence.Column;
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
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.servlet.view.groovy.GroovyMarkupConfig;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String userId;

    @Enumerated(EnumType.STRING)
    @Nonnull
    private RoleEnum role;

    @Nonnull
    private String name;

    @Nonnull
    @Column(unique = true)
    private String username;

    @Nonnull
    @Column(unique = true)
    private String email;

    @Nonnull
    private String password;

    @Nonnull
    private String phone;

    @Temporal(TemporalType.DATE)
    @Nonnull
    private LocalDate dateOfBirth;

    @Nonnull
    private String taxId; // CPF, CNPJ

    @Enumerated(EnumType.STRING)
    @Nonnull
    private AccountStatusEnum statusAccount;

    @Temporal(TemporalType.TIMESTAMP)
    @Nullable
    @Builder.Default
    private Date createdAt = new Date();

    @Temporal(TemporalType.TIMESTAMP)
    @Nullable
    private Date deletedAt;

}
