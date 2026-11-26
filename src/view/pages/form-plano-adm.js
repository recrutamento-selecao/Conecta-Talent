import { PLANOS_ADM_INICIAIS } from './gerenciar-planos.js';

const RECURSOS_DISPONIVEIS = [
    { id: 'banco-talentos', label: 'Banco de talentos', desc: 'Acesso ao banco de talentos da plataforma.', defaultChecked: true },
    { id: 'publicacao-vagas', label: 'Publicação de vagas', desc: 'Publicação de vagas na plataforma.', defaultChecked: true },
    { id: 'gerenciamento-candidatos', label: 'Gerenciamento de candidatos', desc: 'Acompanhamento de candidatos no processo.', defaultChecked: true },
    { id: 'processo-basico', label: 'Processo seletivo básico', desc: 'Criação e gestão de processos seletivos.', defaultChecked: true },
    { id: 'relatorios-avancados', label: 'Relatórios avançados', desc: 'Acesso a relatórios detalhados.', defaultChecked: false },
    { id: 'personalizacao', label: 'Personalização da plataforma', desc: 'Personalização com a identidade da empresa.', defaultChecked: false },
    { id: 'integracao-testes', label: 'Integração com testes', desc: 'Aplicação de testes e avaliações.', defaultChecked: false },
    { id: 'suporte-dedicado', label: 'Suporte dedicado', desc: 'Suporte prioritário da equipe.', defaultChecked: false },
    { id: 'api-integracoes', label: 'API e integrações', desc: 'Integração com outros sistemas.', defaultChecked: false }
];

const SVG_COROA_AZUL = `
    <span style="width:40px;height:40px;border-radius:10px;background:#dbeafe;color:#1d4ed8;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3 18h18v2H3v-2zm1.5-11 4.5 4.5L12 6l3 5.5L19.5 7 18 16H6L4.5 7z"/>
        </svg>
    </span>
`;

