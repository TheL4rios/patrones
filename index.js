var Subject = /** @class */ (function () {
    function Subject() {
        this.observers = [];
    }
    Subject.prototype.subscribe = function (observer) {
        var _this = this;
        this.observers.push(observer);
        return {
            unsubscribe: function () {
                _this.unsubscribe(observer);
            },
        };
    };
    Subject.prototype.unsubscribe = function (observer) {
        this.observers = this.observers.filter(function (obs) { return obs != observer; });
    };
    Subject.prototype.next = function (value) {
        this.observers.forEach(function (observer) {
            observer(value);
        });
    };
    return Subject;
}());
var subject = new Subject();
console.log("Observador 1 > Agregado");
console.log("======================================\n\n");
subject.subscribe(function (data) {
    console.log("Observador 1 > ", data);
    console.log("---------------------------------------------\n");
});
console.log("Observador 2 > Agregado");
console.log("======================================\n\n");
var listener2 = subject.subscribe(function (data) {
    console.log("Observador 2 > ", data);
    console.log("---------------------------------------------\n");
});
var count = 0;
var interval = setInterval(function () {
    subject.next(count++);
    if (count > 6) {
        clearInterval(interval);
    }
}, 1000);
setTimeout(function () {
    console.log("Observador 2 > Desuscrito");
    listener2.unsubscribe();
}, 3000);
