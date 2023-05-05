import config from "../config.js";
export default class MyForm extends HTMLElement{
    static url = import.meta.url
    static async components(){
        return await(await fetch(config.uri(MyForm.url))).text();
    }
    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }
    handleEvent(e){
        (e.type === "submit") ? this.enviarWorker(e)
        :undefined;
    }
    enviarWorker(e){
        console.log(e);
        e.preventDefault()
    }
    connectedCallback(){
        Promise.resolve(MyForm.components()).then(html=>{
            this.shadowRoot.innerHTML= html;
            this.MybHeader = this.shadowRoot.querySelector("form");
            this.MybHeader.addEventListener("submit",this.handleEvent.bind(this))
        })
    }
}
console.log(config.name);
customElements.define(config.name(MyForm.url), MyForm);
