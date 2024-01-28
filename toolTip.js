class ToolTip extends HTMLElement {
  constructor() {
    super();
    console.warn("hello");
    this.toolTipContainer;
    this._toolTipText = "Some dummy text";
    this.attachShadow({ mode: "open" });
    const template = document.querySelector("#tooltip-template");
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    if (this.hasAttribute("text"))
      this._toolTipText = this.getAttribute("text");

    const toolTipIcon = this.shadowRoot.querySelector("span");
    toolTipIcon.addEventListener("mouseenter", this._showToolTip.bind(this));
    toolTipIcon.addEventListener("mouseleave", this._hideToolTip.bind(this));
    this.shadowRoot.appendChild(toolTipIcon);
    this.shadowRoot.style.position = "relative";
  }

  _showToolTip() {
    this.toolTipContainer = document.createElement("div");
    this.toolTipContainer.textContent = this._toolTipText;
    this.toolTipContainer.style.backgroundColor = "gray";
    this.toolTipContainer.style.position = "absolute";
    this.toolTipContainer.style.zIndex = "10";
    this.toolTipContainer.style.color = "white";
    this.shadowRoot.appendChild(this.toolTipContainer);
  }
  _hideToolTip() {
    this.shadowRoot.removeChild(this.toolTipContainer);
  }
}

customElements.define("my-tooltip", ToolTip);
