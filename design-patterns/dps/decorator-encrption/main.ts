import { promises } from 'fs'
import path from 'path'
import { CryptoService, Hash } from './crypto-service'

interface DataSource {
    writeData(data: string): Promise<void>
    readData(): Promise<string> 
}

class FileDataSource implements DataSource {
    private path: string
    constructor(private filename: string){
        this.path = path.join(__dirname, 'storage', this.filename)
    }

    async writeData(data: string): Promise<void> {
        const result = await promises.writeFile(this.path, data, 'utf8')
        console.log(result)
    }
    async readData(): Promise<string> {
        const file = await promises.readFile(this.path)
        return file.toString()
    }
}

class DataSourceDecorator implements DataSource {
    constructor(protected wrappee: DataSource){}

    writeData(data: string): Promise<void> {
        return this.wrappee.writeData(data)
    }
    readData(): Promise<string> {
        return this.wrappee.readData()
    }
}

class EncryptionDecorator extends DataSourceDecorator {
    constructor(protected wrappee: DataSource, private cryptoService: CryptoService){
        super(wrappee)
    }

    writeData(data: string): Promise<void> {
        const encryptedData = this.cryptoService.encrypt(data)
        return this.wrappee.writeData(JSON.stringify(encryptedData))
    }
    async readData(): Promise<string> {
        const encryptedHashString = await this.wrappee.readData()
        const encrptedHash = JSON.parse(encryptedHashString)
        console.log('EH', encrptedHash)
        const decrptedData = this.cryptoService.decrypt(encrptedHash)
        return decrptedData
    }
}

class CompressionDecorator extends DataSourceDecorator {
    writeData(data: string): Promise<void> {
        return this.wrappee.writeData('.........COMPRESSED........' + data)
    }
    async readData(): Promise<string> {
        const rawData = await this.wrappee.readData()
        const splitted = rawData.split('.........COMPRESSED........')
        const data = splitted[1]
        return data || ''
    }
}

console.log(typeof EncryptionDecorator)

// Client Code
const salaries = [
    { name: 'John Doe', salary: 10000 },
    { name: 'Cork Smith', salary: 25000 }
]

const source = new FileDataSource('salaries.txt')
// source.writeData(JSON.stringify(salaries))
source.readData().then(data => console.log(data))

const compressedSource = new CompressionDecorator(source)
// compressedSource.writeData(JSON.stringify(salaries))
compressedSource.readData().then(data => console.log('!222!!!', data))