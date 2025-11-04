package br.ufrn.imd.siaec.siaec_backend.controller;

import br.ufrn.imd.siaec.siaec_backend.dto.HomeDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/")
public class HomeController {

    @GetMapping("")
    public ResponseEntity<HomeDTO> getHomeData() {
        String mensagem = "Artesanato Potiguar: O Talento do RN na sua Casa";
        List<String> artesoes = Arrays.asList("Ana de Natal", "Clara de Mossoró",
                "Beatriz de Caicó", "Sofia de Pipa");
        List<String> feiras = Arrays.asList("Feira XYZ Local 1", "Feira XYZ Local 2", "Feira ABC");

        HomeDTO homeData = new HomeDTO(mensagem, artesoes, feiras);

        return ResponseEntity.ok(homeData);
    }
}
