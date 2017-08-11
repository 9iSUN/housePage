/**
 * Created by Administrator on 2017/5/19.
 */
/**
 * Created by Administrator on 2017/5/18.
 */
window.onload=function(){
    let canvas=document.querySelector('canvas');
    let ctx=canvas.getContext('2d');

    let palette=new Palette(canvas,ctx);

    let line=document.querySelector('.icon-xiantiao');
    let pen=document.querySelector('.icon-qianbi');
    let rectangle=document.querySelector('.icon-juxing');
    let poly=document.querySelector('.icon-ds');
    let polygon=document.querySelector('.icon-duobianxing');
    let circle=document.querySelector('.icon-yuan');
    let roundedRectangle=document.querySelector('.icon-yuanjiao-rect');
    let tc=document.querySelector('.icon-tianchong');
    let mb=document.querySelector('.icon-miaobian');



    let eraser=document.querySelector('.icon-xiangpi');

    let revoke=document.querySelector('.icon-iocnchexiao');
    let tColor=document.querySelector('#tColor');
    let mColor=document.querySelector('#mColor');

    //填充与描边
    tc.onclick=function(){
        palette.type='fill';
    }
    mb.onclick=function(){
        palette.type='stroke';
    }
    tColor.onchange=function(){
        palette.fillStyle=this.value;
    }
    mColor.onchange=function(){
        palette.strokeStyle=this.value;
    }
//
    canvas.onmousedown=function(e){
        let ox=e.offsetX,oy=e.offsetY;

        canvas.onmousemove=function(e){
            let mx=e.offsetX,my=e.offsetY;

            self.ctx.clearRect(0,0,self.width,self.height);
            if(self.history.length>0){
                self.ctx.putImageData(self.history[self.history.length-1],0,0);
            }
        }
        self.obj.onmouseup=function(){
            self.history.push(self.ctx.getImageData(0,0,self.width,self.height));
            self.obj.onmousemove=null;
            self.obj.onmouseup=null;
        }
    }





}