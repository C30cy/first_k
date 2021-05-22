if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
let up = document.getElementById("yidong");
let tuiyidong = document.getElementById("tuiyidong");
let hour_ol = document.getElementsByClassName("hour-ol")[0];
//获取手指的初始坐标
var startX=0;
var moveX=0;
var startleft=0;
var flag=false; //节流阀（严谨操作）
var ol;
var ot;
up.addEventListener('touchstart',function(e){
    var e=e||window.event;
    startX=e.targetTouches[0].pageX;
    startleft = parseInt(getComputedStyle(this, null)["left"]);
    up.addEventListener('touchmove',function(e){
        //计算移动距离
        moveX=e.targetTouches[0].pageX-startX;
        //移动盒子：盒子原来的位置+手指移动的距离
        if(moveX>0&&startleft < 0){
            let temp = startleft+moveX;
            if(temp >0){
                temp = 0;
            }
            up.style.left = temp+'px';
        }
        if(moveX<0&&startleft <=0){
            let temp = startleft+moveX;
            if(temp < -112.5){
                temp = -112.5;
            }
            up.style.left = temp+'px';
            e.preventDefault();
        }
        //手指拖动的时候，不需要动画效果所以要取消过渡效果
        flag=true;
        e.preventDefault(); //阻止滚动屏幕的行为
    });
});
function stopTouchendPropagationAfterScroll(){
    var locked = false;
 
    window.addEventListener('touchmove', function(ev){
        locked || (locked = true, window.addEventListener('touchend', stopTouchendPropagation, true));
    }, true);
    function stopTouchendPropagation(ev){
        ev.stopPropagation();
        window.removeEventListener('touchend', stopTouchendPropagation, true);
        locked = false;
    }
}
stopTouchendPropagationAfterScroll();
tuiyidong.addEventListener('touchstart',function(e){
    var e=e||window.event;
    startX=e.targetTouches[0].pageX;
    startleft = parseInt(getComputedStyle(this, null)["left"]);
    tuiyidong.addEventListener('touchmove',function(e){
        //计算移动距离
        moveX=e.targetTouches[0].pageX-startX;
        
        //移动盒子：盒子原来的位置+手指移动的距离
        if(moveX>0&&startleft < 0){
            // console.log(1);
            let temp = startleft+moveX;
            if(temp >0){
                temp = 0;
            }
            
            tuiyidong.style.left = temp+'px';
            tuiyidong.style.transition = 'all 0.2s'
        }
        if(moveX<0&&startleft <=0){
            // console.log(1);
            let temp = startleft+moveX;
            if(temp < -500){
                temp = -500;
            }
            tuiyidong.style.left = temp+'px';
            
        }
        if(moveX < -187.5){
            temp = -383
        }else{
            temp = 0
        }
        tuiyidong.style.left = temp+'px';
        tuiyidong.style.transition = 'all 0.2s'
        //手指拖动的时候，不需要动画效果所以要取消过渡效果
        flag=true;
        e.preventDefault(); //阻止滚动屏幕的行为
    });
    if(parseInt(getComputedStyle(tuiyidong, null)["left"])==0){
    
        lunbo1.src = "./img/images/轮播2.png";
        lunbo2.src = "./img/images/轮播1.png";
    }else{
        lunbo1.src = "./img/images/轮播1.png";
        lunbo2.src = "./img/images/轮播2.png";
    }
});
const lunbo1 = document.getElementsByClassName("lunbo1")[0];
const lunbo2 = document.getElementsByClassName("lunbo2")[0];
// const txt = document.getElementsByClassName("txt")[0];
// const showtxt = document.getElementsByClassName("show-txt")[0];
hour_ol.addEventListener('touchstart',function(e){
    var e=e||window.event;
    startX=e.targetTouches[0].pageX;
    startleft = parseInt(getComputedStyle(this, null)["left"]);
    hour_ol.addEventListener('touchmove',function(e){
        //计算移动距离
        moveX=e.targetTouches[0].pageX-startX;
        //移动盒子：盒子原来的位置+手指移动的距离
        if(moveX>0&&startleft < 0){
            // console.log(1);
            let temp = startleft+moveX;
            if(temp >0){
                temp = 0;
            }
            hour_ol.style.left = temp+'px';
        }
        if(moveX<0&&startleft <=0){
            // console.log(1);
            let temp = startleft+moveX;
            if(temp < -1020){
                temp = -1020;
            }
            hour_ol.style.left = temp+'px';
        }
        //手指拖动的时候，不需要动画效果所以要取消过渡效果
        flag=true;
        e.preventDefault(); //阻止滚动屏幕的行为
    });
});
