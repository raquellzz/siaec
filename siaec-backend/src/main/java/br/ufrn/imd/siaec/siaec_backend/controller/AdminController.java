package br.ufrn.imd.siaec.siaec_backend.controller;

import br.ufrn.imd.siaec.siaec_backend.dto.AdminDTO;
import br.ufrn.imd.siaec.siaec_backend.service.AdminService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admins")
@Tag(name = "Admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<AdminDTO> createAdmin(@RequestBody @Valid AdminDTO dto) {
        return ResponseEntity.ok(adminService.createAdmin(dto));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<Page<AdminDTO>> getAllAdmins(
            @PageableDefault(size = 10, page = 0) Pageable pageable) {
        return ResponseEntity.ok(adminService.findAll(pageable));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<AdminDTO> getAdminById(@PathVariable String id) {
        return ResponseEntity.ok(adminService.findById(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<AdminDTO> updateAdmin(@PathVariable String id, @RequestBody AdminDTO dto) {
        return ResponseEntity.ok(adminService.updateAdmin(id, dto));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable String id) {
        adminService.deleteAdmin(id);
        return ResponseEntity.noContent().build();
    }
} 
