package br.ufrn.imd.siaec.siaec_backend.repository;

import br.ufrn.imd.siaec.siaec_backend.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import br.ufrn.imd.siaec.siaec_backend.model.Catalog;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {

    @Query("SELECT p FROM Product p WHERE p.name LIKE %:name% AND p.deletedAt IS NULL")
    Page<Product> findByNameContainingIgnoreCaseAndDeletedAtIsNull(String name, Pageable pageable);

    Page<Product> findAllByDeletedAtIsNull(Pageable pageable);
    Page<Product> findByCatalogAndDeletedAtIsNull(Catalog catalog, Pageable pageable);
}