/*封装
 $函数
 $('.类名')
 $('#id名')
 $('tag')
 $(function(){})
 $('<div>')

 1.获取
 . # tag
 2.添加
 function
 */
function $(selector,ranger=document){
    let type=typeof selector;
    //console.log(type);
    if(type=='string'){
        //获取
        let select=selector.trim();
        let first=select.charAt(0);
        if(first=='.'){
            //console.log(select.substring(1));
            return ranger.getElementsByClassName(select.substring(1));

        }else if(first=='#'){
            return document.getElementById(select.substring(1));
        }else if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(select)){
            return ranger.getElementsByTagName(select);
        }else if(/^<[a-zA-Z][a-zA-Z1-6]{0,8}>$/.test(select)){
            //<div>,不要尖括号
            return document.createElement(select.slice(1,-1));
        }

    }else if(typeof  selector=='function'){
        //添加事件
        /*window.onload=function(){
            selector();
        }*/
        addEvent(window,'load',selector);
    }
}


/*
 getComputedStyle(obj,null).attr
 obj.currentStyle.attr
 window.getComputedStyle 看属性，没有此属性会输出undefined;有这个属性就是输出function(){}
 window.getComputedStyle()调用此函数，如果浏览器没有会报错，不适合用;
 1.判断浏览器
 ie
 w3c
 如何判断？
 2.getStyle(obj,attr)
 获取某一个对象的样式
 obj 对象
 attr 样式


 */


/*function getStyle(obj,attr){
 console.log(obj);
 console.log(attr);
 //if里面的getComputedStyle,把方法当做属性来用
 if(window.getComputedStyle){
 return getComputedStyle(obj,null)[attr];
 }else{
 return obj.currentStyle[attr];//对象.属性，属性名传进去为字符串，应该用[]访问；
 }
 }*/


/*
 html(obj,[content])
 设置或者获取某一个元素的内容
 obj 指定的对象
 content 即将设置的内容，可传可不传，不传表示获取元素内容，传表示设置其内容

 */
function html(obj,content){
    //隐式类型转换
    if(content){
        //设置
        obj.innerHTML=content;
    }else{
        //获取
        return obj.innerHTML;
    }
}

/*getChild
 获取某一元素的子元素节点
 1.获取所有子节点
 2.筛选元素节点
 */
function getChilds(obj){
    let childs=obj.childNodes;
    let arr=[];
    childs.forEach(function(value,index){
        if(value.nodeType==1){
            arr.push(value);
        }
    });
    return arr;
}


/*
 getFirst第一个元素节点
 0 length-1
 */
function getFirst(obj,num){
    return getChilds(obj)[num];

}


/*
 getNext
 某元素节点的兄弟节点也是元素节点
 1.下一个兄弟节点是否为元素节点a
 2.不是，a的下一个兄弟节点...
 3.是
 */

function getNext(obj){

    let a=obj.nextSibling;
    console.log(a);
    if(a==null){
        return false;
    }
    while(a.nodeType!=1){
        a=a.nextSibling;
        if(a==null){
            return false;
        }
    }
    return a;

}

function getPrev(obj){

    let a=obj.previousSibling;
    console.log(a);
    if(a==null){
        return false;
    }
    while(a.nodeType!=1){
        a=a.previousSibling;
        if(a==null){
            return false;
        }
    }
    return a;

}



// 把一个节点插入到指定节点之后
/*Node.prototype.insertAfter=function(ele){
 let next=this.nextElementSibling;
 let parent=this.parentNode;
 parent.insertBefore(ele,next);
 }

 // 把一个节点插入到指定节点之前
 Node.prototype.pretend=function(ele){
 let first=this.firstElementChild;
 this.insertBefore(ele.first);
 }
/*
 ele.appendTo(parent)
用已有方法模拟新的方法

 parent.appendChild(ele)
 insertBefore
 */
Node.prototype.appendTo=function(parent){
    parent.appendChild(this);


}

function addEvent(obj,type,fn) {
    obj.addEventListener(type, fn, false);
}

//滚轮事件
function mouseWheel(obj,upFn,downFn){
    obj.addEventListener('mousewheel',fn,false);
    function fn(e){
        e.preventDefault();
        let dir=e.wheelDelta;
        if(dir==120||dir==150||dir==180){
            upFn.call(obj);
        }else if(dir==-120||dir==-150||dir==-180){
            downFn.apply(obj);
        }
    }
}