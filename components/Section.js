class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    renderItems() {
        this._items.forEach(this._renderer)
    }

    addItem(element) {
        this._container.prepend(element)
    }
}

export default Section;