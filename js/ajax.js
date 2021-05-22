if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
var mychart = echarts.init(document.getElementById("echarts"));
var option = {
    xAxis: {
        show: false,
        type: 'category',
        boundaryGap:false
    },
    yAxis: {
        show: false,
        type: 'value'
    },
    grid: {
        left: '2.2%',
        right:'4%',
        bottom:'0%',
        top:'20%',
        containLabel:true,

    },
    series: [
        
    {
        label:{
            show:true,
            position: 'top'

        },
        symbol:'circle',
        color:['orange'],
        symbolSize:7,
        data: [22, 27, 22, 26, 31, 31, 27, 27],
        type: 'line',
        smooth: true
    },
    {
        label:{
            show:true,
            position: 'bottom'

        },
        symbol:'circle',
        color:['skyblue'],
        symbolSize:7,
        data: [16,18,14,12,14,17,16,15],
        type: 'line',
        smooth: true
    },
    ]
};
mychart.setOption(option);
// const btn = document.getElementsByTagName('button')[0];
const body = document.body;
const btn = document.getElementById("shiyishi");
const result = document.getElementById("result");
const temperature = document.getElementById("temperature");
const textweather = document.getElementById("text-weather");
const txt = document.getElementsByClassName("txt")[0];
const showtxt = document.getElementsByClassName("show-txt")[0];
const toptemperature = document.getElementsByClassName("top-temperature")[0];
const toptemperature1 = document.getElementsByClassName("top-temperature")[1];
const topweather = document.getElementsByClassName("top-weather")[0];
const topweather1 = document.getElementsByClassName("top-weather")[1];
const intro_img1 = document.getElementsByClassName("intro_img11")[0];
const intro_img2 = document.getElementsByClassName("intro_img11")[1];

// let i;
// for(i=0;i<8;i++){
//     const ('topweather'+i) = document.getElementsByClassName("date")[i];
// }

function ajax(method, url, async, params, returntype, success, error) {
    method = method.toUpperCase();
    const xhr = new XMLHttpRequest();
    xhr.responseType = returntype;
    xhr.open(method, url, async = true);
    if (params != "")
        params = "?" + params
    xhr.open(method, url + params, async = true);
    xhr.send();
    xhr.onreadystatechange = function () {
        // 判断(服务端返回了所有的结果)
        if (xhr.readyState === 4) {
            // 判断响应状态码
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                success(xhr.response);
            } else {
                error();
            }
        }
    }
}

