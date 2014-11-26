    var ACTION_LOGIN_PARKING = "enforceLoginForManager.do?";
    var ACTION_LOGIN_MUNICIPAL = "enforceLoginJ2me.do?";
    var ACTION_LOGIN_MIFGAIM = "mifgaimJ2MELogin.do?";
    //
    var ACTION_GET_REPORTS_SUM_PARKING = "getEnforcesWork.do?";
    var ACTION_GET_REPORTS_SUM_MUNICIPAL = "getMunicipalEnforcesWork.do?";
    var ACTION_GET_REPORTS_SUM_MIFGAIM = "getMgrAgentTasksLoginJ2ME.do?";
    //
    var ACTION_GET_REPORTS_SHORT_PARKING = "getReportDetailsForManagerByAgentId.do?";
    var ACTION_GET_REPORTS_SHORT_MUNICIPAL = "getMunicipalReportDetailsForManagerByAgentId.do?";
    var ACTION_GET_REPORTS_SHORT_MIFGAIM = "getMgrTaskForAgentLoginJ2ME.do?";
    //
    var ACTION_GET_AGENTS_LOCATIONS_PARKING = "jsp/manager/managerGetAgentsLocationsParking.jsp?";
    var ACTION_GET_AGENTS_LOCATIONS_MIFGAIM = "jsp/manager/managerGetAgentsLocationsMifgaim.jsp?";
    //
    var ACTION_GET_LANGUAGE = "jsp/manager/managerGetLanguageCode.jsp?";
    var ACTION_GET_AGENTS_WITH_NO_ACTIVITY = "jsp/manager/managerPreGetAgentsWithNoActivity";
    var ACTION_GET_DOUBLE_CHECKS_PARKING = "jsp/manager/managerGetAgentsWithDoubleChecksParking.jsp?";
    //
    var ACTION_GET_BOUNDARY_MESSAGES = "getBoundaryMessages.do?";
    
    window.addEventListener('load', function() {FastClick.attach(document.body);}, false);
    var reportDetails;
    var inspectorsList;
    var reportsList;
    var qaurtersSelector;
    var reportsIcon;
    var statisticsIcon;
    var positionsIcon;
    var loginLabel;
	var xmlDoc;
	var xmlServers;
	var progressBarTextLoading = "...טוען";
	var defaultLanguage='he';
	var licenseKey;
	var xmlhttp;
	//var deviceLanguage = navigator.language || navigator.userLanguage || defaultLanguage;
	var deviceLanguage = defaultLanguage;

    var thumbArray;
	var ajaxResult;
	
	var parkingAgentId;
	var parkingProjectId="";
	
	var municipalAgentId;
	var municipalProjectId="";
	
	var fieldReportsAgentId;
	var fieldReportsProjectId="";
	
	var parkingTotalReports;
	
	var municipalTotalReports;
	var municipalTotalWarnings;
	var municipalTotalTasks;
	
	var fieldReportsTotalReports;
	
	var connectedParking = false;
	var connectedMunicipal = false;
	var connectedField = false;
	
	var parkingInspectorsList;
	var municipalInspectorsList;
	var fieldReportsInspectorsList;
	
	var actionBarHeader;
	
	var parkingIsChosen = true;
	var municipalIsChosen = false;
	var fieldReportsIsChosen = false;

    var projectName="";
    var iosVersion;

	var reportsForInspectorList;
    google.load("visualization", "1", {packages:["corechart"]});
	xmlServers = loadXMLDoc("./servers/servers.xml");
	
	window.addEventListener('orientationchange', doOnOrientationChange);
		
    if (deviceLanguage.substring(0,2).toLowerCase()=='he')
    {
        xmlDoc=loadXMLDoc("./languages/hebrewLabels.xml");
    }
    else
    {
        xmlDoc=loadXMLDoc("./languages/englishLabels.xml");
    }

	function initializeServers()
	{
		var stringArrays = xmlServers.getElementsByTagName('string-array');
		document.getElementById('parkingServerLolatechIsraelLabel').innerHTML = stringArrays[0].getElementsByTagName('item')[0].childNodes[0].nodeValue;
		document.getElementById('parkingServerLolatechPanamaLabel').innerHTML = stringArrays[0].getElementsByTagName('item')[1].childNodes[0].nodeValue;
		document.getElementById('parkingServerTelAvivLabel').innerHTML = stringArrays[0].getElementsByTagName('item')[2].childNodes[0].nodeValue;
		document.getElementById('parkingServerItalyLabel').innerHTML = stringArrays[0].getElementsByTagName('item')[3].childNodes[0].nodeValue;
		
		document.getElementById('parkingServerLolatechIsrael').value = stringArrays[1].getElementsByTagName('item')[0].childNodes[0].nodeValue;
		document.getElementById('parkingServerLolatechPanama').value = stringArrays[1].getElementsByTagName('item')[1].childNodes[0].nodeValue;
		document.getElementById('parkingServerTelAviv').value = stringArrays[1].getElementsByTagName('item')[2].childNodes[0].nodeValue;
		document.getElementById('parkingServerItaly').value = stringArrays[1].getElementsByTagName('item')[3].childNodes[0].nodeValue;
		
		document.getElementById('municipalServerLolatechIsraelLabel').innerHTML = stringArrays[2].getElementsByTagName('item')[0].childNodes[0].nodeValue;
		document.getElementById('municipalServerAshkelonLabel').innerHTML = stringArrays[2].getElementsByTagName('item')[1].childNodes[0].nodeValue;
		document.getElementById('municipalServerJerusalemLabel').innerHTML = stringArrays[2].getElementsByTagName('item')[2].childNodes[0].nodeValue;
		document.getElementById('municipalServerRaananaLabel').innerHTML = stringArrays[2].getElementsByTagName('item')[3].childNodes[0].nodeValue;
		document.getElementById('municipalServerRamatGanLabel').innerHTML = stringArrays[2].getElementsByTagName('item')[4].childNodes[0].nodeValue;
		
		document.getElementById('municipalServerLolatechIsrael').value = stringArrays[3].getElementsByTagName('item')[0].childNodes[0].nodeValue;
		document.getElementById('municipalServerAshkelon').value = stringArrays[3].getElementsByTagName('item')[1].childNodes[0].nodeValue;
		document.getElementById('municipalServerJerusalem').value = stringArrays[3].getElementsByTagName('item')[2].childNodes[0].nodeValue;
		document.getElementById('municipalServerRaanana').value = stringArrays[3].getElementsByTagName('item')[3].childNodes[0].nodeValue;
		document.getElementById('municipalServerRamatGan').value = stringArrays[3].getElementsByTagName('item')[4].childNodes[0].nodeValue;
		
		document.getElementById('fieldReportServerLolatechIsraelLabel').innerHTML = stringArrays[4].getElementsByTagName('item')[0].childNodes[0].nodeValue;
		document.getElementById('fieldReportServerLolatechPanamaLabel').innerHTML = stringArrays[4].getElementsByTagName('item')[1].childNodes[0].nodeValue;
		document.getElementById('fieldReportServerPelemarinLabel').innerHTML = stringArrays[4].getElementsByTagName('item')[2].childNodes[0].nodeValue;
		document.getElementById('fieldReportServerBituachLeumiLabel').innerHTML = stringArrays[4].getElementsByTagName('item')[3].childNodes[0].nodeValue;
		document.getElementById('fieldReportServerAshkelonLabel').innerHTML = stringArrays[4].getElementsByTagName('item')[4].childNodes[0].nodeValue;
		
		document.getElementById('fieldReportServerLolatechIsrael').value = stringArrays[5].getElementsByTagName('item')[0].childNodes[0].nodeValue;
		document.getElementById('fieldReportServerLolatechPanama').value = stringArrays[5].getElementsByTagName('item')[1].childNodes[0].nodeValue;
		document.getElementById('fieldReportServerPelemarin').value = stringArrays[5].getElementsByTagName('item')[2].childNodes[0].nodeValue;
		document.getElementById('fieldReportServerBituachLeumi').value = stringArrays[5].getElementsByTagName('item')[3].childNodes[0].nodeValue;
		document.getElementById('fieldReportServerAshkelon').value = stringArrays[5].getElementsByTagName('item')[4].childNodes[0].nodeValue;
	}
	
	function saveServerInLocalStorage(buttonName)
	{

        
        var button = $('input[name =' + buttonName + ']:checked');
        //alert(buttonName + "," + button[0].id);
		localStorage.setItem(buttonName,button[0].id);
        
        if (buttonName.indexOf("parking") != -1)
        {
            connectToParking();
        } else
        if (buttonName.indexOf("municipal") != -1)
        {
            connectToMunicipal();
        } else
        if (buttonName.indexOf("field") != -1)
        {
            connectTofieldReports();
        }
        setProjectName();
        setReportsImageOnClicks();
	}

	function setServersFromLocalStorage()
	{
		var serverRadioButtonsNames = ["parkingServerRadioButton","municipalServerRadioButton","fieldReportServerRadioButton"];
		
		var serversFromTypeArray;
		
		for (var i=0; i<serverRadioButtonsNames.length; ++i)
		{
			if (localStorage.getItem(serverRadioButtonsNames[i]) != null)
			{
				serversFromTypeArray = $("input[name=" + serverRadioButtonsNames[i] + "]");
				document.getElementById(serversFromTypeArray[0].id).checked = false;		//uncheck first button
				document.getElementById(localStorage.getItem(serverRadioButtonsNames[i])).checked = true;	//check chosen button
			}

		}
	}
	
    function firstLoad()
    {

    	actionBarHeader = document.getElementById('actionBarHeader');
    	licenseKey = localStorage.getItem('licenseKey');
    	document.getElementById('licenseKey').value = licenseKey;
    	qaurtersSelector = document.querySelectorAll(".quarter");
    	reportsIcon = qaurtersSelector[0].getElementsByTagName('img')[0];
    	statisticsIcon = qaurtersSelector[2].getElementsByTagName('img')[0];
    	positionsIcon = qaurtersSelector[3].getElementsByTagName('img')[0];
    	loginLabel = document.getElementById('loginLabel');
    	reportsList = document.getElementById('reportsList');
    	inspectorsList = document.getElementById('inspectorsList');
    	reportDetails = document.getElementById('reportDetails');
    	setTextFromXML('reportsLabel');
    	setTextFromXML('statisticsLabel');
    	setTextFromXML('positionsLabel');
    	setTextFromXML('loginLabel');
		setTextFromXML('reportsMenuParkingLabel');
		setTextFromXML('reportsMenuMunicipalLabel');
		setTextFromXML('reportsMenuFieldReportsLabel');
		
		document.getElementById("reportsMenuReportPageParkingLabel").innerHTML=getTag('reportsMenuParkingLabel');
		document.getElementById("reportsMenuReportPageMunicipalLabel").innerHTML=getTag('reportsMenuMunicipalLabel');
		document.getElementById("reportsMenuReportPageFieldReportsLabel").innerHTML=getTag('reportsMenuFieldReportsLabel');
        document.getElementById("reportsMenuStatisticsPageParkingLabel").innerHTML=getTag('reportsMenuParkingLabel');
		document.getElementById("reportsMenuStatisticsPageMunicipalLabel").innerHTML=getTag('reportsMenuMunicipalLabel');
		document.getElementById("reportsMenuStatisticsPageFieldReportsLabel").innerHTML=getTag('reportsMenuFieldReportsLabel');
        
        //document.getElementById("doubleChecksDivHeader").innerHTML=getTag('');
                                
        document.getElementById("pieChartHeader").innerHTML=getTag('reportsLabel');
        document.getElementById("leadingInspectorsChartHeader").innerHTML = getTag('leadingInspectorsLabel');
        document.getElementById("trailingInspectorsChartHeader").innerHTML = getTag('trailingInspectorsLabel');
		
		initializeServers();
		progressBarTextLoading = getTag('progressBarTextLoadingLabel');
		document.getElementById('searchInspectorInput').placeholder = getTag('searchInspectorPlaceholderLabel');
		
		if (deviceLanguage == 'he')
		{
			document.getElementById('reportsMenuParkingLabel').style.cssFloat = "right";
			document.getElementById('reportsMenuParkingLabel').style.direction = "rtl";
			document.getElementById('reportsMenuMunicipalLabel').style.cssFloat = "right";
			document.getElementById('reportsMenuMunicipalLabel').style.direction = "rtl";
			document.getElementById("reportsMenuReportPageParkingLabel").style.cssFloat = "right";
			document.getElementById("reportsMenuReportPageParkingLabel").style.direction = "rtl";
			document.getElementById('inspectorsList').style.direction = 'rtl';
			document.getElementById('reportsList').style.direction = 'rtl';
			document.getElementById('reportDetails').style.direction = 'rtl';
			document.getElementById('searchInspectorInput').style.direction = 'rtl';
			actionBarHeader.style.direction = "rtl";
		}
		else
		{
			document.getElementById('reportsMenuParkingLabel').style.cssFloat = "left";
			document.getElementById('reportsMenuParkingLabel').style.direction = "ltr";
			document.getElementById('reportsMenuMunicipalLabel').style.cssFloat = "left";
			document.getElementById('reportsMenuMunicipalLabel').style.direction = "ltr";
			document.getElementById("reportsMenuReportPageParkingLabel").style.cssFloat = "left";
			document.getElementById("reportsMenuReportPageParkingLabel").style.direction = "ltr";
			document.getElementById('inspectorsList').style.direction = 'ltr';
			document.getElementById('reportsList').style.direction = 'ltr';
			document.getElementById('reportDetails').style.direction = 'ltr';
			document.getElementById('searchInspectorInput').style.direction = 'ltr';
			actionBarHeader.style.direction = "ltr";
		}
    	document.getElementById('settingsIcon').style.display = 'block';
    	
		$(function(){
            d=new Date();
            // create a datetimepicker with default settings
            $("#datePicker").mobiscroll().date({
              theme: 'android-ics light',
                display: 'modal',
                animate: 'pop',
                mode: 'mixed',
                // 2013-03-15 11:26:17
                dateFormat: 'dd-mm-yy',
                defaultValue: d,
                onBeforeShow: function(html,inst){var d=new Date(); $("#datePicker").mobiscroll('setValue', [d.getDate(),d.getMonth(),d.getFullYear()], false);},
                onShow: function(html,inst){},
                onSelect: function(value,inst) {getInspectorsByChosenDate();},
                onCancel: function(html,inst) {}

            }); // Shorthand for: $("#scroller").mobiscroll({ preset: 'datetime' });
		});
        $(function(){
            d=new Date();
            // create a datetimepicker with default settings
            $("#datePickerStatistics").mobiscroll().date({
             theme: 'android-ics light',
             display: 'modal',
             animate: 'pop',
             mode: 'mixed',
             // 2013-03-15 11:26:17
             dateFormat: 'dd-mm-yy',
             defaultValue: d,

             onShow: function(html,inst){},
                                                         onSelect: function(value,inst) {drawCharts(parkingIsChosen,municipalIsChosen,fieldReportsIsChosen);},
             onCancel: function(html,inst) {}
             
             }); // Shorthand for: $("#scroller").mobiscroll({ preset: 'datetime' });
        });
		
		//$("input[name='parkingServerRadioButton']").click(function(){saveServerInLocalStorage(this);});
		//$("input[name='municipalServerRadioButton']").click(function(){saveServerInLocalStorage(this);});
		//$("input[name='fieldReportServerRadioButton']").click(function(){saveServerInLocalStorage(this);});
        $(".menuIcon").on('vmousedown',function(){
                          var labelId = this.id.replace("Icon","Label");
                          document.getElementById(labelId).style.backgroundColor = "#33b5e5";
                          
                          });
        $(".menuIcon").on('vmouseup',function(){
                          var labelId = this.id.replace("Icon","Label");
                          document.getElementById(labelId).style.backgroundColor = "initial";
                          
                          });
		setServersFromLocalStorage();
    	doOnOrientationChange();
        connectToServers();
        iosVersion = checkVersion()
        if (iosVersion >= 7)
        {
            document.getElementById("actionBar").style.borderTopWidth =  "20px";
            var fromPageClass = $(".page");
            for (var i=0; i<fromPageClass.length; ++i)
            {
                fromPageClass[i].style.marginTop = "58px";
            }

        }
        $(document).on("pageshow","#StatisticsPage",function(){drawCharts(parkingIsChosen,municipalIsChosen,fieldReportsIsChosen);});
       
    }

    function checkVersion()
    {
        var agent = window.navigator.userAgent,
        start = agent.indexOf( 'OS ' );
        
        if( ( agent.indexOf( 'iPhone' ) > -1 || agent.indexOf( 'iPad' ) > -1 ) && start > -1 )
        {
            return window.Number( agent.substr( start + 3, 3 ).replace( '_', '.' ) );
        }
        return 0;
    }

   	function getCheckedValueFromList(listName)
   	{
   		var list = document.getElementsByName(listName);
   		for (var i=0; i<list.length; ++i)
   		{
   			if (list[i].checked == true)
   			{
   				return list[i].value;
   			}
   		}
   	}
    
	function setTextFromXML(id)
	{
		document.getElementById(id).innerHTML=getTag(id);
		
	}
	
	function loadXMLDoc(dname)
	{
		if (window.XMLHttpRequest)
	  	{
	  		xhttp=new XMLHttpRequest();
	  	}
		else
	  	{
	  		xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  	}
		xhttp.open("GET",dname,false);
		xhttp.send();
		return xhttp.responseXML;
	}
	
	function getTag(tag)
	{
		return xmlDoc.getElementsByTagName(tag)[0].childNodes[0].nodeValue;
	}

    function doOnOrientationChange()
  	{
	    switch(window.orientation) 
    	{  
	      	case -90:
	      	case 90:
      			reportsIcon.style.marginTop='12%';
      			statisticsIcon.style.marginTop='8%';
      			positionsIcon.style.marginTop='8%';
      			loginLabel.style.display = "block";
	        //alert('landscape');
	        	break; 
	      	default: 

      			reportsIcon.style.marginTop='40%';
      			statisticsIcon.style.marginTop='30%';
      			positionsIcon.style.marginTop='30%';
      			loginLabel.style.display = 'none';
	        //alert('portrait');
	        	break; 
	    }
  	}

  	function ShowIcon()
	{
		$('.actionBarIcon').hide();
		
  		for (var i = 0; i < arguments.length; ++i) 
  		{
   			$('#' + arguments[i]).show();
  		}
			
	}
	
	function changeToLoginPage()
	{
		ShowIcon('backToMainPageIcon');
		$('#loginActionBar').hide();
	}
	
	function changeToMainPage()
	{
        parkingIsChosen = true;
        municipalIsChosen = false;
        fieldReportsIsChosen = false;
        
		ShowIcon();
		$('#loginActionBar').show();
        setActionBarHeader(-1,projectName);
	}
	
	function startSpinner()
	{
		$.mobile.loading( 'show', {
		  text: progressBarTextLoading,
		  textVisible: true,
		  theme: "b",
		  textonly: false,
		  html: ""
	  	});
  	}
  	
  	function stopSpinner()
  	{
	 	$.mobile.loading( "hide" );
  	}
  	
  	function saveLicenseKey()
  	{
  		licenseKey = document.getElementById('licenseKey').value;
  		localStorage.setItem('licenseKey',licenseKey);
  		connectToServers();
        
  	}
	
   	function connectToParking() 
   	{
   		connectedParking = false;
		var parkingServer = getCheckedValueFromList('parkingServerRadioButton');
		
		var url = parkingServer+ACTION_LOGIN_PARKING + "phoneNum=" + licenseKey + "&pin=" + licenseKey;
        console.log(url);
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = connectToParkingCallback;
		xmlhttp.open("GET",url,false);
		xmlhttp.send();
   	}
   	
   	function connectToParkingCallback()
   	{
   		if (xmlhttp.readyState == 4)
   		{
   			if (xmlhttp.status == 200)
   			{
   				var result = xmlhttp.responseText.trim();
   				if (parseInt(result)==1)
   				{
   					connectedParking = true;
   					var begin = result.indexOf(':');
   					result = result.substring(begin+1,result.length);
   					parkingProjectId = parseInt(result);
   					begin = result.indexOf(';');
   					result = result.substring(begin+1,result.length);
   					parkingAgentId = parseInt(result);   					
   				}
   			}
   		}
   	}  	

   	function connectToMunicipal() 
   	{
   		connectedMunicipal = false;
		var municipalServer = getCheckedValueFromList('municipalServerRadioButton');

		var url = municipalServer+ACTION_LOGIN_MUNICIPAL + "phoneNum=" + licenseKey + "&pin=" + licenseKey;
        console.log(url);
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = connectToMunicipalCallback;
		xmlhttp.open("GET",url,false);
		xmlhttp.send();
   	}
   	
   	function connectToMunicipalCallback()
   	{
   		if (xmlhttp.readyState == 4)
   		{
   			if (xmlhttp.status == 200)
   			{
   				var result = xmlhttp.responseText.trim();
   				if (parseInt(result)==1)
   				{
   					connectedMunicipal = true;
   					var begin = result.indexOf(':');
   					result = result.substring(begin+1,result.length);
   					municipalProjectId = parseInt(result);
   					begin = result.indexOf(';');
   					result = result.substring(begin+1,result.length);
   					municipalAgentId = parseInt(result);   					
   				}
   			}

   		}
   	}  	

   	function connectTofieldReports() 
   	{
   		connectedField = false;
		var fieldReportServer = getCheckedValueFromList('fieldReportServerRadioButton');
		
		var url = fieldReportServer+ACTION_LOGIN_MIFGAIM + "phoneNum=" + licenseKey + "&pin=" + licenseKey + "&ip=" + licenseKey;
		console.log(url);
        xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = connectTofieldReportsCallback;
		xmlhttp.open("GET",url,false);
		xmlhttp.send();
   	}
   	
   	function connectTofieldReportsCallback()
   	{
 
   		if (xmlhttp.readyState == 4)
   		{
   			if (xmlhttp.status == 200)
   			{
   				var result = xmlhttp.responseText.trim();
   				if (parseInt(result)==1)
   				{
   					connectedField = true;
   					var begin = result.indexOf(':');
   					result = result.substring(begin+1,result.length);
   					fieldReportsProjectId = parseInt(result);
   					begin = result.indexOf(';');
   					result = result.substring(begin+1,result.length);
   					fieldReportsAgentId = parseInt(result);   					
   				}
   			}

   		}
   	}  	
   	
   	function connectToServers()
   	{
   		connectToParking();
   		connectToMunicipal();
   		connectTofieldReports();
        
        setProjectName();
        setReportsImageOnClicks();
        
   	}

    function setProjectName()
    {
        projectName = "";
        if (connectedParking == true)
        {
            projectName = getTag("cityName" + parkingProjectId);
        } else
        if (connectedMunicipal == true)
        {
            projectName = getTag("cityName" + municipalProjectId);
        } else
        if (connectedField == true)
        {
            projectName = getTag("cityName" + fieldReportsProjectId);
        }
        setActionBarHeader(-1,projectName);
        $("#actionBarHeader").show();
    }

	function decodeString(str,delimiter)
	{
		var charArray = str.split(delimiter);
		for (var i=0;i<charArray.length;++i)
		{	
			if ((charArray[i]>=1488 && charArray[i]<=1514) || (charArray[i]>=65 && charArray[i]<=122) || (charArray[i]>=192 && charArray[i]<=696))
			{
				charArray[i] = String.fromCharCode(charArray[i]);
			}
		}
		return charArray.join("");
	}
	
	function showInspectorsList(list)
	{
		inspectorsList.innerHTML = "";
		for (i=0;i<list.length;++i)
		{
			var row = document.createElement("tr");
			var cell = document.createElement("td");
			
			if (deviceLanguage == 'he')
			{
				cell.style.textAlign = 'right';
			}
			else
			{
				cell.style.textAlign = 'left';
			}
			cell.className = 'listCell';
			row.id = "row" + list[i].inspectorId;
			row.setAttribute("inspectorname",list[i].inspectorName);
			row.onclick = function(){getInspectorDetails(this);};
			cell.innerHTML = list[i].inspectorName;
			cell.appendChild(document.createElement("br"));
			var span = document.createElement('span');
			span.className = "menuLabel";
			span.innerHTML = getTag('reportsLabel') + ": " + list[i].totalReports;
			if (municipalIsChosen == true)
			{
				span.appendChild(document.createElement("br"));
				span.innerHTML += getTag('warningsLabel') + ": " + list[i].totalWarnings;
				span.appendChild(document.createElement("br"));
				span.innerHTML += getTag('tasksLabel') + ": " + list[i].totalTasks;
			}
			
			cell.appendChild(span);
			row.appendChild(cell);
			inspectorsList.appendChild(row);
		}
	}
	function sortInspectorList()
	{
		closeInspectorSearchBox();
		
		var list = getCurrentList();
		var sortIcon = document.getElementById('sortInspectionsIcon');
		
		var att = sortIcon.getAttribute("data-icon");
		if (att == "sort-amount-asc")
		{
			$("#sortInspectionsIcon").buttonMarkup({ icon: "sort-amount-desc" });
			sortIcon.setAttribute("data-icon","sort-amount-desc");
			list.sort(function(a,b){return a.totalReports-b.totalReports;});
		}
		else
		{
			$("#sortInspectionsIcon").buttonMarkup({ icon: "sort-amount-asc" });
			sortIcon.setAttribute("data-icon","sort-amount-asc");
			list.sort(function(a,b){return -(a.totalReports-b.totalReports);});
		}
		
		showInspectorsList(list);
	}

	function openInspectorSearchBox()
	{
		ShowIcon('');
		$("#logoActionBar").hide();
		$("#searchInspectorInput").val("");
		$("#searchTableActionBar").show();
		$("#actionBarHeader").hide();
	}
	
	function closeInspectorSearchBox()
	{
		ShowIcon('backToMainPageIcon');
		$("#logoActionBar").show();
		$("#searchTableActionBar").hide();
		$("#actionBarHeader").css('display', 'inline-block');
	}
	
	function getCurrentList()
	{
		if (parkingIsChosen == true)
		{
			return parkingInspectorsList;
		} else
		if (municipalIsChosen == true)
		{
			return municipalInspectorsList;
		} else
		if (fieldReportsIsChosen == true)
		{
			return fieldReportsInspectorsList;
		}
		return null;
	}
	function filterInspectorsOnType()
	{
		var typedValue = document.getElementById('searchInspectorInput').value;
		var tempList = Array();
		var list = getCurrentList();

		for (var i=0; i<list.length; ++i)
		{
			if (list[i].inspectorName.indexOf(typedValue)!=-1)
			{
				tempList.push(list[i]);
			}
		}
		showInspectorsList(tempList);
	}

	function openReportPage(parking,municipal,fieldReports)
	{
		parkingIsChosen = parking;
		municipalIsChosen = municipal;
		fieldReportsIsChosen = fieldReports;
		
		$('#loginActionBar').hide();
		setActionBarHeader();
		closeInspectorSearchBox();
		
		showInspectorsList(getCurrentList());
	}

    function setReportsImageOnClicks()
    {
        var a = document.getElementById('reportsIconA');
        if (connectedParking == false && connectedMunicipal == false && connectedField == false)
        {
            a.href = "#loginPage";
            a.setAttribute('data-transition','slide');
            a.removeAttribute('data-rel');
            a.removeAttribute('data-position-to');
            a.onclick = function(){changeToLoginPage();};
        }
        else
        {
            a.href = "#reportsMenu";
            a.setAttribute('data-transition','pop');
            a.setAttribute('data-rel','popup');
            a.setAttribute('data-position-to','window');
            a.onclick = function(){prepareReports();};
        }
    }

	function prepareReports()
	{
        var connectedToAny = false;
		$(".reportsMenuDiv").hide();
		if (connectedParking == true)
		{
            connectedToAny = true;
			getInspectorsFromServer("parking");
			setInspectorsList("parking",ajaxResult);
			document.getElementById('reportMenuA1').style.display = "inline-block";
			document.getElementById('reportsMenuParkingLabel').innerHTML = getTag('reportsMenuParkingLabel') + " (" + parkingTotalReports + " " + getTag('reportsLabel') + ")";
		}
		if (connectedMunicipal == true)
		{
            connectedToAny = true;
			getInspectorsFromServer("municipal");
			setInspectorsList("municipal",ajaxResult);
			document.getElementById('reportMenuA2').style.display = "inline-block";
			document.getElementById('reportsMenuMunicipalLabel').innerHTML = getTag('reportsMenuMunicipalLabel') + " (" + municipalTotalReports + " " + getTag('reportsLabel') + ", " + municipalTotalWarnings + " " + getTag('warningsLabel')+ ")";
		}
		if (connectedField == true)
		{
            connectedToAny = true;
			getInspectorsFromServer("fieldReports");
			document.getElementById('reportMenuA3').style.display = "inline-block";
		}
        
        if (connectedToAny == false)
        {
            changeToLoginPage();
            $.mobile.pageContainer.pagecontainer("change","#loginPage",{transition: 'slide', changeHash: true});
        }
	}
	
	function setActionBarHeader(time,name,other)
	{
		var inspectorsNum;
		var reportsNum;
		
		actionBarHeader.innerHTML="";
		if (other !== undefined)
		{
			actionBarHeader.innerHTML = other;
		}
		
		if (name != -1)
		{
			if (name!==undefined)
			{
				actionBarHeader.innerHTML = name;
			}
			else
			{
				if (parkingIsChosen == true)
				{
					inspectorsNum = parkingInspectorsList.length;
					reportsNum =  parkingTotalReports;
				} else
				if (municipalIsChosen == true)
				{
					inspectorsNum = municipalInspectorsList.length;
					reportsNum = municipalTotalReports;
				}
				actionBarHeader.innerHTML = inspectorsNum + " " + getTag('inspectorsLabel') + " / " + reportsNum + " " + getTag('reportsLabel');
			}
		}
		
		if (time != -1)
		{
			actionBarHeader.innerHTML += "<br/>";
			var now;
			if (time===undefined)
			{
				now = new Date();
			}
			else
			{
				now = new Date(time);
			}
			actionBarHeader.innerHTML +=('0' + now.getDate()).slice(-2) + "/" + ('0' + (now.getMonth()+1)).slice(-2) + "/" + now.getFullYear();
		}
	}
	
	function setInspectorsList(type,result)
	{
		if (type == "parking")
		{
			parkingInspectorsList = new Array();
			parkingTotalReports = parseInt(result);
		} else
		if (type == "municipal")
		{
			municipalInspectorsList = new Array();
			municipalTotalReports = parseInt(result);
			result = result.substring(result.indexOf('--')+2,result.length);
			municipalTotalWarnings = parseInt(result);
			result = result.substring(result.indexOf('--')+2,result.length);
			municipalTotalTasks = parseInt(result);
		} else
        if (type == "fieldReports")
        {
            fieldReportsTotalReports = 0;
            return;
        }

		result = result.substring(result.indexOf(':')+1,result.length);
		
		var inspectorId;
		var totalReports;
		var totalWarnings;
		var totalTasks;
		var inspectorName;
		var encodedName;
		var index;
		
		while (result!="")
		{
			index = result.indexOf('--');
			inspectorId = parseInt(result);
			result = result.substring(index+2,result.length);
			
			index = result.indexOf('--');
			totalReports = parseInt(result);
			result = result.substring(index+2,result.length);
			
			if (type == "municipal")
			{
				index = result.indexOf('--');
				totalWarnings = parseInt(result);
				result = result.substring(index+2,result.length);
	
				index = result.indexOf('--');
				totalTasks = parseInt(result);
				result = result.substring(index+2,result.length);
			}
			
			index = result.indexOf('**');
			if (index == -1)
			{
				index = result.length;
			}
			encodedName = result.substring(0,index);
			inspectorName = decodeString(encodedName,';');
			
			if (type == "municipal")
			{
				var newInspector = {"inspectorName":inspectorName, "inspectorId":inspectorId, "totalReports":totalReports, "totalWarnings":totalWarnings, "totalTasks":totalTasks};
				municipalInspectorsList.push(newInspector);
			}
			if (type == "parking")
			{
				var newInspector = {"inspectorName":inspectorName, "inspectorId":inspectorId, "totalReports":totalReports};
				parkingInspectorsList.push(newInspector);
			}
			
			result = result.substring(index+2,result.length);
		}		
	}
	
	function refreshList()
	{
		type = getInspectionType();
		getInspectorsFromServer(type);
		setInspectorsList(type,ajaxResult);
		openReportPage(parkingIsChosen,municipalIsChosen,fieldReportsIsChosen);
	}
	
	function getInspectionType()
	{
		if (parkingIsChosen == true)
		{
			return "parking";
		} else
		if (municipalIsChosen == true)
		{
			return "municipal";
		} else
		if (fieldReportsIsChosen == true)
		{
			return "fieldReports";
		}	
		return null;	
	}
	
	function getBeginningOfTheDay(timeMilisec)
	{
		var d = new Date(timeMilisec);
		
		d.setHours(0,0,0,0);
		return d.getTime();
	}
	
	function getEndOfTheDay(timeMilisec)
	{
		var d = new Date(timeMilisec);
		
		d.setHours(23,59,59,999);
		return d.getTime();
	}
		
    function getInspectorsByChosenDate(forStatistics)
	{
		
		
		var type;
		var timeMilisec;
        if (forStatistics === undefined)
        {
            type = getInspectionType();
            closeInspectorSearchBox();
            timeMilisec=$('#datePicker').mobiscroll('getDate').getTime();
        }
        else
        {
            type = forStatistics;
            timeMilisec=$('#datePickerStatistics').mobiscroll('getDate').getTime();
        }
		var from;
		var to;
		
		if (type!="fieldReports")
		{
			from = getBeginningOfTheDay(timeMilisec);
			to = getEndOfTheDay(timeMilisec);
		}
		getInspectorsFromServer(type,from,to);
		setInspectorsList(type,ajaxResult);
        if (forStatistics === undefined)
        {
            setActionBarHeader(timeMilisec);
            showInspectorsList(getCurrentList());
        }
	}
	function openReportMenuFromStatisticsPage()
    {
        $(".reportsMenuDiv").hide();
		document.getElementById('reportMenuStatisticsPageA1').onclick=function(){$("#reportsMenuStatisticsPage").popup('close'); reloadStatisticsPage(true,false,false);};
		document.getElementById('reportMenuStatisticsPageA2').onclick=function(){$("#reportsMenuStatisticsPage").popup('close'); reloadStatisticsPage(false,true,false);};
		document.getElementById('reportMenuStatisticsPageA3').onclick=function(){$("#reportsMenuStatisticsPage").popup('close'); reloadStatisticsPage(false,false,true);};
		
		document.getElementById('parkingIconStatisticsPage').src = "images/ic_menu_parking.png";
		document.getElementById('municipalIconStatisticsPage').src = "images/ic_menu_municipal.png";
		document.getElementById('fieldReportsIconStatisticsPage').src = "images/ic_menu_field.png";
		
		if (parkingIsChosen == true)
		{
			document.getElementById('parkingIconStatisticsPage').src = "images/ic_menu_parking_unfocused.png";
			document.getElementById('reportMenuStatisticsPageA1').onclick=function(){};
		} else
            if (municipalIsChosen == true)
            {
                document.getElementById('municipalIconStatisticsPage').src = "images/ic_menu_municipal_unfocused.png";
                document.getElementById('reportMenuStatisticsPageA2').onclick=function(){};
            } else
                if (fieldReportsIsChosen == true)
                {
                    document.getElementById('fieldReportsIconStatisticsPage').src = "images/ic_menu_field_unfocused.png";
                    document.getElementById('reportMenuStatisticsPageA3').onclick=function(){};
                }
		
		if (connectedParking == true)
		{
			document.getElementById('reportMenuStatisticsPageA1').style.display = "inline-block";
		}
		if (connectedMunicipal == true)
		{
			document.getElementById('reportMenuStatisticsPageA2').style.display = "inline-block";
		}
		if (connectedField == true)
		{
			document.getElementById('reportMenuStatisticsPageA3').style.display = "inline-block";
		}
    }

	function openReportMenuFromReportPage() 
	{
		$(".reportsMenuDiv").hide();
		document.getElementById('reportMenuReportPageA1').onclick=function(){openReportPage(true,false,false);};
		document.getElementById('reportMenuReportPageA2').onclick=function(){openReportPage(false,true,false);};
		document.getElementById('reportMenuReportPageA3').onclick=function(){openReportPage(false,false,true);};
		
		document.getElementById('parkingIconReportPage').src = "images/ic_menu_parking.png";
		document.getElementById('municipalIconReportPage').src = "images/ic_menu_municipal.png";
		document.getElementById('fieldReportsIconReportPage').src = "images/ic_menu_field.png";
		
		if (parkingIsChosen == true)
		{
			document.getElementById('parkingIconReportPage').src = "images/ic_menu_parking_unfocused.png";
			document.getElementById('reportMenuReportPageA1').onclick=function(){};
		} else
		if (municipalIsChosen == true)
		{
			document.getElementById('municipalIconReportPage').src = "images/ic_menu_municipal_unfocused.png";
			document.getElementById('reportMenuReportPageA2').onclick=function(){};
		} else
		if (fieldReportsIsChosen == true)
		{
			document.getElementById('fieldReportsIconReportPage').src = "images/ic_menu_field_unfocused.png";
			document.getElementById('reportMenuReportPageA3').onclick=function(){};
		}
		
		if (connectedParking == true)
		{
			document.getElementById('reportMenuReportPageA1').style.display = "inline-block";
		}
		if (connectedMunicipal == true)
		{
			document.getElementById('reportMenuReportPageA2').style.display = "inline-block";
		}
		if (connectedField == true)
		{
			document.getElementById('reportMenuReportPageA3').style.display = "inline-block";
		}
	}
	
	function getInspectorsFromServer(type,from,to)
	{
		var server;
		var action;
        var agentId;
        
		ajaxResult="";
        
		if (type == "parking")
		{
            if (connectedParking == false)
            {
                return;
            }
			server = getCheckedValueFromList('parkingServerRadioButton');
			action = ACTION_GET_REPORTS_SUM_PARKING;
            agentId = parkingAgentId;
		} else
		if (type == "municipal")
		{
            if (connectedMunicipal == false)
            {
                return;
            }
			server = getCheckedValueFromList('municipalServerRadioButton');
			action = ACTION_GET_REPORTS_SUM_MUNICIPAL;
            agentId = municipalAgentId;
		}
		if (type == "fieldReports")
		{
            if (connectedField == false)
            {
                return;
            }
			server = getCheckedValueFromList('fieldReportServerRadioButton');
			action = ACTION_GET_REPORTS_SUM_MIFGAIM;
            agentId = fieldReportsAgentId;
		}
		
		var url = server + action + "phoneNum=" + licenseKey + "&pin=" + licenseKey + "&ip=" + licenseKey + "&agentId=" + agentId + "&md=yes";
		if (from!==undefined)
		{
			url += "&from=" + from;
		}
		if (to!==undefined)
		{
			url += "&to=" + to;
		}		
		
		console.log("getInspectorsFromServer: " + url);
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = getInspectorsFromServerCallback;
		xmlhttp.open("GET",url,false);
		xmlhttp.send();		
	}
	
	function getInspectorsFromServerCallback()
	{
		ajaxResult="";
   		if (xmlhttp.readyState == 4)
   		{
   			if (xmlhttp.status == 200)
   			{
   				ajaxResult = xmlhttp.responseText.trim();
   			}
   		}			
	}
	
	function getReportsForInspector(type,agentId,from,to)
	{
		var server;
		var action;
		var mdpid;
		
		if (type == "parking")
		{
			server = getCheckedValueFromList('parkingServerRadioButton');
			action = ACTION_GET_REPORTS_SHORT_PARKING;
			mdpid = parkingProjectId;
		}
		if (type == "municipal")
		{
			server = getCheckedValueFromList('municipalServerRadioButton');
			action = ACTION_GET_REPORTS_SHORT_MUNICIPAL;
			mdpid = municipalProjectId;
		}
		if (type == "fieldReports")
		{
			server = getCheckedValueFromList('fieldReportServerRadioButton');
			action = ACTION_GET_REPORTS_SHORT_MIFGAIM;
			mdpid = fieldReportsProjectId;
		}
		
		var url = server + action + "md=" + "yes" + "&mdpid=" + mdpid + "&agentId=" + agentId;
        if (mdpid == 13)
        {
            url += "&rTypes=all"
        }
		if (from!==undefined)
		{
			url += "&from=" + from;
		}
		if (to!==undefined)
		{
			url += "&to=" + to;
		}		
		
		console.log("getReportsForInspector: " + url);
		ajaxResult="";
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = getReportsForInspectorCallback;
		xmlhttp.open("GET",url,false);
		xmlhttp.send();		
	}
	
	function getReportsForInspectorCallback()
	{
		ajaxResult="";
   		if (xmlhttp.readyState == 4)
   		{
   			if (xmlhttp.status == 200)
   			{
   				ajaxResult = xmlhttp.responseText.trim();
   			}
   		}			
	}
	
	function getInspectorDetails(row)
	{
		closeInspectorSearchBox();
		ShowIcon('backToInspectorsListIcon');
		var type = getInspectionType();
		var timeMilisec=$('#datePicker').mobiscroll('getDate').getTime();
		var from;
		var to;
		var agentId = row.id.replace("row","");
		var time = $('#datePicker').mobiscroll('getValue');
		if (type=="parking" || type == "municipal")
		{
			from = to = time[0] + "-" + (parseInt(time[1])+1) + "-" + time [2];
		}
		
		getReportsForInspector(type,agentId,from,to);
		if (type == "parking") 
		{
			setParkingInspectorReports(type,ajaxResult);
		} else
		if (type == "municipal")
		{
			setMunicipalInspectorReports(type,ajaxResult);
		}
		setActionBarHeader(timeMilisec,row.getAttribute("inspectorname"));
		showReportsList(type,reportsForInspectorList,row.getAttribute("inspectorname"));
	}
	
	function setParkingInspectorReports(type,result)
	{
		var vehicleNum;
		var vehicleNumHeader;
		var reportNum;
		var reportNumHeader;
		var date;
		var dateHeader;
		var regulationNum;
		var regulationNumHeader;
		var delivery;
		var deliveryHeader;
		var houseNum;
		var houseNumHeader;
		var paymentSum;
		var paymentSumHeader;
		var street;
		var streetHeader;
		var model;
		var modelHeader;
		var color;
		var colorHeader;
		var comment;
		var commentHeader;
		var ticket;
		var ticketHeader;
		var madchan;
		var madchanHeader;
		var picNum;
		var pics;
		reportsForInspectorList = new Array();
		
		var index;
		result = result.replace(/\n|\r|\t/g,"");
		
		while (result != "")
		{
			//car num
			vehicleNumHeader = decodeStringBetweenChars(result,'&#',';');
			result = result.substring(result.indexOf('##')+2,result.length);
			vehicleNum = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);
			//reportNum
			reportNumHeader = decodeStringBetweenChars(result,'&#',';');
			result = result.substring(result.indexOf('##')+2,result.length);
			reportNum = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);
			//date
			dateHeader = decodeStringBetweenChars(result,'&#',';');
			result = result.substring(result.indexOf('##')+2,result.length);
			date = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);		
			//regulationNum
			regulationNumHeader = decodeStringBetweenChars(result,'&#',';');
			result = result.substring(result.indexOf('##')+2,result.length);
			regulationNum = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);
			//delivery
			deliveryHeader = decodeStringBetweenChars(result,'&#',';');
			result = result.substring(result.indexOf('##')+2,result.length);
			delivery = decodeStringBetweenChars(result,'&#',';');						//the value here is encoded
			result = result.substring(result.indexOf('##')+2,result.length);			
			//houseNum
			houseNumHeader = decodeStringBetweenChars(result,'&#',';');
			result = result.substring(result.indexOf('##')+2,result.length);
			houseNum = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);
			//paymentSum
			paymentSumHeader = decodeStringBetweenChars(result,'&#',';');
			result = result.substring(result.indexOf('##')+2,result.length);
			paymentSum = getStringFromResult(result);
			if (deviceLanguage == "he")
			{
				paymentSum = parseInt(paymentSum);
				paymentSum += " " + getTag("coinLabel");
			}
			result = result.substring(result.indexOf('##')+2,result.length);
			//street
			streetHeader = decodeStringBetweenChars(result,'&#',';');
			result = result.substring(result.indexOf('##')+2,result.length);
			street = decodeStringBetweenChars(result,'&#',';');						//the value here is encoded
			result = result.substring(result.indexOf('##')+2,result.length);
			//model
			modelHeader = decodeStringBetweenChars(result,'&#',';');
			result = result.substring(result.indexOf('##')+2,result.length);
			model = decodeStringBetweenChars(result,'&#',';');							//the value here is encoded
			result = result.substring(result.indexOf('##')+2,result.length);
			//color
			colorHeader = decodeStringBetweenChars(result,'&#',';');
			result = result.substring(result.indexOf('##')+2,result.length);
			color = decodeStringBetweenChars(result,'&#',';');							//the value here is encoded
			result = result.substring(result.indexOf('##')+2,result.length);
			//comment
			commentHeader = decodeStringBetweenChars(result,'&#',';');
			result = result.substring(result.indexOf('##')+2,result.length);
			comment = decodeStringBetweenChars(result,'&#',';');
			result = result.substring(result.indexOf('##')+2,result.length);
			//ticket
			ticketHeader = decodeStringBetweenChars(result,'&#',';');
			result = result.substring(result.indexOf('##')+2,result.length);
			ticket = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);
			//madchan
			madchanHeader = decodeStringBetweenChars(result,'&#',';');
			result = result.substring(result.indexOf('##')+2,result.length);
			madchan = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);
			//picNum
			picNum = parseInt(result);
            //pics url
			pics = new Array();
			var endOfReport;
			if (picNum != 0)
			{
				result = result.substring(result.indexOf('##')+2,result.length);
                var allPics;
                endOfReport = result.indexOf("@@");
                if (endOfReport == -1)
                {
                    endOfReport = result.length;
                }
                
                allPics = result.substring(0,endOfReport);
                while (allPics != "")
                {
                    var index = allPics.indexOf('##') == -1 ? allPics.length : allPics.indexOf('##');
                    pics[pics.length] = allPics.substring(0,index);
                    allPics = allPics.substring(index+2,allPics.length);
                }
			}
            else
            {
                endOfReport = result.indexOf("@@");
                endOfReport = endOfReport == -1 ? result.length : endOfReport;
            }

			var newReport = {
				 "vehicleNumHeader":vehicleNumHeader,
				 "vehicleNum":vehicleNum,
				 "reportNumHeader":reportNumHeader,
				 "reportNum":reportNum,
				 "dateHeader":dateHeader,
				 "date":date,
				 "regulationNumHeader":regulationNumHeader,
				 "regulationNum":regulationNum,
				 "deliveryHeader":deliveryHeader,
				 "delivery":delivery,
				 "paymentSumHeader":paymentSumHeader,
				 "paymentSum":paymentSum,
				 "streetHeader":streetHeader,
				 "street":street,
 				 "houseNumHeader":houseNumHeader,
				 "houseNum":houseNum,
				 "modelHeader":modelHeader,
				 "model":model,
				 "colorHeader":colorHeader,
				 "color":color,
				 "commentHeader":commentHeader,
				 "comment":comment,
				 "ticketHeader":ticketHeader,
				 "ticket":ticket,
				 "madchanHeader":madchanHeader,
				 "madchan":madchan,
				 "picNum":picNum + "",
				 "pics":pics
			 };
			reportsForInspectorList.push(newReport);
			
			if (endOfReport!=result.length)
			{
				endOfReport +=2;
			}
			result = result.substring(endOfReport,result.length);
		}
	}
	
	function setMunicipalInspectorReports(type,result)
	{
		var reportNum;
		var reportNumHeader;
		var date;
		var dateHeader;
		var warningHeader;
		var warning;
		var privateOrCompanyHeader;
		var privateOrCompany;
		var entityHeader;
		var entity;
		var addressHeader;
		var address;
		var locationHeader;
		var location;
		var regulationNumHeader;
		var regulationNum;
		var factsHeader;
		var facts;
		var factsContinuationHeader;
		var factsContinuation;
		var paymentSumHeader;
		var paymentSum;
		var deliveryHeader;
		var delivery;
		var mokedHeader;
		var moked;
		var demandHeader;
		var demand;
		var demandNumHeader;
		var demandNum;
		var executionDateHeader;
		var executionDate;
		var inspectorCommentsHeader;
		var inspectorComments;
		var picNum;
		var pics;
		reportsForInspectorList = new Array();
		
		var index;
		result = result.replace(/\n|\r|\t/g,"");
		console.log(result);
		while (result != "")
		{
			//reportNum
			reportNumHeader = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);
			reportNum = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);
			//date
			dateHeader = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);
			date = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);
			//warning
			warningHeader = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);
			warning = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);
			//privateOrCompany
			privateOrCompanyHeader = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);
			privateOrCompany = getStringFromResult(result);						
			result = result.substring(result.indexOf('##')+2,result.length);		
			//entity
			entityHeader = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);
			entity = decodeStringBetweenChars(result,'&#',';');
			result = result.substring(result.indexOf('##')+2,result.length);
			//address
			addressHeader = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);
			address = decodeStringBetweenChars(result,'&#',';');							
			result = result.substring(result.indexOf('##')+2,result.length);	
			//location
			locationHeader = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);
			location = decodeStringBetweenChars(result,'&#',';');							
			result = result.substring(result.indexOf('##')+2,result.length);				
			//regulationNum
			regulationNumHeader = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);
			regulationNum = decodeStringBetweenChars(result,'&#',';');
			result = result.substring(result.indexOf('##')+2,result.length);
			//facts
			factsHeader = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);
			facts = decodeStringBetweenChars(result,'&#',';');
			result = result.substring(result.indexOf('##')+2,result.length);
			//factContinuation
			factsContinuationHeader = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);
			factsContinuation = decodeStringBetweenChars(result,'&#',';');
			result = result.substring(result.indexOf('##')+2,result.length);
			//paymentSum
			paymentSumHeader = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);
			paymentSum = getStringFromResult(result);
			if (deviceLanguage == "he")
			{
				paymentSum = parseInt(paymentSum) + " " + getTag('coinLabel');
			}
			result = result.substring(result.indexOf('##')+2,result.length);
			//delivery
			deliveryHeader = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);
			delivery = decodeStringBetweenChars(result,'&#',';');
			result = result.substring(result.indexOf('##')+2,result.length);	
			//moked
			mokedHeader = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);
			moked = decodeStringBetweenChars(result,'&#',';');
			result = result.substring(result.indexOf('##')+2,result.length);	
			//demand
			demandHeader = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);
			demand = decodeStringBetweenChars(result,'&#',';');
			result = result.substring(result.indexOf('##')+2,result.length);
			//demandNum
			demandNumHeader = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);
			demandNum = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);														
			//executionDate
			executionDateHeader = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);
			executionDate = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);			
			//inspectorComments
			inspectorCommentsHeader = getStringFromResult(result);
			result = result.substring(result.indexOf('##')+2,result.length);
			inspectorComments = decodeStringBetweenChars(result,'&#',';');
			result = result.substring(result.indexOf('##')+2,result.length);	
			//picNum
			picNum = parseInt(result);
            //pics url
			pics = new Array();
			var endOfReport;
			if (picNum != 0)
			{
				result = result.substring(result.indexOf('##')+2,result.length);
                var allPics;
                endOfReport = result.indexOf("@@");
                if (endOfReport == -1)
                {
                    endOfReport = result.length;
                }
                
                allPics = result.substring(0,endOfReport);
                while (allPics != "")
                {
                    var index = allPics.indexOf('##') == -1 ? allPics.length : allPics.indexOf('##');
                    pics[pics.length] = allPics.substring(0,index);
                    allPics = allPics.substring(index+2,allPics.length);
                }
			}
            else
            {
                endOfReport = result.indexOf("@@");
                endOfReport = endOfReport == -1 ? result.length : endOfReport;
            }
			
			var newReport = {
				"reportNumHeader":reportNumHeader,
				"reportNum":reportNum,
				"dateHeader":dateHeader,
				"date":date,
				"entityHeader":entityHeader,
				"entity":entity,
				"addressHeader":addressHeader,
				"address":address,
				"locationHeader":locationHeader,
				"location":location,
				"regulationNumHeader":regulationNumHeader,
				"regulationNum":regulationNum,
				"factsHeader":factsHeader,
				"facts":facts,
				"factsContinuationHeader":factsContinuationHeader,
				"factsContinuation":factsContinuation,
				"paymentSumHeader":paymentSumHeader,
				"paymentSum":paymentSum,
				"deliveryHeader":deliveryHeader,
				"delivery":delivery,
				"mokedHeader":mokedHeader,
				"moked":moked,
				"demandHeader":demandHeader,
				"demand":demand,
				"demandNumHeader":demandNumHeader,
				"demandNum":demandNum,
				"executionDateHeader":executionDateHeader,
				"executionDate":executionDate,
				"inspectorCommentsHeader":inspectorCommentsHeader,
				"inspectorComments":inspectorComments,
				"warningHeader":warningHeader,
				"warning":warning,
				"privateOrCompanyHeader":privateOrCompanyHeader,
				"privateOrCompany":privateOrCompany,
				"picNum":picNum + "",
				"pics":pics
			 };
			reportsForInspectorList.push(newReport);
			
			if (endOfReport!=result.length)
			{
				endOfReport +=2;
			}
			result = result.substring(endOfReport,result.length);
		}
		
	}
	
	function getDecodedStringFromResult(str)
	{
		var encoded;
		var index = str.indexOf("##");
		
		encoded = str.substring(0,index);
		encoded = encoded.replace(/ /g," ;");
		return  decodeString(encoded,";");
	}
	
	function getStringFromResult(str)
	{
		var index = str.indexOf("##");
		
		var retVal = str.substring(0,index);
		str = str.substring(index+2,str.length);
		return  retVal;		
	}
	
	function decodeStringBetweenChars(str,preChars,postChars)
	{
		str = str.substring(0,str.indexOf('##')); 
		var retVal = "";
		var index;
		index = str.indexOf(preChars);
		while (index != -1)
		{
			retVal += str.substring(0,index);
			var endIndex = str.indexOf(postChars);
			var encodedChar = str.substring(index+preChars.length,endIndex);
			var decodedChar = String.fromCharCode(encodedChar);
			retVal += decodedChar;
			str = str.substring(endIndex+postChars.length);
			index = str.indexOf(preChars);
			
		}
		retVal += str;
		return retVal;
	}

	function showReportsList(type,list,name)
	{
		reportsList.innerHTML = "";
		for (i=0;i<list.length;++i)
		{
			var row = document.createElement("tr");
			var cell = document.createElement("td");
			var picCell = document.createElement("td");
			picCell.className = "picCell";
			var img = document.createElement("img");
			img.className = "previewPic";
			var pic = list[i].pics[0];
			img.src = pic !== undefined ? pic : "images/ic_report_generic.png";
			picCell.appendChild(img);
			if (deviceLanguage == 'he')
			{
				cell.style.textAlign = 'right';
			}
			else
			{
				cell.style.textAlign = 'left';
			}
			cell.className = 'listCell';
			row.id = "reportsRow" + i;
			row.setAttribute("reportNum",list[i].reportNum);
			row.setAttribute("inspectorname",name);
			row.onclick = function(){showReportDetails(this,type);};
			var span = document.createElement('span');
			span.className = "menuLabel";
			var innerHtml;
			if (type == "parking")
			{
				span.innerHTML = list[i].date;
				innerHtml = list[i].street + " " + list[i].houseNum + "<br/>" + list[i].paymentSum;
			} else
			if (type == "municipal")
			{
				if (list[i].warning == true)
				{
					span.innerHTML = getTag('warningLabel');
				}
				else
				{
					span.innerHTML = getTag('reportLabel');
				}
				innerHtml = list[i].facts;
			}
			cell.appendChild(span);
			cell.appendChild(document.createElement("br"));
			cell.innerHTML += innerHtml;
			row.appendChild(picCell);
			row.appendChild(cell);
			reportsList.appendChild(row);
		}
        $("#reportsListPage").scrollTop(0);
	}
	
	function changeToInspectorsList()
	{
		var time = $('#datePicker').mobiscroll('getDate').getTime();
		setActionBarHeader(time);
		ShowIcon('backToMainPageIcon');
        showInspectorsList(getCurrentList());
	}
	
	function changeToReportsList(name)
	{
		var time = $('#datePicker').mobiscroll('getDate').getTime();
		setActionBarHeader(time,name);
		ShowIcon('backToInspectorsListIcon');
	}

    function showReportDetails(row,type)
    {
        ShowIcon('backToReportsListIcon');
        var name = row.getAttribute("inspectorname");
        document.getElementById('backToReportsListIcon').onclick = function(){changeToReportsList(name);};
        reportDetails.innerHTML = "";
        var index = row.id.replace('reportsRow',"");
        var report = reportsForInspectorList[index];
        setActionBarHeader(-1,-1,report.reportNum);
        var jsonString = JSON.stringify(report);
        jsonString = jsonString.replace(/":\["/g,'":"');
        jsonString = jsonString.replace(/","/g,'":"');
        
        jsonString = jsonString.substring(2,jsonString.length-3);
        var jsonArray = jsonString.split('":"');
        var endIndexOffset;
        if (type == "parking")
        {
            endIndexOffset = 3;				//printing without pic counter and print array
        } else
        if (type == "municipal")
        {
            endIndexOffset = 11;				//printing without pic counter, pic array, privare/company and type (warning, report etc..)
        }
        endIndexOffset += parseInt(report.picNum);
        for (var i=3;i<jsonArray.length-endIndexOffset;i+=4)
        {
            var body = jsonArray[i];
            
            if (body.replace(/ /g,'')!="")
            {
                body = body.replace(/\\"/g,'"');
                /*while (body.indexOf('\\"') != -1)
                {
                    body = body.replace('\\"','"');
                }*/
                var header = jsonArray[i-2];
                var headerRow = document.createElement('tr');
                var bodyRow = document.createElement('tr');
                var headerCell = document.createElement('td');
                var bodyCell = document.createElement('td');
                var headerSpan = document.createElement('span');
                bodyCell.innerHTML = body;
                bodyCell.className = 'bottomPadding';
                headerSpan.className = 'underline bold';
                headerSpan.innerHTML = header;
                headerCell.appendChild(headerSpan);
                headerRow.appendChild(headerCell);
                bodyRow.appendChild(bodyCell);
                bodyRow.appendChild(document.createElement('br'));
                reportDetails.appendChild(headerRow);
                reportDetails.appendChild(bodyRow);
            }
        }
        //reportDetails.removeChild(document.getElementById("imagesSectionTr"));
        var imagesSectionTr = document.createElement('tr');
        var picsArray = new Array();
        if (report.picNum!=0)
        {
            var header = getTag('picsLabel') + " (" + report.picNum + "):";
            var headerRow = document.createElement('tr');
            var headerCell = document.createElement('td');
            var headerSpan = document.createElement('span');
            headerSpan.className = 'underline bold';
            headerSpan.innerHTML = header;
            headerCell.appendChild(headerSpan);
            headerRow.appendChild(headerCell);
            reportDetails.appendChild(headerRow);
            
            
            var td = document.createElement('td');
            var div = document.createElement('div');
            
            div.id = "thumbsDiv";
            thumbArray = new Array();
            for (var i=0; i<report.picNum; ++i)
            {
                function frameObject(img,thumb,fit)
                {
                    this.img=img;
                    this.thumb=thumb;
                    this.fit=fit;
                }
                var picObject = new frameObject(report.pics[i],report.pics[i],'contain');
                thumbArray.push(picObject);
                var a = document.createElement('a');
                var img = document.createElement('img');
                img.src = report.pics[i];
                img.className = "thumb";
                img.id = "thumb" + i;
                img.onclick = function(){openPicDiv(this.id);};
                a.href = "#picturesPopup";
                a.setAttribute("data-rel","popup");
                a.setAttribute("data-position-to","window");
                a.appendChild(img);
                div.appendChild(a);
            }
            td.appendChild(div);
            imagesSectionTr.appendChild(td);
            reportDetails.appendChild(imagesSectionTr);
        }
    }

    function openPicDiv(id)
    {
        var picturesPopupMain = document.getElementById('picturesPopupMain');
        picturesPopupMain.removeChild(document.getElementById("imagesSection"));
        var div = document.createElement('div');
        div.className = "fotorama";
        div.id = 'imagesSection';
        picturesPopupMain.appendChild(div);
        var startIndex = id.replace("thumb","");
        // $('.fotorama').fotorama({data:[]});
        $('#imagesSection').fotorama({
                                width: "100%",
                                maxwidth: '100%',
                                ratio: 1/1,
                                thumbwidth: 40,
                                thumbheight: 50,
                                nav: 'thumbs',
                                click: true,
                                loop: true,
                                startindex: startIndex,
                                allowfullscreen: true,
                                data: thumbArray
                                
                                });
        //var fullscreenIcon = $(".fotorama__fullscreen-icon")[0];
        //fullscreenIcon.id = "fullscreenIcon";
        //fullscreenIcon.onclick = function () {setFullScreenIconPosition();};
    }
/*
    var fullscreen = false;
    function setFullScreenIconPosition()
    {
        if (fullscreen == true)
        {
            this.style.right = "25px";
            this.style.top = "0px;"
            fullscreen = false;
        }
        else
        {
            this.style.right = "0px";
            if (iosVersion >= 7)
            {
                this.style.top = "25px";
            }
            fullscreen = true;
        }
    }*/

    function openStatisticsPage()
    {
        $('#loginActionBar').hide();
        ShowIcon('backToMainPageIcon');
        //drawCharts();
        
    }

    function setInspectionType(parking,municipal,fieldReports)
    {
        parkingIsChosen = parking;
		municipalIsChosen = municipal;
		fieldReportsIsChosen = fieldReports;
    }
    function reloadStatisticsPage(parking,municipal,fieldReports)
    {
        setInspectionType(parking,municipal,fieldReports);
        $.mobile.changePage('#StatisticsPage',{allowSamePageTransition: true});
        
    }
    function drawCharts(parking,municipal,fieldReports)
    {
        //getDoubleChecks();
        
        setInspectionType(parking,municipal,fieldReports);
        
        var typeArray = ["parking","municipal","fieldReports"];
        var reportsNumArray = new Array();
        for (var i=0; i<typeArray.length; ++i)
        {
            getInspectorsByChosenDate(typeArray[i]);
            setInspectorsList(typeArray[i],ajaxResult); //also set total number of reports
        }
        
        var data = google.visualization.arrayToDataTable([
          ['Type', 'Amount'],
          //["reports",1]
          [getTag('reportsMenuParkingLabel'), parkingTotalReports],
          [getTag('reportsMenuMunicipalLabel'), municipalTotalReports],
          [getTag('reportsMenuFieldReportsLabel'), fieldReportsTotalReports],
                                                          ]);
        var options = {
            //title: getTag('reportsLabel'),
            pieSliceText: 'value',
            legend: { position: 'top', alignment: 'center'},
        //tooltip: {showColorCode: true,text: 'both'},
            enableInteractivity: false,
            width: '100%'
        };
        
        var chart = new google.visualization.PieChart(document.getElementById('reportsPieChart'));
        chart.draw(data, options);
        
        var list;
        var inspectionType = getInspectionType();
        switch (inspectionType)
        {
            case "parking":
            {
                list = parkingInspectorsList;
                break;
            }
            case "municipal":
            {
                list = municipalInspectorsList;
                break;
            }
            case "fieldReports":
            {
                list = fieldReportsInspectorsList;
                break;
            }
            default:
            {
                break;
            }
        }
        list.sort(function(a,b){return -(a.totalReports-b.totalReports);});
        
        var chartData = new Array();
        var namesRowLeading = new Array();
        var namesRowTrailing = new Array();
        namesRowLeading.push('Names');
        namesRowTrailing.push('Names');
        var amountRowLeading = new Array();
        var amountRowTrailing = new Array();
        amountRowLeading.push('');
        amountRowTrailing.push('');
        var numOfColumns = list.length>=5 ? 5: list.length;
        for (i=0; i<numOfColumns; ++i)
        {
            namesRowLeading.push(list[i].inspectorName);
            namesRowTrailing.push(list[list.length-i-1].inspectorName);
            amountRowLeading.push(list[i].totalReports);
            amountRowTrailing.push(list[list.length-i-1].totalReports);
            
        }
//         namesRowLeading.push({ role: 'discrete' });
        options = {
            legend: { position: 'top', alignment: 'center'},
            enableInteractivity: false,
            chartArea: {width:"80%",height:"80%"},
                //orientation: 'vertical',
            height: '100%',
            width: '100%',
            vAxis: {minValue: 0}
        };
        
        chartData.push(namesRowLeading,amountRowLeading);
        data = google.visualization.arrayToDataTable(chartData);
        
        chart = new google.visualization.ColumnChart(document.getElementById('leadingInspectorsChart'));
        chart.draw(data, options);
        
        chartData = new Array();
        chartData.push(namesRowTrailing,amountRowTrailing);
        data = google.visualization.arrayToDataTable(chartData);
        
        chart = new google.visualization.ColumnChart(document.getElementById('trailingInspectorsChart'));
        chart.draw(data, options);
        /*if (parking == true)
        {
            document.getElementById("inspectorsWithoutReportDiv").innerHTML = "חניה";
        }
        else
        {
            document.getElementById("inspectorsWithoutReportDiv").innerHTML = "פיקוח עירוני";
        }*/
       /* $('#chartsPages').fotorama({
                                     width: "100%",
                                     //height: '100%',
                                     ratio: 1/1,
                                     arrows: false,
                                     click: false,
                                     loop: true,
                                     });*/
    }
    
    function getDoubleChecks()
    {
        connectedParking = false;
        var parkingServer = getCheckedValueFromList('parkingServerRadioButton');
        var timeMilisec=$('#datePickerStatistics').mobiscroll('getDate').getTime();
        var from = getBeginningOfTheDay(timeMilisec);
        var to =getEndOfTheDay(timeMilisec);
        var url = parkingServer+ACTION_GET_DOUBLE_CHECKS_PARKING + "projectId=" + parkingProjectId + "&from=" + from + "&to=" + from;
        console.log(url);
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = connectToParkingCallback;
        xmlhttp.open("GET",url,false);
        xmlhttp.send();
    }
    var doubleChecksTable;

    function getDoubleChecksCallback()
    {
        if (xmlhttp.readyState == 4)
        {
            if (xmlhttp.status == 200)
            {
                doubleChecksTable = xmlhttp.responseText.trim();
                document.getElementsByName("doubleChecksChart").innerHTML = doubleChecksTable;
            }
        }
    }