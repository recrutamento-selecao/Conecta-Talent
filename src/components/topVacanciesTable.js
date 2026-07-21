import { createTable } from "./table.js";

export function createTopVacanciesTable() {

    const headers = [
        "Vagas",
        "Candidatos",
        "Processos",
        "Conversão"
    ];

    const rows = [

        [
            "Analista de Marketing",
            "48",
            "76%",
            "15,6%"
        ],

        [
            "Analista de RH",
            "36",
            "72,4%",
            "12,4%"
        ],

        [
            "Desenvolvedor Front-end",
            "18",
            "57%",
            "10,2%"
        ]

    ];

    return createTable(headers, rows, "top-vacancies-table");
}