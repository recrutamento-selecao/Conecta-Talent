import { criarCampo, criarGrade, criarListaRepetivel } from '../utils/formulario.js';

// As 7 etapas do cadastro do candidato. Cada etapa recebe o estado único do
// cadastro e devolve um HTMLElement já preenchido com o que está nele.
// Os campos seguem o documento de contexto do projeto (seção "Currículo do candidato").

export function criarEstadoInicial() {
    return {
        dadosPessoais: { nomeCompleto: '', dataNascimento: '', cidade: '', uf: '', email: '', telefone: '' },
        formacaoAcademica: [],
        experienciaProfissional: [],
        cursosCertificados: [],
        idiomas: [],
        habilidades: [],
        diversidade: { possuiDeficiencia: '', tipoDeficiencia: '', necessitaAdaptacao: false, observacoes: '' }
    };
}

function criarEtapa(titulo, descricao, ...conteudo) {
    const etapa = document.createElement('section');
    etapa.className = 'cadastro-etapa';

    const h2 = document.createElement('h2');
    h2.textContent = titulo;

    const p = document.createElement('p');
    p.className = 'cadastro-etapa-descricao';
    p.textContent = descricao;

    const corpo = document.createElement('div');
    corpo.className = 'cadastro-etapa-corpo';
    corpo.append(...conteudo);

    etapa.append(h2, p, corpo);
    return etapa;
}

function renderEtapaDadosPessoais(estado) {
    return criarEtapa(
        'Dados pessoais',
        'Informe seus dados de identificação e contato.',
        criarGrade([
            { chave: 'nomeCompleto', rotulo: 'Nome completo' },
            { chave: 'dataNascimento', rotulo: 'Data de nascimento', tipo: 'date' },
            { chave: 'email', rotulo: 'E-mail', tipo: 'email' },
            { chave: 'telefone', rotulo: 'Telefone', tipo: 'tel', placeholder: '(00) 00000-0000' },
            { chave: 'cidade', rotulo: 'Cidade' },
            { chave: 'uf', rotulo: 'UF', placeholder: 'SP' }
        ], estado.dadosPessoais)
    );
}

function renderEtapaFormacao(estado) {
    return criarEtapa(
        'Formação acadêmica',
        'Adicione suas formações. Você pode avançar sem adicionar nenhuma.',
        criarListaRepetivel({
            rotuloItem: 'Formação',
            rotuloAdicionar: 'Adicionar formação',
            itens: estado.formacaoAcademica,
            campos: [
                {
                    chave: 'escolaridade',
                    rotulo: 'Escolaridade',
                    tipo: 'select',
                    opcoes: ['Ensino fundamental', 'Ensino médio', 'Técnico', 'Superior incompleto', 'Superior completo', 'Pós-graduação']
                },
                { chave: 'curso', rotulo: 'Curso' },
                { chave: 'instituicao', rotulo: 'Instituição' },
                { chave: 'inicio', rotulo: 'Início', tipo: 'month' },
                { chave: 'fim', rotulo: 'Conclusão (ou previsão)', tipo: 'month' }
            ]
        })
    );
}

function renderEtapaExperiencia(estado) {
    return criarEtapa(
        'Experiência profissional',
        'Adicione suas experiências. Se ainda não tem, pode avançar sem adicionar nenhuma.',
        criarListaRepetivel({
            rotuloItem: 'Experiência',
            rotuloAdicionar: 'Adicionar experiência',
            itens: estado.experienciaProfissional,
            campos: [
                { chave: 'empresa', rotulo: 'Empresa' },
                { chave: 'cargo', rotulo: 'Cargo' },
                { chave: 'inicio', rotulo: 'Início', tipo: 'month' },
                { chave: 'fim', rotulo: 'Fim', tipo: 'month' },
                { chave: 'atividades', rotulo: 'Atividades realizadas', tipo: 'textarea' }
            ]
        })
    );
}

