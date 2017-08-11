/**
 * Created by Administrator on 2017/5/16.
 */
$(function() {
    let audio = $('audio')[0];
    let song = $('.song')[0];
    let singer = $('.singer')[0];
    let lyrics = $('.lyrics')[0];
    let playButton = $('.play')[0];
    let preAButton = $('.preA')[0];
    let nextAButton = $('.nextA')[0];
    let index = 0;
    let img = $('img')[0];
    let info = $('.info')[0];
    let cTime = $('.currentTime')[0];
    let fullTime = $('.fullTime')[0];
    let fullP = $('.fullP')[0];
    let currentP = $('.currentP')[0];
    let progressB=$('.progressBottom')[0];

    let currentBtn=$('.currentBtn')[0];

    let fullV=$('.fullV')[0];
    let currentV=$('.currentV')[0];
    let vBtn=$('.vBtn')[0];
    console.log(fullV,currentV,vBtn);
    init(database[0]);


    //初始化
    function init(obj) {
        let string = '';
        song.innerText = obj.songs;
        singer.innerText = obj.name;
        audio.src = obj.src;


        info.innerText = `${obj.songs}-${obj.name}`;
        img.src = obj.photo;
        cTime.innerText = '00:00';
        fullTime.innerText = obj.alltime;
        obj.lyrics.forEach(function (value, index) {
            string += `<li>${value.lyric}</li>`;
        })
        lyrics.innerHTML = '';
        lyrics.innerHTML = string;
    }

    //暂停与播放
    playButton.onclick = function () {
        if (audio.paused) {
            audio.play();
            playButton.classList.toggle('icon-bofang');
        } else {
            audio.pause();
            playButton.classList.toggle('icon-bofang');
        }
    }
    //切换
    nextAButton.onclick=function(){
        index++;
        if(index>database.length-1){
            index=0;
        }
        //重置currentP
        currentP.style.width=0;


        init(database[index]);
        audio.play();
        //重置播放暂停按钮

        playButton.classList.remove('icon-bofang');

    }
    preAButton.onclick=function(){

        index--;
        if(index<0){
            index=database.length-1;
        }
        currentP.style.width=0;

        init(database[index]);
        audio.play();
        playButton.classList.remove('icon-bofang');



    }

    //时间
    function forTime(time) {
        let m=Math.floor(time/60)>=10?Math.floor(time/60):'0'+ Math.floor(time/60);
        let s=Math.floor(time%60)<10?'0'+Math.floor(time%60):Math.floor(time%60);
        return `${m}:${s}`;

    }

    let i = x = 0;
    audio.ontimeupdate = function () {
        let current=forTime(audio.currentTime);
        let duration=forTime(audio.duration);
        currentP.style.width=(audio.currentTime/audio.duration)*100+'%';
        currentBtn.style.left=(audio.currentTime/audio.duration)*100+'%';

        cTime.innerText=current;
        fullTime.innerText=database[index].alltime;
        let string = '';


        //歌词
        lyrics.innerHTML = '';
        database[index]['lyrics'].forEach(function (value,index) {
            if( value.time == current ){
                x=i= index;
            }
        })
            if(x<2){
                i=0;
            }else{
                i=x-2;
            }

            for(let j=i;j<database[index]['lyrics'].length;j++) {
                if (j==x) {
                    string+= `
                        <li class="hot">
                            ${database[index]['lyrics'][j]['lyric']}
                        </li>`;
                }else{
                    string+= `
                    <li>
                        ${database[index]['lyrics'][j]['lyric']}
                    </li>`
                }
            }

        lyrics.innerHTML=string;



    }
    //自动切换
    audio.addEventListener('ended',function(){
        index++;
        if(index>5){
            index=0;
        }
        //重置currentP
        currentP.style.width=0;
        //重置播放暂停按钮
        init(database[index]);
        // playButton.classList.toggle('icon-bofang');
        audio.play();


    });



    //前进
    // let w=fullP.offsetLeft;
    // currentBtn.onmousedown=function(e){
    //     let ox=e.offsetX;
    //     document.onmousemove=function(e){
    //         let cx=e.clientX;
    //         let lefts=cx-w-ox;
    //         currentBtn.style.left=(lefts-6)+'px';
    //         currentP.style.width=(lefts-6)+'px';
    //
    //     }
    //     currentBtn.onmouseup=function(){
    //         document.onmousemove=null;
    //         currentBtn.onmouseup=null;
    //     }
    // }



    //音量
    let offW=fullV.offsetLeft;

    console.log(offW);
    vBtn.onmousedown=function(e){
        let oxV=e.offsetX;
        document.onmousemove=function(e){
            let cxV=e.clientX;
            let leftsV=cxV-offW-oxV;
            if(leftsV>oxV-10&&leftsV<oxV+90){
                vBtn.style.left=leftsV+'px';
                currentV.style.width=leftsV+'px';
                audio.volume=leftsV/120;
            }


        }
        vBtn.onmouseup=function(){
            document.onmousemove=null;
            vBtn.onmouseup=null;
        }
    }





})