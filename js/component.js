export class Component {
    start() {}
    update(deltaTime) {}
    draw(ctx) {}
    get game() {
        return this.entity.scene.game;
    }
}
