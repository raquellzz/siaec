package br.ufrn.imd.siaec.siaec_backend.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.ufrn.imd.siaec.siaec_backend.dto.UserDTO;
import br.ufrn.imd.siaec.siaec_backend.enums.AccountStatusEnum;
import br.ufrn.imd.siaec.siaec_backend.exception.BadRequestException;
import br.ufrn.imd.siaec.siaec_backend.model.User;
import br.ufrn.imd.siaec.siaec_backend.repository.UserRepository;

@Service
public class UserService {
    private UserRepository repository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDTO create(UserDTO user) {
        boolean usernameExists = repository.existsByUsername(user.getUsername());
        boolean emailExists = repository.existsByEmail(user.getEmail());
        if (usernameExists) {
            throw new BadRequestException("Usuário já cadastrado com o username informado");
        } else if (emailExists) {
            throw new BadRequestException("Usuário já cadastrado com o e-mail informado");
        } else {
            User newUser = User.builder()
                .name(user.getName())
                .email(user.getEmail())
                .username(user.getUsername())
                .password(passwordEncoder.encode(user.getPassword()))
                .phone(user.getPhone())
                .role(user.getRole())
                .dateOfBirth(user.getDateOfBirth())
                .statusAccount(AccountStatusEnum.ACTIVE)
                .taxId(user.getTaxId())
                .createdAt(new Date())
                .deletedAt(null)
                .build();

            User savedUser = repository.save(newUser);

            return UserDTO.builder()
                .userId(savedUser.getUserId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .username(savedUser.getUsername())
                .phone(savedUser.getPhone())
                .role(savedUser.getRole())
                .dateOfBirth(user.getDateOfBirth())
                .statusAccount(AccountStatusEnum.ACTIVE)
                .taxId(user.getTaxId())
                .build();
        }
    }

}
