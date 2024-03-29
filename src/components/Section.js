export default class Section {
    constructor({items, render}, container) {
        this._items = items;
        this._render = render;
        this._container = container;
    }

    addItem(card) {
        this._container.prepend(card);
    }

    appendItem(item) {
        this._container.append(item);
      }

    renderItems(items) {
        items.forEach(item => {
            this._render(item);
        });
    }

}