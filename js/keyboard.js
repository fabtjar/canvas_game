export class Keyboard {
    constructor() {
        this._keysDown = {};
        document.onkeydown = (e) => (this._keysDown[e.code] = true);
        document.onkeyup = (e) => (this._keysDown[e.code] = false);
    }

    isDown(code) {
        if (!code in this._keysDown) return false;
        return this._keysDown[code];
    }
}
