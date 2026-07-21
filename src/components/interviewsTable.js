import { createTable } from "./table.js";

export function createInterviewsTable() {

    const headers = [
        "Candidato",
        "Vaga",
        "Horário",
        "Status"
    ];

    const rows = [

        [
            `
            <div class="candidate">
                <div class="avatar">
                    <img src="assets/icons/user-circle.svg" alt="Candidato">
                </div>

                <div class="candidate-info">
                    <strong>João Pedro</strong>
                </div>
            </div>
            `,
            "Analista de Marketing",
            "09:00",
            `<span class="status scheduled">Agendada</span>`
        ],

        [
            `
            <div class="candidate">
                <div class="avatar">
                    <img src="assets/icons/user-circle.svg" alt="Candidato">
                </div>

                <div class="candidate-info">
                    <strong>Maria da Silva</strong>
                </div>
            </div>
            `,
            "Analista de RH",
            "14:30",
            `<span class="status confirmed">Confirmada</span>`
        ],

        [
            `
            <div class="candidate">
                <div class="avatar">
                    <img src="assets/icons/user-circle.svg" alt="Candidato">
                </div>

                <div class="candidate-info">
                    <strong>Carlos Eduardo</strong>
                </div>
            </div>
            `,
            "Desenvolvedor Front-end",
            "16:00",
            `<span class="status scheduled">Agendada</span>`
        ]

    ];

    return createTable(headers, rows, "interviews-table");
}