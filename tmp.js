
let app = document.querySelector('.app')
const canvas = document.createElement('canvas');
const ctx = canvas.getContext("2d");
document.body.style.overflow = 'hidden';
canvas.style.background = 'rgb(21, 16, 40)';
app.prepend(canvas);
canvas.width = document.documentElement.clientWidth/1.6;
canvas.height = document.documentElement.clientHeight/1.4;
let x = 0;
let step = 5;
let image = new Image();
image.src='./images/schedule-animate-bg2.png'


let speedCloud=0
let speedCloudStep=3
let imgCloud = new Image();
imgCloud.src = './images/schedule-bg2.svg';
let countCloud,imgCloudWidth
imgCloud.onload = function() {
    console.log(imgCloud.width);
    countCloud=Math.ceil(canvas.width/imgCloud.naturalWidth)+1
    imgCloudWidth = imgCloud.naturalWidth
};
let speedStar=0
let speedStarStep=5
let imgStar = new Image();
imgStar.src = './images/schedule-bg1.png';
let countStar,imgStarWidth
imgStar.onload = function() {
    //console.log(imgCloud.width);
    countStar=Math.ceil(canvas.width/imgStar.naturalWidth)+1
    imgStarWidth = imgStar.naturalWidth
};

const grd = ctx.createLinearGradient(0, 0, x, canvas.height);
grd.addColorStop(0, "RGBA(148, 78, 245,0.35)");
grd.addColorStop(1, "RGBA(148, 78, 245,0.1)");

function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);   // очистка

    let stopJet = canvas.width * 0.7;//canvas.width
    if(x >= stopJet) {
        step = 0;

    }
    x += step;

    speedCloud+=speedCloudStep
    if(speedCloud>=imgCloudWidth){
        speedCloud=0
    }
    for(let i=0;i<countCloud;i++){
        ctx.drawImage(imgCloud, imgCloudWidth*i-speedCloud, canvas.height - imgCloud.naturalHeight);
    }


    speedStar+=speedStarStep
    if(speedStar>=imgStarWidth){
        speedStar=0
    }
    for(let i=0;i<countStar;i++){
        ctx.drawImage(imgStar, imgStarWidth*i-speedStar,0);
    }


    //Линия траектория
    ctx.beginPath();
    ctx.moveTo(0,  canvas.height);
    ctx.strokeStyle = "rgba(148, 78, 245,0.8)";
    ctx.lineWidth = 4;
    ctx.bezierCurveTo(0, canvas.height, canvas.width-(canvas.width-(x/1.5)),canvas.height,x, canvas.height-x/2);
    ctx.stroke();
    //Пилот
    ctx.drawImage(image,  x, canvas.height-image.height/3-x/2,image.width/3, image.height/3);

    //Тень траектории
    ctx.beginPath();
    ctx.moveTo(0,  canvas.height);
    ctx.strokeStyle = "rgba(148, 78, 245,0)";
    ctx.bezierCurveTo(0, canvas.height, canvas.width-(canvas.width-(x/1.5)),canvas.height,x, canvas.height-x/2);
    ctx.lineTo(x, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = 'red';
    ctx.font = "48px serif";
    let heightText=canvas.width-(canvas.width-(x/1.5))
    if(heightText>150){
        heightText=150
    }
    ctx.fillText("Разработка слотов", heightText, 50);
    ctx.fillText("Телеграм @my_name_oleg", heightText, 110);
    window.requestAnimationFrame(draw);
}
function start(){
    draw()

}

