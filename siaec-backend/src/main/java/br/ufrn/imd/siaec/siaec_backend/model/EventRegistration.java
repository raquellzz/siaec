package br.ufrn.imd.siaec.siaec_backend.model;

import java.util.Date;

import jakarta.annotation.Nonnull;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

public class EventRegistration {
    @EmbeddedId
    @GeneratedValue(strategy = GenerationType.UUID)
    private String eventRegistrationId;

    @ManyToOne
    @MapsId("artisan_id")
    @JoinColumn(name = "artisan_id", referencedColumnName = "artisan_id")
    private Artisan artisan;

    @ManyToOne
    @MapsId("event_id")
    @JoinColumn(name = "event_id", referencedColumnName = "event_id")
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
