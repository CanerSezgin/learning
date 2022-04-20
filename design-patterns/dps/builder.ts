class CodeBuilder {
    private fields: string[] = []
    constructor(private className: string) { }

    addField(name: string) {
        this.fields.push(name)
        return this
    }
    toString() {
        console.log(
            `class ${this.className} {\n` +
            `  constructor(${this.fields.join(', ')}) {\n` +
            this.fields
                .map(field => `    this.${field} = ${field};\n`)
                .join('') +
            '  }\n}'
        )
    }
}


const cb = new CodeBuilder('Person')
cb.addField('name').addField('age')
console.log(cb.toString())