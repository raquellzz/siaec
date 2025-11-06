package br.ufrn.imd.siaec.siaec_backend.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HomeDTO {
    private String mensagemBoasVindas;
    private List<String> artesoesDestaque; // Simplificado
    private List<String> proximasFeiras; // Simplificado
}
