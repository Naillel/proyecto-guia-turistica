// components/destino-card.js

class DestinoCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    // Atributos observados según el PDF del proyecto [cite: 54]
    static get observedAttributes() {
        return ['destino-id', 'nombre', 'imagen', 'region', 'clasificacion'];
    }

    attributeChangedCallback() {
        this.render();
    }

    connectedCallback() {
        this.render();
        // Evento de clic para emitir 'destino-selected' 
        this.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('destino-selected', {
                detail: { id: this.getAttribute('destino-id') },
                bubbles: true,
                composed: true
            }));
        });
    }

    render() {
        const nombre = this.getAttribute('nombre') || 'Destino Desconocido';
        const imagen = this.getAttribute('imagen') || '';
        const region = this.getAttribute('region') || '';
        const clasificacion = this.getAttribute('clasificacion') || 'Exploración';

        // Definimos el color del badge según la clasificación de tu temática
        const badgeColors = {
            'Joya Oculta': '#20b2aa',      // Turquesa
            'Clásico Imperdible': '#ff8c00', // Naranja
            'Fuera del Circuito': '#8b4513', // Café/Papel
            'Recién Descubierto': '#32cd32'  // Verde lima
        };
        const badgeColor = badgeColors[clasificacion] || '#777';

        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                cursor: pointer;
                transition: transform 0.3s ease;
            }
            :host(:hover) {
                transform: translateY(-5px);
            }
            .card {
                background: #023020; /* Verde Selva */
                border-radius: 15px;
                overflow: hidden;
                box-shadow: 0 4px 15px rgba(0,0,0,0.5);
                border: 1px solid #ff8c00;
                height: 100%;
                display: flex;
                flex-direction: column;
            }
            .image-container {
                position: relative;
                width: 100%;
                height: 200px;
            }
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            .badge {
                position: absolute;
                top: 10px;
                right: 10px;
                background-color: ${badgeColor};
                color: white;
                padding: 5px 10px;
                border-radius: 5px;
                font-size: 0.8rem;
                font-weight: bold;
                text-transform: uppercase;
                box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
            }
            .info {
                padding: 15px;
                text-align: center;
            }
            h3 {
                margin: 0;
                color: #ff8c00; /* Naranja Tropical */
                font-size: 1.2rem;
            }
            p {
                margin: 5px 0 0;
                color: #add8e6;
                font-size: 0.9rem;
            }
        </style>
        <div class="card">
            <div class="image-container">
                <span class="badge">${clasificacion}</span>
                <img src="${imagen}" alt="${nombre}">
            </div>
            <div class="info">
                <h3>${nombre}</h3>
                <p>${region}</p>
            </div>
        </div>
        `;
    }
}

customElements.define('destino-card', DestinoCard);