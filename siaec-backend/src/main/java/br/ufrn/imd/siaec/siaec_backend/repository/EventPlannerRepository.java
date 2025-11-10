package br.ufrn.imd.siaec.siaec_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.ufrn.imd.siaec.siaec_backend.model.EventPlanner;

@Repository
public interface EventPlannerRepository extends JpaRepository<EventPlanner, String> {
}
