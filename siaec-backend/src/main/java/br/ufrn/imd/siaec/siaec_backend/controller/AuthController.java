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
import br.ufrn.imd.siaec.siaec_backend.dto.UserDTO;
import br.ufrn.imd.siaec.siaec_backend.dto.UserResponseDTO;
import br.ufrn.imd.siaec.siaec_backend.model.User;
import br.ufrn.imd.siaec.siaec_backend.service.JwtService;
import br.ufrn.imd.siaec.siaec_backend.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private UserService userService;
    private final JwtService jwtService;

    @Autowired
    public AuthController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@RequestBody UserDTO user) {
        UserResponseDTO usercreated = userService.create(user);
        URI location = URI.create("/v1/users/" + usercreated.getUserId());
        return ResponseEntity.created(location).body(usercreated);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginDTO credentials) {
        User authenticatedUser = userService.authenticate(credentials);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponseDTO loginResponse = LoginResponseDTO.builder()
            .token(jwtToken)
            .expiresIn(jwtService.getExpirationTime())
            .userId(authenticatedUser.getUserId())
            .build();

        return ResponseEntity.ok(loginResponse);
    }
}