function formatarMoeda(valor) {
    const num = Number(valor || 0);
    return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatarNumero(val) {
    if (val === '' || val === null || val === undefined) return '0';
    if (Number.isNaN(Number(val))) return String(val);
    return Number(val).toLocaleString('pt-BR');
}

function escapar(texto = '') {
    return String(texto)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

export function renderFormPlanoAdm(modo = 'novo', planoExistente = null, callbacks = {}) {
    const isEdicao = modo === 'editar';
    const base = planoExistente || (isEdicao ? PLANOS_ADM_INICIAIS[1] : null);

    const estadoInicial = {
        nome: base ? base.nome : '',
        descricao: base ? base.descricao : '',
        precoMensal: base ? String(base.precoMensal ?? '') : '',
        precoAnual: base && base.precoAnual != null ? String(base.precoAnual) : '',
        recrutadores: base ? String(base.recrutadores ?? '') : '',
        vagas: base ? String(base.vagas ?? '') : '',
        candidatos: base ? String(base.candidatos ?? '') : '',
        ativo: base ? base.status === 'Ativo' : true,
        recursos: base && Array.isArray(base.recursos) && base.recursos.length
            ? [...base.recursos]
            : RECURSOS_DISPONIVEIS.filter((r) => r.defaultChecked).map((r) => r.label)
    };

    const voltarLista = callbacks.onVoltar || (() => {
        window.location.hash = '#/planos';
    });

    const pagina = document.createElement('section');
    pagina.className = 'pagina-form-plano-adm';

    const checkboxesHtml = RECURSOS_DISPONIVEIS.map((rec) => {
        const checked = estadoInicial.recursos.includes(rec.label) ? 'checked' : '';
        return `
            <label class="fp-recurso-item">
                <input type="checkbox" class="fp-check-recurso" value="${escapar(rec.label)}" ${checked} />
                <span>
                    <strong>${escapar(rec.label)}</strong>
                    <small>${escapar(rec.desc)}</small>
                </span>
            </label>
        `;
    }).join('');

    pagina.innerHTML = `
        <style>
            .fp-breadcrumb { font-size: 0.85rem; color: #64748b; margin-bottom: 0.35rem; }
            .fp-titulo { margin: 0 0 0.25rem; font-size: 1.75rem; font-weight: 700; color: #0f172a; }
            .fp-subtitulo { margin: 0 0 1.5rem; font-size: 0.92rem; color: #64748b; }
            .fp-layout { display: grid; grid-template-columns: minmax(0, 1.85fr) minmax(300px, 1fr); gap: 1.5rem; align-items: start; }
            .fp-col-form { display: flex; flex-direction: column; gap: 1.15rem; }
            .fp-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.35rem; }
            .fp-card h2 { margin: 0 0 1rem; font-size: 1rem; font-weight: 700; color: #0f172a; }
            .fp-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
            .fp-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
            .fp-label { display: block; font-size: 0.82rem; font-weight: 600; color: #0f172a; margin-bottom: 0.35rem; }
            .fp-label span.req { color: #dc2626; }
            .fp-input, .fp-textarea { width: 100%; box-sizing: border-box; padding: 0.6rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.86rem; font-family: inherit; color: #0f172a; background: #fff; }
            .fp-textarea { min-height: 84px; resize: vertical; }
            .fp-ajuda { display: block; font-size: 0.74rem; color: #64748b; margin-top: 0.3rem; }
            .fp-contador { text-align: right; font-size: 0.72rem; color: #94a3b8; margin-top: 0.25rem; }
            .fp-alerta-amarelo { margin-top: 0.85rem; background: #fefce8; border: 1px solid #fde047; color: #854d0e; border-radius: 8px; padding: 0.65rem 0.85rem; font-size: 0.78rem; }
            .fp-recursos-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.85rem; margin-bottom: 1rem; }
            .fp-recurso-item { display: flex; align-items: flex-start; gap: 0.5rem; cursor: pointer; font-size: 0.8rem; }
            .fp-recurso-item strong { display: block; color: #0f172a; font-weight: 600; }
            .fp-recurso-item small { display: block; color: #64748b; font-size: 0.72rem; line-height: 1.35; }
            .fp-status-linha { display: flex; justify-content: space-between; align-items: center; padding-top: 0.85rem; border-top: 1px solid #f1f5f9; }
            .fp-acoes-rodape { display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 0.5rem; }
            .fp-btn-cancelar { background: #fff; border: 1px solid #cbd5e1; color: #334155; border-radius: 8px; padding: 0.6rem 1.15rem; font-size: 0.86rem; font-weight: 600; cursor: pointer; }
            .fp-btn-salvar { background: #1d4ed8; border: none; color: #fff; border-radius: 8px; padding: 0.6rem 1.25rem; font-size: 0.86rem; font-weight: 600; cursor: pointer; }
            .fp-preview-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.35rem; position: sticky; top: 1rem; }
            .fp-preview-titulo { margin: 0 0 0.85rem; font-size: 0.95rem; font-weight: 700; color: #0f172a; }
            .fp-preview-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.25rem; }
            .fp-preview-nome { margin: 0.75rem 0 0.25rem; font-size: 1.1rem; font-weight: 700; color: #0f172a; }
            .fp-preview-desc { margin: 0 0 1rem; font-size: 0.82rem; color: #64748b; line-height: 1.4; }
            .fp-preview-preco { font-size: 1.45rem; font-weight: 800; color: #0f172a; }
            .fp-preview-preco small { font-size: 0.82rem; font-weight: 500; color: #64748b; }
            .fp-preview-anual { font-size: 0.76rem; color: #64748b; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #e2e8f0; }
            .fp-preview-limites { display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.82rem; color: #334155; padding-bottom: 1rem; margin-bottom: 1rem; border-bottom: 1px solid #e2e8f0; }
            .fp-preview-recursos { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.8rem; color: #334155; }
            .fp-preview-recursos li::before { content: "✓ "; color: #16a34a; font-weight: 700; }
            .fp-modal-backdrop { position: fixed !important; inset: 0 !important; background: rgba(15, 23, 42, 0.5) !important; display: flex !important; align-items: center !important; justify-content: center !important; padding: 1rem !important; z-index: 999999 !important; }
            .fp-modal-box { position: relative !important; background: #fff !important; border-radius: 16px !important; max-width: 520px !important; width: 100% !important; padding: 1.75rem !important; box-shadow: 0 24px 48px rgba(15, 23, 42, 0.25) !important; }
            .fp-modal-close { position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.15rem; color: #64748b; cursor: pointer; }
            .fp-sucesso-icone { width: 58px; height: 58px; border-radius: 50%; background: #dcfce7; color: #16a34a; font-size: 1.6rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.85rem; font-weight: 700; }
            .fp-resumo-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1rem; margin: 1rem 0; font-size: 0.82rem; }
            .fp-resumo-linha { display: flex; justify-content: space-between; padding: 0.3rem 0; gap: 0.75rem; }
            .fp-resumo-linha span:first-child { color: #64748b; }
            .fp-resumo-linha span:last-child { color: #0f172a; font-weight: 600; text-align: right; }
            .fp-alerta-modal { background: #fefce8; border: 1px solid #fde047; color: #854d0e; border-radius: 8px; padding: 0.7rem 0.85rem; font-size: 0.78rem; margin: 0.85rem 0; }
            @media (max-width: 1024px) { .fp-layout { grid-template-columns: 1fr; } .fp-recursos-grid { grid-template-columns: 1fr 1fr; } }
            @media (max-width: 640px) { .fp-grid-2, .fp-grid-3, .fp-recursos-grid { grid-template-columns: 1fr; } }
        </style>

        <div class="fp-breadcrumb">
            Planos &gt; Gerenciar planos &gt; ${isEdicao ? 'Editar plano' : 'Novo plano'}
        </div>
        <h1 class="fp-titulo">${isEdicao ? 'Editar plano' : 'Novo plano'}</h1>
        <p class="fp-subtitulo">
            ${isEdicao
                ? 'Atualize as informações, preços, limites e recursos do plano.'
                : 'Configure as informações, limites e recursos do novo plano de assinatura.'}
        </p>

        <div class="fp-layout">
            <form class="fp-col-form" id="fp-form">
                <section class="fp-card">
                    <h2>Informações básicas</h2>
                    <div class="fp-grid-2">
                        <div>
                            <label class="fp-label" for="fp-nome">Nome do plano <span class="req">*</span></label>
                            <input type="text" id="fp-nome" class="fp-input" placeholder="Ex.: Profissional" value="${escapar(estadoInicial.nome)}" required />
                            <span class="fp-ajuda">${isEdicao ? 'Nome exibido para as empresas.' : 'Nome que será exibido na plataforma.'}</span>
                        </div>
                        <div>
                            <label class="fp-label" for="fp-desc">Descrição <span class="req">*</span></label>
                            <textarea id="fp-desc" class="fp-textarea" maxlength="300" placeholder="Descreva os principais benefícios do plano...">${escapar(estadoInicial.descricao)}</textarea>
                            <div class="fp-contador" id="fp-contador">${estadoInicial.descricao.length}/300</div>
                        </div>
                    </div>
                </section>

                <section class="fp-card">
                    <h2>Preços</h2>
                    <div class="fp-grid-2">
                        <div>
                            <label class="fp-label" for="fp-preco-mensal">Preço mensal <span class="req">*</span></label>
                            <input type="number" step="0.01" min="0" id="fp-preco-mensal" class="fp-input" placeholder="0.00" value="${escapar(estadoInicial.precoMensal)}" />
                            <span class="fp-ajuda">Valor cobrado mensalmente.</span>
                        </div>
                        <div>
                            <label class="fp-label" for="fp-preco-anual">Preço anual</label>
                            <input type="number" step="0.01" min="0" id="fp-preco-anual" class="fp-input" placeholder="0.00" value="${escapar(estadoInicial.precoAnual)}" />
                            <span class="fp-ajuda">Valor cobrado anualmente (opcional).</span>
                        </div>
                    </div>
                    ${
                        isEdicao
                            ? `<div class="fp-alerta-amarelo">Alterações de preço podem afetar novas assinaturas. Assinaturas existentes seguem as regras de cobrança vigentes.</div>`
                            : ''
                    }
                </section>

                <section class="fp-card">
                    <h2>Limites do plano</h2>
                    <div class="fp-grid-3">
                        <div>
                            <label class="fp-label" for="fp-recrutadores">Número de recrutadores <span class="req">*</span></label>
                            <input type="text" id="fp-recrutadores" class="fp-input" placeholder="0" value="${escapar(estadoInicial.recrutadores)}" />
                            <span class="fp-ajuda">Quantos recrutadores a empresa pode ter.</span>
                        </div>
                        <div>
                            <label class="fp-label" for="fp-vagas">Número de vagas <span class="req">*</span></label>
                            <input type="text" id="fp-vagas" class="fp-input" placeholder="0" value="${escapar(estadoInicial.vagas)}" />
                            <span class="fp-ajuda">Quantidade de vagas que podem ser criadas.</span>
                        </div>
                        <div>
                            <label class="fp-label" for="fp-candidatos">Número de candidatos <span class="req">*</span></label>
                            <input type="text" id="fp-candidatos" class="fp-input" placeholder="0" value="${escapar(estadoInicial.candidatos)}" />
                            <span class="fp-ajuda">Quantidade de candidatos permitidos.</span>
                        </div>
                    </div>
                </section>

                <section class="fp-card">
                    <h2>Recursos do plano</h2>
                    <p class="fp-subtitulo" style="margin-bottom:0.9rem;font-size:0.82rem;">Selecione os recursos disponíveis neste plano.</p>
                    <div class="fp-recursos-grid">${checkboxesHtml}</div>
                    <div class="fp-status-linha">
                        <div>
                            <strong style="font-size:0.85rem;color:#0f172a;display:block;">Status</strong>
                            <span style="font-size:0.76rem;color:#64748b;">
                                ${isEdicao
                                    ? 'Plano disponível para novas contratações.'
                                    : 'Quando desativado, o plano não ficará disponível para novas contratações.'}
                            </span>
                        </div>
                        <input type="checkbox" id="fp-status" ${estadoInicial.ativo ? 'checked' : ''} style="width:20px;height:20px;cursor:pointer;" />
                    </div>
                </section>

                <div class="fp-acoes-rodape">
                    <button type="button" class="fp-btn-cancelar" id="fp-cancelar">Cancelar</button>
                    <button type="submit" class="fp-btn-salvar" id="fp-submit">
                        ${isEdicao ? 'Salvar alterações' : 'Criar plano'}
                    </button>
                </div>
            </form>

            <aside class="fp-preview-card">
                <h2 class="fp-preview-titulo">Pré-visualização do plano</h2>
                <div class="fp-preview-box" id="fp-preview"></div>
            </aside>
        </div>
    `;

    function coletarDadosForm() {
        const recursosMarcados = Array.from(pagina.querySelectorAll('.fp-check-recurso:checked')).map(
            (el) => el.value
        );
        return {
            nome: pagina.querySelector('#fp-nome').value.trim() || 'Nome do plano',
            descricao: pagina.querySelector('#fp-desc').value.trim() || 'Descrição do plano será exibida aqui para o usuário.',
            precoMensal: Number(pagina.querySelector('#fp-preco-mensal').value || 0),
            precoAnual: Number(pagina.querySelector('#fp-preco-anual').value || 0),
            recrutadores: pagina.querySelector('#fp-recrutadores').value.trim() || '0',
            vagas: pagina.querySelector('#fp-vagas').value.trim() || '0',
            candidatos: pagina.querySelector('#fp-candidatos').value.trim() || '0',
            status: pagina.querySelector('#fp-status').checked ? 'Ativo' : 'Inativo',
            recursos: recursosMarcados
        };
    }

    function atualizarPreview() {
        const dados = coletarDadosForm();
        pagina.querySelector('#fp-contador').textContent = `${pagina.querySelector('#fp-desc').value.length}/300`;

        pagina.querySelector('#fp-preview').innerHTML = `
            ${isEdicao ? SVG_COROA_AZUL : ''}
            <h3 class="fp-preview-nome">${escapar(dados.nome)}</h3>
            <p class="fp-preview-desc">${escapar(dados.descricao)}</p>
            <div class="fp-preview-preco">${formatarMoeda(dados.precoMensal)} <small>/mês</small></div>
            <div class="fp-preview-anual">ou ${formatarMoeda(dados.precoAnual)} /ano</div>
            <div class="fp-preview-limites">
                <div>👤 ${escapar(formatarNumero(dados.recrutadores))} recrutadores</div>
                <div>💼 ${escapar(formatarNumero(dados.vagas))} vagas</div>
                <div>👥 ${escapar(formatarNumero(dados.candidatos))} candidatos</div>
            </div>
            <strong style="font-size:0.8rem;color:#0f172a;display:block;margin-bottom:0.45rem;">Recursos incluídos</strong>
            <ul class="fp-preview-recursos">
                ${(dados.recursos.length ? dados.recursos : ['Banco de talentos'])
                    .map((r) => `<li>${escapar(r)}</li>`)
                    .join('')}
            </ul>
        `;
    }

    function abrirModal(htmlInterno, aoConfigurar) {
        document.querySelectorAll('.fp-modal-backdrop').forEach((el) => el.remove());
        const backdrop = document.createElement('div');
        backdrop.className = 'fp-modal-backdrop';
        const box = document.createElement('div');
        box.className = 'fp-modal-box';
        box.innerHTML = `<button type="button" class="fp-modal-close" aria-label="Fechar">✕</button>${htmlInterno}`;
        backdrop.append(box);
        document.body.append(backdrop);

        const fechar = () => backdrop.remove();
        box.querySelector('.fp-modal-close').addEventListener('click', fechar);
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) fechar();
        });
        if (typeof aoConfigurar === 'function') aoConfigurar(box, fechar);
    }

    function mostrarModalCriadoSucesso(dados) {
        abrirModal(
            `
            <div style="text-align:center;">
                <div class="fp-sucesso-icone">✓</div>
                <h3 style="margin:0 0 0.35rem;font-size:1.3rem;color:#0f172a;">Plano criado com sucesso!</h3>
                <p style="margin:0;font-size:0.84rem;color:#64748b;">O novo plano foi criado e já está disponível para contratação pelas empresas da plataforma.</p>
            </div>
            <div class="fp-resumo-box">
                <strong style="display:block;margin-bottom:0.5rem;color:#0f172a;">Resumo do plano</strong>
                <div class="fp-resumo-linha"><span>Nome</span><span>${escapar(dados.nome)}</span></div>
                <div class="fp-resumo-linha"><span>Preço mensal</span><span>${formatarMoeda(dados.precoMensal)} /mês</span></div>
                <div class="fp-resumo-linha"><span>Preço anual</span><span>${formatarMoeda(dados.precoAnual)} /ano</span></div>
                <div class="fp-resumo-linha"><span>Recrutadores</span><span>${escapar(formatarNumero(dados.recrutadores))}</span></div>
                <div class="fp-resumo-linha"><span>Vagas</span><span>${escapar(formatarNumero(dados.vagas))}</span></div>
                <div class="fp-resumo-linha"><span>Candidatos</span><span>${escapar(formatarNumero(dados.candidatos))}</span></div>
                <div class="fp-resumo-linha"><span>Status</span><span><strong style="color:#15803d;">${escapar(dados.status)}</strong></span></div>
            </div>
            <div style="background:#eff6ff;color:#1e40af;border-radius:8px;padding:0.65rem 0.8rem;font-size:0.78rem;margin-bottom:1rem;text-align:center;">
                O plano já pode ser selecionado pelas empresas durante a contratação ou alteração de assinatura.
            </div>
            <div style="text-align:center;">
                <button type="button" class="fp-btn-salvar" id="fp-ir-gerenciar-criado">Ir para Gerenciar Planos</button>
            </div>
            `,
            (box, fechar) => {
                box.querySelector('#fp-ir-gerenciar-criado').addEventListener('click', () => {
                    fechar();
                    if (typeof callbacks.onSalvar === 'function') callbacks.onSalvar(dados);
                    voltarLista();
                });
            }
        );
    }

    function mostrarModalConfirmarAlteracoes(dados) {
        const antesMensal = estadoInicial.precoMensal ? Number(estadoInicial.precoMensal) : 149.9;
        const antesAnual = estadoInicial.precoAnual ? Number(estadoInicial.precoAnual) : 1499.0;
        const antesRec = estadoInicial.recrutadores || '5';
        const antesVagas = estadoInicial.vagas || '50';
        const antesCand = estadoInicial.candidatos || '1000';

        abrirModal(
            `
            <h3 style="margin:0 0 0.25rem;font-size:1.25rem;color:#0f172a;">Confirmar alterações</h3>
            <p style="margin:0 0 1rem;font-size:0.84rem;color:#64748b;">Tem certeza que deseja salvar as alterações realizadas no plano <strong>${escapar(dados.nome)}</strong>?</p>

            <div style="display:flex;align-items:center;gap:0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:0.85rem 1rem;margin-bottom:0.85rem;">
                ${SVG_COROA_AZUL}
                <div>
                    <strong style="display:block;font-size:0.9rem;color:#0f172a;">Plano ${escapar(dados.nome)}</strong>
                    <small style="color:#64748b;font-size:0.78rem;">Confira abaixo as alterações antes de confirmar.</small>
                </div>
            </div>

            <div class="fp-resumo-box" style="margin-top:0;">
                <strong style="display:block;margin-bottom:0.5rem;color:#0f172a;">Alterações realizadas</strong>
                <div class="fp-resumo-linha"><span>Preço mensal</span><span>${formatarMoeda(antesMensal)} → <strong>${formatarMoeda(dados.precoMensal)}</strong></span></div>
                <div class="fp-resumo-linha"><span>Preço anual</span><span>${formatarMoeda(antesAnual)} → <strong>${formatarMoeda(dados.precoAnual)}</strong></span></div>
                <div class="fp-resumo-linha"><span>Recrutadores</span><span>${escapar(formatarNumero(antesRec))} → <strong>${escapar(formatarNumero(dados.recrutadores))}</strong></span></div>
                <div class="fp-resumo-linha"><span>Vagas</span><span>${escapar(formatarNumero(antesVagas))} → <strong>${escapar(formatarNumero(dados.vagas))}</strong></span></div>
                <div class="fp-resumo-linha"><span>Candidatos</span><span>${escapar(formatarNumero(antesCand))} → <strong>${escapar(formatarNumero(dados.candidatos))}</strong></span></div>
            </div>

            <div class="fp-alerta-modal">
                <strong>Atenção:</strong> as alterações de preço poderão afetar novas assinaturas. Assinaturas existentes seguirão as regras de cobrança definidas pela plataforma.
            </div>

            <label style="display:flex;align-items:center;gap:0.5rem;font-size:0.8rem;color:#334155;margin-bottom:1.1rem;cursor:pointer;">
                <input type="checkbox" id="fp-confirm-check" />
                <span>Estou ciente das alterações e desejo atualizar este plano.</span>
            </label>

            <div style="display:flex;justify-content:flex-end;gap:0.65rem;">
                <button type="button" class="fp-btn-cancelar" id="fp-modal-cancelar">Cancelar</button>
                <button type="button" class="fp-btn-salvar" id="fp-modal-confirmar">✓ Confirmar alterações</button>
            </div>
            `,
            (box, fechar) => {
                box.querySelector('#fp-modal-cancelar').addEventListener('click', fechar);
                box.querySelector('#fp-modal-confirmar').addEventListener('click', () => {
                    const marcado = box.querySelector('#fp-confirm-check').checked;
                    if (!marcado) {
                        alert('Marque a caixa de confirmação para atualizar o plano.');
                        return;
                    }
                    fechar();
                    mostrarModalAtualizadoSucesso(dados);
                });
            }
        );
    }

    function mostrarModalAtualizadoSucesso(dados) {
        abrirModal(
            `
            <div style="text-align:center;">
                <div class="fp-sucesso-icone">✓</div>
                <h3 style="margin:0 0 0.35rem;font-size:1.3rem;color:#0f172a;">Plano atualizado com sucesso!</h3>
                <p style="margin:0;font-size:0.84rem;color:#64748b;">As alterações do plano <strong>${escapar(dados.nome)}</strong> foram salvas e já estão disponíveis na plataforma.</p>
            </div>
            <div class="fp-resumo-box">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;gap:0.5rem;">
                    <div style="display:flex;align-items:center;gap:0.65rem;">
                        ${SVG_COROA_AZUL}
                        <strong style="color:#0f172a;">Plano ${escapar(dados.nome)}</strong>
                    </div>
                    <span style="background:#dcfce7;color:#15803d;font-size:0.7rem;font-weight:700;padding:0.15rem 0.5rem;border-radius:999px;">${escapar(dados.status.toUpperCase())}</span>
                </div>
                <div class="fp-resumo-linha"><span>Preço mensal</span><span>${formatarMoeda(dados.precoMensal)} /mês</span></div>
                <div class="fp-resumo-linha"><span>Preço anual</span><span>${formatarMoeda(dados.precoAnual)} /ano</span></div>
                <div class="fp-resumo-linha"><span>Recrutadores</span><span>Até ${escapar(formatarNumero(dados.recrutadores))}</span></div>
                <div class="fp-resumo-linha"><span>Vagas</span><span>Até ${escapar(formatarNumero(dados.vagas))}</span></div>
                <div class="fp-resumo-linha"><span>Candidatos</span><span>Até ${escapar(formatarNumero(dados.candidatos))}</span></div>
                <div class="fp-resumo-linha"><span>Status</span><span>${escapar(dados.status)}</span></div>
            </div>
            <div style="background:#eff6ff;color:#1e40af;border-radius:8px;padding:0.65rem 0.8rem;font-size:0.78rem;margin-bottom:1rem;text-align:center;">
                As novas condições já estão disponíveis para novas assinaturas. Assinaturas existentes seguem as regras aplicáveis ao contrato vigente.
            </div>
            <div style="text-align:center;">
                <button type="button" class="fp-btn-salvar" id="fp-ir-gerenciar-atualizado">Ir para Gerenciar Planos</button>
            </div>
            `,
            (box, fechar) => {
                box.querySelector('#fp-ir-gerenciar-atualizado').addEventListener('click', () => {
                    fechar();
                    if (typeof callbacks.onSalvar === 'function') callbacks.onSalvar(dados);
                    voltarLista();
                });
            }
        );
    }

    pagina.querySelectorAll('input, textarea').forEach((campo) => {
        campo.addEventListener('input', atualizarPreview);
        campo.addEventListener('change', atualizarPreview);
    });

    pagina.querySelector('#fp-cancelar').addEventListener('click', voltarLista);

    pagina.querySelector('#fp-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const dados = coletarDadosForm();
        if (isEdicao) {
            mostrarModalConfirmarAlteracoes(dados);
        } else {
            mostrarModalCriadoSucesso(dados);
        }
    });

    atualizarPreview();
    return pagina;
}