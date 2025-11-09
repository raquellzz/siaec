package br.ufrn.imd.siaec.siaec_backend.repository;

import br.ufrn.imd.siaec.siaec_backend.model.Catalog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CatalogRepository extends JpaRepository<Catalog, String> {
    Optional<Catalog> findByArtisanArtisanId(String artisanId);
}
