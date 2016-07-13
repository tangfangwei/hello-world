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

var data = [];
//前序遍历
function pre_list(elem){
    if(elem == null)return ;
    data.push(elem);
    if(elem.firstElementChild){
        pre_list(elem.firstElementChild);
    }
    if(elem.lastElementChild){
        pre_list(elem.lastElementChild);
    }
}
//中序遍历
function mid_list(elem){
    if(elem == null)return ;
    
    if(elem.firstElementChild){
        mid_list(elem.firstElementChild);
    }
    data.push(elem);
    if(elem.lastElementChild){
        mid_list(elem.lastElementChild);
    }
}
//后序遍历
function last_list(elem){
    if(elem == null)return ;
    if(elem.firstElementChild){
        last_list(elem.firstElementChild);
    }
    if(elem.lastElementChild){
        last_list(elem.lastElementChild);
    }
    data.push(elem);
}
//改变节点颜色
function changeColor(){
    var i = 0;
    var delay = 500,timer;
    data[i].style.backgroundColor = "blue";
    timer = setInterval(function(){
        i++;
        if(i < data.length){
            data[i-1].style.backgroundColor="white";
            data[i].style.backgroundColor = "blue";
        }else{
            clearInterval(timer);
            data[i-1].style.backgroundColor = "white";
        }                  
    },delay);
}
//初始化样式
function reset(){
    data = []; //置空
    var divs = document.getElementsByTagName("div");
    for(var i =0;i<divs.length;i++){
        divs[i].style.backgroundColor = 'white';
    }
}
function init(){
    var pre = document.getElementById("pre");
    var root =document.getElementById("flex_container");
    var mid = document.getElementById("mid");
    var last = document.getElementById("last");
    addHandler(pre,"click",function(e){
        reset();
        pre_list(root);
        changeColor();
    });
    addHandler(mid,"click",function(e){
        reset();
        mid_list(root);
        changeColor();
    });
    addHandler(last,"click",function(e){
        reset();
        last_list(root);
        changeColor();
    });
}

init();