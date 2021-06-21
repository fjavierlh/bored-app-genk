import { LitElement, html, css } from "lit";

export class MainLayout extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        min-height: 100%;
      }

      .container {
        min-height: 100vh;
        display: grid;
        grid-template-rows: 5em auto 1.5em;
        grid-template-areas:
          "h"
          "s"
          "f";
      }

      #main-header {
        display: flex;
        flex-flow: row wrap;
        grid-area: h;
      }
      #main-header,
      #main-footer {
        background-color: var(--color-primary);
        z-index: 1;
      }

      #main-header {
        box-shadow: 1px -25px 50px;
      }

      #nav {
        z-index: 4;
        display: flex;
        flex-flow: column wrap;
        width: 100vw;
        min-height: 100vh;
        position: fixed;
        top: 0;
        left: -110%;
        background-color: var(--color-secondary);
        transition: left 0.4s ease-in-out;
      }

      #nav ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }

      .nav-link {
        display: block;
        text-decoration: none;
        color: var(--color-primary);
        font-size: 2.5rem;
        line-height: 2;
        text-align: center;
        transition: color 0.5s ease;
      }

      .nav-link:active {
        color: var(--color-tertiary);
      }

      .open {
        left: 0% !important;
      }

      .toggle-nav {
        width: 4em;
        height: 4em;
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
      }

      .toggle-nav::after {
        display: block;
        font-size: 3em;
        position: fixed;
        top: 0.3em;
      }

      .toggle-nav-open::after,
      .toggle-nav-close::after {
        left: 0.5em;
      }

      .toggle-nav-open::after {
        content: "☰";
      }

      .toggle-nav-close::after {
        color: var(--color-primary);
        content: "✖";
      }

      #main-section {
        grid-area: s;
      }

      #main-footer {
        font-family: var(--font-primary);
        font-size: 0.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        grid-area: f;
        box-shadow: 1px 25px 50px;
      }

      #main-footer a {
        text-decoration: none;
        padding-left: 0.5em;
        color: var(--color-secondary);
      }

      @media (min-width: 812px) {
        .container {
          grid-template-columns: repeat(6, 1fr);
          grid-template-rows: 5em auto 1.5em;
          grid-template-areas:
            "h h h h h h"
            "s s s s s s"
            "f f f f f f";
        }

        .toggle-nav {
          display: none;
        }

        #nav {
          width: auto;
          flex-flow: row wrap;
          justify-content: flex-start;
          align-items: center;
          min-height: 5em;
          position: fixed;
          top: 0%;
          left: 0%;
          background-color: var(--color-primary);
          grid-area: n;
        }

        #nav ul li {
          display: inline-block;
          margin-right: 1.5em;
        }

        #nav ul li:first-child {
          margin-left: 3em;
        }

        .nav-link {
          color: var(--color-tertiary);
          font-size: 1.2rem;
        }
      }
    `;
  }

  static get properties() {
    return {
      openNav: { type: Boolean },
      links: { type: Array },
    };
  }

  constructor() {
    super();
    this.openNav = false;
    this.nav = null;
  }

  firstUpdated() {
    this.navLinks = [...this.renderRoot.querySelectorAll("#nav ul li a")];
    this.navLinks.forEach((link) =>
      link.addEventListener("click", (e) => this._toggleMenu(e))
    );

    this.toggleNav = this.renderRoot.querySelector(".toggle-nav");
    this.toggleNav.addEventListener("click", (e) => this._toggleMenu(e));
  }

  _toggleMenu() {
    this.openNav = !this.openNav;
  }

  render() {
    return html`
      <div class="container">
        <header id="main-header"></header>
        <nav part="nav" id="nav" class="${this.openNav ? "open" : ""}">
          <button
            class="toggle-nav toggle-nav${!this.openNav ? "-open" : "-close"}"
          ></button>
          <ul>
            <li>
              <a class="nav-link" href="/">Welcome</a>
            </li>
            <li>
              <a class="nav-link" href="/main-page">Main page</a>
            </li>
          </ul>
        </nav>

        <section id="main-section" part="section">
          <slot></slot>
        </section>
        <footer id="main-footer" part="footer">
          Made with 💙 by <a href="https://github.com/fjavierlh"> @fjavierlh</a>
        </footer>
      </div>
    `;
  }
}
customElements.define("main-layout", MainLayout);
