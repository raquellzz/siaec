package br.ufrn.imd.siaec.siaec_backend.repository;

import br.ufrn.imd.siaec.siaec_backend.enums.RegistrationAccountStatusEnum;
import br.ufrn.imd.siaec.siaec_backend.model.Artisan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtisanRepository extends JpaRepository<Artisan, String> {
    Page<Artisan> findByUser_NameContainingIgnoreCaseAndRegistrationAccountStatus(String name, RegistrationAccountStatusEnum status, Pageable pageable);
    Page<Artisan> findAllByRegistrationAccountStatus(RegistrationAccountStatusEnum status, Pageable pageable);
}
