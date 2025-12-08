package br.ufrn.imd.siaec.siaec_backend.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import io.micrometer.common.lang.Nullable;
import jakarta.annotation.Nonnull;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String eventId;

    @Nonnull
    private String status = "Ativo";

    @Nonnull
    private String name;

    @Nonnull
    private String description;

    @Nonnull
    @Temporal(TemporalType.TIMESTAMP)
    private String dateStart;

    @Nonnull
    @Temporal(TemporalType.TIMESTAMP)
    private String dateEnd;

    @Nonnull
    private String location;

    @Nullable
    private String imagePath;

    @Temporal(TemporalType.TIMESTAMP)
    @Nullable
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Nullable
    private Date deletedAt;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<EventRegistration> artisanRegistrations = new ArrayList<>();
}
