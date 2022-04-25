interface HotDrink {
    consume(): void
}

class Coffee implements HotDrink {
    consume(): void {
        console.log('This coffee is delicious!')
    }
}

class Tea implements HotDrink {
    consume(): void {
        console.log('This tea is nice with lemon!')
    }
}


interface HotDrinkFactory {
    prepare(amount: number): HotDrink
}

class TeaFactory implements HotDrinkFactory {
    prepare(amount: number): HotDrink {
        console.log(`Put in tea bag, boil water, pour ${amount}ml`)
        return new Tea()
    }
}

class CoffeeFactory implements HotDrinkFactory {
    prepare(amount: number): HotDrink {
        console.log(`Grind some beans, boil water, pour ${amount}ml`)
        return new Coffee()
    }
}

enum HotDrinkTypes {
    tea = 'tea',
    coffee = 'coffee'
}

class HotDrinkMachine {
    makeDrink(type: HotDrinkTypes) {
        switch (type) {
            case HotDrinkTypes.tea:
                return new TeaFactory().prepare(200)

            case HotDrinkTypes.coffee:
                return new CoffeeFactory().prepare(50)

            default:
                throw new Error()
        }
    }
}

const machine = new HotDrinkMachine()
const drink = machine.makeDrink(HotDrinkTypes.coffee)
drink.consume()