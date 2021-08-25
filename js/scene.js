export class Scene {
    constructor(game) {
        this.game = game;
        this.entities = [];
    }

    add(entity) {
        if (this.entities.includes(entity)) throw "Entity already in scene.";
        this.entities.push(entity);
    }

    get(componentType) {
        for (const e of this.entities) {
            const c = e.get(componentType);
            if (c) return c;
        }
    }

    getAll(componentType) {
        var components = [];
        for (const e of this.entities)
            components = components.concat(e.getAll(componentType));
        return components;
    }

    start() {
        for (const e of this.entities) e.start();
    }

    update(deltaTime) {
        for (const e of this.entities) e.update(deltaTime);
    }

    draw(ctx) {
        for (const e of this.entities) e.draw(ctx);
    }
}
