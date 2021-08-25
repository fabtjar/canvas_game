import { Component } from "../component.js";

export class Sprite extends Component {
    constructor(srcRect) {
        super();
        this.srcRect = srcRect;
        this.offset = { x: 0, y: 0 };
        this.scale = { x: 1, y: 1 };
    }

    draw(ctx) {
        ctx.drawImage(
            ctx.mainImage,
            this.srcRect.x,
            this.srcRect.y,
            this.srcRect.width,
            this.srcRect.height,
            Math.round(this.entity.x + this.offset.x * this.scale.x),
            Math.round(this.entity.y + this.offset.y * this.scale.y),
            this.srcRect.width * this.scale.x,
            this.srcRect.height * this.scale.y
        );
    }
}
