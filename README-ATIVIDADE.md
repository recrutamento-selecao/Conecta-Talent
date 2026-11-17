# Conecta Talent — Atividade Integrada

Entrega construída sobre a branch `integracao`, reutilizando o Stepper da branch Eduardo e evoluindo os formulários da branch Thiago dentro da arquitetura SPA do grupo.

## Como executar

Pré-requisito: Node.js 18 ou superior.

```bash
npm run dev
```

Abra: `http://127.0.0.1:8890/#criar-vaga`

Não é necessário instalar dependências para o servidor local desta entrega.

## Rotas entregues

- `#criar-vaga`: cadastro em quatro etapas, prévia dinâmica e revisão.
- `#configuracao-vaga`: editor isolado do processo seletivo.
- `#cadastrar-recrutador`: dados, acesso, permissões e status.
- `#configuracao-conta`: e-mail, senha e exclusão em cartões separados.
- `#meu-perfil`: dados e identidade da empresa.
- `#gerenciar-vagas` e `#gerenciar-recrutadores`: páginas já existentes, agora conectadas ao roteador.

## Funcionalidades principais

- Stepper com avanço, retorno e dados preservados durante o fluxo.
- Prévia da vaga atualizada enquanto o formulário é preenchido.
- Listas editáveis de responsabilidades, requisitos, diferenciais e benefícios.
- Etapas como objetos completos, com edição, remoção e reordenação.
- Modal de etapa e modal de pergunta.
- Questões de múltipla escolha, verdadeiro/falso e discursivas.
- Permissões individuais no cadastro do recrutador.
- Validação de e-mail e senha forte.
- Layout responsivo, Sidebar compartilhada e identidade Conecta Talent.

## Persistência

A atividade usa `localStorage` com a chave `conectaTalentAtividade`. Isso é uma **simulação local**, claramente identificada na interface e no código. Nenhuma senha é armazenada. A integração real deverá substituir `src/view/services/recrutamentoApi.js` por chamadas HTTP para a API do projeto.

## Estrutura relevante

```text
src/
  view/
    components/
    css/pages/
    pages/
    services/
    utils/
public/
  assets/
    icons/
    images/
```

## Verificação

```bash
npm test
```

O teste confere arquivos obrigatórios, imports da atividade, rotas e integridade básica do CSS.