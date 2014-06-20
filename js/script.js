
    
    window.addEventListener('load', function() {FastClick.attach(document.body);}, false);

	var defaultLanguage='he';
	var xmlDoc;
	//var deviceLanguage = navigator.language || navigator.userLanguage || defaultLanguage;
	var deviceLanguage = defaultLanguage;
	var employeesCounter; 
	
	function isRTL()
	{
		if (deviceLanguage == 'he')
		{
			return true;
		}	
		else
		{
			return false;
		}
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
		
    if (deviceLanguage.substring(0,2).toLowerCase()=='he')
    {
        xmlDoc=loadXMLDoc("./languages/hebrewLabels.xml");
    }
    else
    {
        xmlDoc=loadXMLDoc("./languages/englishLabels.xml");
    }
	
    function firstLoad()
    {	
    	var tempCounter = localStorage.getItem("employeesCounter");
    	if (tempCounter == null || tempCounter === undefined) 
    	{
    		employeesCounter = 0;
    	}
    	else 
    	{
    		employeesCounter = tempCounter;
    	}
    	
    	if (isRTL())
    	{
    		document.getElementById("employeeNameInput").style.textAlign="right";
    	}
    	else
    	{
    		document.getElementById("employeeNameInput").style.textAlign="left";
    	}
		plantTags();
		displayList();
    }
    
    function plantTags()
    {
    	document.getElementById("addEmployeeButton").innerHTML=getTag("labelAddEmployeeButton");
    	document.getElementById("addButton").innerHTML=getTag("labelAddButton");
    	document.getElementById("clearAllEmployeesButton").innerHTML=getTag("labelClearAllEmployeesButton");
    	document.getElementById("calculateButton").innerHTML=getTag("labelCalculateButton");
    	document.getElementById("totalTipInput").placeholder=getTag("labelEnterTotalTip");
    	document.getElementById("employeeNameInput").placeholder=getTag("labelEmployeeNameInput");
    	
    	
    }
    
	function displayEmployeesList()
	{
		document.getElementById("addEmployeeDiv").style.display = "block";
	}
	
	function toggleDisplay(id,attribute)
	{
		if (attribute == null || attribute === undefined)
		{
			attribute = "block";
		}
		var e = document.getElementById(id);
		if (e.style.display != "none")
		{
			e.style.display = "none";
		}
		else 
		{
			e.style.display == attribute;
		}
	}
	
	function clearList()
	{
		if (confirm(getTag("labelAreYouSure")))
		{
			document.getElementById("employeesListDiv").innerHTML="";
			localStorage.clear();
			employeesCounter = 0;
			localStorage.setItem("employeesCounter",employeesCounter);
			
		}
	}

	function addEmployee()
	{
		var employeeName = document.getElementById("employeeNameInput").value;
		if (employeeName.trim() == "")
		{
			alert(getTag("labelPleaseEnterEmployeeName"));
		}
		else 
		{
			localStorage.setItem("employee"+employeesCounter,employeeName);
			
			var employeesList = document.getElementById("employeesListDiv");
			var xButton = document.createElement("button");
			xButton.className = "normalButton xButtonEmployee";
			xButton.id = "xbutton" + employeesCounter;
			xButton.innerHTML = "X";
			xButton.style.display = "inner-block";
			var employeeDiv = document.createElement("div");
			employeeDiv.className="singleEmployeeRow";
			employeeDiv.appendChild(xButton);
			employeeDiv.innerHTML += " " + localStorage.getItem("employee"+employeesCounter);
			employeeDiv.innerHTML += "<input id='tipInput" + employeesCounter + "' size='4' maxlength='4' style='float:right;width:15%' disabled/>";
			employeeDiv.innerHTML += " <input id='hourInput" + employeesCounter + "' placeholder='Enter Hour' type='number' size='2' maxlength='2' style='float:right; width:25%; margin-right:10px'/>";
			employeesList.appendChild(employeeDiv);
			document.getElementById("hourInput"+employeesCounter).placeholder = getTag('labelEnterHours');
			document.getElementById("tipInput"+employeesCounter).placeholder = getTag('labelTip');
			// employeesList.innerHTML += "<br/>";
			++employeesCounter;
			localStorage.setItem("employeesCounter",employeesCounter);
			document.getElementById("employeeNameInput").value = "";
			$( ".xButtonEmployee" ).click(function(){removeEmployee(this);});
		}
	}

	function displayList() 
	{
		var employeesList = document.getElementById("employeesListDiv");
		employeesList.innerHTML = "";
		for (var i=0; i<employeesCounter; ++i)
		{
			var xButton = document.createElement("button");
			xButton.className = "normalButton xButtonEmployee";
			xButton.id = "xbutton" + i;
			xButton.innerHTML = "X";
			xButton.style.display = "inner-block";
			// xButton.addEventListener("click", removeEmployee);
			var employeeDiv = document.createElement("div");
			employeeDiv.className="singleEmployeeRow";
			employeeDiv.appendChild(xButton);
			employeeDiv.innerHTML += " " + localStorage.getItem("employee"+i);
			employeeDiv.innerHTML += "<input id='tipInput" + i + "' size='4' maxlength='4' style='float:right;width:15%' disabled/>";
			employeeDiv.innerHTML += " <input id='hourInput" + i + "' placeholder='Enter Hour' type='number' size='2' maxlength='2' style='float:right; width:25%; margin-right:10px'/>";

			// employeesList.innerHTML += "<br/>";
			employeesList.appendChild(employeeDiv);
			document.getElementById("hourInput"+i).placeholder = getTag('labelEnterHours');
			document.getElementById("tipInput"+i).placeholder = getTag('labelTip');
			
		}
		$( ".xButtonEmployee" ).click(function(){removeEmployee(this);});
	}
	
	function removeEmployee(xButton) 
	{
		var index = xButton.id.substring("xbutton".length);
		if (confirm(getTag("labelAreYouSureYouWantToRemoveEmployee") + " " + localStorage.getItem("employee" + index) + "?")){
			var lastEmployee = localStorage.getItem("employee" + parseInt(employeesCounter-1));
			localStorage.setItem("employee" + index,lastEmployee);
			localStorage.removeItem("employee" + parseInt(employeesCounter-1));
			--employeesCounter;
			localStorage.setItem("employeesCounter",employeesCounter);
			displayList();
		}

	}
	
	function calculateTip()
	{
		var totalTip = document.getElementById("totalTipInput").value;
		if (totalTip.value == "")
		{
			alert(getTag("labelPleaseEnterTotalTip"));
			return;
		}
		if (isNaN(totalTip))
		{
			alert(getTag("labelEnterValidTotalTip"));
			return;
		}
		totalTip = parseInt(totalTip);
		if (totalTip <= 0)
		{
			alert(getTag("labelEnterValidTotalTip"));
			return;
		}
		var hourSum = parseInt(0);

		for (var i=0; i<employeesCounter; ++i) 
		{
			var employeeHour = Number(document.getElementById("hourInput"+i).value);
			if (employeeHour == "")
			{
				employeeHour = 0;
			}
			if (isNaN(employeeHour) || employeeHour<0) 
			{
				alert(getTag("labelPleaseEnterValidTip") + " " + localStorage.getItem("employee" + i));
				return;
			}
			hourSum += parseInt(employeeHour);
		}
		
		if (hourSum == 0)
		{
			alert(getTag("labelPleaseEnterEmployeeHour"));
			return;
		}
		
		for (var i=0; i<employeesCounter; ++i) 
		{
			var employeeHour = document.getElementById("hourInput"+i).value;
			var employeeTip = (employeeHour/hourSum)*totalTip;
			document.getElementById("tipInput"+i).value = employeeTip.toFixed(2);
		}
	}
