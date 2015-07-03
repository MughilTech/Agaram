String.prototype.trim = function ()
{
	return this.replace(/^\s*/, "").replace(/\s*$/, "");
}



// function onLoad()
// {
// 	var googleLanguageCodeJson = {
// 		"bn" 	: google.elements.transliteration.LanguageCode.BENGALI,
// 		"gu"	: google.elements.transliteration.LanguageCode.GUJARATI,
// 		"hi"	: google.elements.transliteration.LanguageCode.HINDI,
// 		"kn"	: google.elements.transliteration.LanguageCode.KANNADA,
// 		"ml"	: google.elements.transliteration.LanguageCode.MALAYALAM,
// 		"mr" 	: google.elements.transliteration.LanguageCode.MARATHI,
// 		"ta"   	: google.elements.transliteration.LanguageCode.TAMIL,
// 		"te"  	: google.elements.transliteration.LanguageCode.TELUGU
// 	};

// 	var prefLanguage = GetPreferredLanguage();
// 	var options = {
// 		sourceLanguage:
// 		google.elements.transliteration.LanguageCode.ENGLISH,
// 		destinationLanguage:
// 		[googleLanguageCodeJson[prefLanguage]],
// 		shortcutKey: 'ctrl+g',

// 	};

// 	var control =
// 	new google.elements.transliteration.TransliterationControl(options);

// 	control.makeTransliteratable(["dicWord"]);
// }

// google.load("elements", "1", {
// 		packages: "transliteration", callback: onLoad
// 	});




function getMeaning()
{
	var srcWord =  '';
	if(document.getElementById('dicWord').value.toString().trim() != '')
	{
		srcWord = document.getElementById('dicWord').value.toString().trim();
	}

	var meaningRes = GetMeaningHTML(srcWord,GetPreferredLanguage());
	if(meaningRes.trim() != '')
		document.getElementById('dicResult').innerHTML = '<br>' + meaningRes;
	else if(srcWord != '' )
		document.getElementById('dicResult').innerHTML = 'Not found'+ '<br><a href=\'http://www.google.co.in/#hl=en&q='+ srcWord +'\' target="_new">Google "'+ srcWord +'">></a>';

}


function GetPreferredLanguage()
{
	var prefLanguage = localStorage["prefLanguage"];
	if(prefLanguage == undefined)
		prefLanguage = 'ta';
	return prefLanguage;

}

function keyUp(e)
{
	if(e.keyCode == 13)
	{
		getMeaning();
		e.stopPropagation();
	}
	else{
		var bgClr = document.getElementById('dicWord').style.backgroundColor;
		if(e.ctrlKey  && e.keyCode == 71 && (bgClr == '' || bgClr == 'white'))
			document.getElementById('dicWord').style.backgroundColor = '#FFF380';
		else if(e.ctrlKey  && e.keyCode == 71 && bgClr == 'rgb(255, 243, 128)')
			document.getElementById('dicWord').style.backgroundColor = '';
	}
}

function GetLanguageText()
{
	var langaugeNameJson =
	{
		"bn" 	: "Bengali",
		"gu"	: "Gujarati",
		"hi"	: "Hindi",
		"kn"	: "Kananda",
		"ta"   	: "Tamil",
		"te"  	: "Telugu",
		"en"	: "English",
		"ur"	: "Urdu"
	};

	var prefLang = langaugeNameJson[GetPreferredLanguage()];
	document.getElementById('inputText').innerHTML =  'Enter Word'
	document.getElementById('dicResult').innerHTML = 'Tip: For ease of use, Just double click on any English/'+ prefLang +' word in the browser to view the meaning.' ;
}



function init()
{
	GetLanguageText();
	document.getElementById("dicWord").addEventListener("keyup", keyUp);
}

document.addEventListener('DOMContentLoaded', init);
