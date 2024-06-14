import { CSSResultGroup, CSSResultOrNative, TemplateResult, html } from "lit";
import { {COMPONENT_NAME}Theme } from "./css/{camelCaseName}.theme.css";
import { {COMPONENT_NAME}ViewModel } from "./{camelCaseName}.viewmodel";


export class {COMPONENT_NAME}View extends {COMPONENT_NAME}ViewModel {
  protected static finalizeStyles(
    styles?: CSSResultGroup | undefined
  ): CSSResultOrNative[] {
    return [...super.finalizeStyles(styles), {COMPONENT_NAME}Theme.cssBase];
  }

  public render(): TemplateResult {
    return html``;
  }
}

window.customElements.define("{camelCaseName}", {COMPONENT_NAME}View);

declare global {
  interface HTMLElementTagNameMap {
    "{camelCaseName}": {COMPONENT_NAME}View;
  }
}
