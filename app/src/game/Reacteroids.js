import React, {Component, useState} from 'react';
import Ship from './Ship';
import Asteroid from './Asteroid';
import {randomNumBetweenExcluding} from './helpers'
import db from "../db";
import {useHistory} from 'react-router-dom'
import {
    Switch,
    Route,
    Link,
    Redirect,
    useLocation
} from "react-router-dom";

const KEY = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    A: 65,
    D: 68,
    W: 87,
    SPACE: 32
};

// const [dir, setDir] = useState(false);


export class Reacteroids extends Component {

    constructor() {
        super();
        this.state = {
            screen: {
                width: 400,
                height: 200,
                ratio: 2 || 1,
            },
            context: null,
            keys: {
                left: 0,
                right: 0,
                up: 0,
                down: 0,
                space: 0,
            },
            asteroidCount: 3,
            currentScore: 0,
            topScore: localStorage['topscore'] || 0,
            inGame: false,
            dir: false
        }
        this.ship = [];
        this.asteroids = [];
        this.bullets = [];
        this.particles = [];
    }

    handleResize(value, e) {
        this.setState({
            screen: {
                width: 400,
                height: 200,
                ratio: 2 || 1,
            }
        });
    }

    handleKeys(value, e) {
        let keys = this.state.keys;
        if (e.keyCode === KEY.LEFT || e.keyCode === KEY.A) keys.left = value;
        if (e.keyCode === KEY.RIGHT || e.keyCode === KEY.D) keys.right = value;
        if (e.keyCode === KEY.UP || e.keyCode === KEY.W) keys.up = value;
        if (e.keyCode === KEY.SPACE) keys.space = value;
        this.setState({
            keys: keys
        });
    }

    componentDidMount() {
        window.addEventListener('keyup', this.handleKeys.bind(this, false));
        window.addEventListener('keydown', this.handleKeys.bind(this, true));
        window.addEventListener('resize', this.handleResize.bind(this, false));

        const context = this.refs.canvas.getContext('2d');
        this.setState({context: context});
        this.startGame();
        requestAnimationFrame(() => {
            this.update()
        });
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleKeys);
        window.removeEventListener('keydown', this.handleKeys);
        window.removeEventListener('resize', this.handleResize);
    }

    update() {
        const context = this.state.context;
        const keys = this.state.keys;
        const ship = this.ship[0];

        context.save();
        context.scale(this.state.screen.ratio, this.state.screen.ratio);

        // Motion trail
        context.fillStyle = '#000';
        context.globalAlpha = 0.4;
        context.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
        context.globalAlpha = 1;

        // Next set of asteroids
        if (!this.asteroids.length) {
            let count = this.state.asteroidCount + 1;
            this.setState({asteroidCount: count});
            this.generateAsteroids(count)
        }

        // Check for colisions
        this.checkCollisionsWith(this.bullets, this.asteroids);
        this.checkCollisionsWith(this.ship, this.asteroids);

        // Remove or render
        this.updateObjects(this.particles, 'particles')
        this.updateObjects(this.asteroids, 'asteroids')
        this.updateObjects(this.bullets, 'bullets')
        this.updateObjects(this.ship, 'ship')

        context.restore();

        // Next frame
        requestAnimationFrame(() => {
            this.update()
        });
    }

    addScore(points) {
        if (this.state.inGame) {
            this.setState({
                currentScore: this.state.currentScore + points,
            });
        }
    }

    startGame() {
        this.setState({
            inGame: true,
            currentScore: 0,
        });
        // Make ship
        let ship = new Ship({
            position: {
                x: this.state.screen.width / 2,
                y: this.state.screen.height / 2
            },
            create: this.createObject.bind(this),
            onDie: this.gameOver.bind(this)
        });
        this.createObject(ship, 'ship');

        // Make asteroids
        this.asteroids = [];
        this.generateAsteroids(this.state.asteroidCount)
    }

    gameOver() {
        this.setState({
            inGame: false,
        });

        // Replace top score
        if (this.state.currentScore > this.state.topScore) {
            this.setState({
                topScore: this.state.currentScore,
            });
            localStorage['topscore'] = this.state.currentScore;
        }
    }

    generateAsteroids(howMany) {
        let asteroids = [];
        let ship = this.ship[0];
        for (let i = 0; i < howMany; i++) {
            let asteroid = new Asteroid({
                size: 80,
                position: {
                    x: randomNumBetweenExcluding(0, this.state.screen.width, 50, 50),
                    y: randomNumBetweenExcluding(0, this.state.screen.height, 50, 50)
                },
                create: this.createObject.bind(this),
                addScore: this.addScore.bind(this)
            });
            this.createObject(asteroid, 'asteroids');
        }
    }

    createObject(item, group) {
        this[group].push(item);
    }

    updateObjects(items, group) {
        let index = 0;
        for (let item of items) {
            if (item.delete) {
                this[group].splice(index, 1);
            } else {
                items[index].render(this.state);
            }
            index++;
        }
    }

    checkCollisionsWith(items1, items2) {
        var a = items1.length - 1;
        var b;
        for (a; a > -1; --a) {
            b = items2.length - 1;
            for (b; b > -1; --b) {
                var item1 = items1[a];
                var item2 = items2[b];
                if (this.checkCollision(item1, item2)) {
                    item1.destroy();
                    item2.destroy();
                }
            }
        }
    }

    checkCollision(obj1, obj2) {
        var vx = obj1.position.x - obj2.position.x;
        var vy = obj1.position.y - obj2.position.y;
        var length = Math.sqrt(vx * vx + vy * vy);
        if (length < obj1.radius + obj2.radius) {
            return true;
        }
        return false;
    }

    addPoints = async (points) => {
        const user = await db.users.getUser("loggeduser");
        user.points += points;
        await db.users.saveNoFormat('user', user);
        this.state.dir = true;
        this.startGame();
    };

    render() {
        let endgame;
        let message;

        if (this.state.currentScore <= 0) {
            message = '0 points... So sad.';
        } else if (this.state.currentScore >= this.state.topScore) {
            message = 'Top score with ' + this.state.currentScore + ' points. Woo!';
        } else {
            message = this.state.currentScore + ' Points though :)'
        }

        if (!this.state.inGame) {
            endgame = (
                <div className="endgame">
                    <p>Game over, man!</p>
                    <p>{message}</p>
                    <button
                        onClick={this.startGame.bind(this)}>
                        try again?
                    </button>
                    <br></br>
                    <button
                        onClick={() => {
                            this.addPoints(this.state.currentScore)
                        }}
                    >
                        Click here to collect your points!
                    </button>
                </div>
            )
        }

        return (
            <>
                {(this.state.dir ? <Redirect to={'/profile'}/> : "")}
                <div>

                    <span className="score current-score">Score: {this.state.currentScore}</span><br></br>
                    <span className="score top-score">Top Score: {this.state.topScore}</span><br></br>
                    <span className="controls">
          Use [A][S][W][D] or [←][↑][↓][→] to MOVE
          Use [SPACE] to SHOOT
        </span><br></br>
                    <canvas ref="canvas"
                            width={this.state.screen.width * this.state.screen.ratio}
                            height={this.state.screen.height * this.state.screen.ratio}
                    />
                    {endgame}
                </div>
            </>
        )
            ;
    }
}
