import { cadastrarRecrutadorApi } from './recrutadores.js';

export function renderAdicionarRecrutador(opcoes = {}) {
    const {
        idEmpresa = null,
        nomeEmpresa = '',
        aoCancelar = null,
        aoSucesso = null
    } = opcoes;

    const secao = document.createElement('section');
    secao.className = 'pagina-adicionar-recrutador';

    secao.innerHTML = `
        <header class="cabecalho-form">
            <div>
                <h2>Adicionar recrutador</h2>
                <p class="subtitulo-form">
                    ${nomeEmpresa ? `Enviar convite para ${nomeEmpresa}` : 'Preencha os dados para convidar um novo recrutador'}
                </p>
            </div>
            <button type="button" class="btn-secundario" data-acao="voltar">Voltar</button>
        </header>

        <form class="form-recrutador" novalidate>
            <div class="campo-form">
                <label for="recrutador-nome">Nome completo *</label>
                <input
                    id="recrutador-nome"
                    name="nome"
                    type="text"
                    placeholder="Ex.: Mariana Silva"
                    required
                />
            </div>

            <div class="campo-form">
                <label for="recrutador-email">E-mail *</label>
                <input
                    id="recrutador-email"
                    name="email"
                    type="email"
                    placeholder="Ex.: mariana@empresa.com"
                    required
                />
            </div>

            <div class="campo-form">
                <label for="recrutador-cargo">Cargo *</label>
                <input
                    id="recrutador-cargo"
                    name="cargo"
                    type="text"
                    placeholder="Ex.: Analista de Recrutamento e Seleção"
                    required
                />
            </div>

            <div class="campo-form">
                <label for="recrutador-status">Status</label>
                <select id="recrutador-status" name="status">
                    <option value="Pendente" selected>Pendente</option>
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                </select>
            </div>

            <fieldset class="campo-form grupo-permissoes">
                <legend>Permissões de acesso</legend>
                <label class="checkbox-item">
                    <input type="checkbox" name="permissoes" value="vagas" checked />
                    <span>Gerenciar vagas</span>
                </label>
                <label class="checkbox-item">
                    <input type="checkbox" name="permissoes" value="candidaturas" checked />
                    <span>Avaliar candidaturas</span>
                </label>
                <label class="checkbox-item">
                    <input type="checkbox" name="permissoes" value="equipe" />
                    <span>Gerenciar recrutadores</span>
                </label>
            </fieldset>

            <p class="mensagem-erro" data-erro aria-live="polite"></p>

            <div class="acoes-form">
                <button type="button" class="btn-secundario" data-acao="cancelar">Cancelar</button>
                <button type="submit" class="btn-primario" data-acao="salvar">Enviar convite</button>
            </div>
        </form>
    `;

    const form = secao.querySelector('.form-recrutador');
    const erroEl = secao.querySelector('[data-erro]');
    const btnSalvar = secao.querySelector('[data-acao="salvar"]');

    function fecharOuVoltar() {
        if (typeof aoCancelar === 'function') {
            aoCancelar();
        }
    }

    secao.querySelector('[data-acao="voltar"]').addEventListener('click', fecharOuVoltar);
    secao.querySelector('[data-acao="cancelar"]').addEventListener('click', fecharOuVoltar);

    form.addEventListener('submit', async (evento) => {
        evento.preventDefault();
        erroEl.textContent = '';

        if (!idEmpresa) {
            erroEl.textContent = 'Empresa ativa não identificada. Recarregue a página ou faça login novamente.';
            return;
        }

        const dados = new FormData(form);
        const nome = String(dados.get('nome') || '').trim();
        const email = String(dados.get('email') || '').trim();
        const cargo = String(dados.get('cargo') || '').trim();
        const status = String(dados.get('status') || 'Pendente');
        const permissoes = dados.getAll('permissoes');

        if (!nome || !email || !cargo) {
            erroEl.textContent = 'Preencha nome completo, e-mail e cargo.';
            return;
        }

        btnSalvar.disabled = true;
        btnSalvar.textContent = 'Enviando...';

        try {
            const resposta = await cadastrarRecrutadorApi({
                nome,
                email,
                cargo,
                status,
                permissoes,
                id_empresa: Number(idEmpresa)
            });

            if (typeof aoSucesso === 'function') {
                await aoSucesso(resposta);
            }
        } catch (erro) {
            erroEl.textContent = erro?.message || 'Não foi possível adicionar o recrutador.';
        } finally {
            btnSalvar.disabled = false;
            btnSalvar.textContent = 'Enviar convite';
        }
    });

    return secao;
}