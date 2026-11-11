# Conecta Talent - Sistema de recrutamento e seleção (Educacional)

Figma: https://www.figma.com/proto/UAEUInGbjQoI1vmLsbcxmw/Sistema?node-id=0-1&t=XqEl0mGOHo7tCNGD-1

## Descrição geral do sistema

A plataforma de recrutamento e seleção educacional foi desenvolvida para simular o funcionamento de um sistema real de recrutamento e seleção dentro do ambiente escolar.


## Objetivos da Plataforma

- Simular um ambiente real de recrutamento e seleção em sala de aula.
- Permitir que alunos pratiquem processos seletivos de forma educacional.
- Demonstrar como funciona o cadastro de candidatos e vagas.


## Perfis do Sistema

- Candidato: Busca vagas de emprego, gerencia seu perfil profissional e acompanha o status de suas candidaturas em tempo real.
- Recrutador: Publica e gerencia vagas, realiza a triagem de currículos e conduz o fluxo dos processos seletivos.
- Administrador: Possui controle global do sistema, moderando usuários, supervisionando conteúdos e analisando métricas da plataforma.

## LGPD e Privacidade

Esta plataforma está em conformidade com a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018).

### Consentimento
Todos os usuários devem consentir expressamente com o uso de seus dados pessoais 
no momento do cadastro. O consentimento é informado, livre e inequívoco, podendo 
ser revogado a qualquer momento pelo titular.

### Direito ao Esquecimento
O usuário tem o direito de solicitar a exclusão de seus dados pessoais da 
plataforma. Após a solicitação, os dados serão removidos dos sistemas em prazo 
previsto pela legislação, salvo obrigações legais que exijam a retenção.
# Conecta Talent - Arquitetura SPA (Single Page Application)

Este projeto foi migrado para uma arquitetura moderna baseada em **SPA (Single Page Application)** com roteamento por Hash (`window.location.hash`), garantindo uma navegação fluida, modular e sem recarregamento de página, em conformidade com os requisitos da sprint.

---

## 📂 Estrutura de Pastas (`src/view`)

* **`components/`**: Elementos canônicos reutilizáveis da interface (ex: `header.js`, `footer.js`, `sidebar.js`, `modal.js`).
* **`pages/`**: Páginas e dashboards da aplicação. Cada ficheiro representa uma vista isolada.
* **`utils/`**: Utilitários do sistema, com destaque para o motor de roteamento (`router.js`).
* **`css/`**: Folhas de estilo globais e modulares.
* **`app.js`**: Ponto de entrada que inicializa a aplicação quando o DOM é carregado.

---

## 🛠️ Contrato para Criação de Novas Páginas

Para garantir a padronização e o bom funcionamento do router central, **todos os membros da equipe** devem seguir estritamente o seguinte contrato ao criar uma nova página:

1. **Retornar um HTMLElement:** O ficheiro da página deve exportar uma função de renderização (ex: `renderMinhaPagina()`) que cria e retorna unicamente um elemento DOM (`HTMLElement`), **nunca** manipulando diretamente o `document.body` nem o container `#app`.
2. **Utilizar Navegação por Hash:** Quaisquer links ou botões de redirecionamento internos devem utilizar rotas baseadas em hash (ex: `#minha-rota` ou `window.location.hash = '#minha-rota'`) em vez de apontar para ficheiros `.html` físicos.

### Exemplo de uma Página Padronizada (`src/view/pages/minha-pagina.js`):

```javascript
export function renderMinhaPagina() {
    const container = document.createElement('div');
    container.classList.add('minha-pagina-container');

    const titulo = document.createElement('h1');
    titulo.textContent = "Título da Página";
    container.appendChild(titulo);

    return container;
}
```

---

## 🗺️ Como Registrar uma Nova Rota

Assim que a página estiver criada em `src/view/pages/`, você deve registrá-la no motor de rotas central:

1. Importe a função de renderização no arquivo `src/view/utils/router.js`:

   ```javascript
   import { renderMinhaPagina } from '../pages/minha-pagina.js';
   ```

2. Adicione o novo `case` correspondente ao hash dentro do `switch` de navegação no mesmo arquivo:

   ```javascript
   case '#minha-rota':
       app.appendChild(renderMinhaPagina());
       break;
   ```