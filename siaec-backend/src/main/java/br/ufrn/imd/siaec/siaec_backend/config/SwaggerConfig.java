package br.ufrn.imd.siaec.siaec_backend.config;

import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "SIAEC - Sistema Integrado para Artesãos e Economia Criativa",
        version = "v1",
        description = "Este projeto é uma plataforma web desenvolvida para a disciplina de Desenvolvimento de Sistemas Web II. SIAEC tem como objetivo criar uma vitrine digital e um canal de vendas para artesãos do RN, integrando clientes, entregadores e outros atores da cadeia produtiva, promovendo autonomia e desenvolvimento econômico local."
    )
)
public class SwaggerConfig {
    
}
