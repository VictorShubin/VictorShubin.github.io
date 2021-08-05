class Model extends HTMLElement {
    constructor() {
        super()
    }
    async connectedCallback() {
        let path = this.getAttribute('src')
        let obj = await fetch(path)
        let txt = await obj.text()
        console.log(txt)
    }

}
customElements.define('model-3d', Model)