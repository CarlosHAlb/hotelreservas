const URL_API = "http://localhost:3000/quartos/listar/quartos";

// Carrega os quartos assim que a página abre
document.addEventListener("DOMContentLoaded", carregarQuartos);

// Função para buscar os quartos do Backend
function carregarQuartos() {
    fetch(URL_API)
        .then(res => res.json())
        .then(quartos => {
            const corpoTabela = document.getElementById("listaQuartosCorpo");
            corpoTabela.innerHTML = ""; 

            quartos.forEach(quarto => {
                corpoTabela.innerHTML += `
                    <tr>
                        <td>${quarto.numero}</td>
                        <td>${quarto.tipo}</td>
                        <td>
                            <a href="reserva.html?quartoId=${quarto.id}&numero=${quarto.numero}&tipo=${quarto.tipo}" class="btn-acao azul">
                                <i class="fa-solid fa-eye"></i> Ver Reservas
                            </a>
                            <button class="btn-acao vermelho" onclick="excluirQuarto(${quarto.id})">
                                <i class="fa-solid fa-trash"></i> Excluir
                            </button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(err => console.error("Erro ao carregar quartos:", err));
}

// Evento de envio do formulário de cadastro
document.getElementById("formCad").addEventListener("submit", function(e) {
    e.preventDefault(); 

    const dados = {
        numero: document.getElementById("numero").value,
        tipo: document.getElementById("tipo").value
    };

    // Rota corrigida com a junção do server.js + quarto.routes.js
    fetch("http://localhost:3000/quartos/cadastrar/quartos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    })
    .then(res => {
        if (res.ok) {
            document.getElementById("cadastro").classList.add("oculto"); 
            document.getElementById("formCad").reset(); 
            carregarQuartos(); 
        } else {
            alert("Erro ao cadastrar quarto.");
        }
    })
    .catch(err => console.error("Erro no cadastro:", err));
});

// Função para deletar um quarto
function excluirQuarto(id) {
    if (confirm("Deseja realmente excluir este quarto? Todas as reservas vinculadas serão perdidas.")) {
        // Rota de exclusão corrigida com a barra antes do ID
        fetch(`http://localhost:3000/quartos/excluir/quarto/${id}`, {
            method: "DELETE"
        })
        .then(res => {
            if (res.ok) {
                carregarQuartos();
            } else {
                alert("Erro ao excluir quarto.");
            }
        })
        .catch(err => console.error("Erro ao excluir:", err));
    }
}