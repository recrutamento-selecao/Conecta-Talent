import { createTable } from "./table.js";

export function createPlansTable() {

    const headers = [
        "Plano",
        "Empresas",
        "Valor",
        "Ações"
    ];

    const rows = [

        [
            "Básico",
            "45",
            "R$325,00",
            `
                <img src="assets/icons/edit.svg" class="action-icon" alt="Editar">
                <img src="assets/icons/trash.svg" class="action-icon" alt="Excluir">
            `
        ],

        [
            "Pro",
            "62",
            "R$450,00",
            `
                <img src="assets/icons/edit.svg" class="action-icon" alt="Editar">
                <img src="assets/icons/trash.svg" class="action-icon" alt="Excluir">
            `
        ],

        [
            "Premium",
            "21",
            "R$865,00",
            `
                <img src="assets/icons/edit.svg" class="action-icon" alt="Editar">
                <img src="assets/icons/trash.svg" class="action-icon" alt="Excluir">
            `
        ]

    ];

    return createTable(headers, rows, "plans-table");
}