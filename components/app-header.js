// components/app-header.js

class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    // Definimos qué atributos queremos observar (según el PDF del proyecto)
    static get observedAttributes() {
        return ['active-region'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'active-region' && oldValue !== newValue) {
            this.render();
        }
    }

    connectedCallback() {
        this.render();
    }

    handleRegionClick(region) {
        // Emitir el CustomEvent 'region-selected' como pide el profe 
        this.dispatchEvent(new CustomEvent('region-selected', {
            detail: { region },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        const activeRegion = this.getAttribute('active-region') || 'Todas';
        
        // Estética: Verde selva, Naranja tropical y estilo cartográfico
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                background-color: #023020; /* Verde Selva */
                color: #ffffff;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                border-bottom: 4px solid #ff8c00; /* Naranja Tropical */
            }
            header {
                padding: 1rem 2rem;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            h1 {
                margin: 0;
                font-size: 2rem;
                text-transform: uppercase;
                letter-spacing: 2px;
                color: #ff8c00;
                text-shadow: 2px 2px #000;
            }
            p { margin: 0.5rem 0; font-style: italic; color: #add8e6; }
            nav {
                margin-top: 1rem;
                display: flex;
                gap: 15px;
                flex-wrap: wrap;
                justify-content: center;
            }
            button {
                background: transparent;
                border: 2px solid #ff8c00;
                color: white;
                padding: 8px 16px;
                cursor: pointer;
                border-radius: 20px;
                transition: all 0.3s ease;
                font-weight: bold;
            }
            button:hover {
                background: #ff8c00;
                color: #023020;
            }
            button.active {
                background: #ff8c00;
                color: #023020;
                box-shadow: 0 0 10px #ff8c00;
            }
        </style>
        <header>
            <h1>Fuera del Mapa</h1>
            <p>Comunidad de viajeros: Destinos auténticos de Costa Rica</p>
            <nav>
                ${['Todas', 'Caribe', 'Pacífico Norte', 'Central', 'Pacífico Sur y Central'].map(region => `
                    <button class="${activeRegion === region ? 'active' : ''}" 
                            onclick="this.getRootNode().host.handleRegionClick('${region}')">
                        ${region}
                    </button>
                `).join('')}
            </nav>
        </header>
        `;
    }
}

// Registrar el Custom Element 
customElements.define('app-header', AppHeader);