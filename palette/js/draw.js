/**
 * Created by Administrator on 2017/5/19.
 */
function Palette(obj,ctx){
    this.obj=obj;
    this.ctx=ctx;

    this.width=obj.width;
    this.height=obj.height;

    this.lineWidth=2;
    this.lineCap='round';
    this.fillStyle='#000';
    this.strokeStyle='#000';
    this.type='stroke';

    //历史记录
    this.history=[];
}
Palette.prototype={
    //初始化样式
    init:function(){
        this.ctx.lineWidth=this.lineWidth;
        this.ctx.lineCap=this.lineCap;
        this.ctx.fillStyle=this.fillStyle;
        this.ctx.strokeStyle=this.strokeStyle;
    },
    //线
    line:function(ox,oy,mx,my){
        self.init();
        self.ctx.beginPath();
        self.ctx.moveTo(ox,oy);
        self.ctx.lineTo(mx,my);
        self.ctx.closePath();
        self.ctx.stroke();
    },
    //铅笔
    pen:function(ox,oy,mx,my){
        self.init();

        self.ctx.lineTo(mx, my);
        self.ctx.stroke();
    },
    //矩形
    rectangle:function (ox,oy,mx,my) {
        self.init();

        self.ctx.beginPath();
        self.ctx.rect(ox,oy,mx-ox,my-oy);
        self.ctx.closePath();
        self.ctx[self.type]();
    },
    //多边形
    polygon:function (ox,oy,mx,my,bian) {
        self.init();

        self.ctx.beginPath();
        self.ctx.moveTo(ox+r,oy);
        for(let i=0;i<bian;i++){
            let x=ox+r*Math.cos(deg*i);
            let y=oy+r*Math.sin(deg*i);
            self.ctx.lineTo(x,y);
        }
        self.ctx.closePath();
        self.ctx[self.type]();
    },
    //多角形
    poly:function (ox,oy,mx,my,jiao) {
        self.init();

        self.ctx.beginPath();

        for(let i=0;i<self.jiao*2;i++){
            if(i%2==0){
                let x=ox+r*Math.cos(deg*i);
                let y=oy+r*Math.sin(deg*i);
                self.ctx.lineTo(x,y);
            }else{
                let x=ox+r1*Math.cos(deg*i);
                let y=oy+r1*Math.sin(deg*i);
                self.ctx.lineTo(x,y);
            }

        }
        self.ctx.closePath();
        self.ctx[self.type]();
    },
    //圆
    circle:function (ox,oy,mx,my) {
        self.init();

        self.ctx.beginPath();
        self.ctx.arc(ox,oy,r,0,2*Math.PI);

        self.ctx.closePath();
        self.ctx[self.type]();
    },

    //圆角矩形
    roundedRectangle:function (ox,oy,mx,my,r=10) {
        self.init();

        self.ctx.beginPath();
        self.ctx.moveTo(ox+r,oy);
        self.ctx.lineTo(mx-r,oy);
        self.ctx.quadraticCurveTo(mx,oy,mx,oy+r);
        self.ctx.lineTo(mx,my-r);
        self.ctx.quadraticCurveTo(mx,my,mx-r,my);
        self.ctx.lineTo(ox+r,my);
        self.ctx.quadraticCurveTo(ox,my,ox,my-r);
        self.ctx.lineTo(ox,oy+r);
        self.ctx.quadraticCurveTo(ox,oy,ox+r,oy);

        self.ctx.closePath();
        self.ctx[self.type]();
    },
    //橡皮擦
    eraser:function(){
        self.init();

        self.ctx.clearRect(mx,my,20,20);
    },

}
