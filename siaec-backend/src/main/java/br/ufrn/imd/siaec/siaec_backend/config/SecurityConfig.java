package br.ufrn.imd.siaec.siaec_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // http.csrf(csrf -> csrf.disable()).authorizeHttpRequests(
        //         auth -> auth.requestMatchers("/*").permitAll().anyRequest().authenticated());
        
        // Configurações de segurança desativadas para permitir todas as requisições pelo postman 
        http
            // 1. Desabilita o CSRF
            .csrf(csrf -> csrf.disable())
            
            // 2. Libera todas as requisições
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/**").permitAll() // Permite acesso a TUDO
                .anyRequest().authenticated()
            );

        return http.build();
    }
}
