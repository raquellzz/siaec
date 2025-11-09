package br.ufrn.imd.siaec.siaec_backend.service;

import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import br.ufrn.imd.siaec.siaec_backend.dto.LoginDTO;
import br.ufrn.imd.siaec.siaec_backend.dto.UserRegisterDTO;
import br.ufrn.imd.siaec.siaec_backend.dto.UserResponseDTO;
import br.ufrn.imd.siaec.siaec_backend.dto.UserUpdateDTO;
import br.ufrn.imd.siaec.siaec_backend.enums.AccountStatusEnum;
import br.ufrn.imd.siaec.siaec_backend.exception.BadRequestException;
import br.ufrn.imd.siaec.siaec_backend.exception.NotFoundException;
import br.ufrn.imd.siaec.siaec_backend.exception.UnauthorizedException;
import br.ufrn.imd.siaec.siaec_backend.model.User;
import br.ufrn.imd.siaec.siaec_backend.repository.UserRepository;

@Service
public class UserService {
    private UserRepository repository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;

    @Autowired
    public UserService(
        UserRepository repository,
        PasswordEncoder passwordEncoder,
        AuthenticationManager authenticationManager
    ) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public UserResponseDTO create(UserRegisterDTO user) {
        boolean usernameExists = repository.existsByUsername(user.getUsername());
        boolean emailExists = repository.existsByEmail(user.getEmail());
        if (usernameExists) {
            throw new BadRequestException("Usuário já cadastrado com o username informado");
        } else if (emailExists) {
            throw new BadRequestException("Usuário já cadastrado com o e-mail informado");
        } else {
            User savedUser = repository.save(
                User.builder()
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
                    .build()
            );

            return UserResponseDTO.builder()
                .userId(savedUser.getUserId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .username(savedUser.getUsername())
                .phone(savedUser.getPhone())
                .role(savedUser.getRole())
                .dateOfBirth(savedUser.getDateOfBirth())
                .taxId(savedUser.getTaxId())
                .build();
        }
    }

    public User authenticate(LoginDTO credentials) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    credentials.getEmail(),
                    credentials.getPassword()
                )
            );
        } catch (AuthenticationException exception) {
            throw new UnauthorizedException("Email or password are incorrect");
        }

        User user = repository
            .findByEmail(credentials.getEmail())
            .orElseThrow(() -> new NotFoundException("User not found"));

        return user;
    }

    public Page<User> getAll(int limit, int page) {
        Pageable pagination = PageRequest.of(page, limit);
        return repository.findAll(pagination);
    }

    public UserResponseDTO get(String userId) {
        User user = repository.findById(userId).orElseThrow(() -> new NotFoundException("User not found"));
        return UserResponseDTO.builder()
            .userId(user.getUserId())
            .name(user.getName())
            .email(user.getEmail())
            .username(user.getUsername())
            .phone(user.getPhone())
            .role(user.getRole())
            .dateOfBirth(user.getDateOfBirth())
            .taxId(user.getTaxId())
            .build();
    }

    public void update(String userId, UserUpdateDTO input) {
        User userUpdated = repository.findById(userId).orElseThrow(() -> new NotFoundException("User not found"));

        if (input.getName() != null) userUpdated.setName(input.getName());
        if (input.getUsername() != null) {
            boolean usernameExists = repository.existsByUsername(input.getUsername());
            if (usernameExists) {
                throw new BadRequestException("Usuário já cadastrado com o username informado");
            } else {
                userUpdated.setUsername(input.getUsername());
            }
        }
        if (input.getPassword() != null) userUpdated.setPassword(passwordEncoder.encode(userUpdated.getPassword()));
        if (input.getPhone() != null) userUpdated.setPhone(input.getPhone());
        if (input.getDateOfBirth() != null) userUpdated.setDateOfBirth(input.getDateOfBirth());

        repository.save(userUpdated);
    }

    public void delete(String userId) {
        User user = repository.findById(userId).orElseThrow(() -> new NotFoundException("User not found"));
        user.setDeletedAt(new Date());
        repository.save(user);
    }
}
