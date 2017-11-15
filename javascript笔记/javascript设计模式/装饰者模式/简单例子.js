//需要装饰的类（函数）
function Macbook() {
    this.cost = function () {
        return 1000;
    };
}

function Memory(macbook) {
    this.cost = function () {
        return macbook.cost() + 75;
    };
}

function BlurayDrive(macbook) {
    this.cost = function () {
        return macbook.cost() + 300;
    };
}


function Insurance(macbook) {
    this.cost = function () {
        return macbook.cost() + 250;
    };
}


// 用法
var myMacbook = new Insurance(new BlurayDrive(new Memory(new Macbook())));
console.log(myMacbook.cost());