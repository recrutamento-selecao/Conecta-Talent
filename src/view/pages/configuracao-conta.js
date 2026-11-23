import { criarSidebar } from '../components/sidebar.js';

export function renderConfiguracaoConta() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'pagina-configuracao-conta-wrapper';

    wrapper.appendChild(criarSidebar('Empresa', 'Twelse LTDA'));

    const main = document.createElement('main');
    main.className = 'conteudo-principal';

    main.innerHTML = `
        <header class="cabecalho-pagina-padrao">
            <h1 class="titulo-pagina">Configuração de conta</h1>
            <p class="subtitulo-pagina">Gerencie suas informações de conta e segurança.</p>
        </header>

        <div class="secoes-configuracao-conta">
            <!-- Seção 1: Acesso (E-mail) -->
            <section class="card-configuracao">
                <div class="cabecalho-secao-config">
                    <div>
                        <h2>Acesso</h2>
                        <p>Este e-mail será utilizado para você acessar sua conta no Conecta Talent e receber notificações.</p>
                    </div>
                </div>

                <form id="form-email-conta" class="form-config-simples">
                    <div class="campo-config">
                        <label for="input-email-conta">E-MAIL <span>*</span></label>
                        <input
                            type="email"
                            id="input-email-conta"
                            name="email"
                            placeholder="Digite seu e-mail"
                            required
                        />
                    </div>
                    <button type="submit" class="btn-primario-azul">Salvar E-mail</button>
                </form>
            </section>

            <!-- Seção 2: Alterar senha -->
            <section class="card-configuracao">
                <div class="cabecalho-secao-config">
                    <div>
                        <h2>Alterar senha</h2>
                        <p>Atualize sua senha de acesso para manter sua conta segura.</p>
                    </div>
                </div>

                <form id="form-senha-conta" class="form-config-senha">
                    <div class="campo-config">
                        <label for="nova-senha-conta">Nova senha <span>*</span></label>
                        <input
                            type="password"
                            id="nova-senha-conta"
                            name="novaSenha"
                            placeholder="Digite sua nova senha"
                            required
                        />
                    </div>

                    <div class="campo-config">
                        <label for="confirmar-senha-conta">Confirmar nova senha <span>*</span></label>
                        <input
                            type="password"
                            id="confirmar-senha-conta"
                            name="confirmarSenha"
                            placeholder="Confirme sua nova senha"
                            required
                        />
                    </div>

                    <div class="box-requisitos-senha">
                        <span class="titulo-requisitos">REQUISITOS PARA SUA NOVA SENHA:</span>
                        <ul class="lista-requisitos-senha">
                            <li id="req-tamanho">Mínimo de 8 caracteres</li>
                            <li id="req-numero">Um número</li>
                            <li id="req-maiuscula">Uma letra maiúscula</li>
                            <li id="req-especial">Um caractere especial (@, #, $, %)</li>
                            <li id="req-minuscula">Uma letra minúscula</li>
                        </ul>
                    </div>

                    <p id="mensagem-feedback-senha" class="mensagem-feedback-form" aria-live="polite"></p>

                    <div class="acoes-senha-conta">
                        <button type="button" class="btn-secundario-outline" id="btn-cancelar-senha">Cancelar</button>
                        <button type="submit" class="btn-primario-azul">Salvar nova senha</button>
                    </div>
                </form>
            </section>

            <!-- Seção 3: Excluir conta -->
            <section class="card-excluir-conta">
                <div class="cabecalho-excluir-conta">
                    <div>
                        <h2>Excluir conta</h2>
                        <p>Ao excluir sua conta, seus dados e informações do perfil poderão ser removidos permanentemente. Esta ação não poderá ser desfeita.</p>
                    </div>
                </div>

                <button type="button" class="btn-excluir-conta" id="btn-abrir-modal-exclusao">Excluir minha conta</button>
                <small class="aviso-confirmacao-exclusao">Será solicitada uma confirmação antes da exclusão definitiva.</small>
            </section>
        </div>

        <!-- Modal de confirmação de exclusão -->
        <div class="modal-backdrop-exclusao" id="modal-exclusao-conta" hidden>
            <div class="modal-box-exclusao" role="dialog" aria-modal="true" aria-labelledby="titulo-modal-exclusao">
                <h3 id="titulo-modal-exclusao">Excluir conta</h3>
                <p>Tem certeza de que deseja excluir sua conta? Seus dados e informações do perfil poderão ser removidos permanentemente e esta ação não poderá ser desfeita.</p>
                <div class="acoes-modal-exclusao">
                    <button type="button" class="btn-secundario-outline" id="btn-cancelar-exclusao">Cancelar</button>
                    <button type="button" class="btn-confirmar-exclusao" id="btn-confirmar-exclusao">Confirmar exclusão</button>
                </div>
            </div>
        </div>
    `;

    wrapper.appendChild(main);
    app.appendChild(wrapper);

    const inputNovaSenha = document.getElementById('nova-senha-conta');
    const inputConfirmarSenha = document.getElementById('confirmar-senha-conta');
    const feedbackSenha = document.getElementById('mensagem-feedback-senha');

    const requisitosMap = [
        { el: document.getElementById('req-tamanho'), regex: /.{8,}/ },
        { el: document.getElementById('req-maiuscula'), regex: /[A-Z]/ },
        { el: document.getElementById('req-minuscula'), regex: /[a-z]/ },
        { el: document.getElementById('req-numero'), regex: /[0-9]/ },
        { el: document.getElementById('req-especial'), regex: /[@#$%]/ }
    ];

    function atualizarRequisitos() {
        const valor = inputNovaSenha.value;
        requisitosMap.forEach(({ el, regex }) => {
            if (el) el.classList.toggle('valido', regex.test(valor));
        });
    }

    inputNovaSenha.addEventListener('input', () => {
        feedbackSenha.textContent = '';
        atualizarRequisitos();
    });

    inputConfirmarSenha.addEventListener('input', () => {
        feedbackSenha.textContent = '';
    });

    document.getElementById('btn-cancelar-senha').addEventListener('click', () => {
        document.getElementById('form-senha-conta').reset();
        feedbackSenha.textContent = '';
        atualizarRequisitos();
    });

    document.getElementById('form-email-conta').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('input-email-conta').value.trim();
        console.log('Salvar e-mail:', email);
    });

    document.getElementById('form-senha-conta').addEventListener('submit', (e) => {
        e.preventDefault();
        const novaSenha = inputNovaSenha.value;
        const confirmar = inputConfirmarSenha.value;

        if (novaSenha !== confirmar) {
            feedbackSenha.textContent = 'As senhas não coincidem.';
            return;
        }

        const todosValidos = requisitosMap.every(({ regex }) => regex.test(novaSenha));
        if (!todosValidos) {
            feedbackSenha.textContent = 'A nova senha ainda não atende a todos os requisitos.';
            return;
        }

        feedbackSenha.textContent = '';
        console.log('Salvar nova senha');
    });

    // Controle do modal de exclusão
    const modalExclusao = document.getElementById('modal-exclusao-conta');
    const btnAbrirModal = document.getElementById('btn-abrir-modal-exclusao');
    const btnCancelarExclusao = document.getElementById('btn-cancelar-exclusao');
    const btnConfirmarExclusao = document.getElementById('btn-confirmar-exclusao');

    function abrirModal() {
        modalExclusao.hidden = false;
    }

    function fecharModal() {
        modalExclusao.hidden = true;
    }

    btnAbrirModal.addEventListener('click', abrirModal);
    btnCancelarExclusao.addEventListener('click', fecharModal);

    modalExclusao.addEventListener('click', (e) => {
        if (e.target === modalExclusao) fecharModal();
    });

    btnConfirmarExclusao.addEventListener('click', () => {
        fecharModal();
        console.log('Exclusão de conta confirmada');
    });
}