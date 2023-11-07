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

  // Recuperar os dados do localStorage
  const mercadoriaLocalStorage = JSON.parse(localStorage.getItem("compras"));
  if (mercadoriaLocalStorage) {
    mercadoriaLocalStorage.forEach((compra) => {
      const valorItem = compra.valorItem;
      valorTotal += valorItem;
      itemLista = elementoLista(
        compra.nomeProduto,
        compra.quantidadeProduto,
        compra.valorProduto,
        valorItem
      );
      listaCompras.appendChild(itemLista);
    });
  }

  valorTotalElement.textContent = `Valor Total: R$${valorTotal.toFixed(2)}`;

  botaoGravar.addEventListener("click", function (event) {
    event.preventDefault();
    popUp.style.display = "flex";
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

        itemLista = elementoLista(
          nomeProduto,
          quantidadeProduto,
          valorProduto,
          valorItem
        );
        listaCompras.appendChild(itemLista);

        salvarNoLocalStorage(
          nomeProduto,
          quantidadeProduto,
          valorProduto,
          valorItem
        );

        document.getElementById("nomeProduto").value = "";
        document.getElementById("quantidadeProduto").value = "";
        document.getElementById("valorProduto").value = "";
      }

      valorTotalElement.textContent = `Valor Total: R$${valorTotal.toFixed(2)}`;
      console.log(itemLista);

      setTimeout(() => {
        popUp.style.display = "none";
        imagemProdutoGravado.src = "";
      }, 3000);
    }
  });

  // Função para criar um elemento de lista de compras
  function elementoLista(
    nomeProduto,
    quantidadeProduto,
    valorProduto,
    valorItem
  ) {
    const itemLista = document.createElement("div");
    itemLista.classList.add("itemLista");

    itemLista.innerHTML = `
          <span>${nomeProduto}<br>
          Quantidade: ${quantidadeProduto}<br>
          Valor Unitário: R$${valorProduto.toFixed(2)}<br>
          Valor do Item: R$${valorItem.toFixed(2)}<br></span>
          <button class="botaoRemover">Remover</button>
          <button class="botaoEditar">Editar</button>
        `;

    const botaoRemover = itemLista.querySelector(".botaoRemover");
    botaoRemover.addEventListener("click", function () {
      removerDaLista(itemLista, valorItem);
    });

    const botaoEditar = itemLista.querySelector(".botaoEditar");
    botaoEditar.addEventListener("click", function () {
      popUpEdicao.style.display = "flex";
      exibirPopupEdicao(
        itemLista,
        nomeProduto,
        quantidadeProduto,
        valorProduto,
        valorItem
      );
    });

    return itemLista;
  }

  function salvarNoLocalStorage(
    nomeProduto,
    quantidadeProduto,
    valorProduto,
    valorItem
  ) {
    const mercadoriaLocalStorage =
      JSON.parse(localStorage.getItem("compras")) || [];
    mercadoriaLocalStorage.push({
      nomeProduto,
      quantidadeProduto,
      valorProduto,
      valorItem,
    });
    localStorage.setItem("compras", JSON.stringify(mercadoriaLocalStorage));
  }

  function removerDaLista(itemLista, valorItem) {
    listaCompras.removeChild(itemLista);
    valorTotal -= valorItem;
    valorTotalElement.textContent = `Valor Total: R$${valorTotal.toFixed(2)}`;
    const mercadoriaLocalStorage =
      JSON.parse(localStorage.getItem("compras")) || [];
    const index = mercadoriaLocalStorage.findIndex(
      (compra) => compra.valorItem === valorItem
    );
    if (index !== -1) {
      mercadoriaLocalStorage.splice(index, 1);
      localStorage.setItem("compras", JSON.stringify(mercadoriaLocalStorage));
    }
  }

  function exibirPopupEdicao(
    itemLista,
    nomeProduto,
    quantidadeProduto,
    valorProduto,
    valorItem
  ) {
    document.getElementById("novaQuantidade").value = quantidadeProduto;
    document.getElementById("novoValor").value = valorProduto.toFixed(2);

    const botaoSalvar = document.getElementById("botaoSalvar");
    botaoSalvar.addEventListener("click", function () {
        popUpEdicao.style.display = "none";
      const novaQuantidade = parseFloat(
        document.getElementById("novaQuantidade").value
      );
      const novoValorTexto = document.getElementById("novoValor").value;

      if (!isNaN(novaQuantidade) && novoValorTexto) {
        const novoValorProduto = parseFloat(
          novoValorTexto.replace(/[^\d,.]/g, "").replace(",", ".")
        );
        const novoValorItem = novoValorProduto * novaQuantidade;

        const spanElement = itemLista.querySelector("span");
        spanElement.innerHTML = `
                ${nomeProduto}<br>
                Quantidade: ${novaQuantidade}<br>
                Valor Unitário: R$${novoValorProduto.toFixed(2)}<br>
                Valor do Item: R$${novoValorItem.toFixed(2)}<br>
              `;

        const mercadoriaLocalStorage =
          JSON.parse(localStorage.getItem("compras")) || [];
        const index = mercadoriaLocalStorage.findIndex(
          (compra) => compra.nomeProduto === nomeProduto
        );

        if (index !== -1) {
          mercadoriaLocalStorage[index] = {
            nomeProduto,
            quantidadeProduto: novaQuantidade,
            valorProduto: novoValorProduto,
            valorItem: novoValorItem,
          };
        }

        localStorage.setItem("compras", JSON.stringify(mercadoriaLocalStorage));

        valorTotal += novoValorItem - valorItem;
        valorTotalElement.textContent = `Valor Total: R$${valorTotal.toFixed(
          2
        )}`;
      }
    });
  }
});
