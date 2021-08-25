import { Component } from "../component.js";
import { Collider } from "./collider.js";

export class Mover extends Component {
    constructor() {
        super();
        this.speed = { x: 0, y: 0 };
        this._remainder = { x: 0, y: 0 };
    }

    update(deltaTime) {
        const collider = this.entity.get(Collider);

        this._remainder.x += this.speed.x * deltaTime;
        this._remainder.y += this.speed.y * deltaTime;
        var move = {
            x: Math.round(this._remainder.x),
            y: Math.round(this._remainder.y),
        };
        this._remainder.x -= move.x;
        this._remainder.y -= move.y;

        if (move.x != 0) {
            var sign = Math.sign(move.x);
            while (move.x != 0) {
                if (collider.overlapsMask("solid", sign, 0)) {
                    this.stopX();
                    break;
                }
                this.entity.x += sign;
                move.x -= sign;
            }
        }

        if (move.y != 0) {
            var sign = Math.sign(move.y);
            while (move.y != 0) {
                if (collider.overlapsMask("solid", 0, sign)) {
                    this.stopY();
                    break;
                }
                this.entity.y += sign;
                move.y -= sign;
            }
        }

        if (this.entity.x + 16 < 0) this.entity.x += this.game.width + 32;
        else if (this.entity.x - 16 > this.game.width)
            this.entity.x -= this.game.width + 32;
        if (this.entity.y < 0) this.entity.y += this.game.height + 32;
        else if (this.entity.y - 32 > this.game.height)
            this.entity.y -= this.game.height + 32;
    }

    stopX() {
        this.speed.x = 0;
        this._remainder.x = 0;
    }

    stopY() {
        this.speed.y = 0;
        this._remainder.y = 0;
    }
}
