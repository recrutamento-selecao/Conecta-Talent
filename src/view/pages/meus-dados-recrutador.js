import { criarSidebar } from "../components/sidebar.js";
import { criarSeletorSenha, criarCampo } from "../components/campos.js";

const REQUISITOS_SENHA = [
  { id: "tamanho", texto: "Mínimo de 8 caracteres", testar: s => s.length >= 8 },
  { id: "maiuscula", texto: "Uma letra maiúscula", testar: s => /[A-Z]/.test(s) },
  { id: "minuscula", texto: "Uma letra minúscula", testar: s => /[a-z]/.test(s) },
  { id: "numero", texto: "Um número", testar: s => /\d/.test(s) },
  { id: "especial", texto: "Um caractere especial (@, #, $, %)", testar: s => /[@#$%]/.test(s) }
];

function validarRequisitos(senha) {
  return REQUISITOS_SENHA.map(req => ({
    ...req,
    atendido: req.testar(senha)
  }));
}

export function renderMeusDados(recrutadorLogado = "Thaeny Soares", emailRecrutador = "thaeny.soares@empresa.com") {
  const containerPagina = document.createElement("div");
  containerPagina.className = "pagina-layout-dashboard";

  const sidebar = criarSidebar("recrutador", recrutadorLogado);
  containerPagina.appendChild(sidebar);

  const conteudoPrincipal = document.createElement("main");
  conteudoPrincipal.className = "conteudo-principal";
  containerPagina.appendChild(conteudoPrincipal);

  const cabecalho = document.createElement("div");
  cabecalho.className = "cabecalho-secao-acao";
  cabecalho.innerHTML = `
    <div>
      <h1 class="titulo-pagina">Configuração de conta</h1>
      <p class="subtitulo-pagina">Gerencie suas informações de acesso e segurança. A exclusão de conta é gerenciada pela empresa.</p>
    </div>
  `;
  conteudoPrincipal.appendChild(cabecalho);

  // Cartão de identificação / acesso (somente leitura para o recrutador)
  const cartaoAcesso = document.createElement("section");
  cartaoAcesso.className = "cartao";
  cartaoAcesso.innerHTML = `
    <div class="secao-form-titulo">
      <span>👤</span>
      <span>Dados do recrutador</span>
    </div>
    <p class="subtitulo-pagina">Informações vinculadas pela empresa à sua conta.</p>
  `;

  const gradeAcesso = document.createElement("div");
  gradeAcesso.className = "grade-campos-dupla";

  const campoNome = criarCampo({
    rotulo: "Nome",
    nome: "nomeRecrutador",
    id: "nome-recrutador",
    valor: recrutadorLogado
  });
  campoNome.campo.readOnly = true;
  campoNome.campo.disabled = true;

  const campoEmail = criarCampo({
    rotulo: "E-mail",
    nome: "emailRecrutador",
    id: "email-recrutador",
    tipo: "email",
    valor: emailRecrutador
  });
  campoEmail.campo.readOnly = true;
  campoEmail.campo.disabled = true;

  gradeAcesso.append(campoNome.grupo, campoEmail.grupo);
  cartaoAcesso.appendChild(gradeAcesso);
  conteudoPrincipal.appendChild(cartaoAcesso);

  // Cartão de Alterar senha (sem bloco de autoexclusão)
  const cartaoSenha = document.createElement("section");
  cartaoSenha.className = "cartao";
  cartaoSenha.innerHTML = `
    <div class="secao-form-titulo">
      <span>🔒</span>
      <span>Alterar senha</span>
    </div>
    <p class="subtitulo-pagina">Atualize sua senha de acesso para manter sua conta segura.</p>
  `;

  const formSenha = document.createElement("form");
  formSenha.className = "corpo-formulario";
  formSenha.noValidate = true;

  const campoNovaSenha = criarSeletorSenha("Nova senha", "novaSenha", {
    obrigatorio: true,
    autocomplete: "new-password"
  });

  const campoConfirmarSenha = criarSeletorSenha("Confirmar nova senha", "confirmarSenha", {
    obrigatorio: true,
    autocomplete: "new-password"
  });

  const caixaRequisitos = document.createElement("div");
  caixaRequisitos.className = "requisitos-senha-box";
  caixaRequisitos.innerHTML = `
    <strong class="requisitos-senha-titulo">REQUISITOS PARA SUA NOVA SENHA:</strong>
    <ul class="lista-requisitos-senha" id="lista-requisitos-senha"></ul>
  `;

  const mensagemFeedback = document.createElement("p");
  mensagemFeedback.className = "mensagem-feedback-senha";
  mensagemFeedback.setAttribute("role", "status");
  mensagemFeedback.style.display = "none";

  const rodapeAcoes = document.createElement("div");
  rodapeAcoes.className = "acoes-formulario-vaga";

  const btnCancelar = document.createElement("button");
  btnCancelar.type = "button";
  btnCancelar.className = "botao-secundario";
  btnCancelar.textContent = "Cancelar";

  const btnSalvarSenha = document.createElement("button");
  btnSalvarSenha.type = "submit";
  btnSalvarSenha.className = "botao-primario";
  btnSalvarSenha.textContent = "Salvar nova senha";

  rodapeAcoes.append(btnCancelar, btnSalvarSenha);
  formSenha.append(
    campoNovaSenha.grupo,
    campoConfirmarSenha.grupo,
    caixaRequisitos,
    mensagemFeedback,
    rodapeAcoes
  );
  cartaoSenha.appendChild(formSenha);
  conteudoPrincipal.appendChild(cartaoSenha);

  const listaRequisitosEl = caixaRequisitos.querySelector("#lista-requisitos-senha");

  function atualizarRequisitosVisual() {
    const statusLista = validarRequisitos(campoNovaSenha.campo.value);
    listaRequisitosEl.innerHTML = statusLista
      .map(req => `
        <li class="${req.atendido ? "requisito-ok" : "requisito-pendente"}">
          <span>${req.atendido ? "✓" : "•"}</span>
          <span>${req.texto}</span>
        </li>
      `)
      .join("");
  }

  function mostrarFeedback(texto, tipo = "info") {
    mensagemFeedback.textContent = texto;
    mensagemFeedback.dataset.tipo = tipo;
    mensagemFeedback.style.display = "block";
  }

  function limparFormularioSenha() {
    campoNovaSenha.campo.value = "";
    campoConfirmarSenha.campo.value = "";
    mensagemFeedback.textContent = "";
    mensagemFeedback.style.display = "none";
    atualizarRequisitosVisual();
  }

  campoNovaSenha.campo.addEventListener("input", () => {
    atualizarRequisitosVisual();
    if (mensagemFeedback.style.display !== "none") {
      mensagemFeedback.style.display = "none";
    }
  });

  campoConfirmarSenha.campo.addEventListener("input", () => {
    if (mensagemFeedback.style.display !== "none") {
      mensagemFeedback.style.display = "none";
    }
  });

  btnCancelar.addEventListener("click", () => {
    limparFormularioSenha();
    window.location.hash = "#dashboard-recrutador";
  });

  formSenha.addEventListener("submit", (e) => {
    e.preventDefault();
    const novaSenha = campoNovaSenha.campo.value;
    const confirmarSenha = campoConfirmarSenha.campo.value;

    if (!novaSenha || !confirmarSenha) {
      mostrarFeedback("Preencha a nova senha e a confirmação de senha.", "erro");
      return;
    }

    const todosAtendidos = validarRequisitos(novaSenha).every(r => r.atendido);
    if (!todosAtendidos) {
      mostrarFeedback("A nova senha ainda não atende a todos os requisitos obrigatórios.", "erro");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      mostrarFeedback("A confirmação da senha não confere com a nova senha.", "erro");
      return;
    }

    limparFormularioSenha();
    mostrarFeedback("Senha atualizada com sucesso!", "sucesso");
  });

  atualizarRequisitosVisual();
  return containerPagina;
}