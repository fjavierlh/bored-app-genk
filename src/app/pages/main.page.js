import { html, css, LitElement } from "lit";

export class MainPage extends LitElement {
  constructor() {
    super();
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        min-height: 100vh;
        background-color: darkkhaki;
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
      <p>Hi! This is a main page</p>
      <p>Hi! This is a main page</p>
      <p>Hi! This is a main page</p>
      <p>Hi! This is a main page</p>
      <p>Hi! This is a main page</p>
    </div>
    `;
  }
}

customElements.define("main-page", MainPage);
