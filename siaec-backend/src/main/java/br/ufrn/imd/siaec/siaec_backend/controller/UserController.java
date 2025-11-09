package br.ufrn.imd.siaec.siaec_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import br.ufrn.imd.siaec.siaec_backend.dto.UserResponseDTO;
import br.ufrn.imd.siaec.siaec_backend.dto.UserUpdateDTO;
import br.ufrn.imd.siaec.siaec_backend.model.User;
import br.ufrn.imd.siaec.siaec_backend.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/")
    public ResponseEntity<Page<User>> getAllUsers(
        @RequestParam(required = false) String limit,
        @RequestParam(required = false) String page
    ) {
        int limitRequest, pageRequest;
        if (limit == null) limitRequest = 10;
        else limitRequest = Integer.parseInt(limit);

        if (page == null) pageRequest = 0;
        else pageRequest = Integer.parseInt(page);

        Page<User> users = userService.getAll(limitRequest, pageRequest);
        return ResponseEntity.ok(users);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or #id == authentication.principal.userId")
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUser(@PathVariable String id) {
        UserResponseDTO user = userService.get(id);
        return ResponseEntity.ok(user);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or #id == authentication.principal.userId")
    @PatchMapping("/{id}")
    public ResponseEntity<Void> updateUser(@PathVariable String id, @RequestBody UserUpdateDTO user) {
        userService.update(id, user);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or #id == authentication.principal.userId")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.delete(id);

        return ResponseEntity.noContent().build();
    }
}
