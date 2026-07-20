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

        <div>
            <h1>Triagem de Candidatos</h1>

            <p>
                Analise os candidatos e avance aqueles que fazem mais sentido para a próxima etapa.
            </p>
        </div>

    </header>

    <section class="stats">

        <div class="card">
            <img src="assets/icons/people.svg" class="icon" alt="">
            <h3>Inscritos</h3>
            <span>32</span>
        </div>

        <div class="card">
            <img src="assets/icons/clipboard-text-branco.svg" class="icon" alt="">
            <h3>Em triagem</h3>
            <span>18</span>
        </div>

        <div class="card">
            <img src="assets/icons/clipboard2-check.svg" class="icon" alt="">
            <h3>Aprovados</h3>
            <span>7</span>
        </div>

        <div class="card">
            <img src="assets/icons/shield-check.svg" class="icon" alt="">
            <h3>Reprovados</h3>
            <span>5</span>
        </div>

        <div class="card">
            <img src="assets/icons/calendar-week-branco.svg" class="icon" alt="">
            <h3>Entrevistas</h3>
            <span>4</span>
        </div>

        <div class="card">
            <img src="assets/icons/user-circle.svg" class="icon" alt="">
            <h3>Contratados</h3>
            <span>2</span>
        </div>

    </section>

    <div class="search-section">

        <div class="search-box">

            <img src="assets/icons/search.svg" alt="Buscar">

            <input
                type="text"
                placeholder="Buscar candidato por nome, email ou palavra-chave"
            >

        </div>

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

    ${createCandidateTable()}

</div>
`;