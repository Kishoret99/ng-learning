import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
// import { SeoService } from '../seo/seo.service';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'app-break-out',
  templateUrl: './break-out.component.html',
  styleUrls: ['./break-out.component.css']
})
export class BreakOutComponent implements OnInit {
    public canvas: any;
    public context;

    // Ball Dimensions
    private ballRadius = 10;

    // Ball Position
    private x: number;
    private y: number;

    // Ball Kinematics
    private dx = 2;
    private dy = -2;

    // Paddle Dimension
    private paddleHeight = 10;
    private paddleWidth = 75;

    // Paddle Position
    private paddleX: number;

    // Paddle controls
    private rightPressed = false;
    private leftPressed = false;

    // Brick Dimensions and Count
    private bricks = [];
    private brickRowCount = 3;
    private brickColomnCount = 5;
    private brickWidth = 75;
    private brickHeight = 20;
    private brickPadding = 10;
    private brickOffsetTop = 30;
    private brickOffsetLeft = 30;

    // Score
    private score = 0;

    // Lives
    private lives = 3;

    private _seo;

    constructor(private firebaseDb: AngularFireDatabase) {

    }

    public getSeoData() {
        // getSeoData(pageName: string, type = 'flat')
        this.firebaseDb.list('/static').valueChanges().subscribe(console.log);
        // console.log(data)
    }

    ngOnInit() {
        this.canvas = document.getElementById('screen');
        this.context = this.canvas.getContext('2d');
        this.setDefaultBallPosition();
        this.setDefaultPaddlePosition();
        this.initiateBricks();
        document.addEventListener('keydown', this.keyDownHandler.bind(this), false);
        document.addEventListener('keyup', this.keyUpHandler.bind(this), false);
        document.addEventListener('mousemove', this.mouseMoveHandler.bind(this), false );
        // setInterval(() => this.draw(), 10);
        this.getSeoData();
    }

    setDefaultBallPosition() {
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - this.paddleHeight - this.ballRadius;
    }

    setDefaultPaddlePosition() {
        this.paddleX = (this.canvas.width - this.paddleWidth) / 2;
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawCircle('#0095DD');
        this.drawPaddle();
        this.collisionDetect();
        this.drawBricks();
        if (this.y + this.dy < this.ballRadius) {
            this.dy = - this.dy;
        } else if (this.y + this.ballRadius + this.dy > this.canvas.height) {
            if (this.x > this.paddleX && this.x < this.paddleX + this.paddleWidth) {
                this.dy = - this.dy;
            } else {
                this.lives--;
                if (!this.lives) {
                    alert('GAME OVER');
                    document.location.reload();
                } else {
                    this.setDefaultPaddlePosition();
                    this.setDefaultBallPosition();
                }
            }
        }
        if (this.x + this.dx < this.ballRadius ||
            this.x + this.dx > this.canvas.width - this.ballRadius
        ) {
            this.dx = - this.dx;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.changePaddleX();
        this.drawScore();
        this.drawLives();
    }

    drawCircle(color: string) {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.ballRadius, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
        this.context.fillStyle = color;
        this.context.fill();
        this.context.closePath();
    }

    drawPaddle() {
        this.context.beginPath();
        this.context.rect(
            this.paddleX,
            this.canvas.height - this.paddleHeight,
            this.paddleWidth,
            this.paddleHeight
        );
        this.context.fillStyle = '#0095DD';
        this.context.fill();
        this.context.closePath();
    }

    changePaddleX() {
        if (this.rightPressed && this.paddleX + this.paddleWidth < this.canvas.width) {
            this.paddleX += 3;
        }
        if (this.leftPressed && this.paddleX > 0) {
            this.paddleX += -3;
        }
    }

    keyDownHandler(e) {
        if (e.keyCode === 39 ) {
            this.rightPressed = true;
        } else if (e.keyCode === 37) {
            this.leftPressed = true;
        }
    }

    keyUpHandler(e) {
        if (e.keyCode === 39 ) {
            this.rightPressed = false;
        } else if (e.keyCode === 37) {
            this.leftPressed = false;
        }
    }

    mouseMoveHandler(e) {
        const relativeX = e.clientX - this.canvas.offsetLeft;
        if (
            relativeX - this.paddleWidth / 2 > 0 &&
            relativeX + this.paddleWidth / 2 < this.canvas.width
        ) {
            this.paddleX = relativeX - this.paddleWidth / 2;
        }
    }

    initiateBricks() {
        for (let c = 0; c < this.brickColomnCount; c++) {
            this.bricks[c] = [];
            for (let r = 0; r < this.brickRowCount;  r++) {
                this.bricks[c][r] = {x: 0, y: 0, status: 1};
            }
        }
    }

    drawBricks() {
        for (let c = 0; c < this.brickColomnCount; c++) {
            for (let r = 0; r < this.brickRowCount; r++) {
                this.bricks[c][r].x = c * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
                this.bricks[c][r].y = r * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
                if (this.bricks[c][r].status) {
                    this.context.beginPath();
                    this.context.rect(
                        this.bricks[c][r].x,
                        this.bricks[c][r].y,
                        this.brickWidth,
                        this.brickHeight
                    );
                    this.context.fillStyle = '#0095DD';
                    this.context.fill();
                    this.context.closePath();
                }
            }
        }
    }

    collisionDetect() {
        for (let c = 0; c < this.brickColomnCount; c++ ) {
            for (let r = 0; r < this.brickRowCount; r++) {
                if (this.bricks[c][r].status) {
                    if (
                        this.x > this.bricks[c][r].x &&
                        this.x < this.bricks[c][r].x + this.brickWidth &&
                        this.y > this.bricks[c][r].y &&
                        this.y < this.bricks[c][r].y +  this.brickHeight
                    ) {
                        this.drawCircle('red');
                        this.dy = - this.dy;
                        this.bricks[c][r].status = 0;
                        this.score++;
                        if (this.score === this.brickColomnCount * this.brickRowCount) {
                            alert('YOU WIN, CONGRATULATIONS');
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }

    drawScore() {
        this.context.font = '16px Arial';
        this.context.fillStyle = '#0095DD';
        this.context.fillText('score ' + this.score, 8, 20);
    }

    drawLives() {
        this.context.font = '16px Arial';
        this.context.fillStyle = '#0095DD';
        this.context.fillText('lives:' + this.lives, this.canvas.width - 60, 20);
    }
}
