abstract class Beverage {
    abstract getDescription(): string
    abstract cost(): number
}

class Espresso extends Beverage {
    getDescription(): string {
        return 'Espresso'
    }
    cost(): number {
        return 10
    }
}

class Decaf extends Beverage {
    getDescription(): string {
        return 'Decaf'
    }
    cost(): number {
        return 8
    }
}

class AddonDecorator extends Beverage {
    constructor(public beverage: Beverage){
        super()
    }
    getDescription(): string {
        return this.beverage.getDescription() + ' Default Description'
    }
    cost(){
        return this.beverage.cost()
    }
}

class Caramel extends AddonDecorator {
    getDescription(): string {
        return this.beverage.getDescription() + ' Caramel'
    }
    cost(): number {
        return this.beverage.cost() + 1
    }
}

class Milk extends AddonDecorator {
    getDescription(): string {
        return this.beverage.getDescription() + ' Milk'
    }
    cost(): number {
        return this.beverage.cost() + 2
    }
}

const myBeverage = new Milk(new Caramel(new Espresso))
console.log(`My beverage is ${myBeverage.getDescription()} and I paid ${myBeverage.cost()} EUR.`)