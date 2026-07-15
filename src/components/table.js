export function createTable() {
    return `
        <table class="candidate-table">

            <thead>
                <tr>
                    <th>Candidato</th>
                    <th>Inscrição</th>
                    <th>Experiência</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody>

                <tr>
                    <td>
                        <strong>João Silva</strong><br>
                        <small>joao@email.com</small>
                        <small>(11) 99999-9999</small>
                    </td>

                    <td>13/07/2026</td>

                    <td>3 anos</td>

                    <td>
                        <span class="status">Em triagem</span>
                    </td>
                </tr>

            </tbody>

        </table>
    `;
}