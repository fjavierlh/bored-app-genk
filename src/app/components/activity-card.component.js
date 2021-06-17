import { css, html, LitElement } from "lit";
import { ActivityService } from "../services/activity.service";
import questionImage from "../img/question.webp";

export class ActivityCard extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        min-height: 100%;
      }

      .activity-card {
        display: flex;
        position: absolute;
        flex-flow: column wrap;
        justify-content: space-between;
        align-items: center;
        padding: 0 1em;
        height: 85%;

        /* background-color: lavender; */
      }

      dl {
        display: flex;
        flex-flow: row wrap;
        width: 100%;
        margin: 0;
      }

      dt {
        display: block;
      }

      dd {
        margin-left: 0.5em;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      }

      #activity {
        flex: 1 100%;
        background-color: #fff;
      }

      #activity dd {
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 1.5;
        font-size: 1.1rem;
        background-color: #fff;
        min-height: 3.6em;
        margin-bottom: 0.5em;
      }

      #activity-type {
        display: flex;
        align-items: baseline;
        flex: 1 100%;
        margin-bottom: 1em;
      }
      #activity-type dd {
        font-size: 1rem;
        padding: 0.5em 1em;
        border-radius: 0.5em;
        color: #fff;
        text-shadow: 1px 1px 5px #000;
      }

      #activity-participants,
      #activity-price,
      #activity-accessibility,
      #activity-link {
        display: flex;
        justify-content: center;
        flex: 1 0%;
        min-height: 2em;
      }

      .main-image {
        width: 65%;
        max-width: 400px;
      }

      .main-button {
        background-color: #000;
        color: #fff;
        padding: 2em 4em;
        font-family: inherit;
        font-size: 1rem;
      }

      .education {
        background-color: #fac76b;
      }

      .recreational {
        background-color: #e96a63;
      }
      .social {
        background-color: #e96186;
      }
      .diy {
        background-color: #cb4333;
      }
      .charity {
        background-color: #f49863;
      }
      .cooking {
        background-color: #6e5b98;
      }
      .relaxation {
        background-color: #9b86bd;
      }
      .music {
        background-color: #c37d5c;
      }
      .busywork {
        background-color: #9ccec9;
      }
    `;
  }

  static get properties() {
    return {
      activity: { type: Object },
      service: { type: Object },
      mainImage: { type: String },
    };
  }

  constructor() {
    super();
    this.activityService = new ActivityService();
  }

  connectedCallback() {
    super.connectedCallback();
    this.activity = { data: {} };
    this.mainImage = questionImage;
  }

  _getOptionsPanels() {
    const activityOptionsPanel = this.shadowRoot.getElementById("options");
    return activityOptionsPanel._handleOptions();
  }

  render() {
    const { activity, type, participants, price, link, key, accessibility } = {
      ...this.activity.data,
    };
    const hasProperties = Object.keys(this.activity.data).length !== 0;
    return html`
      <div class="activity-card">
        <img class="main-image" src="${this.mainImage}" />
        ${hasProperties
          ? html`<dl id="${key}">
            <div id="activity">
              <dt>Activity</dt>
              <dd>${activity}</dd>
            </div>
            <div id="activity-type">
              <dt>Type</dt>
              <dd class="${type}">${type}</dd>
            </div>
            
            <div id="activity-participants">
              <dt>👤</dt>
              <dd>${participants}</dd>
            </div>
            <div id="activity-price">
              <dt>💰</dt>
              <dd>${
                !!+price ? `${Number(price * 100).toFixed()} %` : "FREE"
              }</dd>
            </div>
            <div id="activity-accessibility">
              <dt></dt>&#9855;</dt>
              <dd>${Number(accessibility * 100).toFixed()}%</dd>
            </div>
            ${
              link
                ? html` <div id="activity-link">
                    <dt>🔗</dt>
                    <dd><a href="${link}" target="_blank">URL</a></dd>
                  </div>`
                : ""
            }
          </dl>`
          : html`<h1>Press the button</h1>`}

        <button class="main-button" @click="${() => this._getActivity()}">
          Give me activity
        </button>

        <activity-options-panel id="options"></activity-options-panel>
      </div>
    `;
  }

  async _getActivity() {
    const options = this._getOptionsPanels();
    console.log(options);
    this.activity = await this.activityService.getRandomActivity(options);
  }
}

customElements.define("activity-card", ActivityCard);