// btn.onclick = function () {
    function shuax(locationid) {
        // console.log(locationid);
    const success = function (data) {
        // console.log(data);
        temperature.innerHTML = data.now.temp + "°";
        textweather.innerHTML = data.now.text;
        txt.innerHTML = "湿度 " + data.now.humidity + "%";
        showtxt.innerHTML = data.now.windDir + " " + data.now.windScale + "级";
    }
    function error() {
        alert("error");
    }
    ajax('GET', 'https://devapi.qweather.com/v7/weather/now', true, 'location='+locationid+'&key=102be9870dbb4fde948da6a571a02459', 'json', success, error);
    ajax('GET', 'https://devapi.qweather.com/v7/weather/3d', true, 'location='+locationid+'&key=102be9870dbb4fde948da6a571a02459', 'json', function (data) {
        // console.log(data);
        toptemperature.innerHTML = data.daily[0].tempMax+"/" +data.daily[0].tempMin+"°";
        toptemperature1.innerHTML = data.daily[1].tempMax+"/" +data.daily[1].tempMin+"°";
        topweather.innerHTML = data.daily[0].textDay;
        topweather1.innerHTML = data.daily[1].textDay;
        intro_img1.src = './img/color-256/'+data.daily[0].iconDay+'.png';
        intro_img2.src = './img/color-256/'+data.daily[1].iconDay+'.png';
    }, error);
    // ajax('GET', 'https://devapi.qweather.com/v7/weather/24h', true, 'location=101010100&key=102be9870dbb4fde948da6a571a02459', 'json', function (data) {
    //     console.log(data);
    // }, error);
    
    ajax('GET', 'https://devapi.qweather.com/v7/weather/7d', true, 'location='+locationid+'&key=102be9870dbb4fde948da6a571a02459', 'json', function (data) {
        // console.log(data);
        const weekDay = ["周一","周二","周三","周四","周五","周六","周日"];
        let day = new Date();
        let jintian = day.getDay();
        let riqi = [(jintian+2)%7,(jintian+3)%7,(jintian+4)%7,(jintian+5)%7];
        
        for(let i=0;i<7;i++){
            if(i>2){
                document.getElementsByClassName("day1")[i+1].innerHTML = weekDay[riqi[i-3]];
            }
            reg = /^\d+\-/;
            reg1 = /\-/;
            let str = data.daily[i].fxDate;
            str = str.replace(reg,"");
            str = str.replace(reg1,"/");
            document.getElementsByClassName("update")[i+1].innerHTML = str;
            document.getElementsByClassName("weather")[i+1].innerHTML = data.daily[i].textDay;
            option.series[0].data[i+1] = data.daily[i].tempMax;
            // console.log(option.series[0].data[i+1]);
            option.series[1].data[i+1] = data.daily[i].tempMin;
            mychart.setOption(option);
            document.getElementsByClassName("weather1")[i+1].innerHTML = data.daily[i].textNight;
            document.getElementsByClassName("wind")[i+1].innerHTML = data.daily[i].windDirDay;
            str = data.daily[i].windScaleDay;
            str = str.replace(/^\d\-/,"")
            document.getElementsByClassName("wind1")[i+1].innerHTML = str+"级";
            document.getElementsByClassName("upicon")[i+1].src = './img/color-256/'+data.daily[i].iconDay+'.png';
            document.getElementsByClassName("uricon")[i+1].src = './img/color-256/'+data.daily[i].iconNight+'.png';
        }
        option.series[0].data[0] = parseInt((parseInt(data.daily[0].tempMax)+parseInt(data.daily[1].tempMax))/2);
        option.series[1].data[0] = parseInt((parseInt(data.daily[0].tempMin)+parseInt(data.daily[1].tempMin))/2);
        document.getElementsByClassName("upicon")[0].src = './img/color-256/'+data.daily[1].iconDay+'.png';
        document.getElementsByClassName("uricon")[0].src = './img/color-256/'+data.daily[1].iconNight+'.png';
        document.getElementsByClassName("weather")[0].innerHTML = data.daily[0].textDay;
        document.getElementsByClassName("weather1")[0].innerHTML = data.daily[0].textNight;
        document.getElementsByClassName("wind")[0].innerHTML = data.daily[0].windDirDay;
        let str11 = document.getElementsByClassName("update")[1].innerHTML;
        let str1 =  str11.replace(/^\d+/,"");
        str1 =  str1.replace(/./,"");
        str11 =  str11.replace(/\d+$/,(parseInt(str1)-1));
        // console.log(str11)
        document.getElementsByClassName("update")[0].innerHTML = str11;

    }, error);
 
    ajax('GET', 'https://devapi.qweather.com/v7/indices/1d', true, 'location='+locationid+'&key=102be9870dbb4fde948da6a571a02459&type=1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16', 'json', function (data) {
        // console.log(data);
        for(let i=0;i<16;i++){
            document.getElementsByClassName("fitem1")[i].innerHTML = data.daily[i].category;
            let str = data.daily[i].name;
            str = str.replace(/指数/,"")
            document.getElementsByClassName("fitem2")[i].innerHTML = str;
            document.getElementsByClassName("iicon")[i].src = "./img/images/"+data.daily[i].type+".png";
            document.getElementsByClassName("zhishu1")[i].innerHTML = data.daily[i].name;
            document.getElementsByClassName("yuju")[i].innerHTML = data.daily[i].text;
            

            
        }
       


    }, error);
    // 逐小时天气
    // const txt_time = document.getElementsByClassName("txt-time")[i];
    ajax('GET', 'https://devapi.qweather.com/v7/weather/24h', true, 'location='+locationid+'&key=102be9870dbb4fde948da6a571a02459', 'json', function (data) {
        // console.log(data);
        for(let i=0;i<24;i++){
            let str = data.hourly[i].fxTime;
            str = str.replace(/^\d+-\d+-\d+T/,"");
            str = str.replace(/\+\d+:\d+$/,"");
            document.getElementsByClassName("txt-time")[i].innerHTML = str;
            document.getElementsByClassName("txt-degree")[i].innerHTML = data.hourly[i].temp+"°";
            document.getElementsByClassName("hour_icon")[i].src = "./img/color-256/"+data.hourly[i].icon+".png";
        }
       


    }, error);
    const til = document.getElementById("til");
    const value = document.getElementById("value");
    ajax('GET', 'https://devapi.qweather.com/v7/air/now', true, 'location='+locationid+'&key=102be9870dbb4fde948da6a571a02459', 'json', function (data) {
        // console.log(data);
        til.innerHTML = data.now.aqi;
        value.innerHTML = data.now.category;
        document.getElementsByClassName("aqis")[0].innerHTML = data.now.aqi;
        document.getElementsByClassName("liang")[0].innerHTML = data.now.category;
        document.getElementsByClassName("val")[0].innerHTML = data.now.pm2p5;
        document.getElementsByClassName("val")[1].innerHTML = data.now.pm10;
        document.getElementsByClassName("val")[2].innerHTML = data.now.so2;
        document.getElementsByClassName("val")[3].innerHTML = data.now.no2;
        document.getElementsByClassName("val")[4].innerHTML = data.now.o3;
        document.getElementsByClassName("val")[5].innerHTML = data.now.co;
        if(data.now.level  == 1){
            document.getElementsByClassName("liang")[0].style.backgroundColor = "rgb(163,215,101)";
            document.getElementById("you").style.backgroundColor = "rgb(163,215,101)";
        }else if(data.now.level  == 2){
            document.getElementsByClassName("liang")[0].style.backgroundColor = "rgb(163,215,101)";
            document.getElementById("you").style.backgroundColor = "rgb(163,215,101)";
        }else if(data.now.level  == 3){
            document.getElementsByClassName("liang")[0].style.backgroundColor = "rgb(241,171,98)";
            document.getElementById("you").style.backgroundColor = "rgb(241,171,98)";
        }else if(data.now.level  == 4){
            document.getElementsByClassName("liang")[0].style.backgroundColor = "rgb(163,215,101)";
            document.getElementById("you").style.backgroundColor = "rgb(163,215,101)";
        }else if(data.now.level  == 5){
            document.getElementsByClassName("liang")[0].style.backgroundColor = "rgb(163,215,101)";
            document.getElementById("you").style.backgroundColor = "rgb(163,215,101)";
        }else{
            document.getElementsByClassName("liang")[0].style.backgroundColor = "rgb(163,215,101)";
            document.getElementById("you").style.backgroundColor = "rgb(163,215,101)";
        }
        

    }, error);
    

    
    
    
    
}

