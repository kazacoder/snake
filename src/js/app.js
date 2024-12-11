import {Game} from "./modules/game.js";

class App {

    settings = {
        positionsCount: 30,
        positionsSize: 20,
        speed: 100
    };

    constructor() {
        this.setUpWidth()
        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', (this.settings.positionsSize * this.settings.positionsCount).toString());
        canvas.setAttribute('height', (this.settings.positionsSize * this.settings.positionsCount).toString());
        document.getElementById('container').appendChild(canvas);

        const context = canvas.getContext('2d');

        new Game(context, this.settings);
    }

    setUpWidth () {
        const currentWidth = window.screen.width;
        if (currentWidth < this.settings.positionsSize * this.settings.positionsCount) {
            this.settings.positionsSize = currentWidth / this.settings.positionsCount;
        }
    }

}


(new App())