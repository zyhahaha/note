
/**
 * 简单工厂的特点就是参数化创建对象，简单工厂必须知道每一种产品以及何时提供给客户端
 * 系统职能进行良好的分割！职责清晰的界限一定程度上保证了代码的单一性
 */

var FullTime = function () {
    this.hourly = "$12" ;
};
 
var PartTime = function () {
    this.hourly = "$11" ;
};
 
var Temporary = function () {
    this.hourly = "$10" ;
};
 
var Contractor = function () {
    this.hourly = "$15" ;
};
function Factory() {
    this.createEmployee = function (type) {
        var employee ;
        if (type === "fulltime") {
            employee = new FullTime() ;
        } else if (type === "parttime") {
            employee = new PartTime() ;
        } else if (type === "temporary") {
            employee = new Temporary() ;
        } else if (type === "contractor") {
            employee = new Contractor() ;
        }
        employee.type = type ;
        employee.say = function () {
            console.log(this.type + ": rate " + this.hourly + "/hour") ;
        }
        return employee ;
    } ;
}
var factory = new Factory() ;
factory.createEmployee("fulltime").say() ;