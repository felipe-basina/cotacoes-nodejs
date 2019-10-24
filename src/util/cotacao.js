const request = require('request');

const api_token = '8GZEs5KScQ1xTPmqMNWiVFxEpvkEgIdtPEy3atQgWkhX8Kf0lMQ8MeUW8cry';

const cotacao = (symbol, callback) => {
    const url = `https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${api_token}`;

    request({url: url, json: true}, (err, response) => {
        if (err) {
            return callback({
                    message: `Something went wrong: ${err}`,
                    code: 500,
                }, undefined);
        } 
        
        const parseJson = response.body;

        if (parseJson === undefined || parseJson.data === undefined) {
            return callback({
                    message: `No data found`,
                    code: 404,
                }, undefined);
        }
        
        // utilizando destruct = atribuir informações para variáveis
        // desde que possuam os mesmos nomes
        const {price_open, price, day_high, day_low} = parseJson.data[0];

        // utilizando es6 = não é necessário atribuir os valores no objeto
        // desde que possuam os mesmos nomes
        const data = {
            symbol,
            price_open,
            price,
            day_high,
            day_low
        };

        callback(undefined, data);
    });
};

module.exports = {
    cotacao
}