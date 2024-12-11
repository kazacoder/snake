export class Snake {

    currentDirection = 'right';

    snake = [
        {x: 10, y: 20},
    ]

    context = null;
    positionsCount = null
    positionsSize = null

    controlButtons = {
        up: document.getElementById('up'),
        left: document.getElementById('left'),
        right: document.getElementById('right'),
        down: document.getElementById('down'),
    }

    constructor(context, positionsCount, positionsSize) {
        this.context = context;
        this.positionsCount = positionsCount;
        this.positionsSize = positionsSize

        this.addKeyBoardHandler()
        this.addControlButtonHandler()
    }

    addKeyBoardHandler() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && this.currentDirection !== 'right') {
                this.currentDirection = 'left'
            } else if (e.key === 'ArrowRight' && this.currentDirection !== 'left') {
                this.currentDirection = 'right'
            } else if (e.key === 'ArrowUp' && this.currentDirection !== 'down') {
                this.currentDirection = 'up'
            } else if (e.key === 'ArrowDown' && this.currentDirection !== 'up') {
                this.currentDirection = 'down'
            }
        })
    }

    addControlButtonHandler() {
        this.controlButtons.up.addEventListener('click', () => {
            if (this.currentDirection !== 'down') {this.currentDirection = 'up'}
        });
        this.controlButtons.left.addEventListener('click', () => {
            if (this.currentDirection !== 'right') {this.currentDirection = 'left'}
        });
        this.controlButtons.right.addEventListener('click', () => {
            if (this.currentDirection !== 'left') {this.currentDirection = 'right'}
        });
        this.controlButtons.down.addEventListener('click', () => {
            if (this.currentDirection !== 'up') {this.currentDirection = 'down'}
        });
    }

    showSnake(foodPosition) {
        let result = {
            gotFood: false,
            collision: false,
        }
        for (let i = 0; i < this.snake.length; i++) {
            this.context.fillStyle = "black";
            this.context.beginPath();
            this.context.fillRect(
                this.snake[i].x * this.positionsSize - this.positionsSize,
                this.snake[i].y * this.positionsSize - this.positionsSize,
                this.positionsSize,
                this.positionsSize,
            );
        }

        let newHeadPosition = {
            x: this.snake[0].x,
            y: this.snake[0].y,
        }

        if (foodPosition && foodPosition.x === newHeadPosition.x && foodPosition.y === newHeadPosition.y) {
            result.gotFood = true;
        } else {
            this.snake.pop()
        }

        if (this.currentDirection === 'left') {
            if (newHeadPosition.x === 1) {
                newHeadPosition.x = this.positionsCount;
            } else {
                newHeadPosition.x -= 1
            }

        } else if (this.currentDirection === 'right') {
            if (newHeadPosition.x === this.positionsCount) {
                newHeadPosition.x = 1;
            } else {
                newHeadPosition.x += 1
            }

        } else if (this.currentDirection === 'up') {
            if (newHeadPosition.y === 1) {
                newHeadPosition.y = this.positionsCount;
            } else {
                newHeadPosition.y -= 1
            }

        } else if (this.currentDirection === 'down') {
            if (newHeadPosition.y === this.positionsCount) {
                newHeadPosition.y = 1
            } else {
                newHeadPosition.y += 1
            }

        }

        if (!this.checkNewHeadPositionCollision(newHeadPosition)) {
            this.snake.unshift(newHeadPosition)
        } else {
            result.collision = true
        }


        return result
    }

    checkNewHeadPositionCollision(newHeadPosition) {
        for (let i = 0; i < this.snake.length; i++) {
            if (newHeadPosition.x === this.snake[i].x && newHeadPosition.y === this.snake[i].y) {
                return true;
            }
        }
        return false;
    }
}