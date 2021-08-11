//let columns = document.getElementsByClassName()

// Making Handlbars helper
/*Handlebars.registerHelper('makeCol', function(context,) {
    let ret = "";
    for ( let i = 0; i < context.length; i++) {
        ret +=
    }
}) */

// Setting up charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart).then(response => {
    console.log(response);
}).catch(e => {
    console.log(e);
});

// Drawing chart
function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
        ['Mushrooms', 3],
        ['Onions', 1.25],
        ['Olives', 1],
        ['Zucchini', 1],
        ['Pepperoni', 2]
    ]);

    // Set chart options
    var options = {'title':'How Much Pizza I Ate Last Night',
                    'width':400,
                    'height':300};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}
