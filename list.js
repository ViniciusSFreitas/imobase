function buscarImoveis() {
    const buscaTitulo = document.getElementById('buscaTitulo').value.toLowerCase();
    const imoveis = JSON.parse(localStorage.getItem('imoveis')) || [];
    const imoveisFiltrados = imoveis.filter(imovel => imovel.titulo.toLowerCase().includes(buscaTitulo));

    const table = document.getElementById('imoveisTable');
    table.innerHTML = '<tr><th>Foto</th><th>Título</th><th>Endereço</th><th>Tipo de Negociação</th><th>Data de Cadastro</th><th>Valor de Venda</th><th>Valor de Locação</th><th>Proprietário</th></tr>';

    imoveisFiltrados.forEach(imovel => {
        const row = table.insertRow();
        row.insertCell(0).innerHTML = `<img src="${imovel.foto}" width="100">`;
        row.insertCell(1).innerHTML = imovel.titulo;
        row.insertCell(2).innerHTML = imovel.endereco;
        row.insertCell(3).innerHTML = imovel.tipoNegociacao;
        row.insertCell(4).innerHTML = imovel.dataCadastro;
        row.insertCell(5).innerHTML = imovel.valorVenda;
        row.insertCell(6).innerHTML = imovel.valorLocacao;
        row.insertCell(7).innerHTML = imovel.proprietario;
    });
}
buscarImoveis();