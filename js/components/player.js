import { Component } from "../component.js";
import { approach } from "../maths.js";
import { Collider } from "./collider.js";
import { Mover } from "./mover.js";
import { Sprite } from "./sprite.js";

export class Player extends Component {
    constructor() {
        super();
        this.maxSpeed = 200;
        this.accel = 3000;
        this.decel = 1000;
        this.grav = 3000;
        this.maxGrav = 900;
        this.jumpForce = 800;
        this.wasOnGround = true;
        this.scaleSpeed = 3;
    }

    update(deltaTime) {
        const mover = this.entity.get(Mover);
        const collider = this.entity.get(Collider);
        const sprite = this.entity.get(Sprite);

        sprite.scale.x = approach(
            sprite.scale.x,
            1,
            this.scaleSpeed * deltaTime
        );
        sprite.scale.y = approach(
            sprite.scale.y,
            1,
            this.scaleSpeed * deltaTime
        );

        var hor = 0;
        var jump = false;
        const keyboard = this.game.keyboard;
        if (keyboard.isDown("ArrowLeft")) hor--;
        if (keyboard.isDown("ArrowRight")) hor++;
        if (keyboard.isDown("ArrowUp")) jump = true;

        mover.speed.y = approach(
            mover.speed.y,
            this.maxGrav,
            this.grav * deltaTime
        );

        const onGround = collider.overlapsMask("solid", 0, 1);
        if (onGround && !this.wasOnGround) {
            sprite.scale = { x: 1.5, y: 0.5 };
        }
        this.wasOnGround = onGround;
        if (onGround && jump) {
            mover.speed.y = -this.jumpForce;
            sprite.scale = { x: 0.5, y: 1.2 };
        }

        mover.speed.x = approach(mover.speed.x, 0, this.decel * deltaTime);
        if (hor != 0)
            mover.speed.x = approach(
                mover.speed.x,
                hor * this.maxSpeed,
                this.accel * deltaTime
            );
    }
}
