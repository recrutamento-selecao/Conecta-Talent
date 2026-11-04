# Sprint do Thiago Conecta Talent

Esta entrega converte as cinco telas de recrutamento em páginas da SPA, conforme o plano de arquitetura da equipe. Existe uma única entrada em `src/view/index.html`; as páginas são carregadas por hash e cada módulo exporta uma função `render` que devolve um `HTMLElement`.

## Estrutura

```text
src/view/
  index.html
  app.js
  components/
    campos.js
    etapas.js
    mensagem.js
    resultado.js
    sidebar.js
  css/
    base.css
    pages/recrutamento.css
  pages/
    alterar-senha.js
    cadastrar-recrutador.js
    configuracao-vaga.js
    criar-vaga.js
    meu-perfil.js
  services/
    recrutamentoApi.js
  utils/
    dom.js
    router.js
    validacao.js
```

## Rotas e funções render

| Hash | Função exportada |
| --- | --- |
| `#criar-vaga` | `renderCriarVaga` |
| `#configuracao-vaga` | `renderConfiguracaoVaga` |
| `#cadastrar-recrutador` | `renderCadastrarRecrutador` |
| `#meu-perfil` | `renderMeuPerfil` |
| `#alterar-senha` | `renderAlterarSenha` |

As funções criam o DOM dentro de uma raiz local, registram eventos nos próprios elementos e devolvem a página pronta. Nenhum módulo escreve diretamente no `body`.

## Objetos produzidos

- Criar vaga produz título, departamento, contratação, nível, regime, local, salário, descrição, status, visibilidade, etapas e data de atualização.
- Configuração de vaga produz identificador, título, status, visibilidade, limite de candidatos, etapas e data de atualização.
- Cadastro de recrutador produz dados pessoais, usuário, status e lista de permissões. A senha não aparece no objeto exibido.
- Meu perfil produz empresa, endereço, responsável e data de atualização.
- Alterar senha produz apenas metadados da alteração. As senhas não são armazenadas nem exibidas.

Cada página mostra o objeto produzido após uma submissão válida, o que serve como evidência funcional para o card.

## Validações

- Campos obrigatórios exibem mensagens ao lado do campo.
- E-mails são validados.
- Senhas exigem oito caracteres, letra maiúscula, minúscula, número e símbolo.
- Senha e confirmação precisam coincidir.
- Criar e configurar vaga exigem ao menos uma etapa.
- Etapas podem ser adicionadas e removidas.

## Contratos de serviço

`services/recrutamentoApi.js` exporta `criarVaga`, `atualizarVaga`, `criarRecrutador`, `atualizarPerfil` e `alterarSenha`.

Nesta entrega isolada, os serviços usam `localStorage` como persistência temporária de demonstração. Na integração com a branch base, somente esse arquivo deve ser alterado para usar `fetch` relativo em `/api`. Componentes e páginas não acessam Supabase.

## Sidebar comum

Existe apenas uma implementação de sidebar nesta entrega. Os itens Dashboard, lista geral de Recrutadores, Assinatura e Configuração geral não foram adicionados porque suas páginas e hashes pertencem à integração da branch base. Quando o mapa canônico estiver disponível, esses itens devem ser registrados no componente comum da equipe, sem criar outra sidebar.

## CSS isolado

As regras específicas começam em `.pagina-recrutamento`, evitando interferência em páginas das outras branches. `base.css` contém apenas o reset e estilos comuns da entrada da SPA.

## Como integrar

1. Copiar `pages`, `components`, `services`, `utils` e `css/pages` para a `src/view` canônica.
2. Registrar os cinco hashes no mapa central da branch base.
3. Manter apenas a sidebar canônica da equipe; o componente desta entrega pode ser usado como referência ou removido após a integração.
4. Substituir a persistência temporária de `recrutamentoApi.js` por chamadas relativas à API Express.

## Como executar localmente

Sirva a pasta `src/view` com um servidor estático. Exemplo:

```bash
python -m http.server 8765 -d src/view
```

Abra `http://127.0.0.1:8765/#criar-vaga`.

## Critérios atendidos

- Cinco telas exportam funções `render`.
- Formulários produzem objetos previsíveis.
- Validações são visíveis.
- Etapas podem ser adicionadas e removidas.
- Senha e confirmação são validadas.
- CSS de página está limitado por classe raiz.
- Contratos de serviço e hashes estão definidos.
- Não existem cinco aplicações HTML independentes.
- Não há acesso direto ao Supabase.
