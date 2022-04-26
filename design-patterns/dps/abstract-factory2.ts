interface GUIFactory {
    createButton(): Button,
    createCheckbox(): Checkbox
}

interface Button {
    paint(): void
}
interface Checkbox {
    paint(): void
}

class WinButton implements Button {
    paint(): void {
        console.log('win button printed')
    }
}

class MacButton implements Button {
    paint(): void {
        console.log('mac button printed')
    }
}

class WinCheckbox implements Checkbox {
    paint(): void {
        console.log('win checkbox printed')
    }
}

class MacCheckbox implements Checkbox {
    paint(): void {
        console.log('mac checkbox printed')
    }
}

class WinFactory implements GUIFactory {
    createButton(): Button {
        return new WinButton()
    }
    createCheckbox(): Checkbox {
        return new WinCheckbox()
    }
}

class MacFactory implements GUIFactory {
    createButton(): Button {
        return new MacButton()
    }
    createCheckbox(): Checkbox {
        return new MacCheckbox()
    }
}


const OS = 'Windows'

enum Platforms {
    Win = 'windows',
    Mac = 'mac'
}

class Application {
    private button: Button | null = null
    constructor(private factory: GUIFactory) { }

    createUI() {
        this.button = this.factory.createButton()
    }
    paint() {
        if (this.button) {
            this.button.paint()
        }
    }
}

const client = (platform: Platforms) => {

    let factory: GUIFactory
    switch (platform) {
        case Platforms.Win:
            factory = new WinFactory()
            break

        case Platforms.Mac:
            factory = new MacFactory()
            break

        default:
            throw new Error('Invalid platform');
    }

    const app = new Application(factory)
    app.createUI()
    app.paint()
}

client(Platforms.Win)