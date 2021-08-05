const express = require('express');
const app = express();
const handlebars = require('express-handlebars');

app.engine('.hbs', handlebars({
    extname: ".hbs"
}));
app.use(express.static('public'));
app.use(express.json());
app.set('port', 3003);
app.set('view engine', '.hbs');

//app.use('/', require('./service.js'));

app.get('/', function (req, res){
  res.render('index');
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on port ' + app.get('port') + '; press Ctrl-C to terminate.');
});