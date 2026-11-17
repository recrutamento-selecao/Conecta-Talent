# Evidências de validação

Data da validação: 16/11/2026.

## Validações automatizadas

- 52 módulos JavaScript passaram em `node --check`.
- 9 entregáveis obrigatórios encontrados.
- Imports da área da atividade resolvidos.
- 5 rotas principais presentes no roteador.
- Chaves do CSS balanceadas.

## Validação no navegador

- Servidor local respondeu HTTP 200.
- Fluxo avançou pelas quatro etapas sem erro no console.
- Campos básicos refletiram na prévia imediatamente.
- Valores de nível e jornada permaneceram no estado ao avançar.
- Modal de etapa abriu corretamente.
- Tipo “Teste técnico” exibiu a configuração condicional.
- Modal de pergunta aceitou alternativas, resposta e pontuação.
- Nova etapa apareceu na lista e na revisão.
- Cadastro de recrutador exibiu dados, acesso, permissões e status.
- Conta exibiu e-mail, senha e exclusão em áreas separadas.
- Perfil exibiu identidade e endereço da empresa.
- Estado vazio do editor foi ocultado quando existem etapas.
- Layout desktop e breakpoint mobile foram conferidos.
- Nenhum erro JavaScript foi registrado nas rotas testadas.

## Observação

Operações de salvar/publicar usam `localStorage` e são identificadas como simulação local. Nenhuma API externa é chamada por essas telas.