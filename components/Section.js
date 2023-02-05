class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    addItem(element) {
        this._container.prepend(element)
        console.log(this._container)
    }

    renderItems() {
        this._items.forEach(this._renderer)
    }


}

export default Section;