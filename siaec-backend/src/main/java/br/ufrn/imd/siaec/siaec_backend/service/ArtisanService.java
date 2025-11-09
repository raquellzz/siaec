package br.ufrn.imd.siaec.siaec_backend.service;

import br.ufrn.imd.siaec.siaec_backend.enums.RegistrationAccountStatusEnum;
import br.ufrn.imd.siaec.siaec_backend.model.Artisan;
import br.ufrn.imd.siaec.siaec_backend.repository.ArtisanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class ArtisanService {
    @Autowired
    private ArtisanRepository artisanRepository;

    @Transactional(readOnly = true)
    public Page<Artisan> findArtisans(String nameFilter, Pageable pageable) {
        var status = RegistrationAccountStatusEnum.APPROVED;

        if (nameFilter != null && !nameFilter.isEmpty()) {
            return artisanRepository.findByUser_NameContainingIgnoreCaseAndRegistrationAccountStatus(nameFilter, status, pageable);
        } else {
            return artisanRepository.findAllByRegistrationAccountStatus(status, pageable);
        }
    }

    @Transactional(readOnly = true)
    public Optional<Artisan> findById(String id) {
        return artisanRepository.findById(id);
    }
}
