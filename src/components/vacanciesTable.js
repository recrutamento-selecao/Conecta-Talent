import { createTable } from "./table.js";

export function createVacanciesTable() {

    const headers = [
        "Cargo",
        "Área",
        "Status",
        "Candidatos",
        "Etapa Atual",
        "Ações"
    ];

    const rows = [

        `
        <tr>
            <td>Analista de Marketing</td>
            <td>Marketing</td>
            <td><span class="status active">Ativa</span></td>
            <td>48</td>
            <td>Triagem</td>
            <td>⋮</td>
        </tr>
        `,

        `
        <tr>
            <td>Desenvolvedor Front-end</td>
            <td>Tecnologia</td>
            <td><span class="status active">Ativa</span></td>
            <td>36</td>
            <td>Entrevista</td>
            <td>⋮</td>
        </tr>
        `,

        `
        <tr>
            <td>Analista de RH</td>
            <td>Recursos Humanos</td>
            <td><span class="status paused">Pausada</span></td>
            <td>15</td>
            <td>Avaliação</td>
            <td>⋮</td>
        </tr>
        `,

        `
        <tr>
            <td>Designer UI/UX</td>
            <td>Design</td>
            <td><span class="status draft">Rascunho</span></td>
            <td>0</td>
            <td>-</td>
            <td>⋮</td>
        </tr>
        `

    ];

    return createTable(headers, rows, "vacancies-table");
}