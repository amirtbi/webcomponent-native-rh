class ToolTip extends HTMLElement {
  constructor() {
    super();
    console.warn("hello");
    this.toolTipContainer;
    this._tooltipVisible = false;
    this._tooltipIcon;
    this._toolTipText = "Some dummy text";
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>

      :host{
        position:relative;
        font-family:inherit;
        border:2px solid red;
        background-color:orange;
        padding:0.25rem;
      }
      :host(.important){
        background-color:black;
      }
      :host-context(h1){
        color:white;
      }
      :host-context(h2){
          color:var(--primary-color);
          font-size:12px;
      }
        div.tooltipContainer{
          background-color:black;
          color:white;
          position:absolute;
          padding:0.25rem;
          font-size:12px;
          border-radius:0.25rem;
          z-index:10;
        }
        ::slotted(span.highlight){
          border-bottom:1px solid purple;
        }
        .icon{
          background-color:gray;
          color:white;
          border-radius:50%;
          padding:0.25rem;
          cursor:pointer;
          font-size:12px;
          vertical-align:middle;
        }
      </style>

     <slot>Some default content</slot>
     <span class="icon">? </span>
     
     `;
  }

  disconnectedCallback() {
    this._tooltipIcon.removeEventListener("mouseneter", this._showToolTip);
    this._tooltipIcon.removeEventListener("mouseleave", this._hideToolTip);
  }
  connectedCallback() {
    if (this.hasAttribute("text"))
      this._toolTipText = this.getAttribute("text");

    console.warn("tooltip text", this._toolTipText);

    this._tooltipIcon = this.shadowRoot.querySelector("span");
    this._tooltipIcon.addEventListener(
      "mouseenter",
      this._showToolTip.bind(this)
    );
    this._tooltipIcon.addEventListener(
      "mouseleave",
      this._hideToolTip.bind(this)
    );
    this._render();
  }

  // Callbacks when attributes changed.
  attributeChangedCallback(attributeName, oldValue, newValue) {
    if (newValue === oldValue) return;
    if (attributeName === "text") {
      this._toolTipText = newValue;
    }
  }

  // Add attributes to be observed
  static get observedAttributes() {
    return ["text"];
  }

  _render() {
    let tooltipContainer = this.shadowRoot.querySelector("div");
    if (this._tooltipVisible) {
      tooltipContainer = document.createElement("div");
      tooltipContainer.textContent = this._toolTipText;
      tooltipContainer.classList.add("tooltipContainer");
      this.shadowRoot.appendChild(tooltipContainer);
    } else {
      if (tooltipContainer) this.shadowRoot.removeChild(tooltipContainer);
    }
  }
  _showToolTip() {
    this._tooltipVisible = true;
    this._render();
  }
  _hideToolTip() {
    this._tooltipVisible = false;
    this._render();
  }
}

customElements.define("my-tooltip", ToolTip);