// const tankuang = document.getElementsByClassName("tankuang")[0];
// const beijingt = document.getElementsByClassName("beijingt")[0];
for(let i=0;i<16;i++){
    document.getElementsByClassName("items")[i].addEventListener('touchend',function(e){
        var e=e||window.event;
        document.getElementsByClassName("tankuang")[i].style.display = "block";
        body.style.overflow = "hidden";
    });
    document.getElementsByClassName("get")[i].addEventListener('click',function(e){
        var e=e||window.event;
        // console.log("1");
        document.getElementsByClassName("tankuang")[i].style.display = "none";
        body.style.overflow = "scroll";
        e.preventDefault();
    });
    document.getElementsByClassName("beijingt")[i].addEventListener('click',function(e){
        document.getElementsByClassName("tankuang")[i].style.display = "none";
        body.style.overflow = "scroll";
        e.preventDefault();
    });
    
}
const you = document.getElementById("you");
const tankuang1 = document.getElementsByClassName("tankuang1")[0];

you.addEventListener('touchstart',function(e){
    var e=e||window.event;
    tankuang1.style.display = "block";
    body.style.overflow = "hidden";
    
});
document.getElementsByClassName("skyimg")[0].addEventListener('click',function(e){
    var e=e||window.event;
    body.style.overflow = "scroll";
    tankuang1.style.display = "none";
    e.preventDefault();
});
document.getElementsByClassName("beijingt1")[0].addEventListener('click',function(e){
    body.style.overflow = "scroll";
    tankuang1.style.display = "none";
    // console.log(getComputedStyle(body, null)["overflow"]);
    e.preventDefault();
});





