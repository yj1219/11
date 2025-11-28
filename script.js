const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 粒子系統
let particles = [];
function createParticle(x, y) {
    particles.push({
        x: x,
        y: y,
        size: Math.random()*5+2,
        speedX: (Math.random()-0.5)*4,
        speedY: (Math.random()-0.5)*4,
        color: `hsl(${Math.random()*360},100%,50%)`
    });
}

function drawParticles() {
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    for (let i=0;i<particles.length;i++) {
        let p = particles[i];
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fill();
        p.x += p.speedX;
        p.y += p.speedY;
        p.size *= 0.95;
        if (p.size < 0.5) particles.splice(i,1);
    }
}

canvas.addEventListener("mousemove", (e)=>{
    for(let i=0;i<3;i++) createParticle(e.clientX,e.clientY);
});

function animate() {
    drawParticles();
    requestAnimationFrame(animate);
}
animate();

// 按鈕互動
const btn = document.getElementById("funBtn");
const msg = document.getElementById("message");
const texts = [
    "你觸發彩蛋啦！🎉",
    "彩球飛起來了！🎈",
    "哈哈，你好好玩啊！😎",
    "彩虹出現啦 🌈",
    "再按一次看看！✨"
];
btn.addEventListener("click", ()=>{
    msg.textContent = texts[Math.floor(Math.random()*texts.length)];
    // 生成更多粒子
    for(let i=0;i<20;i++) createParticle(Math.random()*canvas.width, Math.random()*canvas.height);
});
