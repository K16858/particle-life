let canvas,graphic,CWidth,CHeight;
let particles = [];
let random_numbers = [];
let yellow = [], red = [], blue = [], green = [];
let all_particle = [];

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

    yellow = create(300, "yellow");
    red = create(300, "red");
    blue = create(300,"blue");
    green = create(200,"green");
    purple = create(200,"purple");
    orange = create(200,"orange")

    let n = (all_particle.length)*(all_particle.length)
    random_numbers = random_g(n);
    console.log(random_numbers);
    console.log(all_particle)
}

function particle(x,y,c){
    return {"x":x, "y":y, "vx":0, "vy":0, "color":c}
}

function draw(x,y,c,s){
    graphic.fillStyle=c;
    graphic.fillRect(x,y,s,s);
}

function random(n){
    return Math.random()*n;
}

function random_g(n){
    let output_numbers = [];
    for(let i=0;i<n;i++){
        let number = [-0.2,-0.1,-0.5,-0.1,-0.3,0.1,0.5,0.1,0.2];
        let r = Math.floor(Math.random()*(number.length-1));
        output_numbers.push(number[r]);
    }
    return output_numbers;
}

function create(number, color){
    group = [];
    for(let i=0;i<number;i++){
        group.push(particle(random(CWidth), random(CHeight), color));
        particles.push(group[i]);
    }
    all_particle.push(group)

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
            if(d>5 && d<40){
                F = G * 1/d;
                fx += (F * dx);
                fy += (F * dy);
            }
            else if(d<=5){
                F = 0.3 * d;
                fx += (F * dx);
                fy += (F * dy);
            }
        }
        a.vx = (a.vx + fx)*0.2;
        a.vy = (a.vy + fy)*0.2;

        if(a.x<0||a.x>CWidth){
            a.vx *= -100;
        }
        if(a.y<0||a.y>CHeight){
            a.vy *= -100;
        }

        a.x += a.vx;
        a.y += a.vy;
    }
}

function create_rule(all_particle){
    let n=0
    for(let i=0;i<all_particle.length;i++){
        for(let j=0;j<all_particle.length;j++){
            rule(all_particle[i],all_particle[j],random_numbers[n])
            n++;
        }
    }
}

function update(){
    create_rule(all_particle)
    graphic.clearRect(0,0,CWidth,CHeight);
    draw(0,0,"black",800);
    for(let i=0;i<particles.length;i++){
        draw(particles[i].x, particles[i].y, particles[i].color, 2.5);
    }
}

function gameloop(){
    update();
}