// 转发功能
const zhuanfa = document.getElementsByClassName("zhuanfa")[0];
const zhuanquxiao = document.getElementById("zhuanquxiao");
const zhuanfaicon = document.getElementsByClassName("zhuanfaicon")[0];
zhuanfaicon.addEventListener('touchstart',function(e){
    var e=e||window.event;
    zhuanfa.style.display = "block";
    body.style.overflow = "hidden";
});
zhuanquxiao.addEventListener('click',function(e){
    var e=e||window.event;
    body.style.overflow = "scroll";
    zhuanfa.style.display = "none";
    e.preventDefault();
});
document.getElementsByClassName("beijingt2")[0].addEventListener('click',function(e){
    body.style.overflow = "scroll";
    zhuanfa.style.display = "none";
    // console.log(getComputedStyle(body, null)["overflow"]);
    e.preventDefault();
});
let timer = setInterval(function () {
    // index++;
    // index = index % imgArr.length;
    // img1.src = imgArr[index];
    if(getComputedStyle(txt, null)["display"] == "none"){
        txt.style.display = "block";
        showtxt.style.display = "none";
    }else{
        txt.style.display = "none";
        showtxt.style.display = "block";
    }
    
}, 3000);
const tips = document.getElementsByClassName("tips")[0];
const tips1 = document.getElementsByClassName("tips1")[0];
tips1.addEventListener('click',function(e){
    tips1.style.display = "none"
    tips.style.display = "block"
    e.preventDefault();
});
tips.addEventListener('click',function(e){
    tips.style.display = "none"
    tips1.style.display = "block"
    e.preventDefault();
});
const xuanzhi =document.getElementsByClassName("xuanzhi")[0];
const search_tanchuang =document.getElementById("search_tanchuang");
const search_quxiao1 =document.getElementById("search_quxiao1");

