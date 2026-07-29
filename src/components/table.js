export function criartabela(cabecalho, linhas){

    const app = document.getElementById('app');
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const tr = document.createElement('tr');

    cabecalho.forEach(header => {
        const th = document.createElement('th');

        th.textContent = header;
        tr.appendChild(th);
    });


    linhas.forEach(row =>{
        const tr = document.createElement('tr');

        row.forEach(item => {
            const td = document.createElement('td');

            td.textContent = item;

            tr.appendChild(td);
        })
        

        tbody.appendChild(tr);
    })

    thead.appendChild(tr);
    table.appendChild(thead);
    table.appendChild(tbody);
    app.appendChild(table);

}