export function criartabela(cabecalho, linhas, tableClass = "table") {

    const container = document.createElement("div");
    container.className = "table-container";

    const table = document.createElement("table");
    table.className = tableClass;

    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // Cabeçalho
    const trHead = document.createElement("tr");

    cabecalho.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        trHead.appendChild(th);
    });

    thead.appendChild(trHead);

    // Corpo
    linhas.forEach(row => {
        const tr = document.createElement("tr");

        row.forEach(item => {
            const td = document.createElement("td");

            if (item instanceof HTMLElement) {
                td.appendChild(item);
            } else {
                td.textContent = item;
            }

            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    container.appendChild(table);

    return container;
}