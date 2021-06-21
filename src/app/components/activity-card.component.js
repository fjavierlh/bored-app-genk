import { css, html, LitElement } from "lit";
import { ActivityService } from "../services/activity.service";

import questionImage from "../img/question.webp";
import recreationalImage from "../img/recreational.webp";
import relaxationImage from "../img/relaxation.webp";
import busyworkImage from "../img/busywork.webp";
import charityImage from "../img/charity.webp";
import cookingImage from "../img/cooking.webp";
import educationImage from "../img/education.webp";
import musicImage from "../img/music.webp";
import diyImage from "../img/diy.webp";
import socialImage from "../img/social.webp";

export class ActivityCard extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
      }

      .activity-card {
        display: block;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 1em;

        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;

        transition: opacity 3s linear;
      }

      .activity-data {
        display: flex;
        flex-flow: row wrap;
        width: 100%;
        max-width: 25em;
        margin: 1em;
      }

      .activity-data dd {
        margin-left: 0.5em;
        font-family: var(--font-primary);
      }

      #activity {
        flex: 1 100%;
        background-color: var(--color-primary);
      }

      #activity dd {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.1em;
        line-height: 1.5;
        background-color: var(--color-primary);
        padding-bottom: 0.5em;
        min-height: 60px;
      }

      #activity-type {
        display: flex;
        align-items: baseline;
        flex: 1 100%;
        margin-bottom: .5em;
      }

      #activity-type dd {
        font-size: 0.8rem;
        padding: 0.5em 1em;
        border-radius: 0.5em;
        color: var(--color-primary);
        text-shadow: 1px 1px 5px var(--color-tertiary);
      }

      #activity-participants,
      #activity-price,
      #activity-accessibility,
      #activity-link {
        margin-top: auto;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        font-size: 1.1rem;
        flex: 1;
      }

      #activity-link a {
        text-decoration: none;
        color: var(--color-tertiary);
      }

      dl dt,
      dl dd {
        font-size: 1rem;
      }

      .main-image {
        width: 60%;
        max-width: 275px;
      }

      .main-button {
        flex: 1 100%;
        background-color: var(--color-tertiary);
        color: var(--color-primary);
        padding: 2em 4em;
        max-width: 20em;
        font-family: inherit;
        margin-top: 1em;
        margin-bottom: 1em;
        font-size: 1rem;

        border: none;
        font: inherit;
        cursor: pointer;
      }

      .default-text {
        flex: 1 100%;
        max-width: 20em;
        font-size: .9em;
        text-align: center;
      }

      .loading-wrapper {
        flex: 1 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
        margin-top: 0.5em;

        max-width: 600px;
        min-height: 450px;
        background-color: var(--color-primary);
        box-shadow: 0px 1px 5px;
      }

      .loading-card {
        animation: 1s activityCardInOut;
      }

      @keyframes activityCardInOut {
        10% {
          opacity: 0;
          transform: translateX(140%);
        }

        11% {
          opacity: 0;
          transform: translateX(-140%);
        }
      }

      .busywork {
        background-color: var(--color-busywork);
      }

      .charity {
        background-color: var(--color-charity);
      }

      .cooking {
        background-color: var(--color-cooking);
      }

      .diy {
        background-color: var(--color-diy);
      }

      .education {
        background-color: var(--color-education);
      }

      .music {
        background-color: var(--color-music);
      }

      .recreational {
        background-color: var(--color-recreational);
      }

      .relaxation {
        background-color: var(--color-relaxation);
      }

      .social {
        background-color: var(--color-social);
      }

      @media (min-width: 812px) {
        .loading-wrapper {
          flex-wrap: nowrap;
          max-width: 61em;
          padding: 1em;
          min-height: auto;
        }
        .activity-card {
          width: 92%;
          margin: 0 auto;
        }

        .activity-data {
          margin: 0;
        }

        .main-image {
          width: 100%;
          margin-right: 1em;
          max-width: 400px;
        }

        .main-button {
          margin-top: 1em;
          max-width: 53em;
        }

        dl,
        .default-text {
          flex: 1 100%;
          margin: 0 auto;
        }

        dl dt,
        dl dd {
          font-size: 1.5rem;
        }

        #activity dd {
          justify-content: space-between;
          align-items: center;
          font-size: 1.5em;
          line-height: 1.5;
          min-width: auto;
        }
        #activity-type {
          margin-bottom: 3em;
        }

        #activity-type dd {
          font-size: 1.2rem;
        }
      }

      @media (max-width: 320px) {
         #activity dd {
           min-height: auto;
         }
         .loading-wrapper {
          min-height: 342px;
         }
    `;
  }

  static get properties() {
    return {
      isLoading: { type: Boolean },
      activity: { type: Object },
      typeActivity: { type: String },
      service: { type: Object },
      mainImage: { type: String },
      typeImages: { type: Object },
      disableButton: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.activityService = new ActivityService();
    this.typeImages = {
      busywork: busyworkImage,
      charity: charityImage,
      cooking: cookingImage,
      diy: diyImage,
      education: educationImage,
      music: musicImage,
      recreational: recreationalImage,
      relaxation: relaxationImage,
      social: socialImage,
    };
    this.isLoading = false;
    this.mainButton = null;
  }

  firstUpdated() {
    super.firstUpdated();
    this.mainButton = this.shadowRoot.querySelector(".main-button");
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

  _setMainImage(type) {
    this.mainImage = this.typeImages[type] || questionImage;
  }

  render() {
    const { activity, type, participants, price, link, key, accessibility } = {
      ...this.activity.data,
    };
    this._setMainImage(type);
    const hasProperties = Object.keys(this.activity.data).length !== 0;

    return html`
      <div class="activity-card">
        <div class="loading-wrapper ${this.isLoading ? "loading-card" : ""}">
          <img class="main-image" src="${this.mainImage}" />
          ${hasProperties
            ? html`<dl id="${key}" class="activity-data">
                <div id="activity">
                  <dt class="activity-data-tag">Activity</dt>
                  <dd>${activity}</dd>
                </div>
                <div id="activity-type">
                  <dt class="activity-data-tag">Type</dt>
                  <dd class="${type}">${type}</dd>
                </div>

                <div id="activity-participants">
                  <dt>👤</dt>
                  <dd>${participants}</dd>
                </div>
                <div id="activity-price">
                  <dt>💰</dt>
                  <dd>
                    ${!!+price ? `${Number(price * 100).toFixed()} %` : "FREE"}
                  </dd>
                </div>
                <div id="activity-accessibility">
                  <dt>♿</dt>
                  <dd>${Number(accessibility * 100).toFixed()}%</dd>
                </div>
                ${link
                  ? html` <div id="activity-link">
                      <dt>🔗</dt>
                      <dd><a href="${link}" target="_blank">URL</a></dd>
                    </div>`
                  : ""}
              </dl>`
            : html` <div
                class="default-text ${this.isLoading ? "loading-card" : ""}"
              >
                <h1>Hi there!👋</h1>
                <h2>Press the button to get some ramdom activity</h2>
              </div>`}
        </div>

        <button
          class="main-button"
          data-cy="new-activity-button"
          ?disabled="${this.disableButton}"
          @click="${() => this._loadActivity()}"
        >
          Give me activity
        </button>

        <activity-options-panel id="options"></activity-options-panel>
      </div>
    `;
  }

  _loadActivity() {
    this.disableButton = true;
    this.isLoading = true;
    this._getActivity();
    setTimeout(() => {
      this.disableButton = false;
      this.isLoading = false;
    }, 1000);
  }

  async _getActivity() {
    const options = this._getOptionsPanels();
    this.activity = await this.activityService.getRandomActivity(options);
  }
}

customElements.define("activity-card", ActivityCard);
