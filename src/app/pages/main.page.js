import { html, css, LitElement } from "lit";

export class MainPage extends LitElement {
  

  static get styles() {
    return css`
     :host {
      display: block;
      min-height: 100%;
    }
    
    .main-content {
      display: block;
      height: 100%;
      
    }

    `;
  }

  static get properties()  {
    return {
      image: { type: String}
    }
  }

  constructor() {
    super();
  }
  
  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
        <activity-card></activity-card>
    `;
  }
}

customElements.define("main-page", MainPage);
