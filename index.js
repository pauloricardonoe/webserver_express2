const express    = require('express');
const bodyparser = require('body-parser');
const path       = require('path');
const app        = express();

const port = 3000;

app.use(bodyparser.urlencoded({extended: false}));
app.use('/public', express.static(__dirname + '/public'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, "views"));

const LogRequest = function (req, res, next) {
  let inicio  = Date.now();
  let momentoinicio = new Date(inicio);

  console.log('INICIO' +  ' ' + momentoinicio.toUTCString() + ' ' + req.method + ' ' + decodeURI(req.path));

  next();

  let fim  = Date.now();
  let fimreq = new Date(fim);

  console.log('FIM' + ' ' + fimreq.toUTCString() + ' ' + req.method + ' ' + decodeURI(req.path));
}

app.use(LogRequest);

// Midleware NotFound
const NotFound = function (req, res, next) {
  res.status(404).send("Página não encontrada!");
  res.end();
  next();
}

app.get('/', (req, res) => {
  res.writeHead(301, {'Location': '/public/index.html'});
  res.end();
});

//<editor-fold desc="Dados de Contato">
app.get('/contato', (req, res) => {
  res.render("contato");
});

app.post('/contato', (req, res) => {
  console.log(req.body);
  console.log('Nome:   ' + req.body.nome);
  console.log('Email:  ' + req.body.email);
  console.log('Mensagem: ' + req.body.mensagem);
  res.redirect('/');
});
//</editor-fold>

app.use(NotFound);

app.listen(port, ()=> {
  console.log(`Servidor rodando na porta ${port}`);
} );


