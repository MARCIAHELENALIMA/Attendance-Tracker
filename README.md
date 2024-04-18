# Attendance Tracker

## Descrição

O Attendance Tracker é um software desenvolvido para registrar faltas de alunos e enviar multas automáticas via WhatsApp quando os alunos faltarem às aulas. Além disso, o software inclui funcionalidades adicionais, como autenticação e autorização para administradores, gestão de usuários, notificações automáticas e integração com serviços de mensagens.

## Funcionalidades Principais

- **Registro de Faltas**: Os administradores podem registrar faltas de alunos no sistema.
- **Envio de Multas Automáticas**: O sistema envia multas automáticas via WhatsApp para os alunos ausentes.
- **Autenticação e Autorização**: Sistema exclusivo de autenticação para administradores e autorização para definir permissões de acesso.
- **Gestão de Usuários**: Simplificação da gestão de usuários, focando apenas nos administradores.
- **Notificações Automáticas**: Configuração de notificações automáticas sobre faltas registradas, entregues via WhatsApp.
- **Documentação API**: Utilização do SpringDoc OpenAPI para documentação da API, facilitando integrações por desenvolvedores.

## Tecnologias Utilizadas

- **Linguagem de Programação**: Kotlin
- **Framework Web**: Spring Boot
- **Autenticação**: Firebase Authentication
- **Banco de Dados**: H2 (desenvolvimento e testes), PostgreSQL (produção)
- **Segurança**: Spring Security com JWT
- **Frontend**: HTML e CSS para interface de usuário responsiva
- **Serviço de Notificação**: Spring Mail para envio de e-mails
- **Documentação API**: SpringDoc OpenAPI
- **Integração com WhatsApp**: Twilio API

## Instalação e Configuração

1. Clone o repositório do Attendance Tracker.
2. Configure as dependências e variáveis de ambiente necessárias.
3. Execute a aplicação Spring Boot.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.
