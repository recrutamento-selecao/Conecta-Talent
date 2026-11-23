const ESTADO_PADRAO = {
    planoAtualId: 'gratuito',
    planoAtualNome: 'Gratuito',
    planoAtualDescricao: 'Ideal para conhecer a plataforma.',
    planoAtualPreco: 'R$ 0,00',
    planoAtualPrecoDetalhe: 'R$ 0,00 /mês',
    proximaRenovacaoCard: '—',
    proximaRenovacaoResumo: 'Sem cobrança',
    planoSelecionadoId: 'empresarial-educacional',
    planoSelecionadoNome: 'Empresarial/Educacional',
    planoSelecionadoPreco: 'R$ 349,00',
    planoSelecionadoPrecoDetalhe: 'R$ 349,00 /mês',
    dataProximaCobranca: '23 de dezembro de 2026',
    status: 'Ativa',
    cartaoFinal: '1234',
    titular: 'NOME DA EMPRESA',
    validade: '08/2028',
    cancelada: false
};

let memoriaAssinatura = { ...ESTADO_PADRAO };

export function obterEstadoAssinatura() {
    return { ...memoriaAssinatura };
}

export function salvarEstadoAssinatura(parcial) {
    memoriaAssinatura = { ...memoriaAssinatura, ...parcial };
    return { ...memoriaAssinatura };
}