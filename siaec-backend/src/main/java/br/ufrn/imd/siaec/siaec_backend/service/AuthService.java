package br.ufrn.imd.siaec.siaec_backend.service;

import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import br.ufrn.imd.siaec.siaec_backend.dto.LoginDTO;
import br.ufrn.imd.siaec.siaec_backend.dto.UserRegisterDTO;
import br.ufrn.imd.siaec.siaec_backend.dto.UserResponseDTO;
import br.ufrn.imd.siaec.siaec_backend.enums.AccountStatusEnum;
import br.ufrn.imd.siaec.siaec_backend.enums.RegistrationAccountStatusEnum;
import br.ufrn.imd.siaec.siaec_backend.enums.RoleEnum;
import br.ufrn.imd.siaec.siaec_backend.exception.BadRequestException;
import br.ufrn.imd.siaec.siaec_backend.exception.NotFoundException;
import br.ufrn.imd.siaec.siaec_backend.exception.UnauthorizedException;
import br.ufrn.imd.siaec.siaec_backend.model.Artisan;
import br.ufrn.imd.siaec.siaec_backend.model.Catalog;
import br.ufrn.imd.siaec.siaec_backend.model.EventPlanner;
import br.ufrn.imd.siaec.siaec_backend.model.User;
import br.ufrn.imd.siaec.siaec_backend.repository.ArtisanRepository;
import br.ufrn.imd.siaec.siaec_backend.repository.CatalogRepository;
import br.ufrn.imd.siaec.siaec_backend.repository.EventPlannerRepository;
import br.ufrn.imd.siaec.siaec_backend.repository.UserRepository;

@Service
public class AuthService {
    private UserRepository userRepository;
    private ArtisanRepository artisanRepository;
    private EventPlannerRepository eventPlannerRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private CatalogRepository catalogRepository;

    @Autowired
    public AuthService(
        UserRepository userRepository,
        ArtisanRepository artisanRepository,
        EventPlannerRepository eventPlannerRepository,
        PasswordEncoder passwordEncoder,
        AuthenticationManager authenticationManager,
        CatalogRepository catalogRepository
    ) {
        this.userRepository = userRepository;
        this.artisanRepository = artisanRepository;
        this.eventPlannerRepository = eventPlannerRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.catalogRepository = catalogRepository;
    }

    public UserResponseDTO create(UserRegisterDTO user) {
        boolean usernameExists = userRepository.existsByUsername(user.getUsername());
        boolean emailExists = userRepository.existsByEmail(user.getEmail());
        if (usernameExists) {
            throw new BadRequestException("Usuário já cadastrado com o username informado");
        } else if (emailExists) {
            throw new BadRequestException("Usuário já cadastrado com o e-mail informado");
        } else {
            User savedUser = userRepository.save(
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

            if (user.getRole() == RoleEnum.ARTISAN) {
                Artisan newArtisan = new Artisan();
                newArtisan.setDescription(user.getDescription());
                newArtisan.setUser(savedUser);
                newArtisan.setRegistrationAccountStatus(RegistrationAccountStatusEnum.APPROVED);

                Catalog newCatalog = new Catalog();
                newCatalog.setArtisan(newArtisan);

                try {
                    artisanRepository.save(newArtisan);
                    catalogRepository.save(newCatalog);
                } catch (Exception e) {
                    userRepository.delete(savedUser);
                    artisanRepository.delete(newArtisan);
                    catalogRepository.delete(newCatalog);
                }
            }

            if (user.getRole() == RoleEnum.EVENT_PLANNER) {
                EventPlanner newEventPlanner = new EventPlanner();
                newEventPlanner.setUser(savedUser);
                newEventPlanner.setRegistrationAccountStatus(RegistrationAccountStatusEnum.APPROVED);

                try {
                    eventPlannerRepository.save(newEventPlanner);
                } catch (Exception e) {
                    userRepository.delete(savedUser);
                }
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

        User user = userRepository
            .findByEmail(credentials.getEmail())
            .orElseThrow(() -> new NotFoundException("Usuário não encontrado"));

        return user;
    }
}
