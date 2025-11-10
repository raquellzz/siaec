package br.ufrn.imd.siaec.siaec_backend.service;

import java.util.Date;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import br.ufrn.imd.siaec.siaec_backend.dto.UserResponseDTO;
import br.ufrn.imd.siaec.siaec_backend.dto.UserUpdateDTO;
import br.ufrn.imd.siaec.siaec_backend.exception.BadRequestException;
import br.ufrn.imd.siaec.siaec_backend.exception.NotFoundException;
import br.ufrn.imd.siaec.siaec_backend.enums.AccountStatusEnum;
import br.ufrn.imd.siaec.siaec_backend.exception.UnauthorizedException;
import br.ufrn.imd.siaec.siaec_backend.model.User;
import br.ufrn.imd.siaec.siaec_backend.repository.UserRepository;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.Authentication;

@Service
public class UserService {
    private UserRepository repository;
    private PasswordEncoder passwordEncoder;

    public UserService(
        UserRepository repository,
        PasswordEncoder passwordEncoder
    ) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public Page<User> getAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public UserResponseDTO get(String userId) {
        User user = repository.findById(userId).orElseThrow(() -> new NotFoundException("Usuário não encontrado"));
        return UserResponseDTO.builder()
            .userId(user.getUserId())
            .name(user.getName())
            .email(user.getEmail())
            .username(user.getNickname())
            .phone(user.getPhone())
            .role(user.getRole())
            .dateOfBirth(user.getDateOfBirth())
            .taxId(user.getTaxId())
            .build();
    }

    public void update(String userId, UserUpdateDTO input) {
        User userUpdated = repository.findById(userId)
            .orElseThrow(() -> new NotFoundException("Usuário não encontrado"));

        if (input.getName() != null) userUpdated.setName(input.getName());
        if (input.getUsername() != null) {
            boolean usernameExists = repository.existsByUsername(input.getUsername());
            if (usernameExists) {
                throw new BadRequestException("Usuário já cadastrado com o username informado");
            } else {
                userUpdated.setUsername(input.getUsername());
            }
        }
        if (input.getPassword() != null) {
            userUpdated.setPassword(passwordEncoder.encode(input.getPassword()));
        }
        if (input.getPhone() != null) userUpdated.setPhone(input.getPhone());
        if (input.getDateOfBirth() != null) userUpdated.setDateOfBirth(input.getDateOfBirth());

        repository.save(userUpdated);
    }

    public void delete(String userId) {
        User user = repository.findById(userId).orElseThrow(() -> new NotFoundException("Usuário não encontrado"));
        user.setDeletedAt(new Date());
        
        user.setStatusAccount(AccountStatusEnum.valueOf("DELETED"));
       
        
        repository.save(user);
    }

    

    @Transactional(readOnly = true)
    public User getCurrentAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedException("Usuário não autenticado.");
        }
        String userEmail = authentication.getName();

        return repository.findByEmail(userEmail)
                .orElseThrow(() -> new NotFoundException("Usuário não encontrado no token."));
    }

    public UserResponseDTO convertToResponseDTO(User user) {
        return UserResponseDTO.builder()
                .userId(user.getUserId())
                .name(user.getName())
                .email(user.getEmail())
                .username(user.getNickname())
                .phone(user.getPhone())
                .role(user.getRole())
                .dateOfBirth(user.getDateOfBirth())
                .taxId(user.getTaxId())
                .build();
    }
}
