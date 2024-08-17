let canvas,graphic,CWidth,CHeight;
let particles = [];
let random_numbers = [];
let yellow = [], red = [], blue = [], green = [];

onload = function(){
    canvas = document.getElementById("simulator");
    graphic = canvas.getContext("2d");
    //初期化
    init()
    //入力処理
    setInterval("gameloop()",16)
}

function init(){
    CWidth = canvas.width;
    CHeight = canvas.height;
    
    particles = [];

    yellow = create(200, "yellow");
    red = create(200, "red");
    blue = create(100,"blue");
    green = create(150,"green");

    random_numbers = random_g(16);
    console.log(random_numbers);
    console.log(particles)
}

function particle(x,y,c){
    return {"x":x, "y":y, "vx":0, "vy":0, "color":c}
}

function draw(x,y,c,s){
    graphic.fillStyle=c;
    graphic.fillRect(x,y,s,s);
}

function random(){
    return Math.random()*400+50;
}

function random_g(n){
    let output_numbers = [];
    for(let i=0;i<n;i++){
        let number = [-2,-1,-0.5,-0.1,0,0.1,0.5,1,2];
        let r = Math.floor(Math.random()*8);
        output_numbers.push(number[r]);
    }
    return output_numbers;
}

function create(number, color){
    group = [];
    for(let i=0;i<number;i++){
        group.push(particle(random(), random(), color));
        particles.push(group[i]);
    }

    return group;
}

function rule(particle1, particle2, G){
    let fx,fy,a,b,dx,dy,d,F;
    for(let i=0;i<particle1.length;i++){
        fx = 0;
        fy = 0;
        for(let j=0;j<particle2.length;j++){
            a = particle1[i];
            b = particle2[j];
            dx = a.x - b.x;
            dy = a.y - b.y;
            d = Math.sqrt(dx*dx + dy*dy)
            if(d>0 && d<80){
                F = G * 1/d;
                fx += (F * dx);
                fy += (F * dy);
            }
        }
        a.vx = (a.vx + fx)*0.5;
        a.vy = (a.vy + fy)*0.5;
        a.x += a.vx;
        a.y += a.vy;
        if(a.x<0||a.x>CWidth){
            a.vx *= -10;
        }
        if(a.y<0||a.y>CHeight){
            a.vy *= -10;
        }
    }
}

function random_rules(){
    rule(yellow,yellow,random_numbers[0]);
    rule(red,red,random_numbers[1]);
    rule(blue,blue,random_numbers[2]);
    rule(green,green,random_numbers[3]);
    rule(green,yellow,random_numbers[4]);
    rule(red,yellow,random_numbers[5]);
    rule(yellow,red,random_numbers[6]);
    rule(blue,red,random_numbers[7]);
    rule(blue,yellow,random_numbers[8]);
    rule(red,blue,random_numbers[9]);
    rule(yellow,blue,random_numbers[10]);
    rule(green,red,random_numbers[11]);
    rule(green,blue,random_numbers[12]);
    rule(red,green,random_numbers[13]);
    rule(blue,green,random_numbers[14]);
    rule(yellow,green,random_numbers[15]);
}

function update(){
    random_rules()
    graphic.clearRect(0,0,CWidth,CHeight);
    draw(0,0,"black",800);
    for(let i=0;i<particles.length;i++){
        draw(particles[i].x, particles[i].y, particles[i].color, 5);
    }
}

function gameloop(){
    update();
}