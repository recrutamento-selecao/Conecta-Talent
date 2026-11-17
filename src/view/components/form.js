export function criarFormularioDinamico(config = {}) {
    // Compatibilidade: se receber um array direto ou um objeto com seções/campos
    const payload = Array.isArray(config) ? { secoes: [{ campos: config }] } : config;
    const {
        secoes = [],
        textoCancelar = 'Cancelar',
        textoContinuar = 'Continuar'
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

        const corpoSecao = document.createElement('div');
        corpoSecao.className = secao.comFoto ? 'grid-secao-com-foto' : 'grid-secao-simples';

        // Bloco opcional de Foto de Perfil
        if (secao.comFoto) {
            const blocoFoto = document.createElement('div');
            blocoFoto.className = 'bloco-foto-perfil';
            blocoFoto.innerHTML = `
                <span class="foto-titulo">Foto de perfil</span>
                <div class="avatar-circulo" id="preview-avatar">
                    <svg width="84" height="84" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.8">
                        <circle cx="12" cy="8" r="4"></circle>
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"></path>
                    </svg>
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
                    };
                    reader.readAsDataURL(file);
                }
            });

            corpoSecao.appendChild(blocoFoto);
        }

        // Container dos campos organizado por linhas ou lista simples
        const containerCampos = document.createElement('div');
        containerCampos.className = 'container-inputs-grupo';

        const listaLinhas = secao.linhas || [secao.campos || []];

        listaLinhas.forEach(linhaCampos => {
            const linhaEl = document.createElement('div');
            linhaEl.className = 'linha-formulario-grid';

            linhaCampos.forEach(campo => {
                const grupo = document.createElement('div');
                grupo.className = 'grupo-campo';

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
                        option.value = op;
                        option.textContent = op;
                        select.appendChild(option);
                    });
                    containerInput.appendChild(select);
                } else {
                    const input = document.createElement('input');
                    input.type = campo.tipo || 'text';
                    input.id = campo.id;
                    input.placeholder = campo.placeholder || '';
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

        corpoSecao.appendChild(containerCampos);
        blocoSecao.appendChild(corpoSecao);
        wrapper.appendChild(blocoSecao);
    });

    // Rodapé com botões de ação
    const acoes = document.createElement('div');
    acoes.className = 'acoes-formulario';
    acoes.innerHTML = `
        <button type="button" class="btn-cancelar" id="btn-cancelar">${textoCancelar}</button>
        <button type="button" class="btn-continuar" id="btn-continuar">${textoContinuar} <span>→</span></button>
    `;
    wrapper.appendChild(acoes);

    return wrapper;
}