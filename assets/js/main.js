import {html, css, LitElement} from 'lit';

console.log('loaded!')

export class SimpleGreeting extends LitElement {
  static styles = css`
  span { background-color: yellow; height: 1rem; width: 1rem} 
  div { 
  display: grid; 
  grid-template-rows: auto; 
  gap: 1rem; 
  grid-template-columns: repeat(3, 1fr); 
  }
  `;

  static properties = {
    name: {type: String},
  };

  constructor() {
    super();
    this.name = 'Somebody';
  }

  render() {
    return html`
    <div>
    <span>&nbsp;</span>
    <span>&nbsp;</span>
    <span>&nbsp;</span>
    <span>&nbsp;</span>
    <span>&nbsp;</span>
    <span>&nbsp;</span>
    </div>
    `;
  }
}
customElements.define('simple-greeting', SimpleGreeting);
