let imoveis = [];

function cadastrarImovel() {
    const foto = document.getElementById('foto').value;
    const titulo = document.getElementById('titulo').value;
    const endereco = document.getElementById('endereco').value;
    const tipoNegociacao = document.getElementById('tipoNegociacao').value;
    const dataCadastro = document.getElementById('dataCadastro').value;
    const valorVenda = document.getElementById('valorVenda').value;
    const valorLocacao = document.getElementById('valorLocacao').value;
    const proprietario = document.getElementById('proprietario').value;

    const imovel = {
        foto,
        titulo,
        endereco,
        tipoNegociacao,
        dataCadastro,
        valorVenda,
        valorLocacao,
        proprietario
    };

    imoveis.push(imovel);
    localStorage.setItem('imoveis', JSON.stringify(imoveis));

    atualizarListaImoveis();
    document.getElementById('imovelForm').reset();
}

function atualizarListaImoveis() {
    const listaImoveis = document.getElementById('listaImoveis');
    listaImoveis.innerHTML = '';

    imoveis.forEach((imovel, index) => {
        const row = listaImoveis.insertRow();
        const imgCell = row.insertCell();
        const img = document.createElement('img');
        img.src = imovel.foto;
        img.alt = 'Foto do Imóvel';
        imgCell.appendChild(img);

        row.innerHTML += `
            <td>${imovel.titulo}</td>
            <td>${imovel.endereco}</td>
            <td>${imovel.tipoNegociacao}</td>
            <td>${imovel.dataCadastro}</td>
            <td>${imovel.valorVenda}</td>
            <td>${imovel.valorLocacao}</td>
            <td>${imovel.proprietario}</td>
            <td><button onclick="editarImovel(${index})">Editar</button></td>
            <td><button onclick="excluirImovel(${index})">Excluir</button></td>
        `;
    });
}

function editarImovel(index) {
    const imovel = imoveis[index];
    const form = document.getElementById('imovelForm');
    form.elements['foto'].value = imovel.foto;
    form.elements['titulo'].value = imovel.titulo;
    form.elements['endereco'].value = imovel.endereco;
    form.elements['tipoNegociacao'].value = imovel.tipoNegociacao;
    form.elements['dataCadastro'].value = imovel.dataCadastro;
    form.elements['valorVenda'].value = imovel.valorVenda;
    form.elements['valorLocacao'].value = imovel.valorLocacao;
    form.elements['proprietario'].value = imovel.proprietario;

    const salvarButton = document.querySelector('button[type="button"]');
    salvarButton.textContent = 'Salvar';

    salvarButton.onclick = function () {
        atualizarImovel(index, form);
    };

    form.removeEventListener('submit', cadastrarImovel);

    form.onsubmit = function (e) {
        e.preventDefault();
        atualizarImovel(index, form);
    };
}

function atualizarImovel(index, form) {
    const formData = new FormData(form);
    const updatedImovel = {
        foto: formData.get('foto'),
        titulo: formData.get('titulo'),
        endereco: formData.get('endereco'),
        tipoNegociacao: formData.get('tipoNegociacao'),
        dataCadastro: formData.get('dataCadastro'),
        valorVenda: formData.get('valorVenda'),
        valorLocacao: formData.get('valorLocacao'),
        proprietario: formData.get('proprietario'),
    };

    imoveis[index] = updatedImovel;
    atualizarListaImoveis();
    form.reset();

    const salvarButton = document.querySelector('button[type="button"]');
    salvarButton.textContent = 'Cadastrar';
    salvarButton.onclick = cadastrarImovel;
}

function excluirImovel(index) {
    if (confirm('Excluir imóvel?')) {
        imoveis.splice(index, 1);
        localStorage.setItem('imoveis', JSON.stringify(imoveis));
        atualizarListaImoveis();
    }
}

window.addEventListener('load', () => {
    const imoveisJSON = localStorage.getItem('imoveis');
    if (imoveisJSON) {
        imoveis = JSON.parse(imoveisJSON);
        atualizarListaImoveis();
    }
});