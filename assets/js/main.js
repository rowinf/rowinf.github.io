import { html, LitElement, css } from 'lit';
import { SignalWatcher, watch, signal } from '@lit-labs/signals';

const count = signal(0);

class CountIncrementer extends SignalWatcher(LitElement) {
  render() {
    return html`
      <button @click=${this.increment}>Go out and make money: ${watch(count)}</button>
    `;
  }
  increment() {
    count.set(count.get() + 1);
  }
}

class GoldMaker extends SignalWatcher(LitElement) {
  static get styles() {
    return css`
      :host > div {
        color: var(--primary);
        display: flex;
        justify-content: space-between;
        margin-top: 0.8rem;
        border-top: 1px solid var(--subdued);
        border-opacity: 0.4;
      }
    `;
  }
  static properties = {
    name: { type: String },
    gold: { type: Number },
    multiplier: { type: Number }
  };
  calculatedGold() {
    return this.gold + 100 * count.get() * this.multiplier;
  }
  redistribute() {
    let redistributing = this.calculatedGold()
    let servants = document.getElementsByTagName('gold-maker');
    let highestGold = -Infinity;
    let highestServant = null;
    for (let servant of servants) {
      let gold = servant.calculatedGold();
      if (servant != this && gold > highestGold) {
        highestGold = gold;
        highestServant = servant;
      }
    }
    if (highestServant.multiplier > 0) {
      this.multiplier = 0;
      this.gold = 0;
      highestServant.gold += redistributing;
    }
  }
  render() {
    let gold = this.calculatedGold()
    return html`
      <div>
        <span>${this.name}</span> <em>(x${this.multiplier})</em> <div>$${gold} &nbsp;<button @click=${this.redistribute} ?disabled=${this.gold === 0}>$redistribute</button></div> 
      </div>
    `;
  }
}

customElements.define('gold-maker', GoldMaker);
customElements.define('count-incrementer', CountIncrementer);

function computeTotalGold() {
  let total = 0;
  document.querySelectorAll('gold-maker').forEach(el => {
    total += el.calculatedGold();
  });
  document.querySelector('#gold-total').textContent = "$" + total;
}

document.addEventListener('DOMContentLoaded', () => {
  computeTotalGold();
});

document.addEventListener('click', (event) => {
  if (event.target.tagName === 'COUNT-INCREMENTER' || event.target.tagName === 'GOLD-MAKER') {
    computeTotalGold();
  }
});