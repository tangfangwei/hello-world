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
//深度优先遍历节点
function deepList(node,nodeList){
    if(node){
        nodeList.push(node);
        for(var i=0;i<node.children.length;i++){
            deepList(node.children[i],nodeList);
        }
    }
}
//删除选中的节点
function deleteNode(node){
    if(node){
        var parentNode = node.parentNode;
        parentNode.removeChild(node);
    }else
        alert("没有选中元素");
}
//增加子节点
function addNode(node,newText){
    if(node){
        var newNode = document.createElement('div');
        newNode.innerHTML=newText;
        newNode.className="flex";
        node.appendChild(newNode);
    }else
        alert("没有选中元素");
}
//选中节点元素元素
function selectNode(node){
    if(node){
        node.style.backgroundColor = "#FEF9D1";
    }
}
//改变颜色
function changeColor(nodeList,foundText){
    var i = 0;
    var delay=500,timer;
    if(nodeList[i].firstChild.nodeValue.trim() == foundText){
        nodeList[i].style.backgroundColor = "red";
        clearInterval(timer);
        return;
    }else{
        nodeList[i].style.backgroundColor="blue";
    }
    timer = setInterval(function(){
        i++;
        if(i < nodeList.length){
            nodeList[i-1].style.backgroundColor="white";
            if(nodeList[i].firstChild.nodeValue.trim() == foundText){
                nodeList[i].style.backgroundColor = "red";
                clearInterval(timer);
            }else           
                nodeList[i].style.backgroundColor="blue";
        }else{
            clearInterval(timer);
            nodeList[i-1].style.backgroundColor="white";
            alert("没有查找到元素");
        }
    },delay);
}
//深度优先遍历，清空颜色
function resetList(node,nodeList){
    nodeList = [];
    deepList(node,nodeList);
    for(var i=0;i<nodeList.length;i++){
        nodeList[i].style.backgroundColor = "white";
    }
    return nodeList;
}
function init(){
    var nodeList = [];
    var select_node;
    var deleteTag = document.getElementById("delete");
    var superTag = document.getElementById("super");
    var addInput = document.getElementById("add");
    var addButton = document.getElementById("addButton");
    var deepButton = document.getElementById("deepButton");
    var searchData = document.getElementById("searchData");
    var searchButton = document.getElementById("search");
    addHandler(superTag,"click",function(e){   //选中事件
        resetList(superTag,nodeList);
        select_node = e.target;
        selectNode(select_node);
    });
    addHandler(deleteTag,"click",function(e){
        deleteNode(select_node); //删除选中的节点
    });
    addHandler(addButton,"click",function(e){
        addNode(select_node,addInput.value.trim()); //删除选中的节点
    });
    addHandler(deepButton,"click",function(e){
        nodeList = resetList(superTag,nodeList);
        changeColor(nodeList);
    });
    addHandler(searchButton,"click",function(e){
        nodeList = resetList(superTag,nodeList);
        changeColor(nodeList,searchData.value.trim());
    });
}
init();