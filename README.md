# SIAEC - Sistema Integrado para Artesãos e Economia Criativa

Este projeto é uma plataforma web desenvolvida para a disciplina de Desenvolvimento de Sistemas Web II. SIAEC tem como objetivo criar uma vitrine digital e um canal de vendas para artesãos do RN, integrando clientes, entregadores e outros atores da cadeia produtiva, promovendo autonomia e desenvolvimento econômico local.

O sistema é composto por duas partes principais:

1.  **Backend:** Uma API RESTful desenvolvida com Spring Boot (Java), responsável pela lógica de negócio, gerenciamento de dados e comunicação com o banco de dados.
2.  **Frontend:** Uma Single Page Application (SPA) desenvolvida com React, responsável pela interface do usuário e interação com a API do backend.

## Tecnologias Utilizadas

**Backend:**

* Java 17+
* Spring Boot 3.x
* Spring Data JPA / Hibernate
* Maven

**Frontend:**

* React 18+
* Vite (ou Create React App)
* Node.js / npm
* Axios (para chamadas HTTP)
* React Router DOM (para roteamento)
* CSS / (Framework de sua escolha - ex: Tailwind CSS, Material UI)

## Estrutura do Projeto

O repositório está organizado em duas pastas principais:

* `siaec-backend/`: Contém todo o código-fonte do backend Spring Boot.
    * `src/main/java/br/ufrn/imd/siaec/`: Pacote principal com subpastas para `controller`, `service`, `repository`, `model`, `dto`, `config`, `exception`.
    * `src/main/resources/`: Contém arquivos de configuração (`application.properties`) e arquivos estáticos (se houver deploy unificado).
    * `pom.xml`: Arquivo de configuração do Maven.
* `siaec-frontend/`: Contém todo o código-fonte do frontend React.
    * `src/`: Pasta principal com subpastas para `pages`, `components`, `services`, `contexts`, etc.
    * `package.json`: Arquivo de configuração do Node.js/npm.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

* [cite_start]**JDK 17 ou superior:** [cite: 4289] Verifique com `java -version`. Configure a variável de ambiente `JAVA_HOME`.
* **Maven:** Verifique com `mvn -version`. (O projeto inclui um Maven Wrapper `mvnw` que pode ser usado no lugar).
* **Node.js e npm:** Verifique com `node -v` e `npm -v`. Use uma versão LTS recente.
* **Git:** Para clonar o repositório.


## Como Rodar o Projeto (Ambiente de Desenvolvimento)

**IMPORTANTE:** Para o funcionamento completo durante o desenvolvimento, **ambos** o backend e o frontend precisam estar rodando simultaneamente.

1.  **Rodar o Backend (Spring Boot):**
    * Abra um terminal na pasta `siaec-backend`.
    * Execute o comando usando o Maven Wrapper:
        * `mvn spring-boot:run`
    * O backend estará disponível, por padrão, em `http://localhost:8080/api` (considerando a porta 8080 e o context-path `/api` configurados no `application.properties`).

2.  **Rodar o Frontend (React):**
    * Abra **outro** terminal na pasta `siaec-frontend`.
    * Execute o comando para iniciar o servidor de desenvolvimento:
        * Se usar Vite: `npm run dev`
    * O frontend estará disponível, por padrão, em `http://localhost:5173` (Vite). Abra esta URL no seu navegador.

A aplicação React fará chamadas para a API do backend (que deve estar rodando) para buscar e enviar dados.
