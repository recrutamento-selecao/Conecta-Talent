export function criarFooter() {
    const footer = document.createElement('footer');
    footer.classList.add('footer-site');

    const footerContainer = document.createElement('div');
    footerContainer.classList.add('footer-container');

    const colBrand = document.createElement('div');
    colBrand.classList.add('footer-coluna', 'footer-brand');
    colBrand.innerHTML = `
        <div class="footer-logo">
            <img src="assets/images/logo.png" alt="Conecta Talent Logo">
        </div>
        <p class="footer-slogan">Conectando talentos às melhores oportunidades.</p>
    `;

    const colEmpresa = document.createElement('div');
    colEmpresa.classList.add('footer-coluna');
    colEmpresa.innerHTML = `
        <h4 class="footer-titulo">Empresa</h4>
        <ul class="footer-links">
            <li><a href="#sobre"><span>›</span> Sobre nós</a></li>
            <li><a href="#recursos"><span>›</span> Recursos</a></li>
            <li><a href="#planos"><span>›</span> Planos</a></li>
            <li><a href="#suporte"><span>›</span> Suporte</a></li>
        </ul>
    `;

    const colContato = document.createElement('div');
    colContato.classList.add('footer-coluna');
    colContato.innerHTML = `
        <h4 class="footer-titulo">Contato</h4>
        <ul class="footer-contatos">
            <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <a href="mailto:contato@conectatalent.com">contato@conectatalent.com</a>
            </li>
            <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <a href="tel:15999999999">(15) 99999-9999</a>
            </li>
        </ul>
    `;

    const colRedes = document.createElement('div');
    colRedes.classList.add('footer-coluna');
    colRedes.innerHTML = `
        <h4 class="footer-titulo">Redes Sociais</h4>
        <div class="footer-rede-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Conecta Talent</a>
        </div>
    `;

    footerContainer.appendChild(colBrand);
    footerContainer.appendChild(colEmpresa);
    footerContainer.appendChild(colContato);
    footerContainer.appendChild(colRedes);

    const footerBottom = document.createElement('div');
    footerBottom.classList.add('footer-bottom');
    footerBottom.innerHTML = `<p>© 2026 Conecta Talent. Todos os direitos reservados.</p>`;

    footer.appendChild(footerContainer);
    footer.appendChild(footerBottom);


    return footer;
}