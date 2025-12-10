package br.ufrn.imd.siaec.siaec_backend.service;

import br.ufrn.imd.siaec.siaec_backend.dto.AdminDTO;
import br.ufrn.imd.siaec.siaec_backend.exception.NotFoundException; // Use sua classe de exceção
import br.ufrn.imd.siaec.siaec_backend.model.Admin;
import br.ufrn.imd.siaec.siaec_backend.model.User;
import br.ufrn.imd.siaec.siaec_backend.repository.AdminRepository;
import br.ufrn.imd.siaec.siaec_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import br.ufrn.imd.siaec.siaec_backend.enums.RoleEnum;

import java.util.Date;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public AdminDTO createAdmin(AdminDTO dto) {
        // 1. Cria o Usuário base
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        
        user.setRole(RoleEnum.ADMIN); 

        Admin admin = new Admin();
        admin.setUser(user);
        admin.setDepartment(dto.getDepartment());
        admin.setCreatedAt(new Date());

        Admin savedAdmin = adminRepository.save(admin);
        return AdminDTO.fromEntity(savedAdmin);
    }

    @Transactional(readOnly = true)
    public Page<AdminDTO> findAll(Pageable pageable) {
        return adminRepository.findAll(pageable).map(AdminDTO::fromEntity);
    }

    @Transactional(readOnly = true)
    public AdminDTO findById(String id) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Administrador não encontrado com id: " + id));
        return AdminDTO.fromEntity(admin);
    }

    @Transactional
    public AdminDTO updateAdmin(String id, AdminDTO dto) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Administrador não encontrado"));

        admin.setDepartment(dto.getDepartment());

        if (admin.getUser() != null) {
            admin.getUser().setName(dto.getName());
            admin.getUser().setEmail(dto.getEmail());
            
            if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
                admin.getUser().setPassword(passwordEncoder.encode(dto.getPassword()));
            }
        }

        Admin updatedAdmin = adminRepository.save(admin);
        return AdminDTO.fromEntity(updatedAdmin);
    }

    @Transactional
    public void deleteAdmin(String id) {
        if (!adminRepository.existsById(id)) {
            throw new NotFoundException("Administrador não encontrado");
        }
        adminRepository.deleteById(id);
    }
}