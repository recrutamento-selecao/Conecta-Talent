import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const raiz = path.dirname(fileURLToPath(import.meta.url));
const view = path.join(raiz, "src", "view");
const assets = path.join(raiz, "public", "assets");
const porta = Number(process.env.PORT || 8890);
const tipos = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

function caminhoSeguro(base, solicitado) {
  const normalizado = path.normalize(solicitado).replace(/^(\.\.(\\|\/|$))+/, "");
  const destino = path.resolve(base, `.${path.sep}${normalizado}`);
  return destino.startsWith(path.resolve(base)) ? destino : null;
}

const servidor = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    let base = view;
    let solicitado = decodeURIComponent(url.pathname);
    if (solicitado.startsWith("/assets/")) {
      base = assets;
      solicitado = solicitado.replace(/^\/assets/, "");
    }
    if (solicitado === "/") solicitado = "/index.html";
    let arquivo = caminhoSeguro(base, solicitado);
    if (!arquivo) throw new Error("Caminho inválido");
    try {
      const info = await stat(arquivo);
      if (info.isDirectory()) arquivo = path.join(arquivo, "index.html");
    } catch {
      arquivo = path.join(view, "index.html");
    }
    const conteudo = await readFile(arquivo);
    res.writeHead(200, { "Content-Type": tipos[path.extname(arquivo).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(conteudo);
  } catch (erro) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`Arquivo não encontrado: ${erro.message}`);
  }
});

servidor.listen(porta, "127.0.0.1", () => {
  console.log(`Conecta Talent em http://127.0.0.1:${porta}/#criar-vaga`);
});