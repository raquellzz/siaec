package br.ufrn.imd.siaec.siaec_backend.repository;

import br.ufrn.imd.siaec.siaec_backend.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, String> {
    Page<Order> findByUser_UserId(String userId, Pageable pageable);
}