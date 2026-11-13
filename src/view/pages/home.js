import { criarHeader } from '../components/header.js';
import { criarFooter } from '../components/footer.js';

export function renderHome() {
    const container = document.createElement('div');
    container.classList.add('page-home');

    const header = criarHeader();

    const main = document.createElement('main');
    main.classList.add('main');

    const heroSection = document.createElement('section');
    heroSection.classList.add('hero');

    const heroWrapper = document.createElement('div');
    heroWrapper.classList.add('hero-wrapper');

    const heroConteudo = document.createElement('div');
    heroConteudo.classList.add('hero-conteudo');

    const tituloHero = document.createElement('h1');
    tituloHero.classList.add('titulo-hero');
    tituloHero.innerHTML = `Conectando você com <br><span class="destaque-hero">as melhores oportunidades</span>`;

    const descricaoHero = document.createElement('p');
    descricaoHero.classList.add('descricao-hero');
    descricaoHero.textContent = "Encontre a vaga ideal para o seu perfil ou publique vagas e conecte-se com talentos incríveis.";

    const areaBusca = document.createElement('div');
    areaBusca.classList.add('area-buscar-vagas');

    const tituloBusca = document.createElement('h3');
    tituloBusca.classList.add('encontre-vaga');
    tituloBusca.textContent = 'Encontre sua vaga ideal!';

    const subTituloBusca = document.createElement('p');
    subTituloBusca.classList.add('busque-cargos');
    subTituloBusca.textContent = 'Busque por cargo, palavra-chave ou localização';

    const areaBuscaInput = document.createElement('div');
    areaBuscaInput.classList.add('area-busca-input');

    const campoBuscarVagas = document.createElement('div');
    campoBuscarVagas.classList.add('campo-input');
    campoBuscarVagas.innerHTML = `
        <img src="/assets/icons/search.svg" class="icone-input" alt="Pesquisar">
        <input type="search" class="input-buscar" placeholder="Cargo ou palavra-chave">
    `;

    const campoBuscarLocalizacao = document.createElement('div');
    campoBuscarLocalizacao.classList.add('campo-input');
    campoBuscarLocalizacao.innerHTML = `
        <img src="/assets/icons/map-pin.svg" class="icone-input" alt="Localização">
        <input type="text" class="input-localizar" placeholder="Localização">
    `;

    const btnBuscarVagas = document.createElement('button');
    btnBuscarVagas.classList.add('btn-buscar-vagas');
    btnBuscarVagas.innerHTML = `<img src="/assets/icons/search-branco.svg" alt=""> Buscar vagas`;

    areaBuscaInput.appendChild(campoBuscarVagas);
    areaBuscaInput.appendChild(campoBuscarLocalizacao);
    areaBuscaInput.appendChild(btnBuscarVagas);

    const areaTags = document.createElement('div');
    areaTags.classList.add('area-tags-populares');

    const labelTags = document.createElement('span');
    labelTags.classList.add('label-tags');
    labelTags.textContent = "Vagas populares:";
    areaTags.appendChild(labelTags);

    const tagsList = ["Análise de Dados", "Desenvolvedor", "Designer", "Marketing", "Administrativo"];
    tagsList.forEach(tagText => {
        const btnTag = document.createElement('button');
        btnTag.classList.add('btn-tag-popular');
        btnTag.textContent = tagText;
        areaTags.appendChild(btnTag);
    });

    areaBusca.appendChild(tituloBusca);
    areaBusca.appendChild(subTituloBusca);
    areaBusca.appendChild(areaBuscaInput);
    areaBusca.appendChild(areaTags);

    heroConteudo.appendChild(tituloHero);
    heroConteudo.appendChild(descricaoHero);
    heroConteudo.appendChild(areaBusca);

    const heroImagemArea = document.createElement('div');
    heroImagemArea.classList.add('hero-imagem-container');

    const imagemHero = document.createElement('img');
    imagemHero.classList.add("imagem-hero");
    imagemHero.src = "/assets/images/hero2-bg.png";
    imagemHero.alt = "Profissional utilizando notebook";

    const metricsBox = document.createElement('div');
    metricsBox.classList.add('container-metricas-flutuantes');

    const metricas = [
        { icone: "/assets/icons/briefcase-branco.svg", valor: "+10.000", desc: "Vagas publicadas na plataforma" },
        { icone: "/assets/icons/people.svg", valor: "+8.000", desc: "Candidatos conectados" },
        { icone: "/assets/icons/building.svg", valor: "Empresas", desc: "de diversos segmentos" }
    ];

    metricas.forEach(m => {
        const cardM = document.createElement('div');
        cardM.classList.add('card-metrica-flutuante');
        cardM.innerHTML = `
            <div class="icone-metrica"><img src="${m.icone}" alt=""></div>
            <div class="info-metrica">
                <h4>${m.valor}</h4>
                <p>${m.desc}</p>
            </div>
        `;
        metricsBox.appendChild(cardM);
    });

    heroImagemArea.appendChild(imagemHero);
    heroImagemArea.appendChild(metricsBox);

    heroWrapper.appendChild(heroConteudo);
    heroWrapper.appendChild(heroImagemArea);
    heroSection.appendChild(heroWrapper);
    main.appendChild(heroSection);

    const cardsBeneficio = document.createElement('section');
    cardsBeneficio.classList.add('cards-secao');

    const cabecalhoBeneficios = document.createElement('div');
    cabecalhoBeneficios.classList.add('cabecalho-secao-centro');
    cabecalhoBeneficios.innerHTML = `
        <h2 class="titulo-secao">Tudo que você precisa em um só lugar</h2>
        <p class="subtitulo-beneficio">Soluções inteligentes para candidatos e empresas.</p>
    `;

    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('cards-container');

    const listaBeneficios = [
        {
            titulo: "Para candidatos",
            descricao: "Encontre vagas compatíveis com o seu perfil e candidate-se em poucos cliques."
        },
        {
            titulo: "Para empresas",
            descricao: "Publique vagas, gerencie candidatos e encontre os melhores talentos para a sua equipe."
        },
        {
            titulo: "Processos simplificados",
            descricao: "Etapas claras e organizadas para facilitar a conexão entre empresas e candidatos."
        },
        {
            titulo: "Segurança e confiança",
            descricao: "Seus dados protegidos com tecnologia de ponta e total conformidade com a LGPD."
        }
    ];

    listaBeneficios.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card-beneficio-item');
        card.innerHTML = `
            <h3 class="titulo-card">${item.titulo}</h3>
            <p class="descricao-card">${item.descricao}</p>
        `;
        cardsContainer.appendChild(card);
    });

    cardsBeneficio.appendChild(cabecalhoBeneficios);
    cardsBeneficio.appendChild(cardsContainer);
    main.appendChild(cardsBeneficio);

    const comoFuncionaSecao = document.createElement('section');
    comoFuncionaSecao.classList.add('como-funciona-secao');

    const cabecalhoComoFunciona = document.createElement('div');
    cabecalhoComoFunciona.classList.add('cabecalho-secao-centro');
    cabecalhoComoFunciona.innerHTML = `
        <span class="tag-secao">COMO FUNCIONA</span>
        <h2 class="titulo-secao">Um processo simples para conectar talentos e oportunidades</h2>
        <p class="subtitulo-secao">Seja para encontrar sua próxima oportunidade ou para contratar os melhores profissionais, a Conecta Talent facilita cada passo do processo.</p>
    `;

    const containerFluxos = document.createElement('div');
    containerFluxos.classList.add('container-fluxos-wrapper');

    const dadosFluxos = [
        {
            tipo: 'candidato',
            iconeHeader: '/assets/icons/people.svg',
            tituloHeader: 'Para Candidatos',
            subtituloHeader: 'Encontre vagas e impulsione sua carreira.',
            passos: [
                { num: 1, titulo: 'Crie sua conta', desc: 'Cadastre-se gratuitamente e tenha acesso a todas as oportunidades.' },
                { num: 2, titulo: 'Complete seu perfil', desc: 'Adicione suas informações, experiências e habilidades para se destacar.' },
                { num: 3, titulo: 'Encontre vagas', desc: 'Busque oportunidades compatíveis com o seu perfil e objetivos.' },
                { num: 4, titulo: 'Candidate-se', desc: 'Envie sua candidatura e acompanhe o andamento em tempo real.' },
                { num: 5, titulo: 'Seja contratado', desc: 'Conecte-se com empresas e conquiste sua próxima oportunidade.' }
            ]
        },
        {
            tipo: 'empresa',
            iconeHeader: '/assets/icons/building.svg',
            tituloHeader: 'Para Empresas',
            subtituloHeader: 'Encontre os melhores talentos para sua equipe.',
            passos: [
                { num: 1, titulo: 'Cadastre sua empresa', desc: 'Crie uma conta empresarial e configure seu perfil.' },
                { num: 2, titulo: 'Publique uma vaga', desc: 'Descreva a vaga e os requisitos para encontrar o candidato ideal.' },
                { num: 3, titulo: 'Receba candidatos', desc: 'Visualize currículos e acompanhe todas as candidaturas.' },
                { num: 4, titulo: 'Faça a triagem', desc: 'Organize entrevistas e acompanhe cada etapa do processo seletivo.' },
                { num: 5, titulo: 'Contrate', desc: 'Escolha o profissional ideal e fortaleça sua equipe.' }
            ]
        }
    ];

    dadosFluxos.forEach(fluxo => {
        const coluna = document.createElement('div');
        coluna.classList.add('coluna-fluxo');

        const cardTopo = document.createElement('div');
        cardTopo.classList.add('card-topo-fluxo');
        cardTopo.innerHTML = `
            <div class="box-icone-fluxo">
                <img src="${fluxo.iconeHeader}" alt="${fluxo.tituloHeader}">
            </div>
            <div>
                <h3 class="titulo-topo-fluxo">${fluxo.tituloHeader}</h3>
                <p class="desc-topo-fluxo">${fluxo.subtituloHeader}</p>
            </div>
        `;

        const listaPassos = document.createElement('div');
        listaPassos.classList.add('lista-passos-timeline');

        fluxo.passos.forEach(passo => {
            const itemPasso = document.createElement('div');
            itemPasso.classList.add('item-passo');
            itemPasso.innerHTML = `
                <div class="circulo-numero">${passo.num}</div>
                <div class="conteudo-passo">
                    <h4 class="titulo-passo">${passo.titulo}</h4>
                    <p class="desc-passo">${passo.desc}</p>
                </div>
            `;
            listaPassos.appendChild(itemPasso);
        });

        coluna.appendChild(cardTopo);
        coluna.appendChild(listaPassos);
        containerFluxos.appendChild(coluna);
    });

    comoFuncionaSecao.appendChild(cabecalhoComoFunciona);
    comoFuncionaSecao.appendChild(containerFluxos);
    main.appendChild(comoFuncionaSecao);

    const faqSecao = document.createElement('section');
    faqSecao.classList.add('faq-secao');

    const cabecalhoFaq = document.createElement('div');
    cabecalhoFaq.classList.add('cabecalho-secao-centro');
    cabecalhoFaq.innerHTML = `
        <span class="tag-secao">PERGUNTAS FREQUENTES</span>
        <h2 class="titulo-secao">Tire suas dúvidas sobre a Conecta Talent</h2>
        <p class="subtitulo-secao">Encontre respostas para as perguntas mais comuns de candidatos e empresas.</p>
    `;

    const listaFaqDados = [
        {
            pergunta: "Como faço para criar uma conta?",
            resposta: "Cadastre-se, escolha se deseja criar uma conta como candidato ou empresa e preencha as informações solicitadas."
        },
        {
            pergunta: "O cadastro é gratuito?",
            resposta: "Sim. O cadastro na Conecta Talent é gratuito para candidatos e empresas."
        },
        {
            pergunta: "Como posso me candidatar a uma vaga?",
            resposta: "Após completar seu perfil, basta acessar a lista de vagas, escolher a oportunidade desejada e clicar em Candidatar-se."
        },
        {
            pergunta: "Como uma empresa publica uma vaga?",
            resposta: "Após criar uma conta empresarial, acesse o painel da empresa, informe os detalhes da oportunidade e clique em publicar vaga."
        },
        {
            pergunta: "Posso acompanhar minhas candidaturas?",
            resposta: "Sim. No painel do candidato você pode visualizar todas as vagas para as quais se candidatou e acompanhar o status de cada processo."
        },
        {
            pergunta: "Meus dados estão seguros?",
            resposta: "Sim. A Conecta Talent utiliza boas práticas de segurança para proteger as informações de candidatos e empresas."
        }
    ];

    const faqContainer = document.createElement('div');
    faqContainer.classList.add('faq-container');

    listaFaqDados.forEach((item) => {
        const faqCard = document.createElement('div');
        faqCard.classList.add('faq-card');
        
        faqCard.innerHTML = `
            <div class="faq-header">
                <h3 class="faq-pergunta">${item.pergunta}</h3>
                <span class="faq-icone">+</span>
            </div>
            <div class="faq-body">
                <p class="faq-resposta">${item.resposta}</p>
            </div>
        `;

        const faqHeader = faqCard.querySelector('.faq-header');
        faqHeader.addEventListener('click', () => {
            const todosCards = faqContainer.querySelectorAll('.faq-card');
            todosCards.forEach(card => {
                if (card !== faqCard) {
                    card.classList.remove('ativo');
                }
            });

            faqCard.classList.toggle('ativo');
        });

        faqContainer.appendChild(faqCard);
    });

    faqSecao.appendChild(cabecalhoFaq);
    faqSecao.appendChild(faqContainer);
    main.appendChild(faqSecao);

    const footer = criarFooter();

    container.appendChild(header);
    container.appendChild(main);
    container.appendChild(footer);

    return container;
}