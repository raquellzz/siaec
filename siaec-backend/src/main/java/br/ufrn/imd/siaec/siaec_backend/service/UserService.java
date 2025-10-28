package br.ufrn.imd.siaec.siaec_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufrn.imd.siaec.siaec_backend.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;

}
