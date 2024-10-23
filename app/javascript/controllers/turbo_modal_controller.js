import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["modal"];

  connect() {
    this.showModal();
  }

  showModal() {
    const modal = this.element.querySelector(".modal-enter");
    modal.classList.remove("opacity-0", "translate-y-4", "sm:scale-95");
    modal.classList.add("opacity-100", "translate-y-0", "sm:scale-100");
  }

  hideModal() {
    const modal = this.element.querySelector(".modal-enter");

    modal.classList.add("opacity-0", "translate-y-4", "sm:scale-95");
    modal.classList.remove("opacity-100", "translate-y-0", "sm:scale-100");

    setTimeout(() => {
      this.element.parentElement.removeAttribute("src"); // Optional: Remove the modal src
      this.element.remove(); // Removes the modal from the DOM
    }, 200); // Matches the duration of the transition
  }
  // hide modal on successful form submission
  // action: "turbo:submit-end->turbo-modal#submitEnd"
  submitEnd(e) {
    if (e.detail.success) {
      this.hideModal();
    }
  }
  // hide modal when clicking ESC
  // action: "keyup@window->turbo-modal#closeWithKeyboard"
  closeWithKeyboard(e) {
    if (e.code == "Escape") {
      this.hideModal();
    }
  }
}
