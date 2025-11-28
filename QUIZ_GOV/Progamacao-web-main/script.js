// ============================
// Classes
// ============================

/**
 * Classe responsável por armazenar e gerenciar a pontuação de um usuário.
 */
class Pontuacao {
    /**
     * @param {number} valor - O valor inicial da pontuação.
     */
    constructor(valor = 0) {
        this.valor = valor;
    }

    /**
     * Soma o valor de outra instância de Pontuacao à pontuação atual.
     * @param {Pontuacao} outraPontuacao
     */
    somar(outraPontuacao) {
        this.valor += outraPontuacao.valor;
    }
}

/**
 * Classe que representa uma opção de resposta dentro de uma pergunta.
 */
class Opcao {
    /**
     * @param {string} texto - O texto da opção.
     * @param {Pontuacao} pontos - Os pontos associados a esta opção.
     * @param {boolean} correta - Indica se a opção é a resposta correta.
     * @param {string} explicacao - A explicação do porquê a opção está certa/errada.
     */
    constructor(texto, pontos, correta = false, explicacao = "") {
        this.texto = texto;
        this.pontos = pontos;
        this.correta = correta;
        this.explicacao = explicacao;
    }
}

/**
 * Classe que representa uma pergunta completa no quiz.
 */
class Pergunta {
    /**
     * @param {number} id - O identificador único da pergunta.
     * @param {string} texto - O texto principal da pergunta.
     * @param {Opcao[]} opcoes - O array de objetos Opcao.
     */
    constructor(id, texto, opcoes = []) {
        this.id = id;
        this.texto = texto;
        this.opcoes = opcoes;
    }
}

// ============================
// Função auxiliar
// ============================

/**
 * Função utilitária para embaralhar os elementos de um array (algoritmo Fisher-Yates).
 * É usada para randomizar a ordem das opções.
 * @param {Array} array - O array a ser embaralhado.
 */
function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// ============================
// Classe principal do Quiz
// ============================

/**
 * Classe principal que gerencia o estado, a lógica e a interação com o DOM do quiz.
 */
class Quiz {
    /**
     * @param {Pergunta[]} perguntas - O array de perguntas do quiz.
     */
    constructor(perguntas) {
        this.perguntas = perguntas;
        this.indiceAtual = 0;
        this.pontuacaoTotal = new Pontuacao();

        /**
         * Objeto para armazenar referências a todos os elementos DOM utilizados.
         */
        this.dom = {
            perguntaTexto: document.getElementById("pergunta"),
            opcoesContainer: document.getElementById("opcoes"),
            botaoConfirmar: document.getElementById("botao-confirmar"),
            botaoProxima: document.getElementById("botao-proxima"),
            feedback: document.getElementById("feedback-resposta"),
            quizContainer: document.querySelector(".quiz-container"),
            resultadoContainer: document.getElementById("resultado-final"),

            // Elementos da tela inicial
            telaInicial: document.getElementById("tela-inicial"),
            botaoComecar: document.getElementById("botao-comecar")
        };

        // Esconde o contêiner do quiz ao carregar a página
        this.dom.quizContainer.style.display = "none";

        // Adiciona o evento de clique para o botão "Começar Quiz"
        this.dom.botaoComecar.addEventListener("click", () => {
            // Esconde a tela inicial
            this.dom.telaInicial.style.display = "none";
            // Exibe o contêiner do quiz
            this.dom.quizContainer.style.display = "block";
        });

        // Inicia a configuração dos eventos principais
        this.iniciar();
    }

    /**
     * Configura os listeners de eventos dos botões de ação do quiz.
     */
    iniciar() {
        this.carregarPergunta();
        this.dom.botaoConfirmar.addEventListener("click", () => this.confirmarResposta());
        this.dom.botaoProxima.addEventListener("click", () => this.proximaPergunta());
    }

