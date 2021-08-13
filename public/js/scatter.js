


google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
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


    var data = google.visualization.arrayToDataTable([
        [xtitle, ytitle],
        Number(points)
    ]);

    var options = {
        title: 'Age vs. Weight comparison',
        hAxis: {title: xtitle, minValue: 0, maxValue: 15},
        vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
        legend: 'none'
    };


    var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));

    chart.draw(data, options);

}