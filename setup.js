const {vector,canvas,camera} = require("./visuals");

class setup
{
    myCanvas;
    myCamera;
    mouse;
    mouseOnCanvas;
    mouseDown = false;
    constructor(color,position = {x:0,y:0},size = {x:screen.width,y:screen.height})
    {
        this.mouse = new vector();
        this.myCanvas = new canvas(color,position,size);
        this.myCamera = new camera();
        this.mouseOnCanvas = this.myCamera.trueDistance(this.mouse);
        console.log("hello");
    }
    setup(parent = document.body)
    {   
        this.myCamera.exponentialZoomFactor(0.98);
        this.myCanvas.setParent(parent);
        this.myCanvas.createCanvas();
        this.myCanvas.setTranslateAndScale(this.myCamera);
        addEventListener("wheel",(e)=>
        {
            this.myCamera.zoomChange(((e.deltaY > 0)*2)-1);
            this.myCamera.setCenter(this.myCamera.showPointAt(this.mouseOnCanvas,this.mouse));
        })

        addEventListener("mousemove",(e)=>
        {
            let mouseBefore = new vector();
            mouseBefore.set(this.mouse);
            this.myCamera.appendPoint(this.mouse);
            this.mouse.set(new vector(e.clientX,e.clientY));
            let difference = vector.staticSub(this.mouse,mouseBefore);
            difference.mult(-1/this.myCamera.scale);
            this.mouseOnCanvas.set(this.myCamera.trueDistance(this.mouse));
            if(this.mouseDown)
            {
                this.myCamera.setCenter(vector.staticAdd(this.myCamera.center,difference));
            }
        })
        addEventListener("mousedown",()=>
        {
            this.mouseDown = true;
        })
        addEventListener("mouseup",()=>
        {
            this.mouseDown = false;
        })
    }
    getCamera()
    {
        return this.myCamera;
    }
    getCanvas()
    {
        return this.myCanvas;
    }
}



module.exports = setup;