    /**
     * Carrega a pergunta atual no DOM, embaralha as opções e reseta o feedback.
     */
    carregarPergunta() {
        const perguntaAtual = this.perguntas[this.indiceAtual];

        // Embaralha a ordem das opções para maior variação
        embaralhar(perguntaAtual.opcoes);

        // Reseta o contêiner de feedback
        this.dom.feedback.style.display = "none";
        this.dom.feedback.textContent = "";
        this.dom.feedback.className = "feedback";

        // Atualiza o texto da pergunta
        this.dom.perguntaTexto.textContent = perguntaAtual.texto;

        // Limpa as opções anteriores
        this.dom.opcoesContainer.innerHTML = "";

        // Esconde o botão "Próxima" e desabilita o botão "Confirmar"
        this.dom.botaoProxima.style.display = "none";
        this.dom.botaoConfirmar.disabled = true;

        // Cria e insere os elementos de opção no DOM
        perguntaAtual.opcoes.forEach((opcao, index) => {
            const id = `opcao-${index}`;

            const div = document.createElement("div");
            div.classList.add("opcao");

            div.innerHTML = `
                <input type="radio" name="resposta" id="${id}" data-index="${index}">
                <label for="${id}">${opcao.texto}</label>
            `;

            // Adiciona listener para habilitar o botão "Confirmar" ao selecionar uma opção
            const inputRadio = div.querySelector('input[type="radio"]');
            if (inputRadio) {
                inputRadio.addEventListener("change", () => {
                    this.dom.botaoConfirmar.disabled = false;
                });
            }

            this.dom.opcoesContainer.appendChild(div);
        });
    }

    /**
     * Processa a resposta do usuário, calcula a pontuação, exibe o feedback
     * e bloqueia as opções.
     */
    confirmarResposta() {
        const perguntaAtual = this.perguntas[this.indiceAtual];

        // Encontra a opção de rádio selecionada
        const selecionada = document.querySelector("input[name='resposta']:checked");
        // Sai se nenhuma opção foi selecionada
        if (!selecionada) return;

        // Obtém o índice da opção no array de opções da pergunta
        const index = parseInt(selecionada.dataset.index);
        const opcao = perguntaAtual.opcoes[index];

        // Soma a pontuação da opção selecionada
        this.pontuacaoTotal.somar(opcao.pontos);

        // Desabilita todas as opções de rádio para impedir mudanças
        document.querySelectorAll("input[name='resposta']")
            .forEach(input => input.disabled = true);

        // Limpa classes de feedback anteriores
        this.dom.feedback.classList.remove("feedback-correta", "feedback-errada");

        // Exibe o contêiner de feedback
        this.dom.feedback.style.display = "block";

        // Define a mensagem e a classe CSS com base na correção da resposta
        if (opcao.correta) {
            this.dom.feedback.classList.add("feedback-correta");
            this.dom.feedback.innerHTML = `
                ✔ Resposta correta!<br>
                <small>${opcao.explicacao}</small>
            `;
        } else {
            this.dom.feedback.classList.add("feedback-errada");
            this.dom.feedback.innerHTML = `
                ✘ Resposta incorreta!<br>
                <small>${opcao.explicacao}</small>
            `;
        }

        // Desabilita o botão "Confirmar" e exibe o botão "Próxima"
        this.dom.botaoConfirmar.disabled = true;
        this.dom.botaoProxima.style.display = "block";
    }

    /**
     * Avança para a próxima pergunta ou finaliza o quiz.
     */
    proximaPergunta() {
        this.indiceAtual++;

        // Verifica se todas as perguntas foram respondidas
        if (this.indiceAtual >= this.perguntas.length) {
            this.finalizarQuiz();
        } else {
            this.carregarPergunta();
        }
    }

    /**
     * Calcula o nível de segurança do usuário com base na pontuação total.
     * @returns {Object} Um objeto contendo nível, cor, mensagem e caminho da imagem.
     */
    calcularNivel() {
        const pontos = this.pontuacaoTotal.valor;

        if (pontos >= 36) {
            return {
                nivel: "Ouro",
                cor: "#D4AF37",
                mensagem: "Excelente! Você domina os cuidados de segurança digital!",
                imagem: "img/medalhaouro.png"
            };
        }
        if (pontos >= 21) {
            return {
                nivel: "Prata",
                cor: "#C0C0C0",
                mensagem: "Muito bom! Você tem bons hábitos de segurança digital.",
                imagem: "img/medalhaprata.png"
            };
        }
        return {
            nivel: "Bronze",
            cor: "#cd7f32",
            mensagem: "Cuidado! Você precisa melhorar para se proteger contra golpes.",
            imagem: "img/medalhabronze.png"
        };
    }


    /**
     * Exibe a tela de resultados finais com a pontuação e o nível alcançado.
     */
    finalizarQuiz() {
        // Esconde o contêiner do quiz
        this.dom.quizContainer.style.display = "none";

        const resultado = this.calcularNivel();

        // Insere o HTML do resultado final
        this.dom.resultadoContainer.innerHTML = `
            <h2>Resultado Final</h2>
            <p>Sua pontuação foi: <strong>${this.pontuacaoTotal.valor}</strong></p>

            <h3 style="color:${resultado.cor}; font-size: 2rem; margin-top: 20px;">
                Nível: ${resultado.nivel}
            </h3>

            <div style="margin-top: 20px;">
                <img src="${resultado.imagem}" 
                    alt="Medalha ${resultado.nivel}"
                    style="width: 150px; height: auto;">
            </div>

            <p style="margin-top: 10px; font-size: 1.1rem;">
                ${resultado.mensagem}
            </p>

            <button onclick="location.reload()" class="btn primary" style="margin-top: 20px;">
                Refazer Quiz
            </button>
        `;

        // Exibe o contêiner de resultados
        this.dom.resultadoContainer.style.display = "block";
    }

}
// ============================
// Lista de perguntas (Data Model)
// ============================

