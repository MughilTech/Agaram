var mousex;
var mousey;

function loadjsfile(filename, filetype){
 if (filetype=="js"){ 
  var fileref=document.createElement('script');
  fileref.setAttribute("type","text/javascript");
  fileref.setAttribute("src", filename);
 }
}

 String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

var f=function(){
chrome.extension.sendRequest({greeting: 'getLocalStorage' }, function(response)
{
if(response == 'true'){
var word = window.getSelection().toString().trim();
if(word != '')
{
var curMouseX = mousex;
var curMouseY = mousey;
chrome.extension.sendRequest({greeting: word }, function(response) {


var divContainer=document.createElement('div');
document.body.appendChild(divContainer);
divContainer.style.top = curMouseY+'px';
divContainer.style.left = curMouseX+'px';
divContainer.id = 'agaramtooltip';
divContainer.onclick = handleDivClick;
divContainer.addEventListener('dblclick',handleDivClick,true);
if(response == '')
{
response ='Not found'+ '<br><a href=\'http://www.google.co.in/#hl=en&q='+ word +'\' target="_new">Google "'+ word +'">></a>';
}
divContainer.innerHTML = '<div style="float:Right"><img id="disable" title="Turn Off" style="height:13px;width:13px;cursor:pointer;margin-Right:3px"><img id="closeButton" title="Close" style="height:13px;width:13px;cursor:pointer"></div>'+	response ;
document.getElementById('closeButton').src = chrome.extension.getURL("close.jpg");						
document.getElementById('disable').src = chrome.extension.getURL("disable.jpg");						
document.getElementById('closeButton').onclick = removeDictionary;
document.getElementById('disable').onclick = setLocalStorageDClick;
document.body.removeEventListener('dblclick', f ,true);
});
}
}

});
}


function getMouseCoordinates(event)
{ 
ev = event || window.event;
mousex = parseInt(ev.pageX) + 20 ;
mousey = parseInt(ev.pageY) + 10;	

}

function setLocalStorageDClick()
{
chrome.extension.sendRequest({greeting: 'setLocalStorage'}, function(response){
removeDictionary();
alert('Agaram Dictionary -\nDouble Click Tooltip is disabled. To enable, configure in \'Extension option\' popup.');
});

}

function removeDictionary()
{
	var tooltip = document.getElementById('agaramtooltip');
	if(tooltip != null)
	document.body.removeChild(tooltip);	
	document.body.addEventListener('dblclick',f,true);
}


function handleDivClick(e)
{
	e.stopPropagation();
}

function handelKeyPress(e)
{
	if(e.keyCode == 27)
	{
	 removeDictionary();
	
	}
}


loadjsfile('GetMeaningEnTa.js','js');

document.onmousemove=getMouseCoordinates;
document.onkeydown = handelKeyPress;

document.body.onclick = removeDictionary;

document.body.addEventListener('dblclick',f,true);


