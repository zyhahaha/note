var Universe;

(function () {

    var instance;

    Universe = function Universe() {

        if (instance) {
            return instance;
        }

        instance = this;

        // 其它内容
        this.start_time = 0;
        this.bang = "Big";
    };
} ());

//测试代码
var a = new Universe();
var b = new Universe();
alert(a === b); // true
a.bang = "123";
alert(b.bang); // 123