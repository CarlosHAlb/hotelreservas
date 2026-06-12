// Pega os parâmetros do quarto enviados pela URL (ex: ?quartoId=1&numero=101...)
const params = new URLSearchParams(window.location.search);
const quartoId = params.get("quartoId");
const numeroQuarto = params.get("numero");
const tipoQuarto = params.get("tipo");

// URL Base de reservas somando a rota do server.js (/reservas) + a sua rota de listagem por quarto
const URL_API_RESERVAS = `http://localhost:3000/reservas/listar/reservas/quarto/${quartoId}`;

document.addEventListener("DOMContentLoaded", () => {
    // Se veio de um quarto específico, preenche os textos do topo e o campo oculto do modal
    if (quartoId) {
        document.querySelector(".topo-tabela h2").innerText = `Reservas do Quarto ${numeroQuarto}`;
        document.querySelector(".topo-tabela p").innerText = `Tipo: ${tipoQuarto}`;
        document.getElementById("quarto_id").value = quartoId;
    }
    carregarReservas();
});

// Busca as reservas do quarto atual
function carregarReservas() {
    if (!quartoId) {
        console.error("Nenhum ID de quarto foi fornecido na URL.");
        return;
    }

    fetch(URL_API_RESERVAS)
        .then(res => {
            if (!res.ok) throw new Error("Erro ao buscar reservas");
            return res.json();
        })
        .then(reservas => {
            const corpoTabela = document.getElementById("listaReservasCorpo");
            corpoTabela.innerHTML = "";

            reservas.forEach(reserva => {
                // Formata as datas para o padrão brasileiro (DD/MM/AAAA)
                const entrada = new Date(reserva.data_entrada).toLocaleDateString('pt-BR');
                const saida = new Date(reserva.data_saida).toLocaleDateString('pt-BR');

                corpoTabela.innerHTML += `
                    <tr>
                        <td>${reserva.id}</td>
                        <td>${reserva.hospede}</td>
                        <td>${entrada}</td>
                        <td>${saida}</td>
                        <td>
                            <button class="btn-acao vermelho" onclick="excluirReserva(${reserva.id})">
                                <i class="fa-solid fa-trash"></i> Excluir
                            </button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(err => console.error("Erro ao carregar reservas:", err));
}

// Cadastra uma nova reserva (Substitua no script1.js)
document.getElementById("formCadReserva").addEventListener("submit", function(e) {
    e.preventDefault();

    // Tenta pegar o ID do input se ele não veio na URL
    const idDoQuartoValido = quartoId ? parseInt(quartoId) : parseInt(document.getElementById("quarto_id").value);

    if (!idDoQuartoValido) {
        alert("Erro: É necessário vincular a reserva a um ID de quarto válido.");
        return;
    }

    const dados = {
        hospede: document.getElementById("hospede").value,
        data_entrada: new Date(document.getElementById("data_entrada").value).toISOString(),
        data_saida: new Date(document.getElementById("data_saida").value).toISOString(),
        quarto_id: idDoQuartoValido
    };

    fetch("http://localhost:3000/reservas/cadastrar/reserva", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    })
    .then(res => {
        if (res.ok) {
            document.getElementById("cadastroReserva").classList.add("oculto");
            document.getElementById("formCadReserva").reset();
            if (quartoId) document.getElementById("quarto_id").value = quartoId; 
            carregarReservas(); 
        } else {
            alert("Erro ao salvar reserva. Verifique se as datas estão corretas e se o ID do quarto existe.");
        }
    })
    .catch(err => console.error("Erro no cadastro de reserva:", err));
});

// Deleta uma reserva
function excluirReserva(id) {
    if (confirm("Deseja realmente cancelar esta reserva?")) {
        // Rota exata do seu router.delete("/excluir/reserva/:id")
        fetch(`http://localhost:3000/reservas/excluir/reserva/${id}`, {
            method: "DELETE"
        })
        .then(res => {
            if (res.ok) {
                carregarReservas();
            } else {
                alert("Erro ao excluir reserva.");
            }
        })
        .catch(err => console.error("Erro ao deletar reserva:", err));
    }
}