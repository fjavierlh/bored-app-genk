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
        min-height: 100%;
        
      }

      

      :host > div {
        display: block;
        margin: 0 auto;
        padding: 3em;
        margin-top: 30%;
      }

      .welcome-message {
        text-align: center;
        animation: 2s fadeInWelcome;
      }

      @keyframes fadeInWelcome {
        from {
          opacity: 0;
          margin-top: -50%;
          
        } to {
          opacity: 1;
          /* margin-top: 0%; */
        }
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
    `;
  }

  render() {
    return html`
      <div>
        <div class="welcome-message">
          ${unsafeHTML(`${this._createHeadings().join("")}`)}
          <a id="push-button" href="/main-page">Push</a>
        </div>
      </div>
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
