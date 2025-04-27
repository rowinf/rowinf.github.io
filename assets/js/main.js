import { html, LitElement, css } from 'lit';
import { SignalWatcher, watch, signal } from '@lit-labs/signals';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import Photoswipe from 'photoswipe';

window.lightbox = new PhotoSwipeLightbox({
    gallery: '#gallery',
    children: 'figure>a',
    pswpModule: Photoswipe,
    initialZoomLevel: 1,
    secondaryZoomLevel: 1.5,
    maxZoomLevel: 2,
    showHideAnimationType: 'zoom'
});

const count = signal(0);

class CountIncrementer extends SignalWatcher(LitElement) {
  render() {
    return html`
      <button @click=${this.increment}>Go out and make money: ${watch(count)}</button>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    this.updateGold();
  }
  updateGold() {
    let total = 0;
    document.querySelectorAll('gold-maker').forEach(el => {
      let gold = el.gold + 100 * count.get() * el.multiplier;
      el.gold = gold;
      total += gold;
    });
    document.getElementById('gold-total').textContent = total;
  }
  increment() {
    count.set(count.get() + 1);
    this.updateGold();
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
  redistribute() {
    let redistributing = this.gold;
    let servants = document.getElementsByTagName('gold-maker');
    let highestGold = -Infinity;
    let highestServant = null;
    for (let servant of servants) {
      let gold = servant.gold;
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
    return html`
      <div>
        <span>${this.name}</span> <em>(x${this.multiplier})</em> <div>$${this.gold} &nbsp;<button @click=${this.redistribute} ?disabled=${this.gold === 0}>$redistribute</button></div>
      </div>
    `;
  }
}

customElements.define('gold-maker', GoldMaker);
customElements.define('count-incrementer', CountIncrementer);
