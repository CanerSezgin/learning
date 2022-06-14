class Simulation {
    constructor(private writer: Writer){}

    run(){
        for (let i = 0; i < 10; i++) {
            const result = Math.random() <= 0.5 ? 'Heads' : 'Tails'            
            this.writer.write(result)
        }
    }
}

interface Writer {
    write(msg: string): void
}

class ConsoleWriter implements Writer {
    write(msg: string): void {
        console.log(msg)
    }
}

class FileWriter implements Writer {
    write(msg: string): void {
        console.log('writing into file...', msg)
    }
}

const writer = new FileWriter()
const simulation = new Simulation(writer)
simulation.run()