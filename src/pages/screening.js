import { createCandidateTable } from "../components/candidateTable.js";

const root = document.getElementById("root");

root.innerHTML = `
<div class="screening">

    <div class="breadcrumb">
        <span>Vagas</span>
        <span>></span>
        <span>Triagem de Candidatos</span>
    </div>

    <header class="header">

        <div class="header-icon">
            <img src="assets/icons/file-description-branco.svg" alt="Triagem">
        </div>

        <div class="header-content">
            <h1>Triagem de Candidatos</h1>

            <p>
                Analise os candidatos e avance aqueles que fazem mais sentido para a próxima etapa.
            </p>
        </div>

    </header>

    <section class="stats">

        <div class="card">
            <img src="assets/icons/people.svg" class="icon" alt="Inscritos">
            <h3>Inscritos</h3>
            <span>32</span>
        </div>

        <div class="card">
            <img src="assets/icons/filter.svg" class="icon" alt="Em triagem">
            <h3>Em triagem</h3>
            <span>18</span>
        </div>

        <div class="card">
            <img src="assets/icons/check.svg" class="icon" alt="Aprovados">
            <h3>Aprovados</h3>
            <span>7</span>
        </div>

        <div class="card">
            <img src="assets/icons/cross.svg" class="icon" alt="Reprovados">
            <h3>Reprovados</h3>
            <span>5</span>
        </div>

        <div class="card">
            <img src="assets/icons/calendar.svg" class="icon" alt="Entrevistas">
            <h3>Entrevistas</h3>
            <span>4</span>
        </div>

        <div class="card">
            <img src="assets/icons/badge.svg" class="icon" alt="Contratados">
            <h3>Contratados</h3>
            <span>2</span>
        </div>

    </section>

    <div class="top-actions">

        <div class="search-box">

            <img src="assets/icons/search.svg" alt="Buscar">

            <input
                type="text"
                placeholder="Buscar candidato por nome, email ou palavra-chave"
            >

        </div>

        <div class="filter-section">

            <label for="sort">Ordenar por:</label>

            <select id="sort">
                <option>Mais recentes</option>
                <option>Mais antigos</option>
                <option>Nome (A-Z)</option>
                <option>Nome (Z-A)</option>
            </select>

        </div>

    </div>

    ${createCandidateTable()}

</div>
`;