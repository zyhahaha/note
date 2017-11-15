function Employee(name) {
    this.name = name;
    this.say = function () {
        console.log("I am employee " + name) ;
    } ;
}
 
function EmployeeFactory() {
    this.create = function(name) {
        return new Employee(name);
    } ;
}
function Vendor(name) {
    this.name = name;
    this.say = function () {
        console.log("I am vendor " + name);
    } ;
}
function VendorFactory() {
    this.create = function(name) {
        return new Vendor(name);
    } ;
}

var employeeFactory = new EmployeeFactory() ;
employeeFactory.create("BigBear") ;