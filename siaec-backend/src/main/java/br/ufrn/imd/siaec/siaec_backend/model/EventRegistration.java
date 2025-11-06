package br.ufrn.imd.siaec.siaec_backend.model;

import java.util.Date;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "events_registrations")
public class EventRegistration {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String eventRegistrationId;

    @ManyToOne
    @JoinColumn(name = "artisanId")
    private Artisan artisan;

    @ManyToOne
    @JoinColumn(name = "eventId")
    private Event event;

    @Nonnull
    private boolean accepted;

    @Temporal(TemporalType.DATE)
    @Nonnull
    private Date registrationDate;
}
