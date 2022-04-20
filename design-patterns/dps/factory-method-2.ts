interface Button {
    render(): void,
    onClick(eventName: string): void
}

class WindowsButton implements Button {
    render(): void {
        console.log('rendering windows button')
    }
    onClick(eventName: string): void {
        console.log('onclick windows button', eventName)
    }
}

class HtmlButton implements Button {
    render(): void {
        console.log('rendering HTML button')
    }
    onClick(eventName: string): void {
        console.log('onclick HTML button', eventName)
    }
}

abstract class Dialog {
    render(){
        const okButton = this.createButton()
        okButton.onClick('closeDialog')
        okButton.render()
    }
    abstract createButton(): Button 
}

class WindowsDialog extends Dialog {
    createButton(): Button {
       return new WindowsButton()
    }
}

class HtmlDialog extends Dialog {
    createButton(): Button {
        return new HtmlButton()
    }
}

const OS: string = 'Web'
let dialog: Dialog
if(OS === 'Windows'){
    dialog = new WindowsDialog()
} else if(OS === 'Web'){
    dialog = new HtmlDialog()
} else {
    throw new Error('Unsupported OS.')
}

dialog.render()