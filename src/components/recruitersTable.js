import { createTable } from "./table.js";

export function createRecruitersTable() {

    const headers = [
        "Nome",
        "Empresa",
        "E-mail",
        "Status",
        "Ações"
    ];

    const rows = [

        [
            `
            <div class="candidate">
                <div class="avatar">
                    <img src="assets/icons/user-circle.svg" alt="Recrutador">
                </div>

                <div class="candidate-info">
                    <strong>Rafael Costa</strong>
                    <small>Recrutador</small>
                </div>
            `,
            "TechSoft LTDA",
            "rafael@email.com",
            `<span class="status active">Ativo</span>`,
            `
            <div class="actions">
                <img src="assets/icons/edit.svg" alt="Editar">
                <img src="assets/icons/trash.svg" alt="Excluir">
            </div>
            `
        ],

        [
            `
            <div class="candidate">
                <div class="avatar">
                    <img src="assets/icons/user-circle.svg" alt="Recrutador">
                </div>

                <div class="candidate-info">
                    <strong>Mariana Souza</strong>
                    <small>Recrutadora</small>
                </div>
            `,
            "TechSoft LTDA",
            "mariana@email.com",
            `<span class="status active">Ativo</span>`,
            `
            <div class="actions">
                <img src="assets/icons/edit.svg" alt="Editar">
                <img src="assets/icons/trash.svg" alt="Excluir">
            </div>
            `
        ],

        [
            `
            <div class="candidate">
                <div class="avatar">
                    <img src="assets/icons/user-circle.svg" alt="Recrutador">
                </div>

                <div class="candidate-info">
                    <strong>Lucas Martins</strong>
                    <small>Recrutador</small>
                </div>
            `,
            "TechSoft LTDA",
            "lucas@email.com",
            `<span class="status active">Ativo</span>`,
            `
            <div class="actions">
                <img src="assets/icons/edit.svg" alt="Editar">
                <img src="assets/icons/trash.svg" alt="Excluir">
            </div>
            `
        ]

    ];

    return createTable(headers, rows, "recruiters-table");
}