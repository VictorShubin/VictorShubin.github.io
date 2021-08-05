class Model extends HTMLElement {
    constructor() {
        super()
    }
    async connectedCallback() {
        let path = this.getAttribute('src')
        let obj = await fetch(path)
        console.log(obj)
    }

}
customElements.define('model-3d', Model)