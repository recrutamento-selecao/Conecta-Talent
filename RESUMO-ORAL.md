# Resumo para apresentação oral

## O que foi feito

Integrei a área da empresa ao projeto do grupo e criei um fluxo completo de publicação de vaga. O cadastro possui quatro passos: informações básicas, requisitos, processo seletivo e revisão/publicação. Também implementei cadastro de recrutador, configuração da conta, perfil da empresa e um editor reutilizável de etapas.

## Por que usei a arquitetura existente

A branch `integracao` já concentrava o roteador, a Sidebar e o padrão de páginas da SPA. Manter essa base reduziu duplicação e evitou criar páginas HTML isoladas. O Stepper existente foi reutilizado e configurado para o fluxo de vagas.

## Como os dados são preservados ao voltar

O fluxo mantém um objeto de estado em memória. Cada campo atualiza esse objeto nos eventos de entrada e mudança. Ao voltar para um passo, o formulário é recriado com os valores do estado. O botão “Salvar rascunho” também grava uma cópia no `localStorage`.

## Como funciona a prévia dinâmica

Os campos chamam `atualizarPreview()` após cada alteração. A função lê o mesmo estado usado pelo formulário e atualiza título, modalidade, local, contratação, descrição, senioridade, salário, quantidade de requisitos e etapas.

## Como o processo seletivo foi modelado

Cada etapa é um objeto com `id`, `nome`, `tipo`, `descricao`, `duracao`, `responsavel`, `obrigatoria` e `configuracao`. A configuração de teste pode conter `notaMinima`, `instrucoes` e uma lista de perguntas.

## Como funcionam as perguntas

Perguntas possuem enunciado, tipo, pontos, alternativas e resposta correta. Questões discursivas não exigem alternativas; verdadeiro/falso gera opções fixas; múltipla escolha exige pelo menos duas alternativas e uma resposta correta.

## Como as permissões foram representadas

As permissões do recrutador são um objeto de booleanos, por exemplo `publicarVagas`, `editarVagas` e `aprovarCandidatos`. Isso facilita validar cada ação futuramente no backend.

## Por que localStorage não é API

`localStorage` só armazena dados no navegador atual, não autentica usuários, não oferece controle de acesso e não compartilha dados entre dispositivos. Ele foi usado apenas para demonstrar o fluxo. A integração real deve usar `fetch` e endpoints protegidos.

## Cuidados de segurança

- Senhas nunca são gravadas no `localStorage`.
- O formulário valida senha forte e confirmação.
- A exclusão exige a palavra `EXCLUIR`.
- As ações sensíveis estão separadas visualmente.
- O serviço informa quando a operação é apenas uma simulação local.

## Próximos passos em produção

Substituir o serviço local por API, adicionar autenticação e autorização no servidor, validar dados novamente no backend, registrar auditoria, enviar convites por e-mail e integrar upload seguro de logo.