export function criarFormularioDinamico(config = {}) {
    const payload = Array.isArray(config) ? { secoes: [{ campos: config }] } : config;
    const {
        secoes = [],
        textoCancelar = 'Cancelar',
        textoContinuar = 'Continuar',
        mostrarBotaoVoltar = false,
        textoVoltar = 'Voltar',
        ocultarBotoesAcao = false
    } = payload;

    const wrapper = document.createElement('div');
    wrapper.className = 'formulario-modular-wrapper';

    secoes.forEach((secao, index) => {
        const blocoSecao = document.createElement('div');
        blocoSecao.className = index > 0 ? 'secao-form-bloco secao-separada' : 'secao-form-bloco';

        if (secao.titulo) {
            const tituloEl = document.createElement('div');
            tituloEl.className = 'secao-form-titulo';
            tituloEl.innerHTML = `${secao.icone || ''} <span>${secao.titulo}</span>`;
            blocoSecao.appendChild(tituloEl);
        }

        if (secao.htmlCustomizado) {
            const customDiv = document.createElement('div');
            customDiv.innerHTML = secao.htmlCustomizado;
            blocoSecao.appendChild(customDiv);
            wrapper.appendChild(blocoSecao);
            return;
        }

        const corpoSecao = document.createElement('div');
        corpoSecao.className = secao.comFoto ? 'grid-secao-com-foto' : 'grid-secao-simples';

        // Bloco opcional de Foto de Perfil
        if (secao.comFoto) {
            const blocoFoto = document.createElement('div');
            blocoFoto.className = 'bloco-foto-perfil';
            const fotoSalva = secao.fotoUrl || '';
            blocoFoto.innerHTML = `
                <span class="foto-titulo">Foto de perfil</span>
                <div class="avatar-circulo" id="preview-avatar">
                    ${fotoSalva 
                        ? `<img src="${fotoSalva}" alt="Foto" style="width:100%; height:100%; object-fit:cover;" />`
                        : `<svg width="84" height="84" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.8">
                            <circle cx="12" cy="8" r="4"></circle>
                            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"></path>
                           </svg>`
                    }
                </div>
                <input type="file" id="input-foto-arquivo" accept="image/png, image/jpeg, image/gif" hidden />
                <button type="button" class="btn-alterar-foto" id="btn-alterar-foto">Alterar foto</button>
                <span class="foto-legenda">PNG, JPG ou GIF. Máx. 2MB.</span>
            `;

            const btnFoto = blocoFoto.querySelector('#btn-alterar-foto');
            const inputFoto = blocoFoto.querySelector('#input-foto-arquivo');
            const preview = blocoFoto.querySelector('#preview-avatar');

            btnFoto.addEventListener('click', () => inputFoto.click());
            inputFoto.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                        preview.innerHTML = `<img src="${ev.target.result}" alt="Foto" style="width:100%; height:100%; object-fit:cover;" />`;
                        if (typeof secao.onFotoChange === 'function') {
                            secao.onFotoChange(ev.target.result);
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });

            corpoSecao.appendChild(blocoFoto);
        }

        const containerCampos = document.createElement('div');
        containerCampos.className = 'container-inputs-grupo';

        const listaLinhas = secao.linhas || [secao.campos || []];

        listaLinhas.forEach(linhaCampos => {
            const linhaEl = document.createElement('div');
            linhaEl.className = 'linha-formulario-grid';
            if (linhaCampos.length === 1) linhaEl.style.gridTemplateColumns = '1fr';
            if (linhaCampos.length === 2) linhaEl.style.gridTemplateColumns = '1fr 1fr';

            linhaCampos.forEach(campo => {
                const grupo = document.createElement('div');
                grupo.className = 'grupo-campo';

                if (campo.tipo === 'checkbox') {
                    const labelCheck = document.createElement('label');
                    labelCheck.style.display = 'flex';
                    labelCheck.style.alignItems = 'center';
                    labelCheck.style.gap = '8px';
                    labelCheck.style.cursor = 'pointer';
                    labelCheck.style.marginTop = '8px';
                    labelCheck.innerHTML = `
                        <input type="checkbox" id="${campo.id}" ${campo.valor ? 'checked' : ''} style="width:16px; height:16px; accent-color:#1d4ed8;" />
                        <span>${campo.label}</span>
                    `;
                    grupo.appendChild(labelCheck);
                    linhaEl.appendChild(grupo);
                    return;
                }

                const label = document.createElement('label');
                label.setAttribute('for', campo.id);
                label.innerHTML = `${campo.label}${campo.obrigatorio ? '<span>*</span>' : ''}`;
                grupo.appendChild(label);

                const containerInput = document.createElement('div');
                containerInput.className = 'input-wrapper';

                if (campo.iconeEsquerda) {
                    containerInput.classList.add('com-icone-esq');
                    const spanIcone = document.createElement('span');
                    spanIcone.className = 'icone-esq';
                    spanIcone.innerHTML = campo.iconeEsquerda;
                    containerInput.appendChild(spanIcone);
                }

                if (campo.tipo === 'select') {
                    const select = document.createElement('select');
                    select.id = campo.id;

                    const optDefault = document.createElement('option');
                    optDefault.value = '';
                    optDefault.textContent = campo.placeholder || 'Selecione';
                    select.appendChild(optDefault);

                    (campo.opcoes || []).forEach(op => {
                        const option = document.createElement('option');
                        const val = typeof op === 'object' ? op.value : op;
                        const txt = typeof op === 'object' ? op.label : op;
                        option.value = val;
                        option.textContent = txt;
                        if (campo.valor && campo.valor === val) option.selected = true;
                        select.appendChild(option);
                    });
                    containerInput.appendChild(select);
                } else if (campo.tipo === 'textarea') {
                    const textarea = document.createElement('textarea');
                    textarea.id = campo.id;
                    textarea.rows = campo.rows || 4;
                    textarea.maxLength = campo.maxLength || 500;
                    textarea.placeholder = campo.placeholder || '';
                    textarea.value = campo.valor || '';
                    textarea.style.width = '100%';
                    textarea.style.padding = '10px 12px';
                    textarea.style.border = '1px solid #cbd5e1';
                    textarea.style.borderRadius = '6px';
                    textarea.style.fontSize = '13px';
                    textarea.style.fontFamily = 'inherit';
                    textarea.style.resize = 'vertical';
                    containerInput.appendChild(textarea);
                } else {
                    const input = document.createElement('input');
                    input.type = campo.tipo || 'text';
                    input.id = campo.id;
                    input.placeholder = campo.placeholder || '';
                    if (campo.maxLength) input.maxLength = campo.maxLength;
                    if (campo.valor !== undefined && campo.valor !== null) input.value = campo.valor;
                    containerInput.appendChild(input);
                }

                if (campo.iconeDireita) {
                    containerInput.classList.add('com-icone-dir');
                    const spanIconeDir = document.createElement('span');
                    spanIconeDir.className = 'icone-dir';
                    spanIconeDir.innerHTML = campo.iconeDireita;
                    containerInput.appendChild(spanIconeDir);
                }

                grupo.appendChild(containerInput);
                linhaEl.appendChild(grupo);
            });

            containerCampos.appendChild(linhaEl);
        });

        // Botão opcional de adicionar item à lista (ex: Adicionar formação, experiência, etc.)
        if (secao.botaoAdicionar) {
            const divBtnAdd = document.createElement('div');
            divBtnAdd.style.display = 'flex';
            divBtnAdd.style.justifyContent = 'flex-end';
            divBtnAdd.style.marginTop = '8px';

            const btnAdd = document.createElement('button');
            btnAdd.type = 'button';
            btnAdd.id = secao.botaoAdicionar.id || 'btn-adicionar-item';
            btnAdd.className = 'btn-continuar';
            btnAdd.style.padding = '9px 20px';
            btnAdd.innerHTML = `<span>+</span> ${secao.botaoAdicionar.texto}`;
            btnAdd.addEventListener('click', () => {
                if (typeof secao.botaoAdicionar.onClick === 'function') {
                    secao.botaoAdicionar.onClick(wrapper);
                }
            });

            divBtnAdd.appendChild(btnAdd);
            containerCampos.appendChild(divBtnAdd);
        }

        // Lista de itens já cadastrados naquela etapa
        if (secao.listaItens) {
            const boxLista = document.createElement('div');
            boxLista.style.border = '1px solid #e2e8f0';
            boxLista.style.borderRadius = '8px';
            boxLista.style.padding = '16px 20px';
            boxLista.style.marginTop = '12px';
            boxLista.style.backgroundColor = '#ffffff';

            const tituloLista = document.createElement('div');
            tituloLista.style.fontSize = '13px';
            tituloLista.style.fontWeight = '700';
            tituloLista.style.color = '#1e293b';
            tituloLista.style.marginBottom = '12px';
            tituloLista.textContent = `${secao.listaItens.titulo} (${secao.listaItens.itens.length})`;
            boxLista.appendChild(tituloLista);

            if (secao.listaItens.itens.length === 0) {
                const vazio = document.createElement('p');
                vazio.style.fontSize = '13px';
                vazio.style.color = '#64748b';
                vazio.style.margin = '0';
                vazio.textContent = secao.listaItens.textoVazio || 'Nenhum item cadastrado.';
                boxLista.appendChild(vazio);
            } else {
                secao.listaItens.itens.forEach((item, idx) => {
                    const row = document.createElement('div');
                    row.style.display = 'flex';
                    row.style.justifyContent = 'space-between';
                    row.style.alignItems = 'center';
                    row.style.padding = '10px 0';
                    row.style.borderTop = idx > 0 ? '1px solid #f1f5f9' : 'none';

                    row.innerHTML = `
                        <div>
                            <div style="font-size:13px; font-weight:600; color:#0f172a;">${item.titulo}</div>
                            ${item.subtitulo ? `<div style="font-size:12px; color:#64748b;">${item.subtitulo}</div>` : ''}
                        </div>
                        <div style="display:flex; align-items:center; gap:12px;">
                            ${item.periodo ? `<span style="font-size:12px; color:#64748b;">${item.periodo}</span>` : ''}
                            <button type="button" data-idx="${idx}" class="btn-remover-item" title="Remover" style="background:#f1f5f9; border:none; border-radius:50%; width:28px; height:28px; cursor:pointer; color:#ef4444; display:flex; align-items:center; justify-content:center;">✕</button>
                        </div>
                    `;
                    row.querySelector('.btn-remover-item').addEventListener('click', () => {
                        if (typeof secao.listaItens.onRemover === 'function') {
                            secao.listaItens.onRemover(idx);
                        }
                    });
                    boxLista.appendChild(row);
                });
            }

            containerCampos.appendChild(boxLista);
        }

        corpoSecao.appendChild(containerCampos);
        blocoSecao.appendChild(corpoSecao);
        wrapper.appendChild(blocoSecao);
    });

    if (!ocultarBotoesAcao) {
        const acoes = document.createElement('div');
        acoes.className = 'acoes-formulario';
        acoes.innerHTML = `
            <div style="display:flex; gap:12px;">
                <button type="button" class="btn-cancelar" id="btn-cancelar">${textoCancelar}</button>
                ${mostrarBotaoVoltar ? `<button type="button" class="btn-cancelar" id="btn-voltar">← ${textoVoltar}</button>` : ''}
            </div>
            <button type="button" class="btn-continuar" id="btn-continuar">${textoContinuar} <span>→</span></button>
        `;
        wrapper.appendChild(acoes);
    }

    return wrapper;
}
