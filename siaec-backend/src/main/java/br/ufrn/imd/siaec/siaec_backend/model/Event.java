package br.ufrn.imd.siaec.siaec_backend.model;

import java.util.Date;
import java.util.Set;

import io.micrometer.common.lang.Nullable;
import jakarta.annotation.Nonnull;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String eventId;

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

    @OneToMany(mappedBy = "event")
    Set<EventRegistration> artisanRegistrations;

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String id) {
        this.eventId = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDateStart() {
        return dateStart;
    }

    public void setDateStart(String dateStart) {
        this.dateStart = dateStart;
    }

    public String getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(String dateEnd) {
        this.dateEnd = dateEnd;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(Date deletedAt) {
        this.deletedAt = deletedAt;
    }

    public Set<EventRegistration> getArtisanRegistrations() {
        return artisanRegistrations;
    }

    public void setArtisanRegistrations(Set<EventRegistration> artisanRegistrations) {
        this.artisanRegistrations = artisanRegistrations;
    }

}
