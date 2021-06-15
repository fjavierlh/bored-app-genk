import { LitElement, html, css } from "lit";

export class MainLayout extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
      }

      div {
        min-height: 100vh;
        display: grid;
        grid-template-rows: 7em auto 50px;
        grid-template-areas: "h" "s" "f";

      }

      header {
        z-index: 0;
        /* background-color: teal; */
        grid-area: h;
      }
      header, footer {
        z-index: 1;

      }

      #nav {
        z-index: 2;
        display: block;
        width: 100vw;
        min-height: 100vh;
        position: fixed;
        top: 0;
        left: -100%;
        background-color: grey;
        transition: left .4s ease-in-out;
      }
      
      .open {
        left: 0% !important;
      }

      .toggle {
        width: 4em;
        height: 4em;
        /* background-color: #000;
        border: none; */

        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
      }

      .toggle::after {
        font-size: 3em;
        position: fixed;
        top: .3em;
      }

      .toggle-open::after, .toggle-close::after {
        top: .5em;
        left: .5em;
        
      }
      .toggle-open::after {

        content: "☰";
      }

      .toggle-close::after {

        content: "✖";
      }

      section {
        /* background-color: salmon; */
        grid-area: s;
      }
      aside {
        display: none;
        /* background-color: skyblue; */
        grid-area: a;
      }
      footer {
        /* background-color: slategrey; */
        grid-area: f;
      }

      @media (min-width: 1000px) {
        .toggle {
          display: none;
        }

        #nav {
          width: auto;
          min-height: auto;
          position: initial;

          grid-area: n;
        }

        div {
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: 50px auto 60px;
          grid-template-areas:
            "h h h h h h h n n n n n"
            ". s s s s s s a a a a ."
            "f f f f f f f f f f f f";
        }
      }
    `;
  }

  static get properties() {
    return {
      openNav: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.openNav = false;

  }

  _toggleMenu(e) {
    this.openNav = !this.openNav;
  }

  render() {
    return html`
      
      <div>
        <header>
        </header>

        <nav id="nav" class="${this.openNav ? "open" : ""}">
          <button
            class="toggle toggle${!this.openNav ? "-open" : "-close"}"
            @click=${(e) => {
              this._toggleMenu(e);
            }}
          ></button>
          <ul>
            <li>
              <a href="#">Link</a>
            </li>
            <li>
              <a href="#">Link</a>
            </li>
            <li>
              <a href="#">Link</a>
            </li>
            <li>
              <a href="#">Link</a>
            </li>
          </ul>
          
        </nav>
        <section>
          <slot></slot>
        </section>
        <aside>
        </aside>
        <footer>
          soy un footer
        </footer>
      </div>
    `;
  }
}
customElements.define("main-layout", MainLayout);
