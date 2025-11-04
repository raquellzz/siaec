package br.ufrn.imd.siaec.siaec_backend.model;

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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "event_planners")
public class EventPlanner {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String eventPlannerId;

    @Enumerated(EnumType.STRING)
    @Nonnull
    private RegistrationAccountStatusEnum registrationAccountStatus;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "userId", referencedColumnName = "userId")
    private User user;

    public String getEventPlannerId() {
        return eventPlannerId;
    }

    public void setEventPlannerId(String eventPlannerId) {
        this.eventPlannerId = eventPlannerId;
    }

    public RegistrationAccountStatusEnum getRegistrationAccountStatus() {
        return registrationAccountStatus;
    }

    public void setRegistrationAccountStatus(
            RegistrationAccountStatusEnum registrationAccountStatus) {
        this.registrationAccountStatus = registrationAccountStatus;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
