var defaultLanguage = "ta";

function loadOptions()
{
	var lang = localStorage["prefLanguage"];
	if (lang == undefined)
	{
		lang = defaultLanguage;
	}
	var select = document.getElementById("pref-language");
	for (var i = 0; i < select.children.length; i++)
	{
			var child = select.children[i];
			if (child.value == lang) {
			child.selected = "true";
			break;
		}
	}

	var dclick = localStorage["DClick"];
	if( dclick == undefined )
	{
		dclick= '0';
	}
	document.getElementById('dclick').value = dclick;
	setDClick(dclick);
}

function saveOption(e) {
  var select = document.getElementById("pref-language");
  var color = select.children[select.selectedIndex].value;
  localStorage["prefLanguage"] = color;
}

function setDClick(value)
{
  localStorage["DClick"] = value;
  if(value == '0')
  {
   document.getElementById("dclickText").innerHTML = '<b>Enabled</b>';
  }
  else
  {
     document.getElementById("dclickText").innerHTML = '<b>Disabled</b>';
  }
}

function setEventDclick(e){
	setDClick(e.target.value)
}

function init(){
	loadOptions();
	document.getElementById("pref-language").addEventListener("change", saveOption);
	document.getElementById("dclick").addEventListener("change", setEventDclick);
}

document.addEventListener('DOMContentLoaded', init);
