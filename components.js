console.log('%ccomponents.js', 'background-color:blue; padding: 0 0.5em 0 0.5em; border-radius: 1em; color: white;', 'loaded')

const activeElementClass = 'active'

class ViewLink extends HTMLElement {
    constructor() {
        super()
        this.activeElementClass = activeElementClass
        this.possibleFix = '\nPossible fix: Make sure all <view-link> elements have a "data-container-id" attribute coresponding to an existing element and a "href" attribute coresponding to an existing resourse on a server.'
    }
    connectedCallback() {
        if (this.getAttribute('rel') == 'preload') this.fetchAndDisplay()
        this.addEventListener('click', this.fetchAndDisplay)
    }
    disconnectedCallback() {
        this.removeEventListener('click', this.fetchAndDisplay)
    }
    async fetchAndDisplay(event) {
        const containerId = this.dataset.containerId
        if (!containerId) return console.error(`attribute "data-container-id" not found! ${this.possibleFix}`)
        const container = document.querySelector(`#${containerId}`)
        if (!container) return console.error(`container element with "${containerId}" id not found! ${this.possibleFix}`)
        const path = this.getAttribute('href')
        if (!path) return console.error(`attribute "href" not found! ${this.possibleFix}`)
        const response = await fetch(path)
        container.innerHTML = await response.text()
        this.changeActive(containerId)
    }  
    changeActive(containerId) {
        for (const viewLink of document.querySelectorAll(`[data-container-id=${containerId}]`))
            for (const viewLinkChild of viewLink.children)
                viewLinkChild.classList.remove(this.activeElementClass)
        for (const viewLinkChild of this.children)
            viewLinkChild.classList.add(this.activeElementClass)
    }
}
customElements.define('view-link', ViewLink)

class SelectionFrame extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        this.style.pointerEvents = "none"
        this.style.boxSizing = "border-box"
        this.style.position = "absolute"
        this.style.zIndex = "999"
        this.parentElement.addEventListener("mouseover", event => event.target.focus())
        this.parentElement.addEventListener('focus', this.focusHandler.bind(this), true)
    }
    focusHandler(event) {
        this.style.left = event.target.getBoundingClientRect().left + "px"
        this.style.top = event.target.getBoundingClientRect().top + "px"
        this.style.width = event.target.getBoundingClientRect().width + "px"
        this.style.height = event.target.getBoundingClientRect().height + "px"
    } 
}
customElements.define('selection-frame', SelectionFrame)


