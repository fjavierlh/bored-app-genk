import { html, css, LitElement } from "lit";

export class MainPage extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        min-height: 100%;
      }

      .main-content {
        display: flex;
        position: absolute;
        width: 100%;
        min-height: 80%;
        flex-flow: column wrap;
        justify-content: center;
        align-items: center;
      }
    `;
  }

  static get properties() {
    return {
      image: { type: String },
    };
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
    <div class="main-content" data-cy="main-content">
      <activity-card></activity-card>
    </div>
      `;
  }
}

customElements.define("main-page", MainPage);
