/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

var colors = ['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95',
              '#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8'];

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}
function getHintLfeft(posObj,i){
  if(posObj.left*i + posObj.offsetLeft+posObj.width/2-60 <= 0){
    return 5;
  }else if(posObj.left*i+posObj.offsetLeft+posObj.width/2+60 >= 1200){
    return (posObj.left*i+posObj.offsetLeft+posObj.width/2-110);
  }else{
    return (posObj.left*i+posObj.offsetLeft+posObj.width/2-60);
  }
}

function getTitle() {
    switch (pageState.nowGraTime) {
        case "day":
            return "每日";
        case "week":
            return "周平均";
        case "month":
            return "月平均";
    }
}
/*
  addEventHandler方法
  跨浏览器实现事件绑定
*/
function addEventHandler(ele,event,handler){
  if(ele.addEventListener){
    ele.addEventListener(event,handler,false);
  }else if(ele.attachEvent){
    ele.attachEvent("on"+event,handler);
  }else{
    ele["on"+event] = handler;
  }

}
/*
*计算柱状图的宽度和偏移量等
*/
function getWidth(width,len){
  var posObj = {};
  posObj.width = Math.floor(width/(len*2)); //柱形条宽度
  posObj.left = Math.floor(width/len);
  posObj.offsetLeft = (width - posObj.left * (len - 1) - posObj.width) / 2;
  console.log("width"+posObj.width+"left"+posObj.left+"offsetLeft"+posObj.offsetLeft);
  return posObj;
}

/**
 * 渲染图表
 */
function renderChart() {
  var innerHTML="";
  var i = 0;
  var wrapper = document.getElementById("aqi-chart-wrap");
  var width = wrapper.clientWidth;
  // console.log(width);
  var selectedData = chartData[pageState.nowGraTime][pageState.nowSelectCity];
  var len = Object.keys(selectedData).length;
  var posObj = getWidth(width,len);
  innerHTML = "<div class='title'>"+pageState.nowSelectCity+"市01-03月"+getTitle()+"空气质量报告</div>";
  for(var key in selectedData){
    // console.log("left:"+(posObj.left*i+posObj.offsetLeft));
    innerHTML += "<div class='aqi-bar' style='height:"+selectedData[key]+"px;width:"+posObj.width+"px;left:"+(posObj.left*i+posObj.offsetLeft)+"px;background-color:"+colors[Math.floor(Math.random()*11)]+"'></div>";
    innerHTML += "<div class='aqi-hint' style='bottom:"+(selectedData[key]+10)+"px;left:"+getHintLfeft(posObj,i++)+"px'>"+key+"<br/>[AQI]:"+selectedData[key]+"</div>";
  }
  wrapper.innerHTML = innerHTML;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(radio) {
  // 确定是否选项发生了变化 
 
  var value = radio.value;
  var item = radio.previousElementSibling;
  var items = document.getElementsByTagName("span");
  for(var i=0;i<items.length;i++){
    items[i].className = "";
  }
  item.className = "selected";
  if(value != pageState.nowGraTime){
    // 设置对应数据
    pageState.nowGraTime = value;
    // 调用图表渲染函数
    renderChart();
  }
  

  
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var city = this.value;
  console.log(city);
  if(city != pageState.nowSelectCity){
    // 设置对应数据
    pageState.nowSelectCity = city;
    // 调用图表渲染函数
    renderChart();
  }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var radio = document.getElementsByName('gra-time');
  console.log(radio.length);
  for(var i=0;i<radio.length;i++){
    (function(j){
      addEventHandler(radio[j],'click',function(){
        graTimeChange(radio[j]);
      });
    })(i);

  }
  addEventHandler(document,"mouseover",function(event){
    var item = event.target;
    item.className += " show"; 
  });
  addEventHandler(document,"mouseout",function(event){
    var item = event.target;
    item.className = item.className.replace(/show/,"");
  });
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var cityOption = document.getElementById("city-select");
  var citys = Object.keys(aqiSourceData);
  var htmlAttr = citys.map(function(x){
    return "<option>"+x+"</option>";
  });
  pageState.nowSelectCity = citys[0];
  cityOption.innerHTML = htmlAttr.join("");
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  addEventHandler(cityOption,'change',citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var week={},count=0,singleWeek={},month={},mcount=0,singleMonth={};
  // console.log(aqiSourceData);
  for(var key in aqiSourceData){
    var tempCity = aqiSourceData[key];
    var keyAttr = Object.keys(tempCity);
    // console.log(keyAttr);
    var tempMonth = keyAttr[0].slice(5,7);
    var weekInit =4,weekCount=0;
    
    for(var i=0;i<keyAttr.length;i++,weekInit++){
      count += tempCity[keyAttr[i]];
      mcount += tempCity[keyAttr[i]];
      weekCount++;
      if((weekInit+1)%7==0||i==keyAttr.length-1 ||keyAttr[i+1].slice(5,7)!==tempMonth){
        // console.log(keyAttr[i]);
        var tempKey = keyAttr[i].slice(0,7)+"月第"+(Math.floor(weekInit/7)+1)+"周"; //x轴
        singleWeek[tempKey] = Math.floor(count/weekCount); //y轴

        if(i==keyAttr.length-1 || keyAttr[i+1].slice(5,7)!==tempMonth){
          weekInit = weekCount%7;
        }
        count = 0;
        weekCount = 0;

        //每个月
        if(i==keyAttr.length-1 || keyAttr[i+1].slice(5,7)!==tempMonth){
          tempMonth = (i==keyAttr.length-1)?tempMonth:keyAttr[i+1].slice(5,7);
          var tempKey = keyAttr[i].slice(0,7); //x轴为时间
          var tempDays = keyAttr[i].slice(-2);
          singleMonth[tempKey] = Math.floor(mcount/tempDays);
          mcount=0;
        }
      }
    }
    week[key] = singleWeek;
    month[key] = singleMonth;
    singleWeek={};
    singleMonth={}; 
  }
  chartData.day = aqiSourceData;
  chartData.week = week;
  chartData.month = month;
  renderChart(); //画图
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();