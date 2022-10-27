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

$.getJSON("./data/2209/items.json", function(data) {
    items = data['items']
    console.log(items);

    var profit = 0
    var loss = 0
    for (var i=0; i<items.length; i++) {
        var price = Number(items[i]['price'])
        if (price >= 0) {
            profit += price;
        } else {
            loss -= price;
        }
    }
    sum = profit - loss;

    const ctx = document.getElementById('title').getContext('2d');
    ctx.font = "60px 'Fira Sans'";
    ctx.textAlign = 'right';
    ctx.fillText('Profit:', 400, 100);
    ctx.fillText('Loss:', 400, 200);
    ctx.fillText('Total:', 400, 300);

    ctx.font = "80px 'Fira Sans'";
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(54, 162, 235, 1)',
    ctx.fillText(profit.toLocaleString(), 450, 100);
    ctx.fillStyle = 'rgba(255, 99, 132, 1)';
    ctx.fillText(loss.toLocaleString(), 450, 200);
    if (sum >= 0) {
        ctx.fillStyle = 'rgba(54, 162, 235, 1)';
    } else {
        ctx.fillStyle = 'rgba(255, 99, 132, 1)';
    }
    ctx.fillText(sum.toLocaleString(), 450, 300);
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
