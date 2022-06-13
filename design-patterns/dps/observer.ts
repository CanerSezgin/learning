class WeatherData {
    constructor(public type: string, public value: number){}
    toString(){
        return `${this.type}: ${this.value}`
    }
}

abstract class WeatherDataObservable {
    private observers: IWeatherDataObserver[] = []
    attachObserver(observer: IWeatherDataObserver){
        this.observers.push(observer)
    }
    detachObserver(observer: IWeatherDataObserver){
        const observerIndex = this.observers.findIndex(o => o === observer)
        if(observerIndex > -1){
            this.observers.splice(observerIndex, 1)
        }
    }
    notifyObserver(data: WeatherData){
        this.observers.forEach(observer => {
            observer.update(data)
        });
    }
}

class WeatherStation extends WeatherDataObservable  {
    private dataset: WeatherData[] = []
    addData(data: WeatherData){
        this.dataset.push(data)
        this.notifyObserver(data)
    }
}

interface IWeatherDataObserver {
    update(data: WeatherData): void
}

class WeatherDataPrinter implements IWeatherDataObserver {
    update(data: WeatherData): void {
        console.log(data.toString())
    }
}

class WeatherDataAggregator implements IWeatherDataObserver {
    private sum = 0
    private n = 0
    update(data: WeatherData): void {
        this.sum += data.value
        this.n++
    }
    getAverage(){
        return this.n ? this.sum / this.n : 0
    }
}

const main = () => {
    const station = new WeatherStation()

    const printer = new WeatherDataPrinter()
    const aggregator = new WeatherDataAggregator()
    station.attachObserver(printer)
    station.attachObserver(aggregator)

    station.addData(new WeatherData('Temperature', 10))
    station.addData(new WeatherData('Temperature', 11))
    station.addData(new WeatherData('Temperature', 12))
    station.addData(new WeatherData('Temperature', 13))
    station.addData(new WeatherData('Temperature', 14))

    const avgTemperature = aggregator.getAverage()
    console.log('Average Temperature:', avgTemperature)
}

main()