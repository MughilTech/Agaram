var meaningHTML= '';

function GetMeaningHTML(word,language)
{
meaningHTML = '';

var tamilXhr= new XMLHttpRequest();
var isTamil = true;
    var tamilDictionaryService='http://translate.google.com/translate_a/t?client=p&text='+ word +'&sl=auto&tl='+language;
    tamilXhr.open("GET",tamilDictionaryService,false);
    tamilXhr.onreadystatechange= function()
	{
		tamilXhrResponse = JSON.parse(tamilXhr.response)
		if(tamilXhr.readyState==4 && tamilXhrResponse.sentences[0].trans != word )
		{
			isTamil = false;

			loadResult(tamilXhr,word, true,language	);
		}
	};
    tamilXhr.send();


var englishXhr= new XMLHttpRequest();
    var englishDictionaryService='http://www.google.com/dictionary/json?callback=dict_api.callbacks.id100&q='+word+'&sl=en&tl=en';
    englishXhr.open("GET",englishDictionaryService,false);
    englishXhr.onreadystatechange= function()
	{
		if(englishXhr.readyState==4)
		{
			loadResult(englishXhr,word,false,"en" );
		}
	};
    englishXhr.send();

if(isTamil)
{
    var tamilXhr= new XMLHttpRequest();
    var tamilDictionaryService='http://translate.google.com/translate_a/t?client=p&text='+ word +'&sl=auto&tl=en';
    tamilXhr.open("GET",tamilDictionaryService,false);
    tamilXhr.onreadystatechange= function()
	{
		tamilXhrResponse = JSON.parse(tamilXhr.response)
		if(tamilXhr.readyState==4 && tamilXhrResponse.sentences[0].trans != word )
		{

			loadResult(tamilXhr,word, true, "en");
		}
	};
    tamilXhr.send();
}
	return meaningHTML;
}



function loadResult(xhr,word, isTranslate, targetLan)
{
		var responseJson = xhr.responseText;

		responseJson=responseJson.replace("dict_api.callbacks.id100(","").replace(",200,null)","").replace(/\\x/g,"\\u00");
		var dicWords=JSON.parse(responseJson);
		var langaugeNameJson =
					{
					"bn" 	: "Bengali",
					"gu"	: "Gujarati",
					"hi"	: "Hindi",
					"kn"	: "Kananda",
					"ta"   	: "Tamil",
					"te"  	: "Telugu",
					"en"	: "English",
					"ur"	: "Urdu",
					};

		var link = '<b>'+langaugeNameJson[targetLan]+':</b>';

		var finalResult = '<ul>';
		if(!isTranslate)
		{
			var dicWordEntries=dicWords.primaries[0].entries;
			var length = dicWordEntries.length
			var counter = 0;
			for(var i = 0; i < length ; i++)
			{
			 if(dicWordEntries[i].type == 'meaning')
			   {
			    counter = counter+1;
				finalResult = finalResult + '<li>' + dicWordEntries[i].terms[0].text + '</li>';
				if(counter == 2){
				break;}
			   }
			}
		}
		else
			finalResult =  '<li>' + dicWords.sentences[0].trans + '</li>';
		finalResult = finalResult + '</ul>';
		var separator = '';
		if(meaningHTML != '')
		 separator = '<br>';
		meaningHTML = meaningHTML + separator + link  + finalResult;
}
