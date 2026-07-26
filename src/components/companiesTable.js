import { createTable } from "./table.js";

export function createCompaniesTable() {

    const headers = [
        "Empresa",
        "Recrutadores",
        "Vagas",
        "Candidatos",
        "Plano",
        "Ações"
    ];

    const rows = [

        [
            "Empresa1",
            "14",
            "35",
            "245",
            "PRO",
            `
                <img src="assets/icons/edit.svg" class="action-icon" alt="Editar">
                <img src="assets/icons/cross.svg" class="action-icon" alt="Desativar">
                <img src="assets/icons/trash.svg" class="action-icon" alt="Excluir">
            `
        ],

        [
            "Empresa2",
            "22",
            "22",
            "364",
            "BÁSICO",
            `
                <img src="assets/icons/edit.svg" class="action-icon" alt="Editar">
                <img src="assets/icons/cross.svg" class="action-icon" alt="Desativar">
                <img src="assets/icons/trash.svg" class="action-icon" alt="Excluir">
            `
        ],

        [
            "Empresa3",
            "18",
            "14",
            "134",
            "PRO",
            `
                <img src="assets/icons/edit.svg" class="action-icon" alt="Editar">
                <img src="assets/icons/cross.svg" class="action-icon" alt="Desativar">
                <img src="assets/icons/trash.svg" class="action-icon" alt="Excluir">
            `
        ],

        [
            "Empresa4",
            "11",
            "26",
            "246",
            "PREMIUM",
            `
                <img src="assets/icons/edit.svg" class="action-icon" alt="Editar">
                <img src="assets/icons/cross.svg" class="action-icon" alt="Desativar">
                <img src="assets/icons/trash.svg" class="action-icon" alt="Excluir">
            `
        ]

    ];

    return createTable(headers, rows, "companies-table");
}