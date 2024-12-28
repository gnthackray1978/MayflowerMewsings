// var canvas = document.getElementById('canvas');
// let start;
// var ctx;
// const image = document.getElementById("treesImg");
// ctx = canvas.getContext('2d');

class Light {
    constructor (container) {
       
        this.container = container;
        this.growing = true;
        this.x =  this.container.randomRange(0, this.container.canvas.width);
        this.y = this.container.randomRange(0, this.container.canvas.height);
        this.xSpeed = this.container.randomRange(this.container.LIGHT_XSPEED_RANGE[0], this.container.LIGHT_XSPEED_RANGE[1]);
        this.ySpeed = this.container.randomRange(this.container.LIGHT_YSPEED_RANGE[0], this.container.LIGHT_YSPEED_RANGE[1]);
        this.size = this.container.randomRange(this.container.LIGHT_SIZE_RANGE[0], this.container.LIGHT_SIZE_RANGE[1]);
        this.lifeSpan = this.container.randomRange(this.container.LIGHT_LIFESPAN_RANGE[0], this.container.LIGHT_LIFESPAN_RANGE[1]);
        this.age = 0;
    
        this.colors = {
            red: 255,
            green: 255,
            blue: 0,
            alpha: 0,
        };

    }

    drawBasic(pctx){
        pctx.beginPath();
        pctx.fillStyle = 'rgba(' + this.colors.red + ', ' + this.colors.green + ', ' + this.colors.blue + ', ' + this.colors.alpha + ')';
        pctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2,
            false
            );
        pctx.fill();
    }

    drawGradFill(pctx){
        let innerRadius = this.size / 10;
        let outerRadius = this.size;

        if(innerRadius < 1)
            innerRadius =1;

        if(outerRadius < 1)
            outerRadius =1;

        let halfSize = this.size /2;
        pctx.beginPath();
        const gradient = pctx.createRadialGradient(this.x, this.y, innerRadius, this.x, this.y, outerRadius);
        
        gradient.addColorStop(0.1, "white");
        gradient.addColorStop(0.3, "yellow");//red
        gradient.addColorStop(0.5, 'orange');  
        gradient.addColorStop(1, 'transparent');

        // Set the fill style and draw a rectangle
        pctx.fillStyle = gradient;

        pctx.arc(this.x, this.y, outerRadius, 0, Math.PI*2, false);
        pctx.fill();
    }
}

export class LightsHandler {
    constructor() {
       // this.ctx = image;
        this.canvas;
        this.image;
        this.MAX_LIGHTS = 70;
        this.LIGHT_XSPEED_RANGE = [-0.2, 0.2];
        this.LIGHT_YSPEED_RANGE = [-0.1, 0.1];
        this.LIGHT_SIZE_RANGE = [3, 6];
        this.LIGHT_LIFESPAN_RANGE = [1000, 2500];    
        this.lights = [];
    }
    
    IsValid () {
        return true;
    }

    randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    fitToScreen (element) {
        element.width = window.innerWidth;
        element.height = window.innerHeight;
    }

    clearScreen()  {
        
        this.ctx.beginPath();
        //ctx.fillStyle = 'rgb(61, 61, 59)';
        //ctx.rect(0, 0, canvas.width, canvas.height);
        let container = document.getElementById('container');

        let widthHack = (window.innerWidth - container.clientWidth)/2;

        this.ctx.drawImage(this.image,0-widthHack,0,window.innerWidth, window.innerHeight);
        this.ctx.fill();
        
    }

    createLights() {
        if (this.lights.length !== this.MAX_LIGHTS) {
            this.lights.push(new Light(this));
        }
    }

    moveLights() {
        let _canvas = this.canvas;

        this.lights.forEach(function (light) {

            const isOutOfBounds = (position, limit) => position > limit || position < 0;

            if (isOutOfBounds(light.x, _canvas.width) || isOutOfBounds(light.y, _canvas.height)) {
                // light.xSpeed = -light.xSpeed; // this would make them ping around
                // light.ySpeed = -light.ySpeed; // this would make them ping around
                light.age = light.lifeSpan;
                return;
            }

            light.x += light.xSpeed;
            light.y += light.ySpeed;

            light.age++;

            if(light.age < light.lifeSpan / 2){
                light.size = light.size+0.01;
            }
            else{
                if(light.size > 5){
                    light.size = light.size - 0.01;
                }
            }

            if(light.size <= 5)
                light.growing = true;

            if(light.size > 10)
                light.growing = false;


            if (light.age < light.lifeSpan / 2) {
                light.colors.alpha += 1 / (light.lifeSpan / 2);

            if (light.colors.alpha > 1) {
                light.colors.alpha = 1;
            }
            } else {
                light.colors.alpha -= 1 / (light.lifeSpan / 2);

                if (light.colors.alpha < 0) {
                    light.colors.alpha = 0;
                }
            }
        });
    }

    removeLights(){
        var i = this.lights.length;

        while (i--) {
            var light = this.lights[i];

            if (light.age >= light.lifeSpan) {
                this.lights.splice(i, 1);
            }
        }
    }

    drawLights(){
        let _ctx = this.ctx;
        this.lights.forEach(function(light) {
            light.drawGradFill(_ctx);
            // drawBasic(ctx,light);
        });
    }

    render(ctx,canvas,image){ 
        this.ctx= ctx;
        
        this.canvas = canvas;
        this.image = image;

        if(this.ctx && this.canvas && this.image){
            this.clearScreen();
            this.createLights();
            this.moveLights();
            this.removeLights();
            this.drawLights();
        }
    }
}
