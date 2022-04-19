console.log(`\n----- Open - Closed Principle -----`)
console.log('Open for extension, closed for modification\n')

enum Color {
    red = 'red',
    green = 'green',
    blue = 'blue'
}

enum Size {
    small = 'small',
    medium = 'medium',
    large = 'large'
}

class Product {
    constructor(
        public name: string,
        public color: Color,
        public size: Size
    ) { }
}

// Bad Way
class ProductFilter {
    filterByColor() { }
    filterBySize() { }
    // You need to modify the class each time when you need to extend
}

// Better Way
interface ISpecification {
    isSatisfied(product: Product): boolean
}

class ColorSpecification implements ISpecification {
    constructor(private color: Color) { }

    isSatisfied(product: Product) {
        return product.color === this.color
    }
}

class SizeSpecification implements ISpecification {
    constructor(private size: Size) { }

    isSatisfied(product: Product) {
        return product.size === this.size
    }
}

class AndSpecification implements ISpecification {
    private specs: ISpecification[]
    constructor(...specs: ISpecification[]) {
        this.specs = specs
    }

    isSatisfied(product: Product): boolean {
        return this.specs.every(spec => spec.isSatisfied(product))
    }
}

class BetterProductFilter {
    filter(products: Product[], specification: ISpecification) {
        return products.filter(product => specification.isSatisfied(product))
    }
}

// Client
const products = [
    new Product('Apple', Color.green, Size.small),
    new Product('Tree', Color.green, Size.large),
    new Product('House', Color.blue, Size.large)
]

const bpf = new BetterProductFilter()

console.log('Green Products')
const greenProducts = bpf.filter(
    products, 
    new ColorSpecification(Color.green)
)
for (const p of greenProducts) {
    console.log(` * ${p.name} is green`)
}

console.log(`Large and Green Products`)
const largeAndGreenProducts = bpf.filter(
    products,
    new AndSpecification(
        new ColorSpecification(Color.green),
        new SizeSpecification(Size.large)
    )
)
for (const p of largeAndGreenProducts) {
    console.log(` * ${p.name} is large and green`)
}