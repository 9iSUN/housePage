/**
 * Created by Administrator on 2017/5/26.
 */

//52张
/*
* poke[{huaSe:'c',shuZi:'7'},{huaSe:'h',shuZi:6}]52个对象
* 记录biao{h_5:true,c_8:true}
*
*
 */
$(function(){
    let poke=[];
    let biao={};
    let color=['h','s','d','c'];
    let left=$('.left');
    let right=$('.right');
    // let rest=$('.rest');
    //产生牌
   /* for(let i=0;i<52;i++){
        let huaSe=color[Math.floor(Math.random()*4)];
        let shuZi=Math.floor(Math.random()*13+1);
        //去重
        while(biao[huaSe+'_'+shuZi]){
             huaSe=color[Math.floor(Math.random()*4)];
             shuZi=Math.floor(Math.random()*13+1);
        }
        biao[huaSe+'_'+shuZi]=true;
        poke.push({huaSe,shuZi});
        document.write(huaSe,shuZi+'-----');
    }*/


   //产生牌
    while(poke.length<52){
        let huaSe=color[Math.floor(Math.random()*4)];
        let shuZi=Math.floor(Math.random()*13+1);
        //判断，若不存在则产生，否则不进行判断，直接再产生即可
        if(!biao[huaSe+'_'+shuZi]){
            biao[huaSe+'_'+shuZi]=true;
            poke.push({huaSe,shuZi});
            // document.write(huaSe,shuZi+'-----');

        }
    }
    //发牌
    let index=0;
    for(let i=0;i<7;i++){
        for(let j=0;j<=i;j++){
            let item=poke[index];
            index++;
            let src='url(img/'+item.huaSe+item.shuZi+'.png)';
            $('<div>').addClass('poke')
                .css('backgroundImage',src)
                .data('num',item.shuZi)
                //添加id属性(i_j)
                .prop('id',i+'_'+j)
                .delay(60*index)
                .animate({left:300-i*50+100*j,top:60*i,opacity:1})
                .appendTo('.table')
            right.delay(2800).animate({opacity:1});
            left.delay(2800).animate({opacity:1});
            // rest.delay(2800).animate({opacity:1});


        }
    }

    for(;index<poke.length;index++){
        let item=poke[index];
        let src='url(img/'+item.huaSe+item.shuZi+'.png)';
        $('<div>').addClass('poke zuo')
            .data('num',item.shuZi)
            .css('backgroundImage',src)
            .delay(60*index)
            .animate({left:100,top:500,opacity:1})
            .appendTo('.table')
    }
    //移动效果
    let first=null;
    $('.poke').click(function(){
        //将扑克牌id以下划线拆为数组 ['1','1']
        let ids=$(this).prop('id').split('_');
        //之后将'1'字符串转为数字parseInt()

        //`#${parseInt(ids[0])+1}_${parseInt(ids[1])}`
        let ele=$(`#${parseInt(ids[0])+1}_${parseInt(ids[1])}`);
        let ele1=$(`#${parseInt(ids[0])+1}_${parseInt(ids[1])+1}`);
        if(ele.length==1||ele1.length==1){
            return;
        }
       /* console.log(ele);
        console.log(parseInt(ids[0])+1,parseInt(ids[1]));
        console.log(parseInt(ids[0])+1,parseInt(ids[1])+1);*/
        $(this).toggleClass('active');
        if($(this).hasClass('active')){
            $(this).animate({top:'-=20'})
        }else{
            $(this).animate({top:'+=20'})
        }

        //功能
        // console.log($(this).data('num'))

        if(!first){
            first=this;
            let sum=$(first).data('num');
            if(sum==13){
                $('.active').animate({left:600,top:0},function(){
                    $(this).remove();
                    first=null;
                })
            }
        }else{
            let sum=$(first).data('num')+$(this).data('num');
            if(sum == 13){
                $('.active').animate({left:600,top:0}).queue(function(){
                    $(this).remove();
                })
            }else{
                $('.active').animate({top:'+=20'}).removeClass('active');

            }
            first=null;
        }

    })

    //左右箭头
    let z=1;
    //调层级，使其到右面时位于最上面
    right.on('click',function(){
        z++;
        $('.zuo:last')
            .removeClass('zuo')
            .addClass('you')
            .css('zIndex',z)
            .animate({left:'+=400'})
    })
    //一次性全部回到左面
    left.on('click',function(){
        let you=$('.you');
        //右面没有扑克直接return
        if(you.length==0){
            return;
        }
        //倒着回来，1，2回来就是2，1，1在最上面
        //动画结束之后层级为0
        for(let i=you.length-1;i>=0;i--){
            $(you[i])
                .delay(180*i)
                .animate({left:'-=400'},function(){
                    $(this).css('zIndex',0)
                })
                .addClass('zuo')
                .removeClass('you')
        }
    })






})