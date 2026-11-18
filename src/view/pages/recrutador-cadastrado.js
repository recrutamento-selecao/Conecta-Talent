import { criarSidebar } from '../components/sidebar.js';
import { criarCardSucesso } from '../components/card-sucesso.js';

const USUARIO_LOGADO = { nome: "Twelse LTDA", perfil: "empresa" };

export function renderRecrutadorCadastrado() {
    const containerPrincipal = document.createElement("div");
    containerPrincipal.className = "pagina-recrutador-cadastrado-wrapper";

    // 1. Sidebar da Empresa/Admin
    const sidebar = criarSidebar(USUARIO_LOGADO.perfil, USUARIO_LOGADO.nome);
    containerPrincipal.appendChild(sidebar);

    // 2. Conteúdo Principal
    const main = document.createElement("main");
    main.classList.add("conteudo-principal");

    // 3. Instancia o Componente de Card de Sucesso (sem ações nos botões)
    const cardSucesso = criarCardSucesso({
        titulo: "Recrutador cadastrado com sucesso!",
        descricao: "O recrutador foi adicionado à empresa e já pode acessar o sistema.<br>Um e-mail de boas-vindas foi enviado com as instruções de acesso.",
        botaoSecundarioTexto: "< Cadastrar outro recrutador",
        onBotaoSecundarioClick: () => {
            // Sem ação de navegação
        },
        botaoPrimarioTexto: "Ir para a lista de recrutadores",
        onBotaoPrimarioClick: () => {
            // Sem ação de navegação
        }
    });

    // 4. Preenche o slot com os detalhes do recrutador cadastrado
    const slotContainer = document.createElement("div");
    slotContainer.classList.add("detalhes-recrutador-slot");

    // Cartão com as informações da Ana Souza
    const cardInfoRecrutador = document.createElement("div");
    cardInfoRecrutador.classList.add("card-info-recrutador");
    cardInfoRecrutador.innerHTML = `
        <div class="avatar-recrutador">AS</div>
        <div class="info-texto-recrutador">
            <span class="nome-recrutador">Ana Souza</span>
            <div class="detalhes-linha">
                <span><img src="assets/icons/mail.svg" class="icone-detalhe" alt="email"> ana.souza@bluecore.com</span>
                <span><img src="assets/icons/building.svg" class="icone-detalhe" alt="empresa"> BlueCore Sistemas</span>
                <span><img src="assets/icons/user.svg" class="icone-detalhe" alt="cargo"> Recrutador</span>
                <span class="badge-ativo">Ativo</span>
            </div>
        </div>
    `;
    slotContainer.appendChild(cardInfoRecrutador);

    // Caixa de Próximos Passos (sem o emoji)
    const proximosPassosBox = document.createElement("div");
    proximosPassosBox.classList.add("proximos-passos-box");
    proximosPassosBox.innerHTML = `
        <div>
            <strong>Próximos passos</strong>
            <p>O recrutador receberá um e-mail com instruções para criar a senha de acesso. Após o primeiro acesso, ele poderá gerenciar as vagas e os candidatos conforme as permissões definidas.</p>
        </div>
    `;
    slotContainer.appendChild(proximosPassosBox);

    // Insere os elementos no slot do componente
    cardSucesso.slot.appendChild(slotContainer);

    // Adiciona o componente construído ao main
    main.appendChild(cardSucesso.element);
    containerPrincipal.appendChild(main);

    return containerPrincipal;
}