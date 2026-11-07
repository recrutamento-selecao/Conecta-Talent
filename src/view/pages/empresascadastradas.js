import { criarTabela, ICONES } from '../components/table.js';

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

export function renderEmpresasCadastradas(empresas = []) {
    const bloco = document.createElement('div');

    criarTabela(colunas, empresas, {
        container: bloco,
        titulo: 'Empresas Cadastradas',
        zebra: true,
        aoEditar: empresa => console.log('Editar', empresa),
        aoExcluir: empresa => console.log('Excluir', empresa)
    });

    return bloco;
}