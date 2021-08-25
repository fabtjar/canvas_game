export class Entity {
    constructor(scene, x = 0, y = 0) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.components = [];
    }

    add(component) {
        if (this.components.includes(component))
            throw "Component already in entity.";
        component.entity = this;
        this.components.push(component);
        return component;
    }

    get(componentType) {
        for (const c of this.components)
            if (c instanceof componentType) return c;
    }

    getAll(componentType) {
        var components = [];
        for (const c of this.components)
            if (c instanceof componentType) components.push(c);
        return components;
    }

    start() {
        for (const c of this.components) c.start();
    }

    update(deltaTime) {
        for (const c of this.components) c.update(deltaTime);
    }

    draw(ctx) {
        for (const c of this.components) c.draw(ctx);
    }

    get game() {
        return this.scene.game;
    }
}
