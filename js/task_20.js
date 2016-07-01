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

var arrData = [];

function insertElem(){
    var reg1 = /[^0-9a-zA-Z\u4e00-\u9fa5]+/;
    var textValue = document.getElementById("textarea").value.trim();
    var arrword = textValue.split(reg1).filter(function(e){
        if(e!=null && e.length > 0){
            return true;
        }else{
            return false;
        }
    });
    arrData = arrData.concat(arrword);
    render();
}

function render(data){
    var result = document.getElementById("result");

    var innerHTML = arrData.map(function(word){
        if(data != null && data.length > 0){
            word = word.replace(new RegExp(data,"g"),"<span>"+data+"</span>");
            console.log(word);
        }
        return "<div>"+word+"</div>";
    }).join(" ");

    result.innerHTML = innerHTML;
}

function searchElem(){
    var data = document.getElementById("search_data").value.trim();
    render(data);
}

function init(){
    var search = document.getElementById("search");
    addHandler(search,"click",searchElem);

    var insert = document.getElementById("insert");
    addHandler(insert,"click",insertElem);

}
init();