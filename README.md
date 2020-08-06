## Web Components

+ Introduce a new HTML tag.

**index.html**

```
<product-card></product-card>
```

+ Create a class --> extend HTMLElement creating a *Custom Element* (using *constructor* with *super method*)

**index.js**

```
class ProductCard extends HTMLElement {
    constructor() {
        super();
        // e.g this.innerHTML=""
        }
    }
```

+ Define Custom Element

**index.js**

```
window.customElements.define('product-card', ProductCard);
```

+ Incapsulating --> create shadow DOM

**index.js**

```
this.attachShadow({ mode: 'open' });
```

+ Add shadowRoot --> template (to be created)
```
this.shadowRoot.appendChild(template.content.cloneNode(true));
```

+ Create a template

```
const template = document.createElement('template');
template.innerHTML = `
<style>
    .product-card {
    ...
    }
</style>
<div class="product-card">
    ...
</div>
```

+ Add attributes --> *name*, *avatar*

**index.html**
```
<product-card name="Carne" avatar="/img/carne.jpg">
</product-card>
```

**index.js**
```
this.shadowRoot.querySelector('h3').innerText =
            this.getAttribute('name');
        this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
```

+ Extend template + add slots

**index.js**
```
<div class="product-card">
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
        
    </div>
</div>
```

**index.html**
```
<product-card name="Carne" avatar="/img/carne.jpg">
            <div slot="description"></div>
            <div slot="price"></div>
</product-card>
```

+ Add *Events* --> "Select buttom"

**index.js**
```
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
    
connectedCallback() {
       this.shadowRoot.querySelector('#selectbtn').addEventListener('click', () => this.selectbtn());
        }
        
disconnectedCallback() {
        this.shadowRoot.querySelector('#selectbtn').removeEventListener();
        }
```

+ Extend the template with *button*

```
<button id="selectbtn">Select</button>
```

+ Add *Events* --> "Hide Info"

```
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
        
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').removeEventListener();

    }
```

+ Extend the template with *button*

```
<button id="selectbtn">Select</button>
```

## Result 

![Web](/images/body.png)

+ Click "Select Botton"

![Web](/images/select.png)

+ Click "Hide Info"

![Web](/images/info.png)
