/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var cityInput = document.getElementById("aqi-city-input").value;
	cityInput = cityInput.trim();
	var pattern = /^[a-zA-X\u4E00-\u9FA5]+$/;
	if(!pattern.test(cityInput)){
		alert("城市必须为中文或英文字符");
		return false;
	};
	var aqiValueInput = document.getElementById("aqi-value-input").value;
	aqiValueInput = aqiValueInput.trim();
	pattern = /^\d+$/;
	if(!pattern.test(aqiValueInput)){
		alert("空气质量必须为数字");
		return false;
	}
	aqiData[cityInput] = aqiValueInput;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var items = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	for(var city in aqiData){
		//items +="<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button data-city='"+city+"'>删除</button></td></tr>";
		items +="<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button>删除</button></td></tr>";
	}
	// console.log(items);
	document.getElementById("aqi-table").innerHTML = city?items:"";
}	

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
  // console.log("delBtnHandle"+city);
  delete aqiData[city];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var addButton = document.getElementById("add-btn");
  addButton.onclick = addBtnHandle;
  
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var aqiTable = document.getElementById("aqi-table");
  aqiTable.addEventListener("click",function(event){
  	if(event.target.nodeName.toLowerCase() === "button"){
  		console.log(event.target.dataset);
  		delBtnHandle.call(null,event.target.dataset.city);
  	}
  });

}

init();
