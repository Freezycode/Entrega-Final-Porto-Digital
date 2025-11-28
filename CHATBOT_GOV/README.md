## Solução Equipe 2: Chatbot Antifraude GOV.BR

Este diretório contém o código-fonte e a documentação técnica do Chatbot Antifraude, desenvolvido pela Equipe 2 durante o Hackathon da Residência Tecnológica.

### Sobre a Solução

O Chatbot atua como uma Central de Dúvidas Inteligente. Ele foi desenhado para ser a primeira linha de suporte ao usuário que suspeita de fraude ou deseja proteger sua conta GOV.BR.

**Principais Funcionalidades do MVP:**

- **Atendimento Automatizado**: Sistema capaz de responder instantaneamente a perguntas frequentes, proporcionando agilidade e redução de filas no primeiro atendimento.
- **Navegação Assistida**: Fluxos interativos e roteiros passo a passo que guiam o usuário na execução de processos complexos ou configurações de segurança.
- **Centralização de Recursos**: Agrupamento e validação de links externos e materiais oficiais, garantindo que o usuário acesse apenas fontes de informação seguras.

### Tecnologias Utilizadas

- **Linguagem**: JavaScript / TypeScript
- **Frontend**: React.js (via Create React App ou Vite)
- **Estilização**: CSS Modules / Styled Components
- **Lógica de Conversa**: Árvore de Decisão baseada em estados (State Management)
- **Gerenciador de Pacotes**: npm ou yarn

### Passo a Passo para Execução do MVP

Siga as instruções abaixo para implantar a solução em um novo ambiente local:

1. **Pré-requisitos**

   Certifique-se de ter instalado em sua máquina:
   - Git
   - Node.js (versão 16 ou superior)

2. **Clonar o Repositório**

   Abra o terminal e clone o projeto para sua máquina local:

   ```bash
   git clone https://github.com/exemplo/residencia-tecnologica.git
   cd residencia-tecnologica/equipe-02-bot
3. **Instalar DependênciasDentro da pasta do projeto, instale as bibliotecas necessárias listadas no package.json:**
   npm install
   ou
   yarn install
   

5. **Configuração de Variáveis (Opcional)
   Para este MVP, não estamos utilizando chaves de API externas complexas. Porém, se houver necessidade de configurações específicas, renomeie o arquivo de exemplo:**
   cp .env.example .env
   Edite o arquivo .env com suas configurações, se necessário.
   
6. **Acessar a SoluçãoApós o comando acima, o terminal exibirá os endereços de acesso e o navegador deve abrir automaticamente. Geralmente, a aplicação estará disponível em:**
   Local URL: http://localhost:3000
   
   Network URL: http://192.168.x.x:3000
   
  
