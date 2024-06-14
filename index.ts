interface ISubject {
  subscribe(observer: IFunction): void;
  unsubscribe(observer: IFunction): void;
  next(value: any): void;
}

type IFunction = (data: any) => void;

class Subject implements ISubject {
  public observers: IFunction[] = [];

  subscribe(observer: IFunction) {
    this.observers.push(observer);

    return {
      unsubscribe: () => {
        this.unsubscribe(observer);
      },
    };
  }

  unsubscribe(observer: IFunction): void {
    this.observers = this.observers.filter((obs) => obs != observer);
  }

  next(value: any): void {
    this.observers.forEach((observer) => {
      observer(value);
    });
  }
}

const subject = new Subject();
console.log("Observador 1 > Agregado");
console.log("======================================\n\n");
subject.subscribe((data) => {
  console.log("Observador 1 > ", data);
  console.log("---------------------------------------------\n");
});

console.log("Observador 2 > Agregado");
console.log("======================================\n\n");
const listener2 = subject.subscribe((data) => {
  console.log("Observador 2 > ", data);
  console.log("---------------------------------------------\n");
});

let count = 0;
const interval = setInterval(() => {
  subject.next(count++);
  if (count > 6) {
    clearInterval(interval);
  }
}, 1000);

setTimeout(() => {
  console.log("Observador 2 > Desuscrito");
  listener2.unsubscribe();
}, 3000);
