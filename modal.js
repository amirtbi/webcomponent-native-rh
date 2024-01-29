class Modal extends HTMLElement {
  constructor() {
    super();
    this.isOpen = false;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    
        <style>
            :host([opened]) #backdrop,
            :host([opened]) #modal{
              opacity:1;
              pointer-events:all;
            }
            #backdrop{
                position:fixed;
                height:100vh;
                width:100%;
                background-color:rgba(0,0,0,0.76);
                top:0;
                left:0;
                z-index:10;
                opacity:0;
                pointer-events:none;
            }
            #modal{
              position:fixed;
              top:15vh;
              z-index:100;
              left:25%;
              width:50%;
              height:auto;
              background-color:white;
              border-radius:3px;
              box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                     opacity:0;
                pointer-events:none;
              
            }
            #main{
              padding:1rem;
            }
            #actions{
              border-top:1px solid #ccc;
              padding:1rem;

            }
            button{
              border-radius:2px;
              border:none;
              padding:0.5rem;
              cursor:pointer;
              color:white;
            }
            button#confirm{
              background-color:green;
            }
            button#cancel{
              background-color:orange;
            }
            #header{
              padding:0.75rem;
              background-color:blue;
              color:white;
            }
        
            ::slotted(h1){
              color:orange
            }
        </style>
        <div id='backdrop'></div>
        <div id='modal'>
            <header id="header">
              <slot name="title"></slot>
            </header>
            <main id="main">
              <slot></slot>
            </main>
            <section id="actions">
              <button id="cancel">Cancel</button>
              <button id="confirm">Confirm</button>
            </section>
        </div>
    `;

    const slots = this.shadowRoot.querySelectorAll("slot");
    slots[1].addEventListener("slotchange", (event) => {
      console.dir(slots[1].assignedNodes());
    });
    const backdrop = this.shadowRoot.querySelector("#backdrop");
    const btnCancel = this.shadowRoot.querySelector("button#cancel");
    const btnConfirm = this.shadowRoot.querySelector("button#confirm");

    btnCancel.addEventListener("click", this._cancel.bind(this));
    btnConfirm.addEventListener("click", this._confirm.bind(this));
    backdrop.addEventListener("click", this._cancel.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "opened") {
      if (this.hasAttribute("opened")) {
        this.isOpen = true;
      } else {
        this.isOpen = false;
      }
    }
  }

  static get observedAttributes() {
    return ["opened"];
  }

  open() {
    this.setAttribute("opened", "");
    this.isOpen = true;
  }

  hide() {
    if (this.hasAttribute("opened")) {
      this.removeAttribute("opened");
    }
    this.isOpen = false;
  }

  _cancel(event) {
    const cancelEvent = new Event("cancel", { bubbles: true, composed: true });
    event.target.dispatchEvent(cancelEvent);
    this.hide();
  }

  _confirm(event) {
    const confirmEvent = new Event("confirm", {
      bubbles: true,
      composed: true,
    });
    event.target.dispatchEvent(confirmEvent);
    this.hide();
  }
}

customElements.define("my-modal", Modal);
