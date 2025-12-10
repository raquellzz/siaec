package br.ufrn.imd.siaec.siaec_backend.model;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLRestriction;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
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
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
@SQLRestriction("deleted_at IS NULL")
public class User implements UserDetails {
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

    @CreationTimestamp
    @Nullable
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Nullable
    private Date deletedAt;

    @ManyToMany
    @JoinTable(
        name = "user_favorite_events",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "event_id")
    )
    @Builder.Default
    @ToString.Exclude 
    @EqualsAndHashCode.Exclude
    private Set<Event> favoriteEvents = new HashSet<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.role == null) {
            return List.of(); 
        }
        return List.of(new SimpleGrantedAuthority("ROLE_" + this.role.name()));
    }

    public String getNickname() {
        return username;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        if (this.statusAccount == null) {
            return true; 
        }
        return this.statusAccount.equals(AccountStatusEnum.ACTIVE);
    }

    @Override
    public boolean isAccountNonLocked() {
        if (this.statusAccount == null) {
            return true; 
        }
        return this.statusAccount.equals(AccountStatusEnum.ACTIVE);
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        if (this.statusAccount == null) {
            return true; 
        }
        return this.statusAccount.equals(AccountStatusEnum.ACTIVE);
    }
}
