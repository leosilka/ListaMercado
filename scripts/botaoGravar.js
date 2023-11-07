document.addEventListener("DOMContentLoaded", function () {
    const botaoGravar = document.getElementById("botaoGravar");
    const listaCompras = document.getElementById("listaCompras");
    const valorTotalElement = document.getElementById("valorTotal");
    const popUp = document.getElementById("popup");
    const popUpEdicao = document.getElementById("popupEdicao");
    const mensagem = document.getElementById("mensagem");
    const imagemProdutoGravado = "imgdouble-check.gif";
    let valorTotal = 0;
    let itemLista;
  
    botaoGravar.addEventListener("click", function (event) {
      event.preventDefault();
      popUp.style.display = "block";
      mensagem.textContent = "Produto Gravado";
  
      const nomeProduto = document.getElementById("nomeProduto").value;
      const quantidadeProduto = parseFloat(
        document.getElementById("quantidadeProduto").value
      );
      const valorProdutoTexto = document.getElementById("valorProduto").value;
  
      if (nomeProduto && !isNaN(quantidadeProduto) && valorProdutoTexto) {
        const valorProduto = parseFloat(
          valorProdutoTexto.replace(/[^\d,.]/g, "").replace(",", ".")
        );
  
        if (!isNaN(valorProduto)) {
          const valorItem = valorProduto * quantidadeProduto;
          valorTotal += valorItem;
  
          itemLista = document.createElement("div");
          itemLista.classList.add("itemLista");
  
          itemLista.innerHTML = `
            <span>${nomeProduto}<br>
            Quantidade: ${quantidadeProduto}<br>
            Valor Unitário: R$${valorProduto.toFixed(2)}<br>
            Valor do Item: R$${valorItem.toFixed(2)}<br></span>
            <button class="botaoRemover">Remover</button>
          `;
  
          listaCompras.appendChild(itemLista);
  
          const botaoRemover = itemLista.querySelector(".botaoRemover");
          botaoRemover.addEventListener("click", function () {
            listaCompras.removeChild(itemLista);
            valorTotal -= valorItem;
            valorTotalElement.textContent = `Valor Total: R$${valorTotal.toFixed(
              2
            )}`;
          });
        }
  
        valorTotalElement.textContent = `Valor Total: R$${valorTotal.toFixed(2)}`;
        console.log(itemLista)
  
        document.getElementById("nomeProduto").value = "";
        document.getElementById("quantidadeProduto").value = "";
        document.getElementById("valorProduto").value = "";
      }
      setTimeout(() => {
        popUp.style.display = "none";
        imagemProdutoGravado.src = "";
      }, 3000);
    });
  });
  