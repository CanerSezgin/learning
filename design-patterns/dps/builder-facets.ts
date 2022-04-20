class Person {
    streetAddress: string = ''
    city: string = ''
    postcode: string = ''
    companyName: string = ''
    position: string = ''
    annualIncome: number = 0
    constructor(
    ) { }

    toString() {
        return `Person lives at ${this.streetAddress}, ${this.city}, ${this.postcode}
        and works at ${this.companyName} as a ${this.position} earning ${this.annualIncome}`
    }
}

class PersonBuilder {
    constructor(protected person = new Person()){}

    get lives(){
        return new PersonAddressBuilder(this.person)
    }

    get works() {
        return new PersonJobBuilder(this.person)
    }

    build() {
        return this.person
    }
}

class PersonAddressBuilder extends PersonBuilder {
    constructor(person: Person){
        super(person)
    }

    at(streetAddress: string){
        this.person.streetAddress = streetAddress
        return this
    }
    withPostcode(postcode: string){
        this.person.postcode = postcode
        return this
    }
    in(city: string){
        this.person.city = city
        return this
    }
}

class PersonJobBuilder extends PersonBuilder {
    constructor(person: Person){
        super(person)
    }

    at(companyName: string){
        this.person.companyName = companyName
        return this
    }
    asA(position: string) {
        this.person.position = position
        return this
    }
    earning(annualIncome: number){
        this.person.annualIncome = annualIncome
        return this
    }

}

const pb = new PersonBuilder()
const person = pb
    .lives.at('123 London Road').in('London').withPostcode('SW12BC')
    .works.at('Fabrikam').asA('Engineer').earning(123000)
    .build()
console.log(person)