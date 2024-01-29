class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener("click", (event) => {
      if (!confirm("Do you want to leave this page?")) {
        event.preventDefault();
      }
    });
  }
}

customElements.define("my-confirm-link", ConfirmLink, { extends: "a" });
