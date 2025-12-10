package br.ufrn.imd.siaec.siaec_backend.repository;

import br.ufrn.imd.siaec.siaec_backend.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends JpaRepository<Order, String> {
    Page<Order> findByUser_UserId(String userId, Pageable pageable);

    @Query("""
        SELECT DISTINCT o 
        FROM Order o 
        JOIN o.items i 
        JOIN i.product p 
        JOIN p.catalog c 
        WHERE c.artisan.user.userId = :userId
    """)
    Page<Order> searchSalesForArtisan(@Param("userId") String userId, Pageable pageable);
}