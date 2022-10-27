//check files
//let fs = require('fs');
for (var i = 2209; i < 5000; i++) {
    var m = String(i);
    var path = './data/' + m + '/itmes.json';
    /*
    if (fs.existSync(path)) {
        console.log(path);
    }
    else {
        break;
    }
    */
}
    //var path = './data/'

$.getJSON("./data/2209/itmes.json", function(data) {
    console.log(data);
});
//alert('done1');

$.getJSON("./data/2210/itmes.json", function(data) {
    console.log(data);
});
//alert('done2');
