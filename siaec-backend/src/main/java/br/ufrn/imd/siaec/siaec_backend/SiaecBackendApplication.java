package br.ufrn.imd.siaec.siaec_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class SiaecBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(SiaecBackendApplication.class, args);
    }

}
