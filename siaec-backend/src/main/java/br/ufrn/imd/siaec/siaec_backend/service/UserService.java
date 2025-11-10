package br.ufrn.imd.siaec.siaec_backend.service;

import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import br.ufrn.imd.siaec.siaec_backend.dto.LoginDTO;
import br.ufrn.imd.siaec.siaec_backend.dto.UserRegisterDTO;
import br.ufrn.imd.siaec.siaec_backend.dto.UserResponseDTO;
import br.ufrn.imd.siaec.siaec_backend.dto.UserUpdateDTO;
import br.ufrn.imd.siaec.siaec_backend.enums.AccountStatusEnum;
import br.ufrn.imd.siaec.siaec_backend.enums.RoleEnum;
import br.ufrn.imd.siaec.siaec_backend.exception.BadRequestException;
import br.ufrn.imd.siaec.siaec_backend.exception.NotFoundException;
import br.ufrn.imd.siaec.siaec_backend.exception.UnauthorizedException;
import br.ufrn.imd.siaec.siaec_backend.model.Artisan;
import br.ufrn.imd.siaec.siaec_backend.model.User;
import br.ufrn.imd.siaec.siaec_backend.model.Catalog;
import br.ufrn.imd.siaec.siaec_backend.repository.UserRepository;
import br.ufrn.imd.siaec.siaec_backend.repository.ArtisanRepository;
import br.ufrn.imd.siaec.siaec_backend.repository.CatalogRepository;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.Authentication;

@Service
public class UserService {
    private UserRepository repository;
    private ArtisanRepository artisanRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private CatalogRepository catalogRepository;

    public UserService(
        UserRepository repository,
        ArtisanRepository artisanRepository,
        PasswordEncoder passwordEncoder,
        CatalogRepository catalogRepository,
        AuthenticationManager authenticationManager
    ) {
        this.repository = repository;
        this.artisanRepository = artisanRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.catalogRepository = catalogRepository;
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
            if (savedUser.getRole() == RoleEnum.ARTISAN) {
                Artisan artisan = new Artisan();
                artisan.setUser(savedUser);
                artisanRepository.save(artisan);
                Artisan savedArtisan = artisanRepository.save(artisan);
                Catalog newCatalog = new Catalog();
                newCatalog.setArtisan(savedArtisan);
                catalogRepository.save(newCatalog);
            }

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
            throw new UnauthorizedException("E-mail ou senha estão incorretos");
        }

        User user = repository
            .findByEmail(credentials.getEmail())
            .orElseThrow(() -> new NotFoundException("Usuário não encontrado"));

        return user;
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
            .username(user.getUsername())
            .phone(user.getPhone())
            .role(user.getRole())
            .dateOfBirth(user.getDateOfBirth())
            .taxId(user.getTaxId())
            .build();
    }

    public void update(String userId, UserUpdateDTO input) {
        User userUpdated = repository.findById(userId).orElseThrow(() -> new NotFoundException("Usuário não encontrado"));

        if (input.getName() != null) userUpdated.setName(input.getName());
        if (input.getUsername() != null) {
            boolean usernameExists = repository.existsByUsername(input.getUsername());
            if (usernameExists) {
                throw new BadRequestException("Usuário já cadastrado com o username informado");
            } else {
                userUpdated.setUsername(input.getUsername());
            }
        }
        // if (input.getPassword() != null) userUpdated.setPassword(passwordEncoder.encode(userUpdated.getPassword()));
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
                .username(user.getUsername())
                .phone(user.getPhone())
                .role(user.getRole())
                .dateOfBirth(user.getDateOfBirth())
                .taxId(user.getTaxId())
                .build();
    }
}
