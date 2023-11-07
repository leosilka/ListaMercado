function formatarMoeda(input) {
    let valor = input.value.replace(/\D/g, '')
    valor = (parseInt(valor) / 100).toFixed(2)
    valor = valor.replace('.', ',')
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

    input.value = 'R$ ' + valor;
}