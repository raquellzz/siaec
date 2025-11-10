package br.ufrn.imd.siaec.siaec_backend.controller;

import br.ufrn.imd.siaec.siaec_backend.dto.UserUpdateDTO;
import br.ufrn.imd.siaec.siaec_backend.model.Artisan;
import br.ufrn.imd.siaec.siaec_backend.service.ArtisanService;
import br.ufrn.imd.siaec.siaec_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/artisans")
public class ArtisanController {
    @Autowired
    private ArtisanService artisanService;
    private UserService userService;

    @GetMapping
    public ResponseEntity<Page<Artisan>> getArtisans(
            @RequestParam(required = false) String name,
            @PageableDefault(size = 10, page = 0) Pageable pageable) {

        Page<Artisan> artisans = artisanService.findArtisans(name, pageable);
        return ResponseEntity.ok(artisans);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Artisan> getArtisanById(@PathVariable String id) {
        return artisanService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or #id == authentication.principal.userId")
    public ResponseEntity<Void> updateArtisan(@PathVariable String id, @RequestBody UserUpdateDTO input) {
        userService.update(id, input);
        artisanService.update(id, input);

        return ResponseEntity.noContent().build();
    }
}
