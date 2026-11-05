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