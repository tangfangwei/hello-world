/**
 * add handler to element
 */
function addHandler(element, type, handler) {
    if(element.addEventListener) {
        addHandler = function(element, type, handler) {
            element.addEventListener(type, handler, false);
        };
    } else if (element.attachEvent) {
        addHandler = function(element, type, handler) {
            element.attachEvent("on"+type, handler);
        };
    } else {
        addHandler = function(element, type, handler) {
            element["on"+type] = handler;
        };
    }
    return addHandler(element, type, handler);
};
var ul = document.getElementById("ul");

//校验队列是否已满
function isFull(){
    return ul.childNodes.length === 60;
}
//校验输入
function judgeInput(num){
    var pattern = /^\d+$/;
    if(!pattern.test(num)){
        alert("输入只能为数字");
        return false;
    }
    if(num<10 || num>100){
        alert("数字范围10-100");
        return false;
    }
    if(isFull()){
        alert("队列已满");
        return false;
    }
    return true;
}


function leftInData(){
    var num = document.getElementById("numInput").value;
    if(judgeInput(num)){
        var li = document.createElement('li');
        li.style.height = num+"px";
        if(ul.childNodes.length == 0){
            ul.appendChild(li);
        }else{
            ul.insertBefore(li,ul.childNodes[0]);
        }
    }
}

function rightInData(){
    var num = document.getElementById("numInput").value;
    if(judgeInput(num)){
        var li = document.createElement('li');
        li.style.height = num+"px";
        ul.appendChild(li);
    }
}

function leftOutData(){
    if(ul.childNodes.length === 0){
        alert("没有数据可删除");
        return false;
    }
    ul.removeChild(ul.firstChild);
}

function rightOutData(){
    if(ul.childNodes.length === 0){
        alert("没有数据可删除");
        return false;
    }
    ul.removeChild(ul.lastChild);
}

function removeData(li){
    ul.removeChild(li);
}

function swap(ele1,ele2){
    var temp = ele1.offsetHeight;
    ele1.offsetHeight = ele2.offsetHeight;
    ele1.style.height = ele2.offsetHeight+"px";
    ele2.offsetHeight = temp;
    ele2.style.height = temp+"px";
}

function randomData(){
    var input =document.getElementById("numInput");
    var leftIn = document.getElementById("leftIn");
    ul.innerHTML = "";
    for(var i =0;i<60;i++){
        var data = parseInt(Math.random()*90)+10;
        input.value = data;
        leftIn.click();
    }
}

function bubbleSort(){
    var lis = ul.querySelectorAll("li");
    var len = lis.length, i,j=0,delay=50,timer;
    i = len -1;

    timer = setInterval(function(){
        if(i < 1){  //所有排序完成
            clearInterval(timer);
        }
        if(j === i){  //一趟排序完成
            j=0;
            i--;
        }
        if(lis[j].offsetHeight > lis[j+1].offsetHeight)swap(lis[j],lis[j+1]);  //最大的冒泡出去，即交换相邻位置
        j++;
    },delay);
}

function selectSort(){
    var lis = ul.querySelectorAll("li");
    var len = lis.length, i,j=0,delay=50,timer,maxIndex;
    i = len -1;
    maxIndex = i; //初始默认最大的为最后一个元素

    timer = setInterval(function(){
        if(i < 1){ //所有排序完成
            clearInterval(timer);
        }
        if(j === i){  //一趟排序完成
            if(maxIndex !== i){ //有变化
                swap(lis[i],lis[maxIndex]);
            }
            j = 0;
            i--;
            maxIndex = i;
        }
        if(lis[j].offsetHeight > lis[maxIndex].offsetHeight)maxIndex = j; //选出最大的元素
        j++;
    },delay);
}
function insertEle(index1,index2){
    var lis = ul.querySelectorAll("li");
    var temp = lis[index1].offsetHeight;
    for(var k=index1;k>index2;k--){
        lis[k].offsetHeight = lis[k-1].offsetHeight;
        lis[k].style.height = lis[k-1].offsetHeight+"px";
    }
    lis[index2].offsetHeight = temp;
    lis[index2].style.height = temp+"px";
}

function insertSort(){
    var lis = ul.querySelectorAll("li");
    var len = lis.length, i,j=0,delay=50,timer;
    i = 1;

    timer = setInterval(function(){
        if(i === len-1){ //所有排序完成
            clearInterval(timer);
        }
        var k =0;
        while(k<i && lis[k].offsetHeight < lis[i].offsetHeight) k++; //找到插入位置
        if(k !== i){ //插入元素
            insertEle(i,k); //将lis[i]插到lis[k]前面
            console.log(i+"insertEle"+k);
        }
        i++;  //继续往后走
    },delay);
}

function init(){

    var leftIn = document.getElementById("leftIn");
    addHandler(leftIn,"click",leftInData);
    var rightIn = document.getElementById("rightIn");
    addHandler(rightIn,"click",rightInData);
    var leftOut = document.getElementById("leftOut");
    addHandler(leftOut,"click",leftOutData);
    var rightOut = document.getElementById("rightOut");
    addHandler(rightOut,"click",rightOutData);

    addHandler(ul,"click",function(event){
        if(event.target.nodeName.toLowerCase() === "li"){
            removeData(event.target);
        }
    });
    randomData();
    var bubble_sort = document.getElementById("bubbleSort");
    addHandler(bubble_sort,"click",bubbleSort);
    var select_sort = document.getElementById("selectSort");
    addHandler(select_sort,"click",selectSort);
    var insert_sort = document.getElementById("insertSort");
    addHandler(insert_sort,"click",insertSort);
}

init();