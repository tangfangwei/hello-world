//所有数据
var data = [];
//校验输入
function judgeInput(num){
	var pattern = /^\d+$/;
	if(!pattern.test(num)){
		alert("输入只能为数字");
		return false;
	}
	return true;
}
//写网页数据
function writeData(){
	var numWrite = document.getElementById("num_write");
	var innerHTML="";
	for(var i=0;i<data.length;i++){
		innerHTML += "<span id='"+i+"' class='num'> "+data[i]+" </span>";
	}
	numWrite.innerHTML = innerHTML;
}
//左侧写入数据
function leftInput(){
	var numInput = document.getElementById("num_input").value;
	//校验输入
	if(!judgeInput(numInput)){
		return;
	}
	var numWrite = document.getElementById("num_write");
	data.unshift(numInput);
	writeData();
}
//右侧写入数据
function rightInput(){
	var numInput = document.getElementById("num_input").value;
	//校验输入
	if(!judgeInput(numInput)){
		return;
	}
	data.push(numInput);
	writeData();
}
//左侧删除数据
function leftOutput(){
	data.shift();
	writeData();
}
//右侧删除数据
function rightOutput(){
	data.pop();
	writeData();
}
//删除指定的数据
function numDelete(numIndex){
	if(numIndex > -1){
		data.splice(numIndex,1);
	}
	writeData();
}
/*
 *跨浏览器绑定事件
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
//主函数
function init(){
	var left_input = document.getElementById("left_input");
	addEventHandler(left_input,"click",leftInput);
	var right_input = document.getElementById("right_input");
	addEventHandler(right_input,"click",rightInput);

	var left_output = document.getElementById("left_output");
	addEventHandler(left_output,"click",leftOutput);
	var right_output = document.getElementById("right_output");
	addEventHandler(right_output,"click",rightOutput);
	var num_write = document.getElementById("num_write");
	addEventHandler(num_write,"click",function(event){
		if(event.target.nodeName.toLowerCase() === "span"){
			var numIndex = parseInt(event.target.id);
			numDelete(numIndex);
			console.log(event.target.id);
		}
	});
}

init();