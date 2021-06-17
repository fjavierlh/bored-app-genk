import { css, html, LitElement } from "lit";

export class ActivityOptionsPanel extends LitElement {
  constructor() {
    super();
    this.isOpen = false;
    this.typeOptions = [
      "education",
      "recreational",
      "social",
      "diy",
      "charity",
      "cooking",
      "relaxation",
      "music",
      "busywork",
    ];
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      .options-panel {
        position: fixed;
        z-index: 3;
        width: 100vw;
        min-height: 100vh;
        transform: translateX(60%);
        top: 0%;
        display: flex;
        flex-flow: column wrap;
        justify-content: flex-end;

        background-color: #38a1ff;
        transition: transform 0.4s ease-in-out;
      }

      .input-wrapper {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;

        margin: 1em;
      }
      .options-panel label {
        display: flex;
        color: #fff;
        flex: 80%;
        margin-bottom: 0.5em;
      }
      .options-panel select {
        width: 100%;
        font-size: 1.2em;
        padding: 0.5em;
      }
      .options-panel input {
        flex: 3;
      }

      .options-panel span {
        margin-left: 0.5em;
        flex: 1 0% 4em;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 4em;
        height: 4em;
        background-color: #fff;
        border-radius: 0.5em;
      }

      .buttons-wrapper {
        width: 100%;
        margin-top: 1.5em;
        display: flex;
        justify-content: space-evenly;
        margin-top: auto;
        margin-bottom: 2em;
      }

      .buttons-wrapper button {
        color: white;
        font-family: inherit;
        padding: 1em 3em;

        background-color: #000;
        border: none;
      }

      .toggle-options-open {
        transform: translateX(-50%);
      }

      .toggle-options {
        z-index: 2;
        position: fixed;
        top: 1.5em;
        right: 1em;
        border: none;
        background: #000;
        color: #fff;
        border: none;
        padding: 0.5em;
        font: inherit;
        cursor: pointer;
        animation: 4s fadeIn;
      }

      @keyframes fadeIn {
        0% {
          display: none;
          opacity: 0;
        }
        50% {
          display: none;
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    `;
  }

  static get properties() {
    return {
      isOpen: { type: Boolean },
      typeOptions: { type: Array },
      activityType: { type: String },
      key: { type: String },
      link: { type: String },
      accessibility: { type: Number },
      participants: { type: Number },
      price: { type: Number },
    };
  }

  _handleOptions() {
    const optionsObject = {};
    if (this.activityType) optionsObject.type = this.activityType;
    if (this.participants) optionsObject.participants = this.participants;
    if (this.accessibility) optionsObject.maxaccessibility = this.accessibility;
    if (this.price) optionsObject.maxprice = this.price;

    console.log(optionsObject);

    return optionsObject;
  }

  _resetOptions() {
    this.activityType =
      this.participants =
      this.accessibility =
      this.price =
        null;
    this.requestUpdate();
  }

  _toggleOptionsPanel() {
    this.isOpen = !this.isOpen;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <button
        class="toggle-options"
        @click="${(e) => this._toggleOptionsPanel(e)}"
      >
        OPTIONS
      </button>
      <div class="options-panel ${this.isOpen ? "toggle-options-open" : ""}">
        <div id="type-option" class="input-wrapper">
          <label for="type">Type </label>
          <select name="type" id="type" @change="${(e) => this._setType(e)}">
            <option>Select a type</option>
            ${this.typeOptions.map((option) => {
              const capitalizedOption =
                option.charAt(0).toUpperCase() + option.substring(1);
              return html`<option value="${option}">
                ${capitalizedOption}
              </option>`;
            })}
          </select>
        </div>
        <div id="participants-option" class="input-wrapper">
          <label for="participants">Participants</label>
          <input
            id="participants"
            type="range"
            step="1"
            min="1"
            max="5"
            name="participants"
            value="${this.participants || "0"}"
            @change="${(e) => this._setParticipants(e)}"
          />
          <span>${this.participants || "Unset"}</span>
        </div>
        <div id="accessibility-option" class="input-wrapper">
          <label for="accessibility">Accessibility</label>
          <input
            id="accessibility"
            type="range"
            min="0.0"
            max="1.0"
            step="0.01"
            value="${this.accessibility || 1.0}"
            name="accessibility"
            @change="${(e) => this._setAccessibility(e)}"
          />
          <span
            >${this.accessibility
              ? `${Number(this.accessibility * 100).toFixed()}%`
              : "Unset"}</span
          >
        </div>
        <div id="price-option" class="input-wrapper">
          <label for="price">Price</label>
          <input
            id="price"
            type="range"
            min="0.0"
            max="1.0"
            step="0.01"
            value="${this.price || 0.0}"
            name="price"
            @change="${(e) => this._setPrice(e)}"
          />
          <span
            >${!!+this.price
              ? `${Number(this.price * 100).toFixed()} %`
              : this.price === "0"
              ? "FREE"
              : "Unset"}</span
          >
        </div>
        <div class="buttons-wrapper">
          <button @click="${this._toggleOptionsPanel}">APPLY</button>
          <button @click="${(e) => this._resetOptions(e)}">RESET</button>
        </div>
      </div>
    `;
  }

  _setType(e) {
    this.activityType = e.srcElement.value;
  }
  _setParticipants(e) {
    this.participants = e.srcElement.value;
  }
  _setAccessibility(e) {
    this.accessibility = e.srcElement.value;
  }
  _setPrice(e) {
    this.price = e.srcElement.value;
  }
}

customElements.define("activity-options-panel", ActivityOptionsPanel);
