
# 🤖 Chatbot Antifraude GOV.BR 

o Este diretório contém o código-fonte e a documentação técnica do 
Chatbot Antifraude, desenvolvido pela Equipe 2 durante o Hackathon da 
Residência Tecnológica.

## 📋Sobre a Solução 

o O Chatbot atua como uma Central de Dúvidas Inteligente. Ele foi 
desenhado para ser a primeira linha de suporte ao usuário que suspeita 
de fraude ou deseja proteger sua conta GOV.BR.

## Principais Funcionalidades do MVP: 

• Atendimento Automatizado: Sistema capaz de responder instantaneamente a 
perguntas frequentes, proporcionando agilidade e redução de filas no primeiro 
atendimento. 

• Navegação Assistida: Fluxos interativos e roteiros passo a passo que guiam o 
usuário na execução de processos complexos ou configurações de segurança. 
• Centralização de Recursos: Agrupamento e validação de links externos e 
materiais oficiais, garantindo que o usuário acesse apenas fontes de 
informação seguras.

# 🛠️ Tecnologias Utilizadas (Simulação MVP) 

• Linguagem: JavaScript / TypeScript 
• Frontend: React.js (via Create React App ou Vite) 
• Estilização: CSS Modules / Styled Components 
• Lógica de Conversa: Árvore de Decisão baseada em estados (State 
Management) 
• Gerenciador de Pacotes: npm ou yarn
## 🚀 Passo a Passo para Execução do MVP 
o Siga as instruções abaixo para implantar a solução em um novo 
ambiente (local) do zero.
# 1 - Pré-requisitos 

o Certifique-se de ter instalado em sua máquina: 
• Git 
• Node.js (Versão 16 ou superior). 

## 2 - Clonar o Repositório 
 
o Abra o terminal e clone o projeto para sua máquina local: 
o git clone [https://github.com/exemplo/residencia
tecnologica.git](https://github.com/exemplo/residencia
tecnologica.git) 
cd residencia-tecnologica/equipe-02-bot

## 3 - Instalar Dependências 

o Dentro da pasta do projeto, instale as bibliotecas necessárias listadas no 
package.json: 
o npm install 
ou 
yarn install

### 4 - Configuração de Variáveis (Opcional) 

o Para este MVP, não estamos utilizando chaves de API externas 
complexas. Porém, se houver necessidade de configurações específicas, 
renomeie o arquivo de exemplo: 
o cp .env.example .env 
## Edite o arquivo .env com suas configurações se 
necessário

## 5. Executar a Aplicação

o Para iniciar o servidor de desenvolvimento do React, execute o comando: 
o npm start 
ou 
yarn start

## 6. Acessar a Solução

o Após o comando acima, o terminal exibirá os endereços de acesso e o 
navegador deve abrir automaticamente. Geralmente, a aplicação estará 
disponível em:

• Local URL: http://localhost:3000 
• Network URL: http://192.168.x.x:3000
