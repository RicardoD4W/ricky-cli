import { html } from "lit";
import { {COMPONENT_NAME}Theme } from "./css/{camelCaseName}.theme.css";
import { {COMPONENT_NAME}ViewModel } from "./{camelCaseName}.viewmodel";


export class {COMPONENT_NAME}View extends {COMPONENT_NAME}ViewModel {
  static finalizeStyles( styles ) {
    return [...super.finalizeStyles(styles), {COMPONENT_NAME}Theme.cssBase];
  }

  render() {
    return html``;
  }
}

window.customElements.define("{camelCaseName}", {COMPONENT_NAME}View);