/**
 * Definição de todas as perguntas, opções e pontuações do quiz.
 */
const perguntas = [
    new Pergunta(1, "Se você receber uma mensagem dizendo que tem um benefício para sacar no gov.br, o que é mais seguro fazer?", [
        new Opcao("Clicar no link da mensagem para ver o benefício.", new Pontuacao(1), false,
            "Golpistas enviam links falsos para roubar seus dados. O governo nunca envia links pedindo atualização ou liberação de benefício."),
        new Opcao("Responder a mensagem pedindo mais informações.", new Pontuacao(1), false,
            "Responder confirma ao golpista que o número é verdadeiro."),
        new Opcao("Abrir o aplicativo oficial do gov.br para confirmar se é verdade.", new Pontuacao(5), true,
            "O aplicativo oficial é o único canal seguro para verificar benefícios."),
        new Opcao("Compartilhar a mensagem com amigos.", new Pontuacao(1), false,
            "Compartilhar golpes ajuda a espalhar desinformação.")
    ]),

    new Pergunta(2, "Qual é o sinal mais claro de que um site NÃO é o verdadeiro gov.br?", [
        new Opcao("O site pede CPF para login.", new Pontuacao(1), false,
            "Todos os serviços oficiais utilizam CPF."),
        new Opcao("O endereço do site não é gov.br.", new Pontuacao(5), true,
            "Sites oficiais usam o domínio gov.br."),
        new Opcao("O site usa a cor azul.", new Pontuacao(1), false,
            "Cores podem ser copiadas por golpistas."),
        new Opcao("O site tem brasão e bandeira.", new Pontuacao(1), false,
            "Golpistas conseguem copiar símbolos.")
    ]),

    new Pergunta(3, "Ao tentar fazer login no gov.br, qual opção é mais segura?", [
        new Opcao("Usar a mesma senha do Facebook.", new Pontuacao(1), false,
            "Reutilizar senha aumenta o risco."),
        new Opcao("Anotar a senha em bloco de notas.", new Pontuacao(1), false,
            "Se o celular for perdido, a senha é exposta."),
        new Opcao("Usar biometria ou reconhecimento facial.", new Pontuacao(5), true,
            "Biometria é mais segura e recomendada."),
        new Opcao("Pedir para alguém guardar sua senha.", new Pontuacao(1), false,
            "Senha é pessoal e intransferível.")
    ]),

    new Pergunta(4, "Se aparecer uma solicitação de login no seu celular e você não está tentando entrar, o que deve fazer?", [
        new Opcao("Aprovar para ver o que acontece.", new Pontuacao(1), false,
            "Aprovar dá acesso imediato ao golpista que está tentando invadir sua conta."),
        new Opcao("Ignorar, porque provavelmente é automático.", new Pontuacao(1), false,
            "Solicitações não aparecem sozinhas. Sempre significam tentativa de acesso."),
        new Opcao("Negar imediatamente e trocar a sua senha.", new Pontuacao(5), true,
            "Negar impede o golpe e trocar a senha bloqueia tentativas futuras."),
        new Opcao("Aprovar se o horário for comum para você.", new Pontuacao(1), false,
            "O horário não importa. Só aprove solicitações feitas por você no momento.")
    ]),

    new Pergunta(5, "Qual é o jeito correto de recuperar acesso ao gov.br quando esquece a senha?", [
        new Opcao("Pedir ajuda em grupos de WhatsApp.", new Pontuacao(1), false,
            "Pedir ajuda em grupos expõe seus dados e facilita golpes."),
        new Opcao("Criar outra conta com o mesmo CPF.", new Pontuacao(1), false,
            "Cada CPF só possui um único gov.br. Contas duplicadas não existem."),
        new Opcao("Usar a opção 'Esqueci minha senha' no site ou app oficial.", new Pontuacao(5), true,
            "Essa é a forma correta, segura e reconhecida pelo governo."),
        new Opcao("Aceitar ajuda de qualquer pessoa que se ofereça.", new Pontuacao(1), false,
            "Desconhecidos podem tentar roubar sua conta oferecendo 'ajuda'.")
    ]),

    new Pergunta(6, "Qual dessas atitudes ajuda a deixar sua conta gov.br mais segura?", [
        new Opcao("Ativar a verificação em duas etapas (código no celular).", new Pontuacao(5), true,
            "A verificação em duas etapas impede que invasores acessem sua conta somente com a senha."),
        new Opcao("Usar a mesma senha em vários sites diferentes.", new Pontuacao(1), false,
            "Reutilizar senhas deixa todas suas contas vulneráveis caso uma seja vazada."),
        new Opcao("Instalar qualquer aplicativo que diga ser do governo.", new Pontuacao(1), false,
            "Golpistas criam apps falsos para coletar dados. Instale apenas pelas lojas oficiais."),
        new Opcao("Entrar no gov.br pelo link enviado por um amigo.", new Pontuacao(1), false,
            "Mesmo amigos podem encaminhar golpes sem saber. Acesse sempre digitando gov.br no navegador.")
    ]),

    new Pergunta(7, "Como você pode garantir que está instalando o aplicativo gov.br verdadeiro?", [
        new Opcao("Baixando de links enviados por terceiros.", new Pontuacao(1), false,
            "Links enviados por mensagens podem levar a versões falsas do aplicativo."),
        new Opcao("Baixando apenas na Google Play ou Apple Store.", new Pontuacao(5), true,
            "As lojas oficiais verificam a autenticidade do app gov.br."),
        new Opcao("Instalando versões modificadas que prometem funções extras.", new Pontuacao(1), false,
            "Versões modificadas podem roubar seus dados ou instalar vírus."),
        new Opcao("Apenas vendo se o ícone parece o mesmo.", new Pontuacao(1), false,
            "Golpistas copiam ícones facilmente. Isso não garante que o app é verdadeiro.")
    ]),

    new Pergunta(8, "O que é importante fazer para manter sua conta segura dentro do aplicativo gov.br?", [
        new Opcao("Deixar o aplicativo sempre logado em qualquer dispositivo.", new Pontuacao(1), false,
            "Dispositivos desconhecidos podem acessar sua conta sem autorização."),
        new Opcao("Revisar periodicamente os aparelhos conectados à sua conta.", new Pontuacao(5), true,
            "Isso permite identificar acessos suspeitos e remover aparelhos desconhecidos."),
        new Opcao("Desativar todas as notificações.", new Pontuacao(1), false,
            "Notificações ajudam a alertar sobre tentativas de login indevidas."),
        new Opcao("Compartilhar o código de segurança com familiares.", new Pontuacao(1), false,
            "O código de segurança é pessoal e intransferível, assim como a senha.")
    ]),

    new Pergunta(9, "Qual é o principal golpe envolvendo o gov.br atualmente?", [
        new Opcao("Mensagens sobre mudança de cor do aplicativo.", new Pontuacao(1), false,
            "Mudança de cor não existe e não tem relação com golpe."),
        new Opcao("Links falsos prometendo benefícios ou dinheiro fácil.", new Pontuacao(5), true,
            "Golpistas usam promessas de benefícios para roubar dados e acessar contas."),
        new Opcao("Convites para participar de grupos oficiais.", new Pontuacao(1), false,
            "O governo não usa grupos de WhatsApp para comunicação oficial."),
        new Opcao("Ligações dizendo que a conta está pesada.", new Pontuacao(1), false,
            "Golpistas usam desculpas técnicas falsas para ganhar sua confiança.")
    ]),

    new Pergunta(10, "O que significa ter conta gov.br de nível Prata ou Ouro?", [
        new Opcao("Que a conta tem mais segurança e verificação de identidade.", new Pontuacao(5), true,
            "Os níveis Prata e Ouro indicam que sua identidade foi verificada por meios seguros e confiáveis."),
        new Opcao("Que a pessoa paga mensalidade para usar.", new Pontuacao(1), false,
            "O gov.br é gratuito. Níveis não têm relação com pagamento."),
        new Opcao("Que o usuário pode trocar o nome no CPF.", new Pontuacao(1), false,
            "Os níveis de conta não permitem alterar documentos oficiais."),
        new Opcao("Que a conta é usada poucas vezes.", new Pontuacao(1), false,
            "O nível não tem relação com frequência de uso, e sim com segurança.")
    ])
];


// ============================
// Inicia o quiz
// ============================

/**
 * Cria uma nova instância da classe Quiz para iniciar a aplicação.
 */
new Quiz(perguntas);