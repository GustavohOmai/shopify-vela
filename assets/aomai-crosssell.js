if (!customElements.get('aomai-crosssell')) {
  customElements.define(
    'aomai-crosssell',
    class extends HTMLElement {
      connectedCallback() {
        this.addEventListener('change', this.onVariantChange);
      }

      onVariantChange({ target }) {
        const select = target.closest('.aomai-crosssell__select');
        if (!select) return;

        const card = select.closest('.aomai-crosssell__card');
        const option = select.selectedOptions[0];
        const price = card.querySelector('.aomai-crosssell__price');

        card.querySelector('.product-variant-id').value = option.value;
        card.querySelector('.aomai-crosssell__add').disabled = !option.value || option.dataset.available !== 'true';
        if (price && option.dataset.price) price.textContent = option.dataset.price;
      }
    }
  );
}
