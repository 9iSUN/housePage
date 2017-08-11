/**
 * Created by Administrator on 2017/5/18.
 */
window.onload=function(){
    let canvas=document.querySelector('canvas');
    let ctx=canvas.getContext('2d');
    let mask=document.querySelector('.mask');
    let label=document.querySelectorAll('label');
    console.log(label);

    let palette=new Palette(canvas,ctx,mask);

    let line=document.querySelector('.icon-xiantiao');
    let pen=document.querySelector('.icon-qianbi');
    let rectangle=document.querySelector('.icon-juxing');
    let poly=document.querySelector('.icon-ds');
    let polygon=document.querySelector('.icon-duobianxing');
    let circle=document.querySelector('.icon-yuan');
    let roundedRectangle=document.querySelector('.icon-yuanjiao-rect');
    let tc=document.querySelector('.icon-tianchong');
    let mb=document.querySelector('.icon-miaobian');
    let dash=document.querySelector('.icon-xuxian');


    let eraser=document.querySelector('.icon-xiangpi');
    let xp=document.querySelector('.xp');
    let wenZi=document.querySelector('.icon-wenzi');
    let cqBtn=document.querySelector('.icon-caiqie');
    let clipArea=document.querySelector('.clipArea');

    let revoke=document.querySelector('.icon-iocnchexiao');
    let save=document.querySelector('.icon-baocun');
    let xj=document.querySelector('.icon-xinjian');
    let tColor=document.querySelector('#tColor');
    let mColor=document.querySelector('#mColor');



    // for(let i=0;i<label.length;i++){
    //     label[i].onclick=function(){
    //         alert(1);
    //     }
    // }

    //填充与描边
    tc.onclick=function(){
        palette.type='fill';
        tc.style.background='#ff6700';
    }
    mb.onclick=function(){
        palette.type='stroke';
        mb.style.background='#ff6700';
    }
    tColor.onchange=function(){
        palette.fillStyle=this.value;
    }
    mColor.onchange=function(){
        palette.strokeStyle=this.value;
    }
    //文字
    wenZi.onclick=function(){
        palette.font();
        wenZi.style.background='#ff6700';
    }
    //裁剪
    cqBtn.onclick=function(){
        palette.clip(clipArea);
        cqBtn.style.background='#ff6700';
    }
    //橡皮擦
    eraser.onclick=function () {
        let w=prompt('请输入橡皮尺寸','10');
        palette.eraser(w,h=w,xp);
        eraser.style.background='#ff6700';
    }
    //撤销
    revoke.onclick=function () {
        palette.revoke();
        revoke.style.background='#ff6700';
    }
    //保存
    save.onclick=function(){
        palette.save();
        save.style.background='#ff6700';
    }
    //新建
    xj.onclick=function(){
        palette.new();
        xj.style.background='#ff6700';
    }
    //线
    line.onclick=function(){
        palette.line();
        line.style.background='#ff6700';
    }
    //铅笔
    pen.onclick=function () {
        palette.pen();
        pen.style.background='#ff6700';
    }
    //矩形
    rectangle.onclick = function () {
        palette.rectangle();
        rectangle.style.background='#ff6700';
    }
    //多边形
    polygon.onclick=function () {
        palette.bian=prompt('请输入边数','6');
        palette.polygon(palette.bian);
        polygon.style.background='#ff6700';
    }
    //多角形
    poly.onclick=function () {
        palette.jiao=prompt('请输入角数','6');
        palette.poly(palette.jiao);
        poly.style.background='#ff6700';
    }
    //圆
    circle.onclick=function () {
        palette.circle();
        circle.style.background='#ff6700';
    }
    //圆角矩形
    roundedRectangle.onclick=function(){
        palette.roundedRectangle(30);
        roundedRectangle.style.background='#ff6700';
    }
    //虚线
    dash.onclick=function(){
        palette.dash();
        dash.style.background='#ff6700';
    }







}