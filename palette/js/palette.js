/**
 * Created by Administrator on 2017/5/18.
 */
/*
* 线 铅笔 矩形 多边形 多角形 圆 虚线 圆角矩形
* 填充 描边 样式
* 橡皮 文字 裁切
* 撤销 保存 新建
*
*
* */


function Palette(obj,ctx,mask){
    this.obj=obj;
    this.ctx=ctx;

    this.mask=mask;

    this.width=obj.width;
    this.height=obj.height;

    this.lineWidth=2;
    this.lineCap='round';
    this.fillStyle='#000';
    this.strokeStyle='#000';
    this.type='stroke';

    this.text='20px sans-serif';
    this.textAlign='center';
    this.textBaseline='middle';


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
    line:function(){
        let self=this;
        self.mask.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;
            self.mask.onmousemove=function(e){
                let mx=e.offsetX,my=e.offsetY;
                self.init();
                self.ctx.clearRect(0,0,self.width,self.height);
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                self.ctx.beginPath();
                self.ctx.moveTo(ox,oy);
                self.ctx.lineTo(mx,my);
                self.ctx.closePath();
                self.ctx.stroke();
            }
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
        }
    },
    //铅笔
    pen:function(){
        let self=this;
        self.mask.onmousedown=function(e) {
            let ox = e.offsetX, oy = e.offsetY;
            self.ctx.beginPath();
            self.ctx.lineTo(ox, oy)

            self.mask.onmousemove = function (e) {
                let mx = e.offsetX, my = e.offsetY;
                self.init();
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                self.ctx.lineTo(mx, my);
                self.ctx.stroke();

            }
            self.mask.onmouseup = function () {
                self.ctx.closePath();
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmouseup = null;
                self.mask.onmousemove = null;

            }
        }
    },
    //矩形
    rectangle:function () {
        let self=this;
        self.mask.onmousedown=function(e){
            let ox = e.offsetX,oy = e.offsetY;

            self.mask.onmousemove=function(e){
                let mx = e.offsetX, my = e.offsetY;
                self.init();
                self.ctx.clearRect(0,0,self.width,self.height);
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                self.ctx.beginPath();
                self.ctx.rect(ox,oy,mx-ox,my-oy);
                self.ctx.closePath();
                self.ctx[self.type]();

            }
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
        }

    },
    //多边形
    polygon:function (bian) {
        let self=this;
        let deg=360/(self.bian)/180*Math.PI;
        self.mask.onmousedown=function(e){
            let ox = e.offsetX,oy = e.offsetY;

            self.mask.onmousemove=function(e){
                let mx = e.offsetX, my = e.offsetY;
                self.init();
                let r = Math.sqrt(Math.pow(my - oy, 2) + Math.pow(mx - ox, 2));
                self.ctx.clearRect(0,0,self.width,self.height);
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                self.ctx.beginPath();
                self.ctx.moveTo(ox+r,oy);
                for(let i=0;i<bian;i++){
                    let x=ox+r*Math.cos(deg*i);
                    let y=oy+r*Math.sin(deg*i);
                    self.ctx.lineTo(x,y);
                }
                self.ctx.closePath();
                self.ctx[self.type]();


            }
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
        }
    },
    //多角形
    poly:function (jiao) {
        let self=this;

        self.mask.onmousedown=function(e){
            let ox = e.offsetX,oy = e.offsetY;

            self.mask.onmousemove=function(e){
                let mx = e.offsetX, my = e.offsetY;
                self.init();
                let r = Math.sqrt(Math.pow(my - oy, 2) + Math.pow(mx - ox, 2));
                let r1=r/2;
                let deg=360/(self.jiao*2)/180*Math.PI;
                self.ctx.clearRect(0,0,self.width,self.height);
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
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


            }
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
        }

    },
    //圆
    circle:function () {
        let self=this;
        self.mask.onmousedown=function(e){
            let ox = e.offsetX,oy = e.offsetY;

            self.mask.onmousemove=function(e){
                let mx = e.offsetX, my = e.offsetY;
                self.init();
                let r = Math.sqrt(Math.pow(my - oy, 2) + Math.pow(mx - ox, 2));
                self.ctx.clearRect(0,0,self.width,self.height);
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                self.ctx.beginPath();
                self.ctx.arc(ox,oy,r,0,2*Math.PI);

                self.ctx.closePath();
                self.ctx[self.type]();


            }
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
        }
    },
    //虚线
    dash:function () {
       let self=this;
        self.mask.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;
            self.mask.onmousemove=function(e){
                let mx=e.offsetX,my=e.offsetY;
                self.init();
                self.ctx.clearRect(0,0,self.width,self.height);
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                self.ctx.beginPath();
                self.ctx.moveTo(ox,oy);
                self.ctx.lineTo(mx,my);
                //虚线样式是全局的 改变了画笔的性质
                self.ctx.setLineDash([5,5]);
                self.ctx.stroke();
                self.ctx.setLineDash([]);
            }
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
        }

    },
    //圆角矩形
    roundedRectangle:function (r=10) {
        let self=this;
        self.mask.onmousedown=function(e){
            let ox = e.offsetX,oy = e.offsetY;

            self.mask.onmousemove=function(e){
                let mx = e.offsetX, my = e.offsetY;
                let w=mx-ox,h=my-oy,r=10;
                self.init();

                self.ctx.clearRect(0,0,self.width,self.height);
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0);
                }
                self.ctx.beginPath();
                // self.ctx.moveTo(ox+r,oy);
                // self.ctx.lineTo(mx-r,oy);
                // self.ctx.quadraticCurveTo(mx,oy,mx,oy+r);
                // self.ctx.lineTo(mx,my-r);
                // self.ctx.quadraticCurveTo(mx,my,mx-r,my);
                // self.ctx.lineTo(ox+r,my);
                // self.ctx.quadraticCurveTo(ox,my,ox,my-r);
                // self.ctx.lineTo(ox,oy+r);
                // self.ctx.quadraticCurveTo(ox,oy,ox+r,oy);


                self.ctx.moveTo(ox-w+r,oy-h);
                self.ctx.lineTo(mx-r,oy-h);
                self.ctx.quadraticCurveTo(mx,oy-h,mx,oy-h+r);
                self.ctx.lineTo(mx,my-r);
                self.ctx.quadraticCurveTo(mx,my,mx-r,my);
                self.ctx.lineTo(ox-w+r,my);
                self.ctx.quadraticCurveTo(ox-w,my,ox-w,my-r);
                self.ctx.lineTo(ox-w,oy-h+r);
                self.ctx.quadraticCurveTo(ox-w,oy-h,ox-w+r,oy-h);



                self.ctx.closePath();
                self.ctx[self.type]();

            }
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
        }


    },
    //橡皮擦
    eraser:function(w,h,xp){
        //
        let self=this;
        self.mask.onmousedown=function(){
            xp.style.display='block';
            xp.style.width=`${w}px`;
            xp.style.height=`${h}px`;
            if(self.history.length>0){
                self.ctx.putImageData(self.history[self.history.length-1],0,0);
            }
            self.mask.onmousemove=function(e){
                let mx=e.offsetX-w/2,my=e.offsetY-h/2;
                if(mx>=self.width-w){
                    mx=self.width-w;
                }
                if(mx<0){
                    mx=0;
                }
                if(my>=self.height-h){
                    my=self.height-h;
                }
                if(my<0){
                    my=0;
                }
                xp.style.left=mx+'px';
                xp.style.top=my+'px';
                self.ctx.clearRect(mx,my,w,h);
            }
            self.mask.onmouseup=function(){
                xp.style.display='none';
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
            }
        }


    },
    //文字
    font:function(){
        let self=this;
        self.mask.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;
            console.log(ox,oy);
            let div=document.createElement('div');
            div.style.cssText=`
                    min-width:100px;height:80px;position:absolute;left:${ox}px;top:${oy}px;background:#ffffff;
            `;
            div.contentEditable=true;
            self.mask.appendChild(div);
            console.log(div);
            self.mask.onmousedown=null;
            self.wz=div;
            self.wz.onmousedown=function(e){
                let ox=e.clientX-this.offsetLeft,oy=e.clientY-this.offsetTop;
                self.mask.onmousemove=function(e){
                    let cx=e.clientX,cy=e.clientY;
                    let lefts=cx-ox,tops=cy-oy;
                    self.wz.style.left=`${lefts}px`;
                    self.wz.style.top=`${tops}px`;
                    self.wz.onmouseup=function(e){
                        self.mask.onmousemove=null;
                        self.wz.onmouseup=null;
                    }
                }
                self.wz.onblur=function(e){
                    self.ctx.font=self.text;
                    self.ctx.textAlign=self.textAlign;
                    self.ctx.textBaseline=self.textBaseline;
                    self.ctx.fillText(this.innerText,this.offsetLeft,this.offsetTop);
                    this.parentNode.removeChild(this);
                    self.wz=null;

                }
            }

        }
    },
    
    
    
    
    
    //裁切
    clip:function(clipArea){
        let self=this;
        self.clipArea=clipArea;

        self.init();
        self.mask.onmousedown=function(e){
            let ox=e.offsetX, oy=e.offsetY;
            let minx,miny,w,h;
            self.mask.onmousemove=function(e){
                let mx=e.offsetX,my=e.offsetY;
                minx=mx>ox?ox:mx;
                miny=my>oy?oy:my;
                w=Math.abs(mx-ox);
                h=Math.abs(my-oy);
                clipArea.style.cssText=`width:${w}px;height:${h}px;position:absolute;top:${miny}px;left:${minx}px;border:2px dashed #000000;`;

            }
            self.mask.onmouseup=function(){
                self.mask.onmousemove=null;
                self.mask.onmouseup=null;
                self.temp = self.ctx.getImageData(minx, miny, w, h);
                console.log(self.ctx.getImageData(minx, miny, w, h));
                self.ctx.clearRect(minx, miny, w, h);
                self.history.push(self.ctx.getImageData(0, 0, self.width, self.height))
                self.ctx.putImageData(self.temp, minx, miny);
                self.drag(minx, miny, w, h, clipArea);


            }
        }
    },
    //drag拖拽
    drag: function (x, y, w, h, clipArea) {
        let self = this;
        self.mask.onmousemove = function (e) {
            let ox = e.offsetX;
            let oy = e.offsetY;
            if (ox > x && ox < w + x && oy > y && oy < h + y) {
                self.mask.style.cursor = "move";
            } else {
                self.mask.style.cursor = "default";
            }
        }
        self.mask.onmousedown = function (e) {
            let  ox = e.offsetX;
            let  oy = e.offsetY;
            //鼠标相对于div左上角的位置
            let  cx = ox - x;
            let  cy = oy - y;
            if (ox > x && ox < w + x && oy > y && oy < h + y) {
                self.mask.style.cursor = "move";
            } else {
                self.mask.style.cursor = "default";
                return;
            }
            self.mask.onmousemove = function (e) {
                self.ctx.clearRect(0, 0, self.width, self.height);
                if (self.history.length != 0) {
                    self.ctx.putImageData(self.history[self.history.length - 1], 0, 0)
                }
                let endx = e.offsetX;
                let endy = e.offsetY;
                let left = endx - cx;
                let top = endy - cy;
                if(left<0){
                    left=0;
                }
                if(left>self.width-w){
                    left=self.width-w
                }

                if(top<0){
                    top=0;
                }
                if(top>self.height-h){
                    top=self.height-h
                }
                clipArea.style.left= left+'px';
                clipArea.style.top=top+'px';
                x=left;
                y=top;
                self.ctx.putImageData(self.temp, left, top);
            }
            self.mask.onmouseup = function () {
                self.mask.onmousemove = null;
                self.mask.onmouseup = null;
                self.drag(x, y, w, h, clipArea);
            }
        }

    },


    

    //撤销
    revoke : function(){
        let self=this;
        let last=self.history.pop();
        if(self.history.length<1){
            self.ctx.clearRect(0,0,self.width,self.height);
            return ;
        }
        self.ctx.putImageData(self.history[self.history.length-1],0,0);
    },
    //保存
    save:function(){
        let self=this;
        let data=self.obj.toDataURL('image/png').replace('data:image/png','data:stream/octet');
        location.href=data;
    },
    //新建
    new:function(){
        let self=this;
        let flag=confirm("是否保存");
        if(flag){
            let data=self.obj.toDataURL('image/png').replace('data:image/png','data:stream/octet');
            location.href=data;
        }
        self.history=[];
        self.ctx.clearRect(0,0,self.width,self.height);
    },















}