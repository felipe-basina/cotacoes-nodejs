const path = require('path');
const express = require('express');
const hbs = require('hbs');
const cotacao = require('./util/cotacao');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//console.log(publicDirectoryPath);
//console.log(viewsPath);

app.set('view engine', 'hbs'); // utilizando o hbs
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

app.get('', (request, response) => {
    response.render('index', {
        title: "Bem vindo ao sistema de cotações",
        author: "fnascimento",
    }); // redireciona para /views/index.hbs
});

app.get('/help', (request, response) => {
    response.render('help', {
        title: "Ajuda",
        author: "fnascimento",
    }); 
});

app.get('/about', (request, response) => {
    response.render('about', {
        title: "Sobre",
        author: "fnascimento",
    }); 
});

app.get('/cotacoes', (request, response) => {
    console.log(request.query.ativo);

    if (!request.query.ativo) {
        const error = {
            message: 'O ativo deve ser informado',
            code: 400,
        };
        return response.status(400).json(error);  
    }

    const symbol = request.query.ativo.toUpperCase();
    cotacao.cotacao(symbol, (err, data) => {
        if (err) {
            console.log(err);
            const error = {
                message: err.message,
                code: err.code,
            }
            return response.status(err.code).json(error);
        }
        console.log(data);
        response.status(200).json(data);
    });
});

app.get('/help/*', (request, response) => {
    response.render('404', {
        title: '404',
        errorMessage: 'Não existe página depois de /help',
        author: 'fnascimento',
    });
});

app.get('*', (request, response) => {
    response.render('404', {
        title: '404',
        errorMessage: 'Página não encontrada',
        author: 'fnascimento',
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log(`Server is running on port ${port}`); 
});