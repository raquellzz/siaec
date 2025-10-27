package br.ufrn.imd.siaec.siaec_backend.dto;

import java.util.List;

public class HomeDTO {
    private String mensagemBoasVindas;
    private List<String> artesoesDestaque; // Simplificado 
    private List<String> proximasFeiras;   // Simplificado 

    // Construtores, Getters e Setters

    public HomeDTO(String mensagemBoasVindas, List<String> artesoesDestaque, List<String> proximasFeiras) {
        this.mensagemBoasVindas = mensagemBoasVindas;
        this.artesoesDestaque = artesoesDestaque;
        this.proximasFeiras = proximasFeiras;
    }

    public String getMensagemBoasVindas() {
        return mensagemBoasVindas;
    }

    public void setMensagemBoasVindas(String mensagemBoasVindas) {
        this.mensagemBoasVindas = mensagemBoasVindas;
    }

    public List<String> getArtesoesDestaque() {
        return artesoesDestaque;
    }

    public void setArtesoesDestaque(List<String> artesoesDestaque) {
        this.artesoesDestaque = artesoesDestaque;
    }

    public List<String> getProximasFeiras() {
        return proximasFeiras;
    }

    public void setProximasFeiras(List<String> proximasFeiras) {
        this.proximasFeiras = proximasFeiras;
    }
}
