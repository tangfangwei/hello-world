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
	var aqiTable = document.getElementById("aqi-table");
	aqiTable.innerHTML = "";

	var tdDel = document.createElement("td");
	var tdButton = document.createElement("button");
	var trNode = document.createElement("tr");

	var tdNodePro = document.createElement("td");
	var tdNodeValue = document.createElement("td");
	tdNodePro.innerText = "城市";
	tdNodeValue.innerText = "空气质量";
	tdDel.innerText = "操作";
	trNode.appendChild(tdNodePro);
	trNode.appendChild(tdNodeValue);
	trNode.appendChild(tdDel);
	aqiTable.appendChild(trNode);

	for(var pro in aqiData){
		trNode = document.createElement("tr");
		tdNodePro = document.createElement("td");
		tdNodeValue = document.createElement("td");
		tdDel = document.createElement("td");
		tdButton = document.createElement("button");

		tdNodePro.innerText = pro;
		tdNodeValue.innerText = aqiData[pro];
		tdButton.innerText = "删除";
		tdDel.appendChild(tdButton);

		trNode.appendChild(tdNodePro);
		trNode.appendChild(tdNodeValue);
		trNode.appendChild(tdDel);
		aqiTable.appendChild(trNode);	
	}
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
  console.log("delBtnHandle"+city);
  delete aqiData[city];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var addButton = document.getElementById("add-btn");
  addButton.onclick = addBtnHandle;

  var aqiTable = document.getElementById("aqi-table");
  aqiTable.onclick = function(){
  	if(event.target.tagName.toLowerCase() === "button"){
  		var cityNode = event.target.parentElement.parentElement;
  		delBtnHandle(cityNode.children[0].innerText);
  	}
  };
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();
