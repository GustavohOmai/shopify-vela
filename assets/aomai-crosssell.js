if (!customElements.get('aomai-crosssell')) {
  customElements.define(
    'aomai-crosssell',
    class extends HTMLElement {
      connectedCallback() {
        this.addEventListener('change', this.onVariantChange);
        if (!this.querySelector('.aomai-crosssell__card')) this.load();
      }

      async load() {
        try {
          const response = await fetch(
            `${this.dataset.url}&product_id=${this.dataset.productId}&section_id=${this.dataset.sectionId}`
          );
          const doc = new DOMParser().parseFromString(response.ok ? await response.text() : '', 'text/html');

          if (doc.querySelector('.aomai-crosssell__card')) this.innerHTML = doc.querySelector('aomai-crosssell').innerHTML;
          else this.remove();
        } catch {
          this.remove();
        }
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
