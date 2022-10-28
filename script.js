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

var salary_item = [];
var bonus_item = [];
var income_item = [];
var loss_item = [];
var items = [];

$.getJSON("./data/2209/items.json", function(data) {
    items = data['items']
    console.log(items);

    var profit = 0
    var loss = 0
    for (var i=0; i<items.length; i++) {
        var price = Number(items[i]['price'])
        if (price >= 0) {
            profit += price;
            if (items[i]['label'] == "월급") {
                salary_item.push(items[i]);
            }
        } else {
            loss -= price;
            loss_item.push(items[i])
        }
    }
    sum = profit - loss;

    const ctx = document.getElementById('title').getContext('2d');
    ctx.canvas.width = window.innerWidth;
    var w = ctx.canvas.width;
    ctx.font = "60px '맑은 고딕'";
    ctx.textAlign = 'right';
    ctx.fillText('수입:', w*0.4, 100);
    ctx.fillText('지출:', w*0.4, 200);
    ctx.fillText('손익:', w*0.4, 300);

    ctx.font = "80px 'Fira Sans'";
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(54, 162, 235, 1)',
    ctx.fillText(profit.toLocaleString(), w*0.44, 100);
    ctx.fillStyle = 'rgba(255, 99, 132, 1)';
    ctx.fillText(loss.toLocaleString(), w*0.44, 200);
    if (sum >= 0) {
        ctx.fillStyle = 'rgba(54, 162, 235, 1)';
    } else {
        ctx.fillStyle = 'rgba(255, 99, 132, 1)';
    }
    ctx.fillText(sum.toLocaleString(), w*0.44, 300);

    // draw profit title
    const ctx_pt = document.getElementById('profitTitle').getContext('2d');
    ctx_pt.canvas.width = window.innerWidth;
    var w = ctx_pt.canvas.width;
    ctx_pt.font = "60px '맑은 고딕'";
    ctx_pt.textAlign = 'center';
    ctx_pt.textBaseline = 'hanging';
    ctx_pt.fillText('수입', w*0.5, 0);

    // draw profit chart 
    Chart.defaults.font.size = 50;
    console.log(salary_item);
    console.log(loss_item.length);
    var salary_price = 0;
    for (var i=0; i<salary_item.length; i++) {
        salary_price += Number(salary_item[i]['price'])
    }
    console.log(salary_price);
    const ctx_pc = document.getElementById('profitChart').getContext('2d');
    const pChart = new Chart(ctx_pc, {
        type: 'doughnut',
        data: {
            labels: ['월급', '성과급', '기타소득'],
            datasets: [{
                label: 'Amount',
                data: [salary_price, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                hoverOffset: 4
            }]
        }
    });


});
{
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'doughnut',
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
};