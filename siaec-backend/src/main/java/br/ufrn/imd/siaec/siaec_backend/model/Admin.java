package br.ufrn.imd.siaec.siaec_backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "admins")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private User user;

    @Column(name = "department")
    private String department; 

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    public Admin() {
        this.createdAt = new Date();
    }
}