console.log('js para frontend');

const cotacoesForm = document.querySelector('form');
const mainMensage = document.querySelector('h3');
const price = document.querySelector('#price');
const priceOpen = document.querySelector('#price_open');
const dayHigh = document.querySelector('#day_high');
const dayLow = document.querySelector('#day_low');

cotacoesForm.addEventListener('submit', (event) => {
    mainMensage.innerText = 'buscando...';
    price.innerText = '';
    priceOpen.innerText = '';
    dayHigh.innerText = '';
    dayLow.innerText = '';

    event.preventDefault(); // isso fará com que a página não seja recarregada após submeter o formulário

    const ativo = document.querySelector('input').value;
    console.log(`Oi, entrei no listener com ativo ${ativo}`);

    if (!ativo) {
        mainMensage.innerText = 'O ativo deve ser informado!';
        return;
    }

    fetch(`/cotacoes?ativo=${ativo}`).then((response) => {
        response.json().then((data) => {
            if (data.message) {
                mainMensage.innerText = `${data.message}, código ${data.code}`
            } else {
                console.log(data);
                mainMensage.innerText = data.symbol;
                price.innerText = `Price: ${data.price}`;
                priceOpen.innerText = `Price Open: ${data.price_open}`;
                dayHigh.innerText = `Day High: ${data.day_high}`;
                dayLow.innerText = `Day Low: ${data.day_low}`;
            }
        });
    });
});