function renderEtapaCursos(estado) {
    return criarEtapa(
        'Cursos e certificados',
        'Adicione cursos complementares e certificados.',
        criarListaRepetivel({
            rotuloItem: 'Curso',
            rotuloAdicionar: 'Adicionar curso',
            itens: estado.cursosCertificados,
            campos: [
                { chave: 'curso', rotulo: 'Curso ou certificado' },
                { chave: 'instituicao', rotulo: 'Instituição' },
                { chave: 'cargaHoraria', rotulo: 'Carga horária (horas)', tipo: 'number' },
                { chave: 'conclusao', rotulo: 'Conclusão', tipo: 'month' }
            ]
        })
    );
}

function renderEtapaIdiomas(estado) {
    return criarEtapa(
        'Idiomas',
        'Informe os idiomas que você conhece e o nível de cada um.',
        criarListaRepetivel({
            rotuloItem: 'Idioma',
            rotuloAdicionar: 'Adicionar idioma',
            itens: estado.idiomas,
            campos: [
                { chave: 'idioma', rotulo: 'Idioma' },
                { chave: 'nivel', rotulo: 'Nível', tipo: 'select', opcoes: ['Básico', 'Intermediário', 'Avançado', 'Fluente'] }
            ]
        })
    );
}

function renderEtapaHabilidades(estado) {
    return criarEtapa(
        'Habilidades',
        'Liste suas habilidades técnicas e outras habilidades relevantes.',
        criarListaRepetivel({
            rotuloItem: 'Habilidade',
            rotuloAdicionar: 'Adicionar habilidade',
            itens: estado.habilidades,
            campos: [
                { chave: 'habilidade', rotulo: 'Habilidade', placeholder: 'Ex.: JavaScript, comunicação' },
                { chave: 'tipo', rotulo: 'Tipo', tipo: 'select', opcoes: ['Técnica', 'Outra'] }
            ]
        })
    );
}

function renderEtapaDiversidade(estado) {
    const dados = estado.diversidade;

    const campoTipo = criarCampo({
        chave: 'tipoDeficiencia',
        rotulo: 'Tipo de deficiência',
        tipo: 'select',
        opcoes: ['Física', 'Auditiva', 'Visual', 'Intelectual', 'Múltipla', 'Outra'],
        dados
    });

    // O campo de tipo só aparece quando a resposta é "Sim".
    function atualizarTipo() {
        const mostrar = dados.possuiDeficiencia === 'Sim';
        campoTipo.hidden = !mostrar;
        if (!mostrar) {
            dados.tipoDeficiencia = '';
            campoTipo.querySelector('select').value = '';
        }
    }

    const campoPossui = criarCampo({
        chave: 'possuiDeficiencia',
        rotulo: 'Possui alguma deficiência?',
        tipo: 'select',
        opcoes: ['Sim', 'Não', 'Prefiro não informar'],
        dados,
        aoMudar: atualizarTipo
    });

    atualizarTipo();

    const grade = document.createElement('div');
    grade.className = 'form-grade';
    grade.append(campoPossui, campoTipo);

    return criarEtapa(
        'Diversidade',
        'Estas informações são opcionais e ajudam a empresa a oferecer as adaptações necessárias.',
        grade,
        criarCampo({ chave: 'necessitaAdaptacao', rotulo: 'Preciso de adaptações no processo seletivo', tipo: 'checkbox', dados }),
        criarCampo({ chave: 'observacoes', rotulo: 'Observações', tipo: 'textarea', dados })
    );
}

// A ordem e os ids seguem ETAPAS_CADASTRO, do stepper.
export const ETAPAS = [
    { id: 1, render: renderEtapaDadosPessoais },
    { id: 2, render: renderEtapaFormacao },
    { id: 3, render: renderEtapaExperiencia },
    { id: 4, render: renderEtapaCursos },
    { id: 5, render: renderEtapaIdiomas },
    { id: 6, render: renderEtapaHabilidades },
    { id: 7, render: renderEtapaDiversidade }
];