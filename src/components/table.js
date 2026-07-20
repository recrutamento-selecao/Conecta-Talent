export function createTable(headers, rows, tableClass = "candidate-table") {
    return `
        <table class="${tableClass}">

            <thead>
                <tr>
                    ${headers.map(header => `<th>${header}</th>`).join("")}
                </tr>
            </thead>

            <tbody>
                ${rows.join("")}
            </tbody>

        </table>
    `;
}