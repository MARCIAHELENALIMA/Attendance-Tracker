# Desafio Vaga Dev Iniciante

Este é um projeto do desafio para a vaga de desenvolvedor iniciante. Consiste em uma aplicação de chat usando React no front-end e Node.js (Express) no back-end.

## Pré-requisitos

Este é um aplicativo de bate-papo construído usando React e Node.js (Express) para o front-end e back-end, respectivamente. Ele permite que os usuários enviem e recebam mensagens em tempo real.
Antes de executar o aplicativo, certifique-se de ter o seguinte software instalado em seu sistema:

- Node.js: baixe e instale o Node.js <https://nodejs.org/en/download>
- MongoDB: baixe e instale o MongoDB <https://www.mongodb.com/try/download/community>

## Começando
Siga as etapas abaixo para configurar e executar o projeto localmente:

## Configuração de back-end

Clone o repositório:
- git clone <https://github.com/MARCIAHELENALIMA/Desafio-Vaga-Dev-Iniciante.git>

Instale as dependências:
- npm install 


Configure a conexão do MongoDB:
   Certifique-se de que o MongoDB esteja em execução em sua máquina local.
   Abra o backend/.envarquivo e defina a MONGODB_URI variável para sua string de conexão do MongoDB.

Inicie o servidor de back-end:
-  npm start
- O servidor será executado em <http://localhost:8000>.

## Configuração de front-end

Navegue até o diretório front-end:
- cd client

Instale as dependências:
- npm install

Inicie o servidor de desenvolvimento:
- npm start
- O servidor de desenvolvimento React será executado em <http://localhost:3000>.

Abra seu navegador da Web e visite <http://localhost:3000> para acessar o aplicativo de bate-papo.

## Uso
- Login: 
Faça login com as credenciais sugeridas no cpf e adicione qualquer numero para a senha.

- Bate-papo: 
envie e receba mensagens em tempo real com outros usuários que estão online no momento.

## Estrutura do Projeto
A estrutura do projeto é a seguinte:

- backend/: Contém os arquivos do servidor back-end.
- backend/routes/: define as rotas de API para autenticação de usuário e comunicação de soquete.
- backend/models/: Define os modelos de dados para MongoDB.
- frontend/: contém o aplicativo React front-end.
- frontend/src/components/: Contém componentes reutilizáveis ​​usados ​​no aplicativo.
- frontend/src/pages/: Contém as páginas principais do aplicativo.
- frontend/src/services/: contém o serviço de API para interagir com o back-end.
- frontend/src/utils/: Contém funções de utilidade e constantes.

## Tecnologias usadas

Front-end:
* React
* React Router
* Axios
* Cliente Socket.IO
* Bootstrap
* FonteAwesome
* Componentes estilizados

Back-end:
* Node.js
* Express.js
* MongoDBGenericName
* Mangusto
* Socket.IO
* Bcrypt
* Token da Web JSON (JWT)
* Cors

## Contribuindo
Contribuições para este projeto são bem-vindas. Se você encontrar algum problema ou tiver sugestões de melhoria, sinta-se à vontade para abrir um problema ou enviar uma solicitação de recebimento.

## Licença
Este projeto está licenciado sob a licença MIT .
