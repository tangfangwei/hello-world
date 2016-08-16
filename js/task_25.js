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
//点击添加图标，添加子元素
function addNode(node){
    var addValue = prompt("请输入子节点的内容");
    if(addValue){
        var parentNode = node.parentNode;  //list节点
        var spanNode = parentNode.firstElementChild; //spanNode，修改其箭头标志
        var lastNode = parentNode.nextElementSibling; //ulNode
        var newNode = document.createElement("li");
        newNode.innerHTML = "<span></span>"+addValue+"<img src='../img/add.png' class='add'/><img src='../img/delete.png' class='delete'/>";
        if(lastNode == null || lastNode.nodeName.toLowerCase() != "ul"){
            console.log(lastNode);
            var ulNode = document.createElement("ul");
            ulNode.className = "show";
            ulNode.appendChild(newNode);
            parentNode.parentNode.insertBefore(ulNode,parentNode.nextElementSibling);
        }else if(lastNode.nodeName.toLowerCase() == "ul"){ //如果该listNode有ul子元素
            lastNode.appendChild(newNode);
            lastNode.className = "show";
        }
        spanNode.className = "arrowDown";
    }
}
//点击删除图标，删除子元素
function deleteNode(node){
    var listNode = node.parentNode; //待删除的list节点
    var ulNode = listNode.parentNode; //待删除的list的父节点，ul节点
    var ulNextNode = listNode.nextElementSibling; //待删除的list的下一个ul节点
    
    ulNode.removeChild(listNode);
    //如果该list节点有子节点，将其子ulNode删掉
    if(ulNextNode && ulNextNode.nodeName.toLowerCase() == "ul"){
        ulNode.removeChild(ulNextNode);
    }
    //如果该ul节点无子节点，隐藏其箭头图标
    if(ulNode.children.length === 0){
        var parentListNode = ulNode.previousElementSibling; //list父节点
        var parentUlNode = ulNode.parentNode; //ulNode的父节点
        //隐藏其箭头图标
        parentListNode.firstElementChild.className = "hide";
        //删除ulNode节点
        parentUlNode.removeChild(ulNode);
    }
}
//查找元素
function searchData(ulNode,data,findNode,findPath){
    if(ulNode && ulNode.nodeName.toLowerCase() == "ul"){ //遍历ul节点
        findPath.push(ulNode);
        for(var i=0;i<ulNode.children.length;i++){
            searchData(ulNode.children[i],data,findNode,findPath);
        }
    }else if(ulNode.nodeName.toLowerCase() == "li"){ //list节点
        if(ulNode.innerText == data){  //找到节点
            console.log(ulNode.innerText);
            ulNode.style.color = "red";
            findNode.push(ulNode);
            for(var i=1;i<findPath.length;i++){
                findPath[i].className = "show";
                var spanNode = findPath[i].previousElementSibling.firstElementChild;
                console.log(spanNode);
                if(spanNode.className == "arrowRight"){  //展开list的箭头，使其向下
                    spanNode.className = "arrowDown";
                }
            }
        }
    }
}
//清除查找
function resetData(findNode){
    for(var i=0;i<findNode.length;i++){
        findNode[i].style.color = "black";
    }
}
//鼠标点击，切换子元素显示或隐藏
function toggle(node){
    var ulNode = node.nextElementSibling; //ulNode
    var spanNode = node.firstElementChild; //spanNode
    if(ulNode && ulNode.nodeName.toLowerCase() == "ul"){
        if(ulNode.className == "show"){
            ulNode.className = "hide";
            spanNode.className = "arrowRight";
        }else{
            ulNode.className = "show";
            spanNode.className = "arrowDown";
        }
    }
}

//初始化箭头
function arrayInit(){
    var liNodes = document.getElementsByTagName("li");
    for(var i=0;i<liNodes.length;i++){
        var ulNode = liNodes[i].nextElementSibling; //ulNode
        if(ulNode && ulNode.nodeName.toLowerCase() == "ul"){  //该list后有ul元素
            var spanNode = liNodes[i].firstElementChild;
            if(ulNode.className == "show"){
                spanNode.className = "arrowDown";
            }else if(ulNode.className == "hide"){
                spanNode.className = "arrowRight";
            }
        }
    } 
}
function init(){
    arrayInit();  
    var findNode = [];  //搜索到的元素节点
    var findPath = [];  //搜索到的元素节点路径
    var nav = document.getElementById("nav");
    addHandler(nav,"click",function(e){   //选中事件
        toggle(e.target);
    });

    addHandler(nav,"click",function(e){   //添加事件
        if(e.target.nodeName.toLowerCase() == "img" && e.target.className == "add"){
            addNode(e.target);
        }
    });
    addHandler(nav,"click",function(e){   //添加事件
        if(e.target.nodeName.toLowerCase() == "img" && e.target.className == "delete"){
            deleteNode(e.target);
        }
    });
    var data = document.getElementById("data");
    var search = document.getElementById("search");
    var findResult = document.getElementById("findResult");
    addHandler(search,"click",function(e){   //搜索事件
        if(data.value.trim()){
            resetData(findNode);
            findNode = [];
            findPath = [];
            searchData(nav,data.value.trim(),findNode,findPath);
            findResult.innerText = "查询到"+findNode.length+"个符合条件的节点";
        }
    });
    var reset = document.getElementById("reset");
    addHandler(reset,"click",function(e){   //清除事件
        data.value = "";
        findResult.innerText = "";
        resetData(findNode);
        findNode = [];
        findPath = [];
    });
}

init();