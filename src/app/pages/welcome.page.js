import { html, css, LitElement } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html";

export class WelcomePage extends LitElement {
  static get properties() {
    return {
      bigTitle: { type: String },
      buttonText: { type: String },
    };
  }

  constructor() {
    super();
    this.bigTitle = "Hi! Welcome!";
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-flow: column wrap;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: #fff;
        box-shadow:  0 1em 1em rgba(0,0,0,0.3);
      }

      :host > div {
        flex-grow: 1 100%;
        background-color: whitesmoke;
        border-radius: 1em;
      }

      #push-button {
        font-size: 1.2em;
        font-weight: bold;
        color: #000;
        text-align: center;
        width: 4em;
        padding: 0.5em;
        text-decoration: none;
        border: solid 0.2em #000;
        border-radius: 5em;
        transition: all 0.5s;
        cursor: pointer;
      }
      #push-button:hover {
        width: 5em;
        transition: all 0.5s;
      }

      #push-button::after {
        margin-left: -1.5em;
        opacity: 0;
        content: " >>";
        transition: all 0.5s;

      }

      #push-button:hover::after {
        margin-left: 0;
        opacity: 1;
        
      }

      @keyframes backgroundOut {
        100% {
          background-color: linear-gradient(left, red, rgba(255,255,255,1));
        }
      } 
    `;
  }

  render() {
    return html`
      ${unsafeHTML(`${this._createHeadings().join("")}`)}
      <a id="push-button" href="/main-page">Push</a>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  _createHeadings() {
    const generatedHeadings = this.bigTitle.split(" ").map((word) => {
      const headingSize = word.length < 5 ? 1 : 4;

      return `<h${headingSize}>${word}</h${headingSize}>`;
    });

    return generatedHeadings;
  }
}

customElements.define("welcome-page", WelcomePage);