xuanzhi.addEventListener('click',function(e){
    body.style.overflow = "hidden";
    search_tanchuang.style.display = "block";
    search_tuijian.style.display = "none";
    lishi_remen.style.display = "block";
    // lishi.style.display = "none";
    e.preventDefault();
});
search_quxiao1.addEventListener('click',function(e){
    search_tanchuang.style.display = "none";
    body.style.overflow = "scroll";
    e.preventDefault();
});
function error() {
    alert("error");
}
// ajax('GET', 'https://geoapi.qweather.com/v2/city/lookup', true, 'location=阳泉&key=102be9870dbb4fde948da6a571a02459', 'json', function (data) {
//         console.log(data);
// }, error);
// const search_diqu = document.getElementsByClassName("search_diqu")[0];
// let timer1 = setInterval(function () {
//     console.log(search_diqu.value);
// }, 3000);
// shuax("101010100");
// 搜索框
const diqudiqu = document.getElementsByClassName("diqudiqu")[0];
function shousk(locationstr) {
    function error() {
        alert("error");
    }
    let locationid1;
    ajax('GET', 'https://geoapi.qweather.com/v2/city/lookup', true, 'location='+locationstr+'&key=102be9870dbb4fde948da6a571a02459', 'json', function (data) {
        // console.log(data);
        locationid1 = data.location[0].id;
        // console.log(locationid1);
        shuax(locationid1);
        if(data.location[0].adm1 == data.location[0].name){
            let str = data.location[0].adm2;
            str =str.replace(/省|市/,"");
            diqudiqu.innerHTML = str +" "+data.location[0].name;
        }else{
            let str = data.location[0].adm1;
            str =str.replace(/省|市/,"");
            diqudiqu.innerHTML = str +" "+data.location[0].name;
        }
        

    }, error);
    // shuax(locationid1);
    
}
// shousk("海淀区")
const search_diqu = document.getElementsByClassName("search_diqu")[0];
const search_tuijian = document.getElementsByClassName("search_tuijian")[0];
const lishi = document.getElementById("lishi");
const lishi_remen = document.getElementById("lishi_remen");
// console.log(search_diqu.value);
search_diqu.addEventListener('click',function(e){
    var e=e||window.event;
    // shousk(search_diqu.value);
    lishi_remen.style.display = "none";
    search_tuijian.style.display = "block";
    let timer1 = setInterval(function () {
        search_tuijian.innerHTML = search_diqu.value;
    }, 100);
});
const lcp_city1 = document.getElementsByClassName("lcp_city")[0];
const lcp_city2 = document.getElementsByClassName("lcp_city")[1];
const lcp_city3 = document.getElementsByClassName("lcp_city")[2];
var ycount1 = 0;
search_tuijian.addEventListener('click',function(e){
    var e=e||window.event;
    // console.log(2);
    lishi.style.display = "block";
    if(ycount1%3+1 == 1){
        lcp_city1.innerHTML = search_diqu.value;
        ycount1 = ycount1+1;
        lcp_city1.style.backgroundColor = "#f2f2f2";
        // lcp_city1.style.display = "block";
    }else if(ycount1%3+1 == 2){
        lcp_city2.innerHTML = search_diqu.value;
        ycount1 = ycount1+1;
        lcp_city2.style.backgroundColor = "#f2f2f2";
        // lcp_city2.style.display = "block";
    }else if(ycount1%3+1 == 3){
        lcp_city3.innerHTML = search_diqu.value;
        ycount1 = ycount1+1;
        lcp_city3.style.backgroundColor = "#f2f2f2";
        // lcp_city3.style.display = "block";
    }
    // console.log(ycount1);
    shousk(search_diqu.value);
    search_tanchuang.style.display = "none";
    body.style.overflow = "scroll";
    e.preventDefault();

});
// 删除历史记录
const lajt = document.getElementsByClassName("lajt")[0];

// console.log(lishi.innerHTML);
lajt.addEventListener('click',function(e){
    lishi.style.display = "none";
    lcp_city1.innerHTML = "";
    lcp_city1.style.backgroundColor = "#fff";
    lcp_city2.innerHTML = "";
    lcp_city2.style.backgroundColor = "#fff";
    lcp_city3.innerHTML = "";
    lcp_city3.style.backgroundColor = "#fff";
    ycount1 = 0;
});
// 推荐城市
let i;
for(i=0;i<15;i++){
    document.getElementsByClassName("acity")[i].addEventListener('click',function(e){
        
        shousk(this.innerHTML);
        search_tanchuang.style.display = "none";
        body.style.overflow = "scroll";
        lishi.style.display = "block";
            if(ycount1%3+1 == 1){
                lcp_city1.innerHTML = this.innerHTML;
                ycount1 = ycount1+1;
                lcp_city1.style.backgroundColor = "#f2f2f2";
            // lcp_city1.style.display = "block";
            }else if(ycount1%3+1 == 2){
                lcp_city2.innerHTML = this.innerHTML;
                ycount1 = ycount1+1;
                lcp_city2.style.backgroundColor = "#f2f2f2";
            // lcp_city2.style.display = "block";
            }else if(ycount1%3+1 == 3){
                lcp_city3.innerHTML = this.innerHTML;
                ycount1 = ycount1+1;
                lcp_city3.style.backgroundColor = "#f2f2f2";
            // lcp_city3.style.display = "block";
            }
        e.preventDefault();
    });
}
shousk("成都");
