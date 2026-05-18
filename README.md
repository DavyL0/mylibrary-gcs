# 📚 Sistema de Gerenciamento de Biblioteca Pessoal (v1.1)

Este é um sistema completo para catalogar livros pessoais, organizar categorias, registrar empréstimos para amigos ou familiares e monitorar devoluções de forma automatizada. 

O projeto foi desenvolvido para demonstrar o uso prático de relacionamentos complexos em **JPA/Hibernate**, separação de conceitos com **Service Layer** para regras de negócio e controle automático de estados (Disponível/Emprestado).

---

## 🚀 Funcionalidades Principais

* **Catálogo de Livros:** Cadastro, edição, visualização e exclusão de livros.
* **Organização por Categorias:** Vinculação de livros a categorias específicas (Ficção, Técnico, Biografia, etc.).
* **Gestão de Empréstimos:** Registro de saídas de livros informando o nome do amigo/familiar e a data limite para devolução.
* **Controle de Status Automático:** O sistema altera o status do livro para `EMPRESTADO` automaticamente ao realizar um empréstimo e volta para `DISPONÍVEL` assim que a devolução é confirmada.
* **Histórico:** Consulta de empréstimos ativos e finalizados.

---

## 🛠️ Tecnologias Utilizadas

### Backend
* **Java 26** (Usufruindo dos recursos mais recentes da linguagem)
* **Spring Boot 3.x**
    * Spring Data JPA (Persistência e relacionamentos)
    * Spring Web (API RESTful)
* **H2 Database** (Banco de dados em memória para desenvolvimento rápido)

### Frontend
* **Angular 17**
    * Arquitetura baseada em *Standalone Components*
    * Novo fluxo de controle nativo (`@if`, `@for`)
    * Angular Material / Bootstrap (para estilização)

---

## 📋 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
* [JDK 26](https://jdk.java.net/)
* [Node.js](https://nodejs.org/) (versão compatível com Angular 17)
* [Angular CLI](https://angular.io/cli) v17
* IntelliJ IDEA

---

## 🔧 Configuração e Execução

### 1. Backend (Spring Boot)

1. Navegue até o diretório do backend:
   ```bash
   cd backend
