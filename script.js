//check files
//let fs = require('fs');
/*
for (var i = 2209; i < 5000; i++) {
    var m = String(i);
    var path = './data/' + m + '/itmes.json';
    if (fs.existSync(path)) {
        console.log(path);
    }
    else {
        break;
    }
}
*/
    //var path = './data/'

$.getJSON("./data/2209/itmes.json", function(data) {
    items = data['items']
    console.log(items);
    const ctx = document.getElementById('title').getContext('2d');
    ctx.font = "48px '맑은 고딕'";
    ctx.textAlign = 'right';
    ctx.fillText('Profit:', 200, 50);
    ctx.fillText('Loss:', 200, 100);
    ctx.fillText('Total:', 200, 150);
});

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
