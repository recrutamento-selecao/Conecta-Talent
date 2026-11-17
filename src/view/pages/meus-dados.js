import { criarSidebar } from '../components/sidebar.js';
import { criarFormularioDinamico } from '../components/form.js';
import { criarStepper } from '../components/stepper.js'; 

export function renderMeusDados() {
    const containerPagina = document.createElement('div');
    containerPagina.className = 'pagina-layout-dashboard';

    const sidebar = criarSidebar('candidato', 'Thaeny Soares');
    containerPagina.appendChild(sidebar);

    const conteudoPrincipal = document.createElement('main');
    conteudoPrincipal.className = 'conteudo-principal';

    const h1 = document.createElement('h1');
    h1.className = 'titulo-pagina';
    h1.textContent = 'Meus dados';
    conteudoPrincipal.appendChild(h1);

    const pSub = document.createElement('p');
    pSub.className = 'subtitulo-pagina';
    pSub.textContent = 'Gerencie suas informações pessoais e profissionais.';
    conteudoPrincipal.appendChild(pSub);

    const stepperElement = criarStepper({
        etapaAtual: 1,
        onChange: (idEtapa) => {
            console.log(`Navegar para a etapa ${idEtapa}`);
        }
    });
    conteudoPrincipal.appendChild(stepperElement);

    const iconeCalendario = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
    const iconeLinkedin = `<svg width="15" height="15" viewBox="0 0 24 24" fill="#0a66c2"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>`;
    const iconeLink = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;

    const formularioElement = criarFormularioDinamico({
        secoes: [
            {
                titulo: 'Dados pessoais',
                icone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
                comFoto: true,
                linhas: [
                    [
                        { id: 'input-nome', label: 'Nome completo', placeholder: 'Digite seu nome completo', obrigatorio: true },
                        { id: 'input-nascimento', label: 'Data de nascimento', placeholder: 'dd/mm/aaaa', obrigatorio: true, iconeDireita: iconeCalendario },
                        { id: 'select-genero', label: 'Gênero', tipo: 'select', opcoes: ['Feminino', 'Masculino', 'Outro', 'Prefiro não informar'], obrigatorio: true }
                    ],
                    [
                        { id: 'select-estado-civil', label: 'Estado civil', tipo: 'select', opcoes: ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)'], obrigatorio: true },
                        { id: 'input-cpf', label: 'CPF', placeholder: '000.000.000-00', obrigatorio: true },
                        { id: 'input-rg', label: 'RG', placeholder: '00.000.000-0', obrigatorio: true }
                    ],
                    [
                        { id: 'input-email', label: 'E-mail', tipo: 'email', placeholder: 'seuemail@example.com', obrigatorio: true },
                        { id: 'input-celular', label: 'Celular', placeholder: '(00) 00000-0000', obrigatorio: true },
                        { id: 'input-telefone', label: 'Telefone (opcional)', placeholder: '(00) 0000-0000' }
                    ],
                    [
                        { id: 'input-linkedin', label: 'LinkedIn (opcional)', placeholder: 'https://www.linkedin.com/in/seu-perfil', iconeEsquerda: iconeLinkedin },
                        { id: 'input-portfolio', label: 'Portfólio (opcional)', placeholder: 'https://seuportfolio.com', iconeEsquerda: iconeLink }
                    ]
                ]
            },
            {
                titulo: 'Endereço',
                icone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
                linhas: [
                    [
                        { id: 'input-cep', label: 'CEP', placeholder: '0000-000', obrigatorio: true },
                        { id: 'input-logradouro', label: 'Logradouro', placeholder: 'Rua, Avenida, etc.', obrigatorio: true },
                        { id: 'input-numero', label: 'Número', placeholder: 'Nº', obrigatorio: true },
                        { id: 'input-complemento', label: 'Complemento', placeholder: 'Apto, Bloco, Sala, etc.' }
                    ],
                    [
                        { id: 'select-bairro', label: 'Bairro', tipo: 'select', placeholder: 'Digite o bairro...', opcoes: ['Centro', 'Campolim', 'Jardim Europa'], obrigatorio: true },
                        { id: 'select-cidade', label: 'Cidade', tipo: 'select', placeholder: 'Digite a cidade...', opcoes: ['Sorocaba', 'Votorantim', 'São Paulo'], obrigatorio: true },
                        { id: 'select-estado', label: 'Estado', tipo: 'select', placeholder: 'Selecione', opcoes: ['SP', 'RJ', 'MG', 'RS'], obrigatorio: true }
                    ]
                ]
            }
        ]
    });

   const alertaErro = document.createElement('div');
    alertaErro.className = 'alerta-erro-formulario';
    alertaErro.style.display = 'none';
    alertaErro.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="13"></line>
            <line x1="12" y1="16" x2="12" y2="16.01"></line>
        </svg>
        <span id="texto-alerta-erro">Existem campos obrigatórios não preenchidos. Por favor, verifique os itens destacados em vermelho.</span>
    `;
    
    formularioElement.insertBefore(alertaErro, formularioElement.firstChild);

    const idsObrigatorios = [
        'input-nome', 'input-nascimento', 'select-genero', 
        'select-estado-civil', 'input-cpf', 'input-rg', 
        'input-email', 'input-celular', 'input-cep', 
        'input-logradouro', 'input-numero', 'select-bairro', 
        'select-cidade', 'select-estado'
    ];

    formularioElement.querySelector('#btn-continuar').addEventListener('click', () => {
        let formularioValido = true;
        let mensagemErroCustomizada = 'Existem campos obrigatórios não preenchidos. Por favor, verifique os itens destacados em vermelho.';

        idsObrigatorios.forEach(id => {
            const elemento = formularioElement.querySelector(`#${id}`);
            if (elemento) {
                const grupoCampo = elemento.closest('.grupo-campo');
                if (grupoCampo) {
                    grupoCampo.classList.remove('erro-campo');
                }
            }
        });

        // 1. Valida campos obrigatórios vazios
        idsObrigatorios.forEach(id => {
            const elemento = formularioElement.querySelector(`#${id}`);
            if (elemento && !elemento.value.trim()) {
                formularioValido = false;
                const grupoCampo = elemento.closest('.grupo-campo');
                if (grupoCampo) {
                    grupoCampo.classList.add('erro-campo');
                }
            }
        });

        // 2. Validação específica de formato de e-mail (caso o campo não esteja vazio mas esteja mal formatado)
        const inputEmail = formularioElement.querySelector('#input-email');
        if (inputEmail && inputEmail.value.trim()) {
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(inputEmail.value.trim())) {
                formularioValido = false;
                mensagemErroCustomizada = 'Por favor, insira um endereço de e-mail válido (ex: seuemail@example.com).';
                const grupoCampo = inputEmail.closest('.grupo-campo');
                if (grupoCampo) {
                    grupoCampo.classList.add('erro-campo');
                }
            }
        }

        // Exibe ou oculta o alerta com base na validação
        const spanTextoAlerta = alertaErro.querySelector('#texto-alerta-erro');
        if (!formularioValido) {
            spanTextoAlerta.textContent = mensagemErroCustomizada;
            alertaErro.style.display = 'flex';
            formularioElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            alertaErro.style.display = 'none';
            alert('Dados validados e salvos com sucesso! Avançando para o próximo passo.');
            // window.location.hash = '#proximo-passo';
        }
    });

    formularioElement.querySelector('#btn-cancelar').addEventListener('click', () => {
        window.location.hash = '#dashboard-candidato';
    });

    conteudoPrincipal.appendChild(formularioElement);
    containerPagina.appendChild(conteudoPrincipal);

    return containerPagina;
}