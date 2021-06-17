import { html, css, LitElement } from "lit";
import MainImage from "../img/waiting.webp";

export class WelcomePage extends LitElement {
  static get properties() {
    return {
      image: { type: String },
      bigTitle: { type: String },
      buttonText: { type: String },
    };
  }

  constructor() {
    super();
    this.bigTitle = "BORED?";
    this.image = MainImage;
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        width: 100%;
        min-height: 100%;
        
      }
      
      .welcome-message {
        display: flex;
        width: 100%;
        margin: 2em;
        flex-flow: column wrap;
        justify-content: center;
        align-items: center;
        animation: 2s fadeInWelcome;
      }

      .welcome-message * {
        margin: 0;
      }

      img {
        width: 70%;
        max-width: 400px;
        animation: 2s imgIn;
      }
      @keyframes imgIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .welcome-message h1 {
        /* height: 100%; */
        font-size: 2.8rem;
      }
      .welcome-message h1 span {
        position: relative;
        font-size: 5rem;
        float: right;
        top: -0.3em;
        right: 0.1em;
        margin-bottom: -0.3em;
        color: hsl(208.3, 100%, 61%);
        animation: 5s bounceMove infinite;
      }

      @keyframes bounceMove {
        0% {
          transform: rotate(10deg);
        }
        50% {
          transform: rotate(-10deg);
        }
        100% {
          transform: rotate(10deg);
        }
      }

      @keyframes fadeInWelcome {
        from {
          opacity: 0;
          margin-top: -50%;
        }
        to {
          opacity: 1;
          /* margin-top: 0%; */
        }
      }

      #push-button {
        display: block;
        font-size: 1.2em;
        font-weight: bold;
        color: #000;
        text-align: center;
        width: 4em;
        padding: 0.5em;
        border: 0; 
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
      <div class="welcome-message">
        <img class="main-image" src="${this.image}" />
        <h1>
          ${this.bigTitle.substring(0, 5)}<span
            >${this.bigTitle.charAt(this.bigTitle.length - 1)}</span
          >
        </h1>
        <a id="push-button" href="/main-page">Push</a>
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
