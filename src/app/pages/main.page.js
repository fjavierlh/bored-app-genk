import { html, css, LitElement } from "lit";
import  commonPageStyles  from "./common.styles";


export class MainPage extends LitElement {
  constructor() {
    super();
  }

  static get styles() {
    return css`
    :host {
      width: 100%;
      display: flex;
      min-height: 100%;
    }
    
    :host > div {
      flex: 1 100%;
      padding: 3em;
    }

    `;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
    <div>
      <h1>Main page</h1>
      <a href="/">Go back</a>
      <activity-options-panel></activity-options-panel>
    </div>
    `;
  }
}

customElements.define("main-page", MainPage);
