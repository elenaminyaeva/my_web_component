const template = document.createElement('template');
template.innerHTML = `
<style>
    .user-card {
        font-family: 'Arial', sans-serif;
        background: #f4f4f4;
        width: 500px;
        height: 250px;
        display: grid;
        align-items: flex-start; 
        float: left;
        grid-template-columns: 1fr 2fr;
        grid-gap: 8px;
        margin-bottom: 15px;
        border-bottom: darkorchid 5px solid;
    }

    .user-card img {
        width: 100%;
        
    }

    .user-card button {
        cursor: pointer;
        background: darkorchid;
        color: #fff;
        border: 0;
        border-radius: 5px;
        padding: 5px 10px; 
        vertical-align: bottom;
        

    }
</style>
<div class="user-card">
    <img />
    <div>
        <h3></h3>
        <div class="info">
            <p>
                <slot name="description">
            </p>
            <p>
                <slot name="price">
            </p>
        </div>
        <button id="toggle-info">Hide Info</button>
        <button id="selectbtn">Select</button>
        
    </div>
</div>
<div class="selection"></div>
`;

class UserCard extends HTMLElement {
    constructor() {
        super();
        this.showInfo;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('h3').innerText =
            this.getAttribute('name');
        this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
    }

    selectbtn() {
        this.Selection = !this.Selection;
        const selection = this.shadowRoot.querySelector('.selection');
        const selectbtn = this.shadowRoot.querySelector('#selectbtn');
        if (this.Selection) {
            selection.innerText = 'Producto seleccionado es ' + this.getAttribute('name');
            selectbtn.innerText = 'Selected';
        } else {
            selection.innerText = '';
            selectbtn.innerText = 'Select';
        }
    }

    toggleInfo() {
        this.showInfo = !this.showInfo;

        const info = this.shadowRoot.querySelector('.info');
        const toggleBtn = this.shadowRoot.querySelector('#toggle-info');

        if (this.showInfo) {
            info.style.display = 'block';
            toggleBtn.innerText = 'Hide Info';
        } else {
            info.style.display = 'none';
            toggleBtn.innerText = 'Show Info';
        }
    }
    connectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo());
        this.shadowRoot.querySelector('#selectbtn').addEventListener('click', () => this.selectbtn());
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').removeEventListener();
        this.shadowRoot.querySelector('#selectbtn').removeEventListener();

    }

}


window.customElements.define('user-card', UserCard);