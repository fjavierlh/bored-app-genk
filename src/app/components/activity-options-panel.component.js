import { css, html, LitElement, supportsAdoptingStyleSheets } from "lit";

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
    this.toggleOptions = null;
  }

  static get styles() {
    return css`

      :host {
        display: block;
      }

      .options-panel {
        position: fixed;
        width: 100%;
        max-width: 812px;
        left: 0%;
        bottom: 0%;
        z-index: 1;
        transform: translateY(100%);
        overflow-y: auto;

        display: flex;
        flex-flow: column wrap;
        justify-content: flex-end;

        opacity: 0;
        background-color: #38a1ff;
        transition: all 0.4s ease-in-out;
      }

      .options-panel-title {
        text-align: center;
      }

      .input-wrapper {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;

        margin: 1em 1.5em auto;
      }
      .input-wrapper label {
        display: flex;
        color: #fff;
        flex: 80%;
        margin-bottom: 0.5em;
      }

      .input-wrapper select {
        width: 100%;
        font-size: 1.2em;
        padding: 0.5em;
      }

      .input-wrapper input {
        flex: 3;
      }

      .parameter-info {
        margin-left: 0.5em;
        flex: 1 0% 3.5em;

        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        width: 3.5em;
        height: 3.5em;
        background-color: #fff;
        border-radius: 0.5em;

        text-align: center;
      }

      .parameter-info p {
        margin: 0;
        flex: 1 100%;
        font-size: 0.9em;
      }

      .buttons-wrapper {
        width: 100%;
        margin-top: 1.5em;
        display: flex;
        justify-content: space-evenly;
        margin-bottom: 1em;
      }

      .buttons-wrapper button {
        color: white;
        font-family: inherit;
        padding: 1em 3em;
        border: none;
        font: inherit;
        cursor: pointer;

        background-color: #000;
        border: none;
      }

      .toggle-options-open {
        opacity: 1;
        transform: translateY(-4%);
      }

      .toggle-options {
        z-index: 1;
        position: fixed;
        top: 1.5em;
        right: 1em;
        background: #000;
        color: #fff;
        padding: 0.5em;
        border: none;
        font: inherit;
        cursor: pointer;
        animation: 3s fadeInToggleOptions;
      }

      .emoji {
        flex: 1 100%;
        font-size: 1.2em;
        margin-top: 0.3em;
        margin-bottom: -0.3em;
      }

      #notification-message {
      --nm-wrapper-show-position-bottom: -50%;
      --nm-wrapper-show-position-top: 50%;
      }

      @keyframes fadeInToggleOptions {
        0% {
          transform: translateX(125%);
        }
        80% {
          transform: translateX(125%);
        }
        95% {
          transform: translateX(5%);
        }

        90% {
          transform: translateX(-5%);
        }

        100% {
          transform: translateX(0%);
        }
      }

      @media (min-width: 812px) {
        
        .options-panel {
          z-index: 0;
          width: 100%;
          max-width: 25em;
          right: 0%;
          top: 39em;
          left: initial;
          bottom: initial;
          transform: translateY(-225%);
        }

        .toggle-options-open {
          transform: translateY(-100%);
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

  firstUpdated() {
    super.firstUpdated();

    this.selectType = this.shadowRoot.querySelector("#type-select");
    this.selectType.addEventListener("change", (e) => this._setType(e));

    this.participantsInput = this.shadowRoot.querySelector(
      "#participants-input"
    );
    this.participantsInput.addEventListener("change", (e) =>
      this._setParticipants(e)
    );

    this.accessibilityInput = this.shadowRoot.querySelector(
      "#accessibility-input"
    );
    this.accessibilityInput.addEventListener("change", (e) =>
      this._setAccessibility(e)
    );

    this.priceInput = this.shadowRoot.querySelector("#price-input");
    this.priceInput.addEventListener("change", (e) => this._setPrice(e));

    this.toggleOptions = this.shadowRoot.querySelector(".toggle-options");
    this.applyButton = this.shadowRoot.querySelector("#apply-button");
    this.resetButton = this.shadowRoot.querySelector("#reset-button");

    [this.toggleOptions, this.applyButton, this.resetButton].forEach(
      (element) => {
        element.addEventListener("click", (e) => this._toggleOptionsPanel(e));
      }
    );

    this.applyButton.addEventListener("click", () =>
      this._loadNotification("options applied successfully", "success")
    );

    this.resetButton.addEventListener("click", (e) => this._resetOptions(e));
  }

  render() {
    return html`
      <button class="toggle-options">OPTIONS</button>
      <div class="options-panel ${this.isOpen ? "toggle-options-open" : ""}">
        <h2 class="options-panel-title">OPTIONS</h2>
        <div id="type-option" class="input-wrapper">
          <label for="type">Type </label>
          <select name="type" id="type-select">
            <option disabled selected>Select a type</option>
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
            id="participants-input"
            type="range"
            step="1"
            min="1"
            max="5"
            name="participants"
          />
          <span class="parameter-info"
            ><div class="emoji">👤</div>
            ${this.participants || html`<p>Unset</p>`}</span
          >
        </div>
        <div id="accessibility-option" class="input-wrapper">
          <label for="accessibility">Accessibility</label>
          <input
            id="accessibility-input"
            type="range"
            min="0.0"
            max="1.0"
            step="0.01"
            name="accessibility"
          />
          <span class="parameter-info"
            ><span class="emoji">♿</span>${this.accessibility
              ? `${Number(this.accessibility * 100).toFixed()}%`
              : html`<p>Unset</p>`}</span
          >
        </div>
        <div id="price-option" class="input-wrapper">
          <label for="price">Price</label>
          <input
            id="price-input"
            type="range"
            min="0.0"
            max="1.0"
            step="0.01"
            name="price"
          />
          <span class="parameter-info"
            ><span class="emoji">💰 </span> ${!!+this.price
              ? `${Number(this.price * 100).toFixed()} %`
              : this.price === "0"
              ? html`<p><b>FREE</b></p>`
              : html`<p>Unset</p>`}</span
          >
        </div>
        <div class="buttons-wrapper">
          <button id="apply-button">APPLY</button>
          <button id="reset-button">RESET</button>
        </div>
      </div>
      <notification-message id="notification-message"></notification-message>
    `;
  }

  _loadNotification(message, type, position) {
    const notificationMessage = this.shadowRoot.getElementById(
      "notification-message"
    );
    console.log(notificationMessage);
    return notificationMessage._pushNotification(message, type, position);
  }

  _handleOptions() {
    const optionsObject = {};

    if (this.activityType) optionsObject.type = this.activityType;
    if (this.participants) optionsObject.participants = this.participants;
    if (this.accessibility) optionsObject.maxaccessibility = this.accessibility;
    if (this.price) optionsObject.maxprice = this.price;

    return optionsObject;
  }

  _toggleOptionsPanel() {
    this.isOpen = !this.isOpen;
  }

  _setType(e) {
    this.activityType = e.srcElement.value;
  }
  _setParticipants(e) {
    this.value = e.srcElement.value;
    this.participants = this.value;
  }
  _setAccessibility(e) {
    this.value = e.srcElement.value;
    this.accessibility = this.value;
  }
  _setPrice(e) {
    this.value = e.srcElement.value;
    this.price = this.value;
  }

  _resetOptions() {
    this.activityType =
      this.participants =
      this.accessibility =
      this.price =
        null;
    this.requestUpdate();
    this._loadNotification("Options reseted", "info");
  }
}

customElements.define("activity-options-panel", ActivityOptionsPanel);
