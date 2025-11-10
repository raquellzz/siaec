package br.ufrn.imd.siaec.siaec_backend.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import br.ufrn.imd.siaec.siaec_backend.dto.LoginDTO;
import br.ufrn.imd.siaec.siaec_backend.dto.LoginResponseDTO;
import br.ufrn.imd.siaec.siaec_backend.dto.UserRegisterDTO;
import br.ufrn.imd.siaec.siaec_backend.dto.UserResponseDTO;
import br.ufrn.imd.siaec.siaec_backend.model.User;
import br.ufrn.imd.siaec.siaec_backend.service.AuthService;
import br.ufrn.imd.siaec.siaec_backend.service.JwtService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private AuthService authService;
    private final JwtService jwtService;

    @Autowired
    public AuthController(AuthService authService, JwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@RequestBody UserRegisterDTO user) {
        UserResponseDTO usercreated = authService.create(user);
        URI location = URI.create("/v1/users/" + usercreated.getUserId());
        return ResponseEntity.created(location).body(usercreated);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginDTO credentials) {
        User authenticatedUser = authService.authenticate(credentials);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponseDTO loginResponse = LoginResponseDTO.builder()
            .token(jwtToken)
            .expiresIn(jwtService.getExpirationTime())
            .userId(authenticatedUser.getUserId())
            .build();

        return ResponseEntity.ok(loginResponse);
    }
}
