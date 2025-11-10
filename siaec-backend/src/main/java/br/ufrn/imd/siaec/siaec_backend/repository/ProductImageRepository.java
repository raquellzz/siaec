package br.ufrn.imd.siaec.siaec_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.ufrn.imd.siaec.siaec_backend.model.ProductImage;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, String> {
    boolean existsByImagePath(String imagePath);
}
