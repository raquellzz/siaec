package br.ufrn.imd.siaec.siaec_backend.model;

import java.util.List;

import br.ufrn.imd.siaec.siaec_backend.enums.RegistrationAccountStatusEnum;
import jakarta.annotation.Nonnull;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "artisans")
public class Artisan {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String artisanId;

    @Nonnull
    private String description;

    @Enumerated(EnumType.STRING)
    @Nonnull
    private RegistrationAccountStatusEnum registrationAccountStatus;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "userId", referencedColumnName = "userId")
    private User user;

    @OneToMany(mappedBy = "artisan", cascade = CascadeType.ALL)
    private List<EventRegistration> eventRegistrations;

    @OneToOne(mappedBy = "artisan", cascade = CascadeType.ALL, orphanRemoval = true)
    private Catalog catalog;
}
