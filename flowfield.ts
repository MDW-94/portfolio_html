//NOT MY CODE
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
let cw: number = (canvas.width = window.innerWidth);
let ch: number = (canvas.height = window.innerHeight);
let rid: number | null = null; // request animation id
ctx.fillStyle = 'hsla(0, 5%, 5%, .025)';

interface Position {
  x: number;
  y: number;
}

class Particle {
  pos: Position;
  vel: Position;
  base: number;
  life: number;
  color: string;
  history: Position[];

  constructor() {
    this.pos = { x: Math.random() * cw, y: Math.random() * ch };
    this.vel = { x: 0, y: 0 };
    this.base = (1 + Math.random()) * 3;
    this.life = randomIntFromInterval(5, 20);
    this.color = Math.random() < 0.1 ? 'hsla(200,90%,50%,1)' : 'hsla(0,0%,30%,.7)';
    this.history = [];
  }

  update(): void {
    this.history.push({ x: this.pos.x, y: this.pos.y });
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  show(): void {
    this.life--;
    ctx.beginPath();
    const last = this.history.length - 1;
    ctx.moveTo(this.history[last].x, this.history[last].y);
    for (let i = last; i > 0; i--) {
      ctx.lineTo(this.history[i].x, this.history[i].y);
    }
    ctx.strokeStyle = this.color;
    ctx.stroke();

    if (this.history.length > this.life) this.history.splice(0, 1);
  }

  edges(): void {
    if (
      this.pos.x > cw ||
      this.pos.x < 0 ||
      this.pos.y > ch ||
      this.pos.y < 0
    ) {
      this.pos.y = Math.random() * ch;
      this.pos.x = Math.random() * cw;
      this.history.length = 0;
    }
    if (this.life <= 0) {
      this.pos.y = Math.random() * ch;
      this.pos.x = Math.random() * cw;
      this.life = randomIntFromInterval(5, 20);
      this.history.length = 0;
    }
  }

  follow(): void {
    const x = ~~(this.pos.x / size);
    const y = ~~(this.pos.y / size);
    const index = x + y * cols;

    const angle = flowField[index];

    this.vel.x = this.base * Math.cos(angle);
    this.vel.y = this.base * Math.sin(angle);
  }
}

let particles: Particle[] = [];

let size: number = 15; // flow field cell size
let rows: number = ~~(ch / size) + 2;
let cols: number = ~~(cw / size) + 2;

let flowField: number[] = [];

function getAngle(x: number, y: number): number {
  return (Math.cos(x * 0.01) + Math.cos(y * 0.01)) * Math.PI / 2;
}

function getFlowField(rows: number, cols: number): void {
  for (let y = 0; y <= rows; y++) {
    for (let x = 0; x < cols; x++) {
      const index = x + y * cols;
      const a = getAngle(x * size, y * size);

      flowField[index] = a;
    }
  }
}

getFlowField(rows, cols);

for (let i = 0; i < 1000; i++) {
  particles.push(new Particle());
}

function frame(): void {
  rid = requestAnimationFrame(frame);

  ctx.fillRect(0, 0, cw, ch);

  particles.map(p => {
    p.follow();
    p.update();
    p.show();
    p.edges();
  });
}

function Init(): void {
  cw = canvas.width = window.innerWidth;
  ch = canvas.height = window.innerHeight;

  ctx.fillStyle = 'hsla(0, 5%, 5%, .025)';

  rows = ~~(ch / size) + 2;
  cols = ~~(cw / size) + 2;

  flowField = new Array(rows * cols);
  getFlowField(rows, cols);

  if (rid) {
    window.cancelAnimationFrame(rid);
    rid = null;
  }
  frame();
}

window.setTimeout(function (): void {
  Init();

  window.addEventListener('resize', Init, false);
}, 15);

function randomIntFromInterval(mn: number, mx: number): number {
  return Math.floor(Math.random() * (mx - mn + 1) + mn);
}
