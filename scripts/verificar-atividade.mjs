import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const obrigatorios = [
  "src/view/pages/criar-vaga.js",
  "src/view/pages/configuracao-vaga.js",
  "src/view/pages/cadastrar-recrutador.js",
  "src/view/pages/configuracao-conta.js",
  "src/view/pages/meu-perfil.js",
  "src/view/components/etapas.js",
  "src/view/components/lista-editavel.js",
  "src/view/css/pages/recrutamento.css",
  "src/view/services/recrutamentoApi.js"
];
const modulosAtividade = [
  ...obrigatorios.filter((arquivo) => arquivo.endsWith(".js")),
  "src/view/utils/router.js",
  "src/view/utils/dom.js",
  "src/view/utils/validacao.js",
  "src/view/components/campos.js",
  "src/view/components/mensagem.js",
  "src/view/components/sidebar.js",
  "src/view/components/stepper.js"
];

async function listarJs(diretorio) {
  const itens = await readdir(diretorio, { withFileTypes: true });
  const arquivos = [];
  for (const item of itens) {
    const destino = path.join(diretorio, item.name);
    if (item.isDirectory()) arquivos.push(...await listarJs(destino));
    else if (item.name.endsWith(".js")) arquivos.push(destino);
  }
  return arquivos;
}

for (const arquivo of obrigatorios) await access(path.join(raiz, arquivo));
for (const relativo of modulosAtividade) {
  const arquivo = path.join(raiz, relativo);
  const codigo = await readFile(arquivo, "utf8");
  for (const ocorrencia of codigo.matchAll(/from\s+["'](\.\.?\/[^"']+)["']/g)) {
    await access(path.resolve(path.dirname(arquivo), ocorrencia[1]));
  }
}

const arquivosJs = await listarJs(path.join(raiz, "src", "view"));
const router = await readFile(path.join(raiz, "src/view/utils/router.js"), "utf8");
for (const rota of ["#criar-vaga", "#configuracao-vaga", "#cadastrar-recrutador", "#configuracao-conta", "#meu-perfil"]) {
  if (!router.includes(rota)) throw new Error(`Rota ausente: ${rota}`);
}
const css = await readFile(path.join(raiz, "src/view/css/pages/recrutamento.css"), "utf8");
if ((css.match(/{/g) || []).length !== (css.match(/}/g) || []).length) throw new Error("CSS com chaves desbalanceadas");
console.log(`Verificação estrutural concluída: ${arquivosJs.length} módulos, ${obrigatorios.length} entregáveis e 5 rotas.`);