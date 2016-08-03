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
var findData;
//深度优先遍历
function deepList(elem){
    // if(elem == null)return;
    // data.push(elem);
    // if(elem.firstElementChild){
    //     deepList(elem.firstElementChild);
    // }
    // var temp = elem.nextSibling;
    // while(temp && temp.nodeType != 1){
    //     temp = temp.nextSibling;
    // }
    // deepList(temp);
    if(elem){
        data.push(elem);
        for(var i = 0;i<elem.children.length;i++){
            deepList(elem.children[i]);
        }
    }
}

//广度优先遍历
function widthList(elem){
    var qeueu = [];
    qeueu.push(elem);
    data.push(elem);
    while(qeueu.length > 0){
        var tempElem = qeueu.shift();
        for(var i=0;i<tempElem.children.length;i++){
            qeueu.push(tempElem.children[i]);
            data.push(tempElem.children[i]);
        }
    }

}
//改变颜色
function changeColor(foundText){
    var i = 0;
    var delay=500,timer;
    if(data[i].firstChild.nodeValue.trim() == foundText){
        data[i].style.backgroundColor = "red";
        clearInterval(timer);
        return;
    }else{
        data[i].style.backgroundColor="blue";
    }
    // console.log(data.length);
    timer = setInterval(function(){
        i++;
        if(i < data.length){
            data[i-1].style.backgroundColor="white";
            if(data[i].firstChild.nodeValue.trim() == foundText){
                data[i].style.backgroundColor = "red";
                clearInterval(timer);
            }else           
                data[i].style.backgroundColor="blue";
        }else{
            clearInterval(timer);
            data[i-1].style.backgroundColor="white";
        }
    },delay);
}

//初始化样式
function reset(){
    data = []; //置空
    findData = null; //置空
    var divs = document.getElementsByTagName("div");
    for(var i =0;i<divs.length;i++){
        divs[i].style.backgroundColor = 'white';
    }
}
function init(){
    var width_list = document.getElementById("widthList");
    var deep_list = document.getElementById("deepList");
    var root = document.getElementById("super");
    var deep_search = document.getElementById("deepSearch");
    var width_search = document.getElementById("widthSearch");
    var findElem = document.getElementById("find");
    addHandler(width_list,"click",function(e){
        reset();
        widthList(root);
        changeColor();
    });
    addHandler(deep_list,"click",function(e){
        reset();
        deepList(root);
        changeColor();
    });
    addHandler(deep_search,"click",function(e){
        reset();
        deepList(root);
        changeColor(findElem.value.trim());
    });
    addHandler(width_search,"click",function(e){
        reset();
        widthList(root);
        changeColor(findElem.value.trim());
    });
}

init();