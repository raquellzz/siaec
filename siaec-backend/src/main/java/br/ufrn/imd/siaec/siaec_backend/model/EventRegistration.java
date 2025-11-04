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

@Entity
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

    public String getEventRegistrationId() {
        return eventRegistrationId;
    }

    public void setEventRegistrationId(String eventRegistrationId) {
        this.eventRegistrationId = eventRegistrationId;
    }

    public Artisan getArtisan() {
        return artisan;
    }

    public void setArtisan(Artisan artisan) {
        this.artisan = artisan;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }

    public Date getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }

}
