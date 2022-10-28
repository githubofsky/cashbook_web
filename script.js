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

// Profit
var salary_item = [];
var salary_price = 0;
var bonus_item = [];
var bonus_price = 0;
var income_item = [];
var income_price = 0;

// 고정지출
var interest_item = [];
var interest_price = 0;
var insurance_item = [];
var insurance_price = 0;
var tele_item = [];
var tele_price = 0;
var house_item = [];
var house_price = 0;
var edu_item = [];
var edu_price = 0;
var gas_item = [];
var gas_price = 0;
var family_item = [];
var family_price = 0;
var saving_item = [];
var saving_price = 0;
var tax_item = [];
var tax_price = 0;

// 변동지출
var food_item = [];
var food_price = 0;

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
                salary_price += price;
            } else if (items[i]['label'] == "성과급") {
                bonus_item.push(items[i]);
                bonus_price += price;
            } else {
                income_item.push(items[i]);
                income_price += price;
            }
        } else {
            loss -= price;
            if (items[i]['label'] == "대출이자") {
                interest_item.push(items[i]);
                interest_price += price;
            } else if (items[i]['label'] == "보험금") {
                insurance_item.push(items[i]);
                insurance_price += price;
            } else if (items[i]['label'] == "통신비") {
                tele_item.push(items[i]);
                tele_price += price;
            } else if (items[i]['label'] == "주거비") {
                house_item.push(items[i]);
                house_price += price;
            } else if (items[i]['label'] == "교육비") {
                edu_item.push(items[i]);
                edu_price += price;
            } else if (items[i]['label'] == "유류비") {
                gas_item.push(items[i]);
                gas_price += price;
            } else if (items[i]['label'] == "가족") {
                family_item.push(items[i]);
                family_price += price;
            } else if (items[i]['label'] == "저축") {
                saving_item.push(items[i]);
                saving_price += price;
            } else if (items[i]['label'] == "식비") {
                food_item.push(items[i]);
                food_price += price;
            }
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
    drawTitle('수입: ' + (salary_price+bonus_price+income_price).toLocaleString(),
        'rgba(54, 162, 235, 1)', 'profitTitle');

    // draw profit chart 
    Chart.defaults.font.size = 50;
    console.log(salary_item);
    console.log(salary_price);
    console.log(bonus_price);
    console.log(income_price);
    const ctx_pc = document.getElementById('profitChart').getContext('2d');
    const pChart = new Chart(ctx_pc, {
        type: 'doughnut',
        data: {
            labels: ['월급', '성과급', '기타소득'],
            datasets: [{
                label: 'Amount',
                data: [salary_price, bonus_price, income_price],
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

    // draw profit Item
    drawItem("월급", salary_item, "salaryItem");
    drawItem("성과급", bonus_item, "bonusItem");
    drawItem("기타소득", income_item, "incomeItem");
    //console.log(income_item);

    // draw necessity loss
    drawTitle('고정지출: ' + (salary_price+bonus_price+income_price).toLocaleString(),
        'rgba(255, 99, 132, 1)', 'loss1Title');

    // draw necessity chart 
    Chart.defaults.font.size = 50;
    console.log(salary_item);
    console.log(salary_price);
    console.log(bonus_price);
    console.log(income_price);
    const ctx_l1c = document.getElementById('loss1Chart').getContext('2d');
    const l1Chart = new Chart(ctx_l1c, {
        type: 'doughnut',
        data: {
            labels: ['이자', '보험금', '통신비', '주거비', '교육비', '유류비', '가족', '저축', '세금'],
            datasets: [{
                label: 'Amount',
                data: [interest_price, insurance_price, tele_price, house_price, edu_price, gas_price,
                    family_price, saving_price, tax_price],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(247, 101, 163, 1)',
                    'rgba(161, 85, 185, 1)',
                    'rgba(22, 91, 169, 1)',
                ],
                hoverOffset: 4
            }]
        }
    });

    // draw necessity item
    drawItem("월급", salary_item, "salaryItem");

});

/*
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
                'rgba(255, 159, 64, 0.2)',
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
*/

function drawTitle(title, color, canvas) {
    const ctx_pt = document.getElementById(canvas).getContext('2d');
    ctx_pt.canvas.width = window.innerWidth;
    var w = ctx_pt.canvas.width;
    ctx_pt.font = "60px '맑은 고딕'";
    ctx_pt.textAlign = 'center';
    ctx_pt.textBaseline = 'hanging';
    ctx_pt.fillStyle = color 
    ctx_pt.fillText(title, w*0.5, 0);
}

function drawItem(title, item, canvas) {
    const ctx = document.getElementById(canvas).getContext('2d');
    var len = item.length;
    ctx.canvas.width = window.innerWidth;
    var title_h = 45
    var gap = 40
    ctx.canvas.height = title_h + len*gap + title_h;
    var w = ctx.canvas.width;

    ctx.font = "bold 40px '맑은 고딕'";
    ctx.fillText(title, 2, 40);
    ctx.font = "36px '맑은 고딕'";
    for (var i = 0; i < len; i++) {
        ctx.fillText(item[i]["date"], 0, title_h+(i+1)*gap);
        ctx.fillText(item[i]["name"], 300, title_h+(i+1)*gap);
        ctx.fillText(Number(item[i]["price"]).toLocaleString(), 685, title_h+(i+1)*gap);
        ctx.fillText(item[i]["memo"], 870, title_h+(i+1)*gap);
    }
};