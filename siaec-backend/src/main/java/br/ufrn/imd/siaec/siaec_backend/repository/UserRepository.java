package br.ufrn.imd.siaec.siaec_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.ufrn.imd.siaec.siaec_backend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByEmailAndUsername(String email, String username);
}
