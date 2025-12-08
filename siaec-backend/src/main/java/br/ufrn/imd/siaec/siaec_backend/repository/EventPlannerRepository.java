package br.ufrn.imd.siaec.siaec_backend.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.ufrn.imd.siaec.siaec_backend.enums.RegistrationAccountStatusEnum;
import br.ufrn.imd.siaec.siaec_backend.model.EventPlanner;

@Repository
public interface EventPlannerRepository extends JpaRepository<EventPlanner, String> {
    Page<EventPlanner> findByUser_NameContainingIgnoreCaseAndRegistrationAccountStatus(String name, RegistrationAccountStatusEnum status, Pageable pageable);
    Page<EventPlanner> findAllByRegistrationAccountStatus(RegistrationAccountStatusEnum status, Pageable pageable);
    
    Optional<EventPlanner> findByUserUserId(String userId);
}
