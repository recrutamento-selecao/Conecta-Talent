const app = document.querySelector('#app');

const field = (label, type = 'text') => `
  <div class="field"><label>${label}</label><div class="input-wrap">
    ${type === 'email' ? '<span class="icon">✉</span>' : ''}
    <input type="${type === 'password' ? 'password' : 'text'}">
    ${type === 'password' ? '<button class="eye" type="button">◉</button>' : ''}
  </div></div>`;

const auth = (body, wide = false) => `<section class="auth-bg"><div class="card ${wide ? 'wide' : ''}">${body}</div></section>`;

function home() {
  const features = [
    ['Para candidatos', 'Encontre vagas compatíveis com o seu perfil e candidate-se em poucos cliques'],
    ['Para empresas', 'Publique vagas, gerencie candidatos e encontre os melhores talentos para a sua equipe.'],
    ['Processos simplificados', 'Etapas claras e organizadas para facilitar a conexão entre empresas e candidatos.'],
    ['Segurança e confiança', 'Seus dados protegidos com tecnologia de ponta e total conformidade com a LGPD.']
  ];
  return `<section class="home">
    <nav class="nav"><button class="nav-link" data-modal="Sobre nós">Sobre nós　⌄</button><button class="nav-link" data-modal="Recursos">Recursos　⌄</button><button class="nav-link" data-modal="Planos">Planos　⌄</button><button class="nav-link" data-modal="Contato">Contato　⌄</button><button class="navbtn" data-view="login">Entrar</button><button class="signup" data-view="company1">Cadastrar-se</button></nav>
    <section class="hero"><div class="hero-content">
      <h1>Conectando você com<br>as melhores oportunidades</h1>
      <p>Encontre a vaga ideal para o seu perfil ou publique vagas<br>e conecte-se com talentos incríveis.</p>
      <div class="searchbox">
        <h2>Encontre sua vaga ideal !</h2><small>Busque por cargo, palavra-chave ou localização</small>
        <div class="search-row"><input placeholder="⌕  Cargo ou palavra-chave"><input placeholder="●  Localização"><button>⌕ Buscar vagas</button></div>
        <div class="pills"><strong>Pesquisas populares:</strong><span class="pill">Desenvolvedor</span><span class="pill">Analista</span><span class="pill">Marketing</span><span class="pill">Vendas</span></div>
      </div>
    </div></section>
    <section class="home-content"><h2>Tudo que você precisa em um só lugar</h2><p>Soluções inteligentes para candidatos e empresas</p><div class="features">${features.map(([title,text]) => `<article class="feature"><h3>${title}</h3><p>${text}</p></article>`).join('')}</div></section>
  </section>`;
}

function login() { return auth(`<h1>Acesse sua conta</h1><div class="tabs"><button class="tab">Candidato</button><button class="tab">Empresa</button></div><p class="muted">Não tem uma conta? <a class="link" data-view="company1">Crie uma</a></p>${field('E-mail','email')}${field('Senha','password')}<a class="forgot" data-view="forgot">Esqueci minha senha</a><button class="primary" data-note="Login simulado">Entrar</button><div class="divider">Ou continue com</div><div class="socials"><button class="social"><b class="google">G</b>Google</button><button class="social">▦ Microsoft</button></div>`); }
function forgot() { return auth(`<h2>Informe seu e-mail</h2><p class="muted">Digite o e-mail cadastrado em sua conta para<br>receber o código de verificação.</p>${field('E-mail','email')}<button class="primary" data-view="verify" style="margin-top:20px">Enviar código</button><button class="back" data-view="login"><b>‹</b> Voltar para o login</button>`); }
function verify() { return auth(`<div class="code-icon">♙</div><h2>Verifique seu e-mail</h2><p class="muted">Enviamos um código de 6 dígitos para<br><span class="email-chip">✉ empresa*@emp.br</span></p><div class="code">${'<input maxlength="1">'.repeat(6)}</div><div class="resend">Não recebeu o código? <button>Reenviar</button></div><button class="primary" data-view="login">Verificar código</button><button class="back" data-view="login"><b>‹</b> Voltar para o login</button>`); }
function company(step = 1) { const inputs = step === 1 ? `${field('Razão social')}${field('CNPJ')}${field('E-mail corporativo','email')}<div class="small-inputs">${field('Senha','password')}${field('Confirmar senha','password')}</div>` : `<div class="small-inputs">${field('Nome Fantasia')}${field('Telefone')}</div><div class="small-inputs">${field('Porte empresa')}${field('Tipo empresa')}</div><div class="small-inputs">${field('Endereço')}${field('CEP')}</div><div class="small-inputs">${field('Estado')}${field('Cidade')}</div>`; return auth(`<h2>Cadastro de empresa</h2><div class="steps"><div class="step"><span class="bubble">${step===2?'✓':'1'}</span>Cadastro rápido</div><div class="step"><span class="bubble">2</span>Dados complementares</div></div><p class="muted">Complete as informações da sua empresa</p><div class="compact">${inputs}</div><div class="actions">${step===2?'<button class="secondary" data-view="company1">Voltar</button>':''}<button class="primary" data-view="${step===1?'company2':'success'}">${step===1?'Continuar':'Finalizar cadastro'}</button></div>`, true); }
function success() { return auth(`<div class="success"><h2>Empresa cadastrada com sucesso!</h2><p>Sua empresa foi cadastrada com sucesso e sua conta já está pronta para uso.</p><button class="primary" data-view="home">Ir para o dashboard</button></div>`, true); }

const views = {home, login, forgot, verify, company1: () => company(1), company2: () => company(2), success};
function showModal(title) { const modal = document.createElement('div'); modal.className = 'modal-backdrop'; modal.innerHTML = `<section class="menu-modal" role="dialog" aria-modal="true"><button class="modal-close" aria-label="Fechar">×</button><span class="modal-tag">CONECTA VAGAS</span><h2>${title}</h2><p>Uma plataforma simples para aproximar pessoas, empresas e boas oportunidades.</p><div class="modal-options"><button data-view="login">Acessar minha conta <b>→</b></button><button data-view="company1">Criar cadastro <b>→</b></button></div></section>`; document.body.append(modal); const close = () => modal.remove(); modal.onclick = event => { if (event.target === modal || event.target.classList.contains('modal-close')) close(); }; modal.querySelectorAll('[data-view]').forEach(el => el.onclick = () => { close(); render(el.dataset.view); }); }
function render(name = 'home') { app.innerHTML = views[name](); document.querySelectorAll('[data-view]').forEach(el => el.onclick = () => render(el.dataset.view)); document.querySelectorAll('[data-modal]').forEach(el => el.onclick = () => showModal(el.dataset.modal)); document.querySelectorAll('.eye').forEach(el => el.onclick = () => { const input = el.previousElementSibling; input.type = input.type === 'password' ? 'text' : 'password'; }); document.querySelectorAll('[data-note]').forEach(el => el.onclick = () => alert(el.dataset.note)); }
render();
