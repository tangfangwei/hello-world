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


function langWrite(lang){
	// console.log(lang);
	var langData = document.getElementById("lang_output");
	if(lang.length > 0 ){
		for(var i=0;i<langData.childNodes.length;i++){
			if(langData.childNodes[i].textContent === lang)return;
		}
		var elem = document.createElement("span");
		elem.textContent = lang;
		if(langData.childNodes.length < 10){
			langData.appendChild(elem);
		}else{
			langData.removeChild(langData.childNodes[0]);
			langData.appendChild(elem);
		}
	}
}
function changeTag(elem){
	// console.log(elem);
	elem.textContent = "删除"+elem.textContent;
	elem.style.backgroundColor= "red";
}
function deleteTag(elem){
	var langData = document.getElementById("lang_output");
	langData.removeChild(elem);
}

function addInterest(){
	var textareaValue = document.getElementById("interest").value.trim();
	var interestOutput = document.getElementById("insterest_output");
	var interests = textareaValue.split(/,|，|、|\s|\n|\r|\t/);
	for(var i=0;i<interests.length;i++){
		for(var j=0;j<interestOutput.childNodes.length;j++){
			if(interestOutput.childNodes[j].textContent === interests[i])return;
		}
		var elem = document.createElement("span");
		elem.textContent = interests[i];
		if(interestOutput.childNodes.length < 10){
			interestOutput.appendChild(elem);
		}else{
			interestOutput.removeChild(interestOutput.childNodes[0]);
			interestOutput.appendChild(elem);
		}
	}
}

function init(){
	var lang = document.getElementById("lang");
	addHandler(lang,"keyup",function(e){
		// console.log(e.keyCode+"---"+lang.value.slice(0,-1));
		if(e.which === 13 || e.which === 32 || e.which===188){ //为回车，空格，逗号时
			langWrite(lang.value.slice(0,-1));
			lang.value = "";
		}
	});

	var langData = document.getElementById("lang_output");   
	addHandler(langData,"mouseover",function(e){
		// console.log(e.target.nodeName);
		if(e.target.nodeName.toLowerCase() === "span"){
			changeTag(e.target);
		}
	});
	addHandler(langData,"mouseout",function(e){
		// console.log(e.target.nodeName);
		if(e.target.nodeName.toLowerCase() === "span"){
			e.target.textContent = e.target.textContent.replace(/删除/,"");
			e.target.style.backgroundColor= "#88C7FD";
		}
	});
	addHandler(langData,"click",function(e){
		if(e.target.nodeName.toLowerCase() === "span"){
			deleteTag(e.target);
		}
	});

	var conform = document.getElementById("conform");
	addHandler(conform,"click",addInterest);

	var interestOutput = document.getElementById("insterest_output");
	addHandler(interestOutput,"mouseover",function(e){
		if(e.target.nodeName.toLowerCase() === "span"){
			changeTag(e.target);
		}
	});

	addHandler(interestOutput,"mouseout",function(e){
		if(e.target.nodeName.toLowerCase() === "span"){
			e.target.textContent = e.target.textContent.replace(/删除/,"");
			e.target.style.backgroundColor= "#88C7FD";
		}
	});
	addHandler(interestOutput,"click",function(e){
		if(e.target.nodeName.toLowerCase() === "span"){
			interestOutput.removeChild(e.target);
		}
	});

}

init();