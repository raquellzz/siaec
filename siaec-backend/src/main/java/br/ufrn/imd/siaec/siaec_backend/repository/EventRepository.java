package br.ufrn.imd.siaec.siaec_backend.repository;

import br.ufrn.imd.siaec.siaec_backend.model.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, String> {
    Page<Event> findByNameContainingIgnoreCaseAndDeletedAtIsNull(String name, Pageable pageable);
    Page<Event> findAllByDeletedAtIsNull(Pageable pageable);
}
