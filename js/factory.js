import { Collider } from "./components/collider.js";
import { Mover } from "./components/mover.js";
import { Player } from "./components/player.js";
import { Sprite } from "./components/sprite.js";
import { Entity } from "./entity.js";

export class Factory {
    static player(scene, x, y) {
        const e = new Entity(scene, x, y);

        e.add(new Player());

        const sprite = e.add(
            new Sprite({ x: 64, y: 0, width: 32, height: 32 })
        );
        sprite.offset = { x: -16, y: -32 };

        e.add(new Mover());
        e.add(new Collider({ x: -16, y: -32, width: 32, height: 31 }));

        return e;
    }

    static wall(scene, x, y) {
        const e = new Entity(scene, x, y);
        e.add(new Sprite({ x: 96, y: 0, width: 32, height: 32 }));

        const collider = e.add(
            new Collider({ x: 0, y: 0, width: 32, height: 32 })
        );
        collider.masks = ["solid"];

        return e;
    }

    static paper(scene, x, y) {
        const e = new Entity(scene, x, y);
        e.add(new Sprite({ x: 64, y: 32, width: 32, height: 32 }));

        const collider = e.add(
            new Collider({ x: 0, y: 0, width: 32, height: 32 })
        );
        collider.masks = ["paper"];

        return e;
    }
}
