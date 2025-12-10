package br.ufrn.imd.siaec.siaec_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import br.ufrn.imd.siaec.siaec_backend.dto.UserResponseDTO;
import br.ufrn.imd.siaec.siaec_backend.dto.UserUpdateDTO;
import br.ufrn.imd.siaec.siaec_backend.model.User;
import br.ufrn.imd.siaec.siaec_backend.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/users")
@Tag(name = "Usuários")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<Page<User>> getAllUsers(@PageableDefault(size = 10, page = 0) Pageable pageable) {
        Page<User> users = userService.getAll(pageable);
        return ResponseEntity.ok(users);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/status")
    public ResponseEntity<UserResponseDTO> updateUserStatus(
            @PathVariable String id,
            @RequestParam String status) { 
        
        UserResponseDTO updatedUser = userService.updateUserStatus(id, status);
        return ResponseEntity.ok(updatedUser);
    }

    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.userId")
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUser(@PathVariable String id) {
        UserResponseDTO user = userService.get(id);
        return ResponseEntity.ok(user);
    }

    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.userId")
    @PatchMapping("/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(@PathVariable String id, @RequestBody UserUpdateDTO user) {
        userService.update(id, user);
        UserResponseDTO userUpdated = userService.get(id);
        return ResponseEntity.ok(userUpdated);
    }

    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.userId")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.delete(id);

        return ResponseEntity.noContent().build();
    }
}
