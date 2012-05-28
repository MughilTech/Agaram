var meaningHTML= '';

function GetMeaningHTML(word,language)
{
meaningHTML = '';

var tamilXhr= new XMLHttpRequest();
var isTamil = true;
    var tamilDictionaryService='http://translate.google.com/translate_a/t?client=t&text='+ word +'&sl=auto&tl='+language;
    tamilXhr.open("GET",tamilDictionaryService,false);
    tamilXhr.onreadystatechange= function()
	{
		if(tamilXhr.readyState==4 && eval('('+tamilXhr.responseText+')')[0][0][0] != word )
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
    var tamilDictionaryService='http://translate.google.com/translate_a/t?client=t&text='+ word +'&sl=auto&tl=en';
    tamilXhr.open("GET",tamilDictionaryService,false);
    tamilXhr.onreadystatechange= function()
	{
		if(tamilXhr.readyState==4 && eval(tamilXhr.responseText)[0][0] != word )
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
	
		responseJson=responseJson.replace("dict_api.callbacks.id100(","");
		responseJson=responseJson.replace(",200,null)","");
		var dicWords=eval('(' +responseJson+')');
		var langaugeNameJson =
					{
					"bn" 	: "Bengali",
					"gu"	: "Gujarati",
					"hi"	: "Hindi",
					"kn"	: "Kananda",
					"ml"	: "Malayalam",
					"mr" 	: "Marathi",
					"ta"   	: "Tamil",
					"te"  	: "Telugu",
					"en"	: "English"
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
			finalResult =  '<li>' + dicWords[0][0][0] + '</li>';
		finalResult = finalResult + '</ul>';
		var separator = '';
		if(meaningHTML != '')
		 separator = '<br>';
		meaningHTML = meaningHTML + separator + link  + finalResult;	
}
