import { Component } from "../component.js";

export class Collider extends Component {
    constructor(rect) {
        super();
        this.rect = rect;
        this.masks = [];
    }

    overlaps(other, offsetX = 0, offsetY = 0) {
        return (
            this.top + offsetY < other.bottom &&
            this.bottom + offsetY > other.top &&
            this.left + offsetX < other.right &&
            this.right + offsetX > other.left
        );
    }

    overlapsMask(mask, offsetX = 0, offsetY = 0) {
        for (const c of this.entity.scene.getAll(Collider))
            if (c.masks.includes(mask) && this.overlaps(c, offsetX, offsetY))
                return true;
        return false;
    }

    get left() {
        return this.entity.x + this.rect.x;
    }

    get right() {
        return this.left + this.rect.width;
    }

    get top() {
        return this.entity.y + this.rect.y;
    }

    get bottom() {
        return this.top + this.rect.height;
    }
}
