package br.ufrn.imd.siaec.siaec_backend.config;

import br.ufrn.imd.siaec.siaec_backend.enums.AccountStatusEnum;
import br.ufrn.imd.siaec.siaec_backend.enums.RoleEnum;
import br.ufrn.imd.siaec.siaec_backend.model.Admin;
import br.ufrn.imd.siaec.siaec_backend.model.User;
import br.ufrn.imd.siaec.siaec_backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (adminRepository.count() == 0) {
            User user = new User();
            user.setName("Super Admin");
            user.setEmail("admin@siaec.com");
            user.setPassword(passwordEncoder.encode("admin123"));
            user.setRole(RoleEnum.ADMIN);
            user.setStatusAccount(AccountStatusEnum.ACTIVE);

            Admin admin = new Admin();
            admin.setUser(user);
            admin.setDepartment("TI / Infraestrutura");
            admin.setCreatedAt(new Date());

            adminRepository.save(admin);
            
            System.out.println("--- SUPER ADMIN CRIADO COM SUCESSO ---");
            System.out.println("Email: admin@siaec.com");
            System.out.println("Senha: admin123");
        }
    }
}