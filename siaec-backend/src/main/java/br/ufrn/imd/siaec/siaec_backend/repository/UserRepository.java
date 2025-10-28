package br.ufrn.imd.siaec.siaec_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufrn.imd.siaec.siaec_backend.model.User;

public interface UserRepository extends JpaRepository<User, String> {

}
