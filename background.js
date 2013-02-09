chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
   if(request.greeting == 'getLocalStorage')
   {
     var result = 'true';
	 if(GetDClick() != '0')
      result = 'false';
      sendResponse(result);
   }
   else if(request.greeting == 'setLocalStorage')
   {
    localStorage["DClick"] = '1';
	sendResponse('success');
   }
   else{
	  var meaningHTML = GetMeaningHTML(request.greeting,GetPreferredLanguage());
	  sendResponse(meaningHTML);
	  }
  });
  
  function GetPreferredLanguage()
{
	  var prefLanguage = localStorage["prefLanguage"];
	  if(prefLanguage == undefined)
	   prefLanguage = 'ta';
	   return prefLanguage;
}
function GetDClick()
{
	  var prefLanguage = localStorage["DClick"];
	  if(prefLanguage == undefined)
	   prefLanguage = '0';
	   return prefLanguage;
}