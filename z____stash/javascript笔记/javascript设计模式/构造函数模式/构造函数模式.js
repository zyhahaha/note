function Car(model, year, miles) {
    if (!(this instanceof Car)) {
        return new Car(model, year, miles);
    }
    this.model = model;
    this.year = year;
    this.miles = miles;
}

Car.prototype.output= function () {
    return this.model + this.miles;
};