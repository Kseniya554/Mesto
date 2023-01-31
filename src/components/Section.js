export default class Section {
    constructor({items, render}, container) {
        this._items = items;
        this._render = render;
        this._container = container;
    }

    renderItems() {
        this._items.forEach(item => {
            this._render(item);
        });
    }

    addItem() {
        this._container.prepend();
    }
}