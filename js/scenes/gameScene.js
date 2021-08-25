import { Factory } from "../factory.js";
import { Scene } from "../scene.js";

export class GameScene extends Scene {
    start() {
        this.loadMap();
    }

    loadMap() {
        fetch("./tilemap/level_1.json")
            .then((res) => res.json())
            .then((data) => {
                const cellX = data.layers[0].gridCellsX;
                const cellY = data.layers[0].gridCellsY;
                const tileData = data.layers[0].grid;
                for (var x = 0; x < cellX; x++) {
                    for (var y = 0; y < cellY; y++) {
                        const tileId = tileData[(x % cellX) + y * cellX];
                        switch (parseInt(tileId)) {
                            case 1:
                                this.add(Factory.wall(this, x * 32, y * 32));
                                this.createEdgeWall(x, y, cellX, cellY);
                                break;
                            case 2:
                                this.add(
                                    Factory.player(
                                        this,
                                        x * 32 + 16,
                                        y * 32 + 32
                                    )
                                );
                                break;
                            case 3:
                                this.add(Factory.paper(this, x * 32, y * 32));
                                break;
                        }
                    }
                }
            });
    }

    createEdgeWall(x, y, cellX, cellY) {
        if (x == 0) this.add(Factory.wall(this, (x - 1) * 32, y * 32));
        else if (x == cellX - 1)
            this.add(Factory.wall(this, (x + 1) * 32, y * 32));
        if (y == 0) this.add(Factory.wall(this, x * 32, (y - 1) * 32));
        else if (y == cellY - 1)
            this.add(Factory.wall(this, x * 32, (y + 1) * 32));
    }
}
