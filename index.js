// Setting up packages
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const fs = require('fs');
const url = require('url');
const cors = require('cors');
const chartsNode = require('google-charts-node');

// package config
app.engine('.hbs', handlebars({
    extname: ".hbs"
}));
app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.set('port', 3003);
app.set('view engine', '.hbs');


app.post('/', async function (req, res){
    // Tying POST data to variables

    // Creating new 'data.addColumn' strings for each column in request body
    let columns = ``;
    function addingCols() {
        for (let i = 0; i < req.body['column'].length; i++) {
            columns += `data.addColumn('` + req.body['column'][i]['type'] + `', '` + req.body['column'][i]['title'] +
                `'); `
        }
    }
    addingCols();
    console.log(columns);

    // Creating new 'data.addRows' strings for each row in request body
    let rows = `data.addRows([`;
    function addingRows() {
        for (let j = 0; j < req.body['row'].length; j++) {
            rows += `['` + req.body['row'][j]['name'] + `', ` + req.body['row'][j]['value'] + `], `;
        }
        rows = rows.substring(0, rows.length - 2);
        rows += `]);`;
    }
    addingRows();

    let options = {
        'title': req.body['option']['title'],
        'width': req.body['option']['width'],
        'height': req.body['option']['height'],
    };

    const drawChart = `
        const data = new google.visualization.DataTable();
        ${columns}
        ${rows}
    
        // Set chart options
        const options = {'title':'${options['title']}',
          'width':${options['width']},
          'height':${options['height']}};
    
        // Instantiate and draw our chart, passing in some options.
        const chart = new google.visualization.PieChart(container);
    
        chart.draw(data, options); 
    `;
    console.log(drawChart);

    /*
    const drawChart = `
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping'); data.addColumn('number', 'Slices');
      data.addRows([['Mushrooms', 3], ['Onions', 1], ['Olives', 1], ['Zucchini', 1], ['Pepperoni', 2]]);

      // Set chart options
      var options = {'title':'How Much Pizza I Ate Last Night',
                     'width':400,
                     'height':300};

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    `;

     */

    const image = await chartsNode.render(drawChart, {
        width: 400,
        height: 300,
    });

    fs.writeFileSync('./public/img/charts/chart.png', image);
    res.sendFile('/public/img/charts/chart.png', { root: __dirname });
    console.log('Success! I think...');
}); 

app.post('/scatter', async function (req, res) {
    //console.log(req.body);
    // Tying POST data to variables
    let title, xtitle, ytitle, xmin, xmax, ymin, ymax, points
    title = req.body['title'];
    xtitle = req.body['xaxis']['title'];
    ytitle = req.body['yaxis']['title'];
    xmin = Number(req.body['xaxis']['min']);
    xmax = Number(req.body['xaxis']['max']);
    ymin = Number(req.body['yaxis']['min']);
    ymax = Number(req.body['yaxis']['max']);
    points = req.body['points'];

    const drawChart = `
    let data = new google.visualization.arrayToDataTable([
      ['${xtitle}', '${ytitle}'],
      ${points}
    ]);

    let options = {
      title: '${title}',
      hAxis: {title: '${xtitle}', minValue: ${xmin}, maxValue: ${xmax}},
      vAxis: {title: '${ytitle}', minValue: ${ymin}, maxValue: ${ymax}},
      legend: 'none'
    };

    let chart = new google.visualization.ScatterChart(container);
    chart.draw(data, options);
    `;

  const image = await chartsNode.render(drawChart, {
    width: 400,
    height: 300,
  });

  fs.writeFileSync('./public/img/charts/chart.png', image);
  res.sendFile('/public/img/charts/chart.png', { root: __dirname });
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
  console.log('Express started at http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});