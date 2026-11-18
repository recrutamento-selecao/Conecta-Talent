import { criarSidebar } from '../components/sidebar.js';
import { criarCardSucesso } from '../components/card-sucesso.js';

const USUARIO_LOGADO = { nome: "João Oliveira", perfil: "candidato" };

export function renderCadastroConcluido() {
    const containerPrincipal = document.createElement("div");
    containerPrincipal.className = "pagina-cadastro-concluido-wrapper";

    // 1. Sidebar
    const sidebar = criarSidebar(USUARIO_LOGADO.perfil, USUARIO_LOGADO.nome);
    containerPrincipal.appendChild(sidebar);

    // 2. Conteúdo Principal
    const main = document.createElement("main");
    main.classList.add("conteudo-principal");

    // 3. Instancia o Componente de Card de Sucesso
    const cardSucesso = criarCardSucesso({
        titulo: "Cadastro concluído!",
        descricao: "Suas informações foram salvas com sucesso. Agora seu perfil está pronto para ser encontrado pelos recrutadores.",
        mensagemAlerta: "Perfil atualizado com sucesso. Você pode alterar suas informações a qualquer momento.",
        botaoSecundarioTexto: "Ir para meu perfil",
        onBotaoSecundarioClick: () => {
            // Ação do botão secundário se necessário
        },
        botaoPrimarioTexto: "Explorar vagas",
        onBotaoPrimarioClick: () => {
            window.location.hash = "#candidato-vagas";
        }
    });

    // 4. Preenche o slot com o grid específico do resumo do perfil
    const secaoResumo = document.createElement("div");
    secaoResumo.classList.add("secao-resumo-perfil");
    secaoResumo.innerHTML = `<h3>Resumo do seu perfil</h3>`;

    const gridOpcoes = document.createElement("div");
    gridOpcoes.classList.add("grid-opcoes-perfil");

    const itensPerfil = [
        { titulo: "Dados pessoais", desc: "Informações básicas e contato" },
        { titulo: "Formação acadêmica", desc: "Graduação e cursos técnicos" },
        { titulo: "Experiência profissional", desc: "Experiências cadastradas" },
        { titulo: "Cursos e certificados", desc: "Certificações e cursos" },
        { titulo: "Idiomas", desc: "Idiomas e níveis de proficiência" },
        { titulo: "Habilidades", desc: "Competências técnicas e comportamentais" },
        { titulo: "Diversidade", desc: "Informações de diversidade e inclusão" },
        { titulo: "Perfil completo", desc: "100% das etapas preenchidas" }
    ];

    itensPerfil.forEach(item => {
        const cardItem = document.createElement("div");
        cardItem.classList.add("card-opcao-item");
        cardItem.innerHTML = `
            <div class="opcao-info">
                <div class="check-miniatura">✓</div>
                <div>
                    <h4>${item.titulo}</h4>
                    <p>${item.desc}</p>
                </div>
            </div>
        `;
        gridOpcoes.appendChild(cardItem);
    });

    secaoResumo.appendChild(gridOpcoes);

    // Insere o resumo no slot do componente
    cardSucesso.slot.appendChild(secaoResumo);

    // Adiciona a dica de rodapé abaixo do slot
    const dicaBox = document.createElement("div");
    dicaBox.classList.add("dica-atualizacao-box");
    dicaBox.innerHTML = `<strong>Dica:</strong> Mantenha seu perfil sempre atualizado para aumentar a relevância das oportunidades recomendadas para você.`;
    cardSucesso.slot.appendChild(dicaBox);

    // Adiciona o componente construído ao main
    main.appendChild(cardSucesso.element);
    containerPrincipal.appendChild(main);

    return containerPrincipal;
}