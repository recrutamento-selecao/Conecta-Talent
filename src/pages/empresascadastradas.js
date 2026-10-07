import { criartabela, ICONES } from '../components/table.js';

// Dados fake no formato que virá do backend.
// Futuramente:
// const resposta = await fetch('/api/empresas');
// const empresas = await resposta.json();
const empresas = [
    { id: 1, empresa: 'TechCorp Brasil', recrutadores: 12, vagas: 28, plano: 'Empresarial' },
    { id: 2, empresa: 'Recruta+',        recrutadores: 8,  vagas: 15, plano: 'Profissional' },
    { id: 3, empresa: 'StartUp Valley',  recrutadores: 3,  vagas: 7,  plano: 'Gratuito' },
    { id: 4, empresa: 'Global RH',       recrutadores: 22, vagas: 45, plano: 'Empresarial' },
    { id: 5, empresa: 'Educa Talentos',  recrutadores: 5,  vagas: 12, plano: 'Educacional' }
];

const coresPlano = {
    Empresarial: 'verde',
    Profissional: 'azul',
    Gratuito: 'cinza',
    Educacional: 'roxo'
};

function criarEmpresa(nome) {
    const div = document.createElement('div');
    div.className = 'empresa';

    const icone = document.createElement('span');
    icone.className = 'icone-empresa';
    icone.innerHTML = ICONES.empresa;

    const texto = document.createElement('span');
    texto.textContent = nome;

    div.append(icone, texto);
    return div;
}

function criarPlano(plano) {
    const span = document.createElement('span');
    span.className = `status-pill ${coresPlano[plano] || 'cinza'}`;
    span.textContent = plano;
    return span;
}

const colunas = [
    { chave: 'empresa',      titulo: 'EMPRESA',      render: criarEmpresa },
    { chave: 'recrutadores', titulo: 'RECRUTADORES' },
    { chave: 'vagas',        titulo: 'VAGAS' },
    { chave: 'plano',        titulo: 'PLANO',        render: criarPlano }
];

criartabela(colunas, empresas, {
    titulo: 'Empresas Cadastradas',
    zebra: true,
    aoEditar: empresa => console.log('Editar', empresa),
    aoExcluir: empresa => console.log('Excluir', empresa)
});