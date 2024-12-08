let orderItems = []; // Array para armazenar os pedidos
let total = 0; // Variável para armazenar o total

function addToOrder(itemName, itemPrice) {
    // Adiciona o item ao pedido
    orderItems.push({ name: itemName, price: itemPrice });
    total += itemPrice; // Atualiza o total
    updateOrderList();
    updateInvoice();
}

function updateOrderList() {
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = ''; // Limpa a lista atual

    // Atualiza a lista de pedidos
    orderItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;

        // Cria o botão de remover
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => removeFromOrder(index); // Chama a função de remoção

        li.appendChild(removeButton); // Adiciona o botão à lista
        orderList.appendChild(li);
    });

    // Atualiza o total
    document.getElementById('totalPrice').textContent = `R$ ${total.toFixed(2)}`;
}

function removeFromOrder(index) {
    // Remove o item do pedido
    total -= orderItems[index].price; // Subtrai o preço do total
    orderItems.splice(index, 1); // Remove o item do array
    updateOrderList(); // Atualiza a lista
}

function clearOrder() {
    // Limpa o pedido
    orderItems = [];
    total = 0;
    updateOrderList();
    updateInvoice();
}

function updateInvoice() {
    const invoiceList = document.getElementById('invoiceList');
    invoiceList.innerHTML = ''; // Limpa a lista atual do cupom

    orderItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
        invoiceList.appendChild(li);
    });

    updateTotalPrice();
}

function updateTotalPrice() {
    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = `R$ ${total.toFixed(2)}`;
}

function sendOrder() {
    const clientName = document.getElementById('clientName').value.trim();

    // Verifica se o nome do cliente e o pedido estão preenchidos
    if (!clientName || orderItems.length === 0) {
        alert('Por favor, preencha o nome do cliente e adicione itens ao pedido.');
        return;
    }

    // Cria a mensagem para o WhatsApp
    let message = `Olá, meu nome é ${clientName}. Aqui está meu pedido:\n`;
    orderItems.forEach(item => {
        message += `${item.name} - R$ ${item.price.toFixed(2)}\n`;
    });
    message += `Total: R$ ${total.toFixed(2)}`;

    // Formata o link do WhatsApp
    const whatsappNumber = '5585998222118'; // Número de WhatsApp
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Abre o WhatsApp com a mensagem
    window.open(whatsappLink, '_blank');

    clearOrder(); // Limpa o pedido após enviar
}

function finalizeOrder() {
    // Substitua 'sua_chave_pix' pela sua chave Pix ou pela string de pagamento
    var pixKey = "sua_chave_pix"; // Pode ser um número de telefone, e-mail ou chave aleatória
    var amount = parseFloat(document.getElementById('totalPrice').innerText.replace('R$ ', '').replace(',', '.')); // Obtém o valor total do pedido
    var message = "Pagamento Parada do Lanche"; // Mensagem opcional

    // Formato do código Pix
    var pixData = `00020101021126800010BR.GOV.BCB.PIX0111${pixKey}520400005303986540${amount.toFixed(2)}5802BR5925Parada do Lanche6009São Paulo62070503***6304${Math.floor(Math.random() * 10000)}`;

    // Limpa o QR Code anterior, se houver
    $('#qrcode').empty();

    // Gera o QR Code
    $('#qrcode').qrcode({
        text: pixData,
        width: 200,
        height: 200
    });
}

function updatePaymentMethod() {
    // Limpa o QR Code e o link Pix ao mudar a forma de pagamento
    $('#qrcode').empty();
    $('#pixLink').hide();
}


function finalizeOrder() {
    // Simulação de envio do pedido
    alert("Pedido enviado com sucesso!");

    // Obtém a forma de pagamento selecionada
    var paymentMethod = document.getElementById('paymentMethod').value;

    // Se a forma de pagamento for Pix, gera o QR Code e o link
    if (paymentMethod === 'pix') {
        // Sua chave Pix
        var pixKey = "85992545587"; // Chave Pix fornecida
        var amount = parseFloat(document.getElementById('totalPrice').innerText.replace('R$ ', '').replace(',', '.')); // Obtém o valor total do pedido
        var message = "Pagamento Parada do Lanche"; // Mensagem opcional

        // Formato do código Pix
        var pixData = `00020101021126800010BR.GOV.BCB.PIX0111${pixKey}520400005303986540${amount.toFixed(2)}5802BR5925Parada do Lanche6009São Paulo62070503***6304${Math.floor(Math.random() * 10000)}`;

        // Limpa o QR Code anterior, se houver
        $('#qrcode').empty();

        // Gera o QR Code
        $('#qrcode').qrcode({
            text: pixData,
            width: 200,
            height: 200
        });

        // Gera o link Pix
        var pixLink = `pix:${pixKey}?amount=${amount.toFixed(2)}&message=${encodeURIComponent(message)}`;
        $('#pixPaymentLink').attr('href', pixLink);
        $('#pixLink').show(); // Exibe o link
    } else {
        // Se a forma de pagamento não for Pix, apenas exibe uma mensagem
        alert("Forma de pagamento selecionada: " + paymentMethod);
        $('#qrcode').empty(); // Limpa o QR Code se não for Pix
        $('#pixLink').hide();
    }}