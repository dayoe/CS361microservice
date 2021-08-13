
// Pulling data from document
document.addEventListener('DOMContentLoaded', (event) => {
    let xtitle, ytitle, xmin, xmax, ymin, ymax, points;
    xtitle = document.getElementById('xtitle').innerHTML;
    ytitle = document.getElementById('ytitle').innerHTML;
    xmin = document.getElementById('xmin').innerHTML;
    xmax = document.getElementById('xmax').innerHTML;
    ymin = document.getElementById('ymin').innerHTML;
    ymax = document.getElementById('ymax').innerHTML;
    points = document.getElementById('points').innerHTML;
})

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart).then(response => {
    console.log(response);
}).catch(e => {
    console.log(e);
});

function drawChart() {
    var data = new google.visualization.arrayToDataTable([
        ['Age', 'Weight'],
        [8, 1],
        [3, 2]
    ]);

    var options = {
        title: 'Age vs. Weight comparison',
        hAxis: {title: 'Age', minValue: 0, maxValue: 15},
        vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
        legend: 'none'
    };

    var chart = new google.visualization.ScatterChart(document.getElementById('uriLoc'));
    google.visualization.events.addListener(chart, 'ready', () => {
        let chartUri = chart.getImageURI();
        document.getElementById('uriLoc').innerText = chartUri;
    });
    chart.draw(data, options);
}