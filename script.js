				var map;
                var marker;
                var latlng;
                var lastCenter="";
                var city = "";
                var street = "";  
                var streetNum = "";
                var mapSpinner;
                var transitionSpinner;
        		var spinner;
				var i;
				var serverNum=7;
				var userId;
				var url;
				var actionResult;
				var enlarged;
				var openCommentBoxId='';
				var firstLoadActivationCheck=true;
				
				var commentForm;
				var regPageForm;
				var SOSForm;
				var reportForm;
				var uploadIframeId;
				var maxContacts=3;
				var contactsList=new Array(3);
				var contactsCounter=0;
				var myUser;
				var myUserSpan;
				
                var pictureSource;   // picture source
                var destinationType; // sets the format of returned value
				var photoCounter=0;
				var maxPhotos=3;				

            	var highlightedTab='SOSTab';
            	var currentPage='SOSPage';            	            	
            	var userStatus; //1-needs to register. 2-waiting for activation. 3-active user
           					
				for (i=0;i<contactsList.length;++i)
				{
					contactsList[i]=new Array(2);
				}	
			                 
                function ChangePage(pageID,tabID)
                {                	
					if (pageID!=currentPage)
					{
						ToggleDisplay(pageID,'block');
						ToggleDisplay(currentPage,'block');
						var newtab=document.getElementById(tabID);			
						newtab.style.borderBottomColor='#33B5E5';

						var oldtab=document.getElementById(highlightedTab);
						oldtab.style.borderBottomColor='#0099CC';
						
						highlightedTab=tabID;
						currentPage=pageID;
					}          	
                }
                																
			    function ChangeButtonToPressed()
			    {
			    	button=document.getElementById("SOSButton");
					button.src='./images/btn_sos_pressed.png';
			    }
			    function ChangeButtonToNormal()
			    {
					button=document.getElementById("SOSButton");
					button.src='./images/btn_sos_normal.png';		    	
			    }
			    
			    function GenerateGetMessagesUrl()
			    {
			    	url="http://62.0.66." + serverNum +":8080/getOnlineMessagesLogin.do?";
			    	
			    	url=AddParmameterToURL(url,'phoneNum',userId);
			    	url=AddParmameterToURL(url,'pin',userId);
			    	url=AddParmameterToURL(url,'ip',userId);
			    	
			    	url = url.substring(0, url.length - 1); //remove last ampersand
			    }


            	function GenerateRegUrl()
            	{
					url="http://62.0.66." + serverNum +":8080/addCivilianAgent.do?";
					
					var dob=document.getElementById('picker').value;
					var gender;
					if (document.getElementsByName('sex')[0].checked==true)
					{
						gender='M';
					}
					else
					{
						gender='F';
					}
					url=AddParmameterToURL(url,'projectId',116);
					url=AddParmameterToURL(url,'mail',email);
					url=AddParmameterToURL(url,'tel',phoneNumber);
					url=AddParmameterToURL(url,'dob',dob);
					url=AddParmameterToURL(url,'gender',gender);
					
					url = url.substring(0, url.length - 1); //remove last ampersand
            	}
            	

            	
            	function GenerateSOSUrl(position)
            	{  	
            		
					var mifgaNum=GenerateMifgaNum();
					var now=new Date();
					var locationStr=position.coords.latitude.toString() + '|' + position.coords.longitude.toString();
					var address=document.getElementById('addressBar').innerHTML;
					
					var addressUnicode= UnicodeString(address);
					url="http://62.0.66." + serverNum +":8080/addMifgaLoginJ2ME.do?";
					
					url=AddParmameterToURL(url,'mifgaNum',mifgaNum);
					url=AddParmameterToURL(url,'time',now.getTime());
					url=AddParmameterToURL(url,'ip',userId);
					url=AddParmameterToURL(url,'loc',locationStr);
					url=AddParmameterToURL(url,'numSat','1');
					url=AddParmameterToURL(url,'useCase','1');
					url=AddParmameterToURL(url,'useCaseId',mifgaNum);
					url=AddParmameterToURL(url,'gpsTime',now.getTime());
					url=AddParmameterToURL(url,'refId','1_');
					url=AddParmameterToURL(url,'acc','1');
					url=AddParmameterToURL(url,'viewNum','1');
					url=AddParmameterToURL(url,'phoneNum',userId);
					url=AddParmameterToURL(url,'pin',userId);
					url=AddParmameterToURL(url,'gf2',addressUnicode);
					url=AddParmameterToURL(url,'gf1',phoneNumber);
					url=AddParmameterToURL(url,'type','1');
					
					url = url.substring(0, url.length - 1); //remove last ampersand
					
            	}
            	
            	

					
                function GenerateReportUrl()
                {
					var crimeTimeMilisec=$('#scroller').mobiscroll('getDate').getTime();
					var mifgaNum=GenerateMifgaNum();
					var now=new Date();
					var locationStr=lastCenter.lat().toString() + '|' + lastCenter.lng().toString();
					var address=document.getElementById('addressBar').innerHTML;
					var addressUnicode= UnicodeString(address);
					var utf8Str=document.getElementById('descriptionBox').value;					
					var unicodeStr=UnicodeString(utf8Str);
				
					
					url="http://62.0.66." + serverNum +":8080/addMifgaLoginJ2ME.do?";
					
					url=AddParmameterToURL(url,'mifgaNum',mifgaNum);
					url=AddParmameterToURL(url,'subjectId',document.getElementById('subjectId').value);
					url=AddParmameterToURL(url,'time',now.getTime());
					url=AddParmameterToURL(url,'ip',userId);
					url=AddParmameterToURL(url,'loc',locationStr);
					url=AddParmameterToURL(url,'comment',unicodeStr);
					url=AddParmameterToURL(url,'ex221',crimeTimeMilisec);
					url=AddParmameterToURL(url,'numSat','2');
					url=AddParmameterToURL(url,'useCase','2');
					url=AddParmameterToURL(url,'useCaseId',mifgaNum);
					url=AddParmameterToURL(url,'gpsTime',crimeTimeMilisec);
					url=AddParmameterToURL(url,'refId','2_');
					url=AddParmameterToURL(url,'acc','2');
					url=AddParmameterToURL(url,'viewNum','2');
					url=AddParmameterToURL(url,'phoneNum',userId);
					url=AddParmameterToURL(url,'pin',userId);
					url=AddParmameterToURL(url,'gf1',phoneNumber);
					url=AddParmameterToURL(url,'gf2',addressUnicode);
					url = url.substring(0, url.length - 1); //remove last ampersand
							
					

                }

				function SendUrl(form)
				{
					form.style.opacity='0.5';
					transitionSpinner= new Spinner(transitionSpinnerOpts).spin(document.body);
					uploadIframe.onload=function() {GetActionResult(form);};
					form.setAttribute("action", url);
					form.submit();
					
				}
				function GetActionResult(form)
				{		

		            if (uploadIframe.contentDocument) 
		            {
		                actionResult = uploadIframe.contentDocument.body.innerHTML;
	            	} 
	            	else if (uploadIframe.contentWindow) 
	            	{
		                actionResult = uploadIframe.contentWindow.document.body.innerHTML;
		            } 
		            else if (uploadIframe.document) 
		            {
		                actionResult = uploadIframe.document.body.innerHTML;
		            }
					
					
					
					if (form.id=='SOSForm')
					{
						CheckActionResult(actionResult,5,SOSSuccessStr,SOSFailStr);
					}
					else if (form.id=='reportForm')
					{
						CheckActionResult(actionResult,5,reportSuccessStr,reportFailStr);
						
					}
					else if (form.id=='activationWaitForm')
					{
						var res=parseInt(actionResult);
						if (res==1)
						{	
							localStorage.setItem('userStatus',3);
							alert(checkActivationSuccessStr);	
							window.location.replace('MainPage.html');
						}
						else
						{
							if (firstLoadActivationCheck==true)
							{
								firstLoadActivationCheck=false;
							}
							else
							{
								alert(checkActivationFailStr);	
							}
						}
					} 
					else if (form.id=='regPageForm')
					{
						var res=CheckActionResult(actionResult,'1',registerSuccessStr,registerFailStr,1);
						if (res==true)
						{
							var n=actionResult.indexOf(':');
							var userIdStr=actionResult.substring(n+1,actionResult.length);
							userId=parseInt(userIdStr);
							localStorage.setItem('contactsCounter',0);
							localStorage.setItem('userId',userId);
							localStorage.setItem('userStatus',2);
							localStorage.setItem('phoneNum',phoneNumber);
							localStorage.setItem('email',email);
							window.location.replace('WaitForActivation.html');
						}						
					}
					else if (form.id=='messagesForm')
					{
						
						ParseMessages(actionResult);
					}
					else if (form.id=='commentForm')
					{
						var res=parseInt(actionResult);
						if (res==1)
						{	
							transitionSpinner.stop();
							alert(sendCommentSuccessStr);
							GetMessages();
						}
						else
						{
							alert(sendCommentFailStr);	
						}						
					}					
					else
					{
						alert('Unknown error');
					}
					form.style.opacity='1';
					transitionSpinner.stop();
				}
				
				function CompareStrings(str1,str2)
				{
					var len;
					if (str1.length < str2.length)
					{
						len=str1.length;
					}
					else
					{
						len=str2.length;
					}
					
					var log='';
					for (var i=0;i<len;++i)
					{
						if (str1.charAt(i)!=str2.charAt(i))
						{
							log+='position: ' + i +'; str1(' + i + '): ' +str1.charAt(i) +  '; str2(' + i + '): ' + str2.charAt(i) + '\n';
						}
					}
					alert(log);
				}
               
                function AddParmameterToURL(url,param,value)
                {
                	url+=param + '=' + value + '&';
                	return url;
                }
                
                function UnicodeString(str)
                {
                	var i;
                	var temp="";
                	for (i=0;i<str.length;++i)
                	{
                		temp+=str.charCodeAt(i);
                		temp+=';';
                	}
                	
                	return temp;
                }
                
                function GenerateMifgaNum()
                {
					var now=new Date();
					var mifgaNum=new String();
					
					var day=now.getDate();
					mifgaNum=AddPreZero(day,mifgaNum,2);
					mifgaNum+=day.toString();
					
					var month=now.getMonth()+1;
					mifgaNum=AddPreZero(month,mifgaNum,2);
					mifgaNum+=month.toString()+now.getFullYear().toString();
					
					var hour=now.getHours();
					mifgaNum=AddPreZero(hour,mifgaNum,2);
					mifgaNum+=hour.toString();
					
					var min=now.getMinutes();
					mifgaNum=AddPreZero(min,mifgaNum,2);
					mifgaNum+=min.toString();
					
					var milisec= now.getMilliseconds();
					mifgaNum=AddPreZero(milisec,mifgaNum,3);
					mifgaNum+=milisec.toString()+'0';
					
					return mifgaNum;
					              	
                }
				
				function AddPreZero(num,str,digits)	//adding pre zeroes to the string if necessary
				{
					var i;
					
					dec=1;
					for (i=1;i<digits;++i)
					{
						dec*=10;
						
					}
					while (num<dec && dec>=10)
					{
						str+='0';
						dec/=10;
							
					}
					return str;
				}			
				

				function ToggleDisplay(id,arg)
				{
					var toggledID = document.getElementById(id);
					if (toggledID.style.display == 'none') 
					{
						toggledID.style.display = arg;
					} 
					else 
					{
						toggledID.style.display = 'none';
					}
	
				}
                
                function TogglePhotoButtons()
                {
                    if (photoCounter<maxPhotos)
                    {
                            ToggleDisplay('addPhotoButtons','inline');
                    }
                    else
                    {
                            alert("You can only add " + maxPhotos + "photos.");                
                    }
                }
				function AddContact()
				{
					number=document.getElementById('contactNumber').value;
					if (isNumber(number))
					{
						name=document.getElementById('contactName').value;
						if (name.indexOf('/') == -1)
						{
							contactsList[contactsCounter][0]=name;
							contactsList[contactsCounter][1]=number;
							localStorage.setItem(contactsCounter, name + '/' + number );
		
							DisplaySingleContact(contactsCounter);												 
							contactsCounter++;
							localStorage.setItem('contactsCounter',contactsCounter);
							
							ToggleDisplay('addingContactField','table'); 
							if (contactsCounter<maxContacts)
							{
								ToggleDisplay('addbutton','inline');
							}
							document.getElementById('contactNumber').value="";
							document.getElementById('contactName').value="";
						}
						else
						{
							alert("'/' is not alowed.");
						}
						
					}
					else
					{
						alert("Please enter a valid number.");
					}
	
				}
				
				function isNumber(n) 
				{
	  				return !isNaN(parseFloat(n)) && isFinite(n);
				}
				
				function DisplaySingleContact(contactIndex)
				{	
					document.getElementById('contactsList').innerHTML+= "<tr> <td style='width:5%' class='center'> <img src='./images/x.png' class='icons'  onclick='DeleteContact(" +contactIndex +"); return false' style='float: none; padding-top:7px;'></td>  <td class='robo' style='width:45%;'>"
																		+ contactsList[contactIndex][0] + "</td> <td  style='width:50%' class='robo'> " + contactsList[contactIndex][1] + "</td> </tr>";
				}
				
				function DisplayContactList()
				{
					document.getElementById('contactsList').innerHTML="";
					for (i=0;i<contactsCounter;++i)
					{
						DisplaySingleContact(i);
					}
				}
				
				function CancelAdding()
				{
					ToggleDisplay('addingContactField','table'); 
					ToggleDisplay('addbutton','inline');
				}
				
				function DeleteContact(contactIndex)
				{
					var comfirmDeletion=confirm("Contact will be deleted.");
					if (comfirmDeletion==true)
					{
						for (i=contactIndex; i<contactsCounter-1; ++i)
						{
							
							localStorage.setItem(i,localStorage.getItem(i+1));
							contactsList[i][0]=contactsList[i+1][0];
							contactsList[i][1]=contactsList[i+1][1];
						}
						localStorage.removeItem(i);
						if (contactsCounter==3)
						{
							ToggleDisplay('addbutton','inline');
						}
						--contactsCounter;
						localStorage.setItem('contactsCounter',contactsCounter);
						DisplayContactList();
					}
				}
				
				function SOSLongPress()
				{
			
					GetLocation(SendLocationToPolice, onError);
				
					ChangeButtonToNormal();

				}
				
				function SendLocationToPolice(position)
				{
					GenerateSOSUrl(position);
					SendUrl(SOSForm);
				}

				
				function SOSShortPress()
				{
					ChangeButtonToNormal();
					$("#pressLongMessage").fadeTo(1000,1);
					setTimeout(function (){$("#pressLongMessage").fadeTo(1000,0);},3000);
		
				}                
                //************* end of general functions **************/
                
                
                
                
            	//************* camera functions *********************/

                                
                // Wait for device API libraries to load
                //
                document.addEventListener("deviceready",onDeviceReady,false);
            

                // device APIs are available
                //
                function onDeviceReady() 
                {
                    pictureSource=navigator.camera.PictureSourceType;
                    destinationType=navigator.camera.DestinationType;
                }
            
                // Called when a photo is successfully retrieved
                //
                function getPhoto(source) 
                {
                      // Retrieve image file location from specified source
                      
                      navigator.camera.getPicture(AddPhotoToFromLibrary, onFail, { quality: 50, encodingType: Camera.EncodingType.PNG,
                        destinationType: destinationType.FILE_URI,
                        sourceType: source });
                } 
                function TogglePicSize(id) 
                {
                  
						if (enlarged!='')
						{
							$('#' + enlarged).animate({
		
						   	 height:'60px',
							    width:'60px'
							 });
							 enlarged='';
						}
						
						if ($('#' + id).height()=='60')
						{
							$('#' + id).animate({
		
						   	 height:'200px',
							    width:'200px'
							 });
						  	enlarged=id;
						}
						else
						{
							$('#' + id).animate({
		
						   	 height:'60px',
							    width:'60px'
							 });
							 enlarged='';
						} 
				}
				
                function capturePhoto() 
                {

                      // Take picture using device camera and retrieve image as base64-encoded string
                      navigator.camera.getPicture(AddPhotoToFromCaption, onFail, { quality: 50,
                        destinationType: destinationType.DATA_URL });
                }         
                function AddPhotoToFromCaption(imageData) 
                {
					var photoSection=document.getElementById('photosSection');
					var smallImage=document.createElement('img');
					smallImage.className='photo';
					smallImage.id='img' + photoCounter;
					smallImage.src = "data:image/jpeg;base64," + imageData;
					smallImage.onclick=function (){TogglePicSize(smallImage.id);};
                    photoSection.appendChild(smallImage);
    	
                    ++photoCounter;
                                    	
        
            	}
                function AddPhotoToFromLibrary(imageURI) 
                {
					var photoSection=document.getElementById('photosSection');
					var smallImage=document.createElement('img');
					smallImage.className='photo';
					smallImage.id='img' + photoCounter;
					smallImage.src = imageURI;
					smallImage.onclick=function (){TogglePicSize(smallImage.id);};
                    photoSection.appendChild(smallImage);
    	
                    ++photoCounter;
        
            	}

            
                // Called if something bad happens.
                //
                function onFail(message) 
                {
                    if (message!='Camera cancelled.' && message!='Selection cancelled.')
                      {
                              alert('Failed because: ' + message);
                      }
                }
                //************* end of camera functions *********************/

                    
                //************ auto adjusting text box
                
                function adaptiveheight(a) 
                {
                    $(a).height(0);
                    var scrollval = $(a)[0].scrollHeight;
                    $(a).height(scrollval);
                    if (parseInt(a.style.height) > $(window).height()) {
                        if(j==0){
                            max=a.selectionEnd;
                        }
                        j++;
                        var i =a.selectionEnd;
                        console.log(i);
                        if(i >=max){
                            $(document).scrollTop(parseInt(a.style.height));
                        }else{
                            $(document).scrollTop(0);
                        }
                    }
                }
                //************ end of auto adjusting text box

                //************ beginning location functions
        
                             
                function GetAddress(position)
                {
                	
                    lat = parseFloat(position.coords.latitude);
                    lng = parseFloat(position.coords.longitude);
                    lastCenter = new google.maps.LatLng(lat, lng);
                    //littlespinner = new Spinner(bigSpinnerOpts).spin(document.body,500);
                    
                    CoordinatesToStrings(lastCenter);      	
                }
                
                function onError(error) 
                {
                    alert(        'Sending location failed\n'        +
                                    'code: '    + error.code    + '\n' +
                                  'message: ' + error.message + '\n');
                                  
                                   
                }      
                  
                function GetLocation(functionWhenSuccess)
                {
						
                    	navigator.geolocation.getCurrentPosition(functionWhenSuccess, onError);
      
                }
                
                function ChangeToMapPage()
                {
                	window.location.replace('MapPage.html');	
                }
                
                function ViewLocationOnMap()
                {
                    //spinner = new Spinner(bigSpinnerOpts).spin(document.getElementById('reportPage'));  
                    GetLocation(ShowMap,onError);  
                                          
                }
                
				function CloseMap()
				{
                    var lat = marker.getPosition().lat();
                    var lng = marker.getPosition().lng();

                    lastCenter = new google.maps.LatLng(lat, lng);

					window.location.replace('MainPage.html');
					CoordinatesToStrings(lastCenter);
				}
				
                function ShowMap(position)
                {
					//window.location.replace('MapPage.html');
                    if (lastCenter=="")
                    {
                            lastCenter=new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    }

                    var mapOptions = 
                    {
                                zoom: 15,
                            center: lastCenter,
                            mapTypeId:google.maps.MapTypeId.ROADMAP
                    };

                    map = new google.maps.Map(document.getElementById('mapDisplay'),mapOptions);
                    map.setCenter(lastCenter);     
                    //google.maps.event.trigger(map, 'resize');                   
	                ToggleMap();
	                AddMarkerByCoordinates(lastCenter);
	                //spinner.stop();
                }
                
                function AddMarkerByCoordinates(latlng)
                {
                    marker = new google.maps.Marker({
                                position: latlng,
                                map: map,
                                draggable:true
                            });
                }
                
                function ToggleMap()
                {
                    mapID=document.getElementById('mapDisplay');                                
                    if (mapID.style.display=="none")
                    {
                    	ToggleDisplay('mapDisplay','inline'); 
                        ToggleDisplay('reportPage','block');                        
                        ToggleDisplay('topMenu','inline');
                        ToggleDisplay('closeMapButton','inline');    
                        
                        lastCenter=map.getCenter(); 
                        google.maps.event.trigger(map, 'resize');
                        map.setCenter(lastCenter);

                    }
                    else        
                    {
                        ToggleDisplay('mapDisplay','inline');
                        ToggleDisplay('reportPage','block');
                        ToggleDisplay('closeMapButton','inline');
                        ToggleDisplay('topMenu','inline');
                        
                        //updates the city and country
                        var lat = marker.getPosition().lat();
                        var lng = marker.getPosition().lng();

                        lastCenter = new google.maps.LatLng(lat, lng);
                        
						
                        CoordinatesToStrings(lastCenter);
                    }
                        
                }
				
                function CoordinatesToStrings(latlng)
                {
						
                        geocoder = new google.maps.Geocoder();
                        geocoder.geocode({'latLng': latlng}, 
                                        function(results, status) 
                                        {
                                                  
                                            if (status == google.maps.GeocoderStatus.OK) 
                                            {
                                                    if (results[0]) 
                                                    {
                                                        var result = results[0];
                                
                                                        for(var i=0, len=result.address_components.length; i<len; i++) 
                                                        {
                                                            var ac = result.address_components[i];
                                                            if(ac.types.indexOf("street_number") >= 0) 
                                                            {
                                                                streetNum = ac.long_name;
                                                                
                                                            }
                                                            if(ac.types.indexOf("route") >= 0) 
                                            				{
                                            					street = ac.long_name;
                                            					
                                            				}
                                                            if(ac.types.indexOf("locality") >= 0) 
                                                            {
                                                                city = ac.long_name;       
                                                                    
                                                            }
                                                		}
                                                		
                                                		addressBar=document.getElementById("addressBar");
                                        
											            if (street!="")
											            {
											                addressBar.innerHTML=street;
											                if (streetNum!="")
											                {
											                	addressBar.innerHTML+=" " + streetNum;
											                }
											                if (city!="")
											                {
											                    addressBar.innerHTML+=", " + city;
											                }
											            
											            }
											            else
											            {
											                if (city!="")
											                {
											                    addressBar.innerHTML=city;
											                }
											                else
											                {
											                	addressBar.innerHTML+="Unknown location <br/>";
											            	}
											            }		
                                    
                                                    }
                                                    else 
                                                    {
                                                        alert("Error in finding location");
                                                    }
                                                } 
                                                else 
                                                {
                                                    alert("Error: " + status);
                                                }
                                                
                                                
                                          });                                  				
                          // littlespinner.stop();               
				}
                                    
                //************ end of location functions
				function PrintDate() 
				{
                        var now=new Date();
						var dateString=new String();
						
						var day=now.getDate();
						dateString=AddPreZero(day,dateString,2);
						dateString+=day.toString()+'/';
						
						var month=now.getMonth()+1;
						dateString=AddPreZero(month,dateString,2);
						dateString+=month.toString()+ '/' + now.getFullYear().toString()  + ' ';
						
						var hour=now.getHours();
						dateString=AddPreZero(hour,dateString,2);
						dateString+=hour.toString() + ':';
						
						var min=now.getMinutes();
						dateString=AddPreZero(min,dateString,2);
						dateString+=min.toString();

													
                        picker=document.getElementById('scroller');
                        picker.value=dateString;
				}


                //****************** spinner options *****************/
                
                var bigSpinnerOpts = 
                {
                  	lines: 9, // The number of lines to draw
                  	length: 6, // The length of each line
                  	width: 4, // The line thickness
                  	radius: 7, // The radius of the inner circle
                  	corners: 1, // Corner roundness (0..1)
                  	rotate: 0, // The rotation offset
                  	direction: 1, // 1: clockwise, -1: counterclockwise
                  	color: '#000', // #rgb or #rrggbb or array of colors
                  	speed: 1, // Rounds per second
                  	trail: 44, // Afterglow percentage
                  	shadow: false, // Whether to render a shadow
                  	hwaccel: false, // Whether to use hardware acceleration
                  	className: 'spinner', // The CSS class to assign to the spinner
                  	zIndex: 2e9, // The z-index (defaults to 2000000000)
                  	top: 'auto', // Top position relative to parent in px
                  	left: 'auto' // Left position relative to parent in px
                };
                
                var transitionSpinnerOpts = 
                {
					lines: 10, // The number of lines to draw
					length: 6, // The length of each line
					width: 4, // The line thickness
					radius: 7, // The radius of the inner circle
					corners: 1, // Corner roundness (0..1)
					rotate: 0, // The rotation offset
					direction: 1, // 1: clockwise, -1: counterclockwise
					color: '#000', // #rgb or #rrggbb or array of colors
					speed: 1, // Rounds per second
					trail: 60, // Afterglow percentage
					shadow: false, // Whether to render a shadow
					hwaccel: false, // Whether to use hardware acceleration
					className: 'spinner', // The CSS class to assign to the spinner
					zIndex: 2e9, // The z-index (defaults to 2000000000)
					top: '50%', // Top position relative to parent in px
					left: '50%', // Left position relative to parent in px
					position: 'fixed'
                };

				function LoadContactsFromStorage()
				{
					var contact;
					var n;
					var len;
					if (!localStorage.getItem('contactsCounter'))
					{
						contactsCounter=0;
					}
					else
					{
						contactsCounter=localStorage.getItem('contactsCounter');
						for (i=0;i<contactsCounter;++i)
						{
							contact=localStorage.getItem(i);
							n=contact.indexOf('/');
							len=contact.length;
							contactsList[i][0]=contact.substring(0,n);
							contactsList[i][1]=contact.substring(n+1,len);
						}
					}

				}
				
				function HighLightUL(ULID)
				{
					document.getElementById(ULID).style.borderColor="#33b5e5";

				}
				
				function DeHighLightUL(ULID)
				{
					document.getElementById(ULID).style.borderColor="#a9a9a9";

				}
				
				var phoneNumber="";
				var email="";
				var birthDate="";
				var emailError;
				var phoneNumberError;
				var birthDateError;
				
				function ValidatePhone() 
				{
					num=document.getElementById('phoneNumber').value;
				    phoneNumberError = "";
				    //var stripped = num.replace(/[\(\)\.\-\ ]/g, '');     
				
				   if (num == "") {
				        phoneNumberError = "Required field";
				       
				    } else if (isNumber(num)==false) {
				        phoneNumberError = "The phone number contains illegal characters";
				       
				    } else if (num.length > 15 || num.length<9) {
				        phoneNumberError = "The phone number is the wrong length";
				       
				    } 
				    if (phoneNumberError!='')
				    {
				    	document.getElementById('numberAttention').style.display='inline';
				    	phoneNumber="";
				    	return false;

				    }
				    else
				    {
				    	document.getElementById('numberAttention').style.display='none';
				    	phoneNumber=num;
				    	return true;
				    }
				    
				}
				
				function EmailValidation()
				{
					var mail=document.getElementById('email').value;
					emailError="";
					var atpos=mail.indexOf("@");
					var atsecpos=mail.lastIndexOf("@");
					var dotpos=mail.lastIndexOf(".");
					if (mail=="")
					{
						emailError="Required field";
					} else
					if (atpos<1 || dotpos<atpos+2 || dotpos+2>=mail.length || atpos!=atsecpos)
				  	{
					  	emailError="Not a valid e-mail address";
				  	}
				  	if (emailError!='')
				  	{
					  	document.getElementById('emailAttention').style.display='inline';
					  	email="";
					  	return false;				  		
				  	}
				  	else
				  	{
				  		document.getElementById('emailAttention').style.display='none';
				  		email=mail;
				  		return true;
				  	}
				  	
				}
              	var today=new Date();
				
				function ShowRegButton()
				{
					if (document.getElementById('termsCheck').checked == true)
					{
						$('#regButton').slideDown();
						
					}
					else
					{
						$('#regButton').slideUp(100);
					}

				}
              	

				function CheckDate()
				{
					
					birthDateError="";
					d=document.getElementById('picker').value;
					if (d=='')
					{
						birthDateError='Required field';
					}
					if (birthDateError=='')
					{
						document.getElementById('dateAttention').style.display='none';
						birthDate=d;
						return true;
					}
					else
					{
						document.getElementById('dateAttention').style.display='inline';
						birthDate='';
						return false;
					}
					
				}
				function HideElement(id)
				{
					document.getElementById(id).style.display='none';
				}
				
				function ShowBubble(id,errorMsg)
				{
					if(document.getElementById(id).style.display=='none')
					{
						document.getElementById(id).innerHTML=errorMsg;
						$('#' + id).slideDown();
					}
				}
				
				function ToggleCheck()
				{
					document.getElementById('termsCheck').checked=!document.getElementById('termsCheck').checked;
				}
				
				function Register()
				{
					var check=true;
					if (ValidatePhone()==false)
					{		
						check=false;
					   	$('html, body').animate({
					        scrollTop: $("#phoneNumberSection").offset().top
					    }, 500);
					}
					if (EmailValidation()==false)
					{
						if (check==true)
						{
							check=false;
						   	$('html, body').animate({
						        scrollTop: $("#emailSection").offset().top
						    }, 500);
					    }
					}
					
					if (CheckDate()==false)
					{
						if (check==true)
						{
							check=false;
						   	$('html, body').animate({
						        scrollTop: $("#dateSection").offset().top
						    }, 500);
					    }
					}
					if (check==true)
					{
						var sex;
						if (document.getElementsByName('sex')[0].checked==true)
						{
							sex=document.getElementsByName('sex')[0].value;
						
						}
						else
						{
							sex=document.getElementsByName('sex')[1].value;
						}
						
						GenerateRegUrl();
						SendUrl(regPageForm);
														
					}
					else
					{
						alert('Please fill all the fields with a valid data');
					}
					
				}
				
				var sendCommentSuccessStr="Your comment has been received";
				var sendCommentFailStr="Sending comment failed";
				var checkActivationSuccessStr="Email confirmed, your acount has been activated";
				var checkActivationFailStr="Your acount has not been confirmed. Please check your email for activation";
				var registerSuccessStr="Your details has been received. Check your email for activation";
				var registerFailStr="An error occured";
				var reportSuccessStr='Report sent successfuly';
				var reportFailStr='Failed to send report';
				var SOSSuccessStr='Your location has sent to the local police and to your contact circle';
				var SOSFailStr='Failed to send SOS';
				//var times=0;
				function CheckActionResult(resStr,successValue,msgWhenSuccess,msgWhenFail,offset)
				{
					if (resStr===undefined || resStr=='')
					{
						alert(msgWhenFail);
						return false;
					}
					else
					{
						times=0;
			            var pos=resStr.indexOf(':');
			            
						if (offset==='undefined')
						{
				            if (resStr.charAt(pos-1)==successValue)
				            {
				            	alert(msgWhenSuccess);
				            	return true;
				            }
				            else
				            {
				            	alert(msgWhenFail);
				            	return false;
				            }		
				            
			            }
			            else
			            {
				            if (resStr.charAt(pos-1-offset)=='-')
				            {
				            	alert(msgWhenFail);
				            	return false;
				            }
				            else
				            {
					            if (resStr.charAt(pos-1)==successValue)
					            {
					            	alert(msgWhenSuccess);
					            	return true;
					            }
					            else
					            {
					            	alert(msgWhenFail);
					            	return false;
					            }	
	
				            }		
			            }		  
			    	}
    	
				}
				
				function SubmitCrime()
				{
					GenerateReportUrl();
					SendUrl(reportForm);
					
				}
				
				function WaitForActivationOnLoad()
				{
					uploadIframe=document.getElementById('uploadIframe');
					GenerateCheckActivationUrl();
					CheckActivation();
				}
				
				function CheckActivation()
				{
					SendUrl(activationWaitForm);
										
				}
				function GenerateCheckActivationUrl()
				{
					url="http://62.0.66." + serverNum +":8080/checkAgentActivation.do?";
					url+='agentId='+localStorage.getItem('userId');
				}			

            	var maxMessages=5;
            	function ParseMessages(wholeString)
            	{
            		var messageCounter=0;
            		var msgContent;
            		var msgId;
            		var msgTime;
            		var msgDiv;
            		var commentCounter;
            		var commentsSection;
            		var commentDiv;
            		var userSpan;
            		var commentTime;
            		var timeSpan;
            		var commentsString;
            		var messageCounterTimeLine;
            		var userCommentBox;
            	
            		var tempId;
            		var ulId;
        			
        			wholeString.replace('<body>','');
        			wholeString.replace('</body>','');
        			                		
            		while (wholeString.indexOf('<message>')!=-1)
            		{
            			//creating message box
            			msgDiv=document.createElement('div');
            			msgDiv.className='msgBox';
            			//get id from string
            			msgId=GetTagContent(wholeString,'id');              			
            			msgDiv.id='msg' + msgId;
            			
            			//cut the id tag from the string	
            			wholeString=CutWholeNextTag(wholeString,'id');
            			
            			//get time from string
            			msgTime=GetTagContent(wholeString,'time');

            			//cut the time tag from the string
						wholeString=CutWholeNextTag(wholeString,'time');
						
            			//creating timespan
            			timeSpan=document.createElement('span');
            			timeSpan.className='messageBlueRight';
            			timeSpan.innerHTML=MilisecToTime(msgTime);
            			                			
            			//creating the comment section
            			commentCounter=0;
            			commentsSection=document.createElement('div');
            			commentsSection.id='comments' + msgId;
            			commentsSection.className='commentsSectionBox';
            			commentsSection.style.display='none';
            			
            			
            			commentsString=GetTagContent(wholeString,'message');
            			while (commentsString.indexOf('<comment>')!=-1)
            			{
            				//creating single comment box
            				commentDiv=document.createElement('div');
            				//commentDiv.className='commentBox';
            				commentDiv.className='commentBubble';
            				
            				//creating the userspan
            				userSpan=document.createElement('div');
            				userSpan.className='messageBlueLeft';
            				userSpan.innerHTML=CutUserFromMail(GetTagContent(commentsString,'user'));
            				commentsString=CutWholeNextTag(commentsString,'user');
            				
							
            				//creating the commenttime span
            				commentTime=document.createElement('div');
            				commentTime.className='messageBlueRight';
            				commentTime.innerHTML=MilisecToTime(GetTagContent(commentsString,'time'));
            				commentsString=CutWholeNextTag(commentsString,'time');
            				
            				//appending user and time to the comment
            				commentDiv.appendChild(userSpan);
            				commentDiv.appendChild(commentTime);
            				//adding the comment body
            				commentDiv.innerHTML+='<br/>' + GetTagContent(commentsString,'comment');
            				
            				//cut the whole comment tag
            				commentsString=CutWholeNextTag(commentsString,'comment');
            				wholeString=CutWholeNextTag(wholeString,'comment');

            				//append the comment box to the comment section
            				commentsSection.appendChild(commentDiv);
            				
            				//increment comment counter
            				++commentCounter;
            			}

						//get the body of the message from the string (whats left from the tag)
            			msgContent=GetTagContent(wholeString,'message');
            			
						//putting the message body inside the box
            			msgDiv.innerHTML=msgContent +'<br/>';
            			            			
            			//creating user comment box
            			userCommentBox=document.createElement('div');
            			userCommentBox.className='commentBubble';
            			                		
            			
            			
            			//adding all elements
            			userCommentBox.appendChild(myUserSpan);
            			userCommentBox.innerHTML+='<br/>';
            			tempId='textArea'+ msgId;
            			ulId='comUl'+ messageCounter;
            			userCommentBox.innerHTML+="<div class='msgCommentDiv'><textarea id=" + tempId +  " class='autoResizeTextBox' style='display:block; margin-top:5px;' onblur='DeHighLightUL("+'"' + ulId + '"' +");' onfocus='HighLightUL("+'"' + ulId + '"' +");'></textarea>"
            			 + "<div id=" + ulId + " class='textEditUnderLine' > </div></div>";
						userCommentBox.innerHTML+="<button class='sendCommentButton' onclick='SendComment(" + msgId + "," + '"' +tempId +'"' + ")'>Send</button>";
						
						//adding my comment box to the comment section
						commentsSection.appendChild(userCommentBox);
            			
            			//cut the whole message tag
            			wholeString=CutWholeNextTag(wholeString,'message');
            			
            			//creating the comment counter span
            			commentCounterSpan=document.createElement('div');
            			commentCounterSpan.className='messageBlueLeft';
            			commentCounterSpan.innerHTML=commentCounter + ' comments';
						
						//creating comments counter and time line
						messageCounterTimeLine=document.createElement('div');
						//adding the timespan to the message
						messageCounterTimeLine.appendChild(timeSpan);
						//adding the commentcounter
						messageCounterTimeLine.appendChild(commentCounterSpan);

            			//adding the counter and time line to the message box
						msgDiv.appendChild(messageCounterTimeLine);
						//adding the commentsection to the message
						msgDiv.appendChild(commentsSection);
            			
            			//adding the whole message including the comments
            			messagesSection.appendChild(msgDiv);
            			

            			++messageCounter;
            		}

 					$('.msgBox').click(function (e)
					{
						commentBoxId=(this.id.toString()).replace('msg','comments');
						var commentBox = $('#' + commentBoxId);
						
						var allComments=$('.commentsSectionBox');
						if (!allComments.is(e.target) && allComments.has(e.target).length === 0)
						{
							allComments.slideUp();

							if (commentBoxId!=openCommentBoxId)
							{
								$('#' + commentBoxId).slideDown();
								openCommentBoxId=commentBoxId;
							}
							else
							{
								openCommentBoxId='';
							}
							
						}
		
					});
					            		
					$(".autoResizeTextBox").keyup(function (e) 
	                {
	                    adaptiveheight(this);
	                });	
	                
            	}            					
				
	
				function ToggleComments(commentId)
				{
					alert(commentId);
				}
				function SendComment(msgNum,textAreaId)
				{
					var message=document.getElementById(textAreaId).value;
					GenereteSendingCommentUrl(message,msgNum);
					//document.body.innerHTML += url;
					SendUrl(commentForm);
					
				}
				
            	function GenereteSendingCommentUrl(message,msgId)
        		{
            		url="http://62.0.66." + serverNum +":8080/addCommentToMessage.do?";
            		

			    	url=AddParmameterToURL(url,'projectId','116');
			    	url=AddParmameterToURL(url,'comment',message);
			    	url=AddParmameterToURL(url,'agentId',userId);
			    	url=AddParmameterToURL(url,'pin',userId);
			    	url=AddParmameterToURL(url,'messageId',msgId);
			    	
			    	url = url.substring(0, url.length - 1); //remove last ampersand

        		}
        		
                function FirstLoad()
                {
            		firstIframeLoad=false;
                	document.getElementById('SOSTab').style.borderBottomColor='#33B5E5';
	                GetLocation(GetAddress);
	                
					LoadContactsFromStorage();
					DisplayContactList();
					if (contactsCounter==3)
					{
						ToggleDisplay('addbutton','inline');
					}
                	PrintDate();
                	
                	commentForm=document.getElementById('commentForm');
                	messagesForm=document.getElementById('messagesForm');
                	SOSForm=document.getElementById('SOSForm');
                	reportForm=document.getElementById('reportForm');
                	uploadIframe=document.getElementById('uploadIframe');
                	messagesSection=document.getElementById('messagesSection');
            	
            		phoneNumber=localStorage.getItem('phoneNum');
            		userId=localStorage.getItem('userId');
            		email=localStorage.getItem('email');
            		
                	//email='tomerglix@gmail.com';
                	//phoneNumber='0502712252';
                	//userId='572297716';

            		myUser=CutUserFromMail(email);

        			//creating the username span
        			myUserSpan=document.createElement('div');
        			myUserSpan.className='messageBlueLeft';
        			myUserSpan.innerHTML=myUser;	           
            	
            		GetMessages();
                }
                
            	var strhard;
            	function GetMessages()
            	{
            		messagesSection.innerHTML="";
            		GenerateGetMessagesUrl();
            		//document.body.innerHTML+=url;
            		//strhard='<document><message><id>20</id><time>1386597393887</time><body>Monday Dec-09, Testing SOS v2 ENA</body><comment><user>tomer@lola-tech.com</user><time>1387884445639</time><body>tomer test</body></comment><comment><user>enunez@pelesystem.com</user><time>1386597544996</time><body>Ok you`re stiil testing SOS App</body></comment></message><message><id>19</id><time>1386461581278</time><body>I`m still testing the application app</body><comment><user>tomer@lola-tech.com</user><time>1387886718639</time><body>Test 2</body></comment><comment><user>lolatech.com@gmail.com</user><time>1386519129387</time><body>2</body></comment><comment><user>lolatech.com@gmail.com</user><time>1386515564559</time><body>test</body></comment></message><message><id>18</id><time>1386460441559</time><body>In Oune hour I am completed the QA testing fron tghe APP</body><comment><user>enunez@pelesystem.com</user><time>1386460564012</time><body>Ok I am waiting for the app</body></comment></message><message><id>17</id><time>1386459478403</time><body>Test Message number 3 from Eduardo</body><comment><user>enunez@pelesystem.com</user><time>1386460359496</time><body>Ok the "NAVIDAD SEGURA" from La Molina its almost ready</body></comment><comment><user>enunez@pelesystem.com</user><time>1386460107543</time><body>Ok it is a back message fro ok</body></comment></message><message><id>16</id><time>1386458491262</time><body>Second Test Message from Eduardo 6:20pm Saturday Dic-06</body></message></document>';
            		//ParseMessages(strhard);
            		SendUrl(messagesForm);
				}
            	
            	
            	function CutUserFromMail(fullMail)
            	{
            		n=fullMail.indexOf('@');
            		var user=fullMail.substring(0,n);
            		return user;
            	}
            	function CutWholeNextTag(str,tag)
            	{
            		var beginTag;
            		var endTag;
            		var beforeTagLocation;
            		var afterTagLocation;
            		var beforeTagStr;
            		var afterTagStr;
            		
            		beginTag='<' + tag + '>';
            		//alert('beginTag' + beginTag );
            		endTag='</' + tag + '>';
            		//alert('endTag' + endTag );
            		               		
            		beforeTagLocation=str.indexOf(beginTag);
            		//alert('beforeTagLocation' + beforeTagLocation );
            		
            		afterTagLocation=str.indexOf(endTag)+endTag.length;
            		//alert('afterTagLocation' + afterTagLocation );
            		
            		beforeTagStr=str.substring(0,beforeTagLocation);
            		//alert('beforeTagStr' + beforeTagStr );
            		
            		afterTagStr=str.substring(afterTagLocation,str.length);
            		//alert('afterTagStr' + afterTagStr );
            		
            		str=beforeTagStr + afterTagStr;
            		return str;
            		
            	}
            	function GetTagContent(str,tag)
            	{
            		var beginTag;
            		var endTag;
            		var start;
            		var end;
            		var content;
            		
            		beginTag='<' + tag + '>';
            		endTag='</' + tag + '>';
            		start=str.indexOf(beginTag)+beginTag.length;
            		end=str.indexOf(endTag);
            		
            		content=str.substring(start,end);
            		

            		return content;
            		
            	}
            	
            	function MilisecToTime(timeMilisec)
            	{

            		var time=new Date(Number(timeMilisec));
					var month= time.getMonth()+1;
            		var timeStr=time.getDate() + '/' + month+ '/' + time.getFullYear();

					return timeStr;
            	}

/******************** storage format *****************************
/*
--------------------------------
 KEY				| VALUE	   |
--------------------------------
 0 					| contact0 |
--------------------------------
 1 					| contact1 |
--------------------------------
 2 					| contact2 |
--------------------------------
 'contactscounter'	| contactscounter
--------------------------------
 'userId			| ID
--------------------------------
 'userStatus' 		| userStatus
--------------------------------
 'phoneNum'			| phone number
--------------------------------
 'email'			| user email
*/
