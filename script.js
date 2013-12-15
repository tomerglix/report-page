				var map;
                var marker;
                var latlng;
                var lastCenter="";
                var city = "";
                var street = "";  
                var streetNum = "";
        		var spinner;
				var i;
				
				var maxContacts=3;
				var contactsList=new Array(3);
				var contactsCounter=0;
				
                var pictureSource;   // picture source
                var destinationType; // sets the format of returned value
				var photoCounter=0;
				var maxPhotos=3;				

            	var highlightedTab='SOSTab';
            	var currentPage='SOSPage';     
            					
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

            	
                function SubmitCrime()
                {
					/*alert(document.getElementById('picker').value + "\n" + 
					document.getElementById('autoResizeTextBox').value);*/

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
							localStorage.setItem(maxContacts+1,contactsCounter);
							
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
					document.getElementById('contactsList').innerHTML+= "<tr> <td style='width:5%' class='center'> <img src='./images/x.png' class='icons'  onclick='DeleteContact(" +contactIndex +"); return false' ></td>  <td style='width:45%;'>"
																		+ contactsList[contactIndex][0] + "</td> <td  style='width:50%'> " + contactsList[contactIndex][1] + "</td> </tr>";
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
						localStorage.setItem(maxContacts+1,contactsCounter);
						DisplayContactList();
					}
				}
				
				function SOSLongPress()
				{
			
					spinner = new Spinner(HugeSpinnerOpts).spin(document.getElementById('buttonSection'));  
					GetLocation(SendLocationToPoliceAndContacts, onError);
				
					ChangeButtonToNormal();

				}
				
			    function SendLocationToPoliceAndContacts(position) 
			    {
			    	spinner.stop();
			    	alert(	"Coordinates:\n" +
			    			"Latitude: "	+ position.coords.latitude 	+ "\n" +
			    			"Longitude: "		+ position.coords.longitude + "\n\n" +
			    			"Your'e location has been sent to the local police.\n");
			    	
		
			    }
				
				function SOSShortPress()
				{
					ChangeButtonToNormal();
					$("#pressLongMessage").fadeTo(2000,1);
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
                      navigator.camera.getPicture(AddPhotoToFromLibrary, onFail, { quality: 50, 
                        destinationType: destinationType.FILE_URI,
                        sourceType: source });
                }  
                function capturePhoto() 
                {
                	 spinner = new Spinner(smallSpinnerOpts).spin(document.getElementById('addPhotoButtons'));
                      // Take picture using device camera and retrieve image as base64-encoded string
                      navigator.camera.getPicture(AddPhotoToFromCaption, onFail, { quality: 50,
                        destinationType: destinationType.DATA_URL });
                    spinner.stop();
                }         
                function AddPhotoToFromCaption(imageData) 
                {
                	spinner.stop();
                    var photoSection=document.getElementById('photosSection');
    
                    photoSection.innerHTML+="<img style='display:inline;width:60px;height:60px;padding:4px;' id='img" + photoCounter + "' />";
    
                    var smallImage = document.getElementById('img'+ photoCounter);
    
                    smallImage.src = "data:image/jpeg;base64," + imageData;
                    ++photoCounter;
        
            	}
                function AddPhotoToFromLibrary(imageURI) 
                {
                    var photoSection=document.getElementById('photosSection');
    
                    photoSection.innerHTML+="<img style='display:inline;width:60px;height:60px;padding:4px;' id='img" + photoCounter + "' />";
    
                    var smallImage = document.getElementById('img'+ photoCounter);
    
                    smallImage.src = imageURI;
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
                      spinner.stop();
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
                    CoordinatesToStrings(lastCenter);
                   	//spinner.stop();
                }
                
                function onError(error) 
                {
                	alert("1");
                    alert(        'Sending location failed\n'        +
                                    'code: '    + error.code    + '\n' +
                                  'message: ' + error.message + '\n');
                }      
                  
                function GetLocation(functionWhenSuccess)
                {
						
                    	navigator.geolocation.getCurrentPosition(functionWhenSuccess, onError);
      
                }
                
                
                function ViewLocationOnMap()
                {
                    spinner = new Spinner(bigSpinnerOpts).spin(document.getElementById('reportPage'));  
                    GetLocation(ShowMap,onError);                           
                }

                function ShowMap(position)
                {

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
                                                    
	                ToggleMap();
	                AddMarkerByCoordinates(lastCenter);
	                spinner.stop();
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
                    	ToggleDisplay('closeMapButton','inline');     
                        ToggleDisplay('reportData','inline');
                        ToggleDisplay('mapDisplay','inline');
                        ToggleDisplay('topMenu','inline');
                        
                        lastCenter=map.getCenter(); 
                        google.maps.event.trigger(map, 'resize');
                        map.setCenter(lastCenter);

                    }
                    else        
                    {
                        ToggleDisplay('mapDisplay','inline');
                        ToggleDisplay('reportData','inline');
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
                                                                                      				
                                          
				}
                                    
                //************ end of location functions
				function PrintDate() 
				{
                      navigator.globalization.dateToString(
                        new Date(),
                        function (date) 
                        { 
                        	var temp;
                        	var month;
                        	var year;
                        	var hour12;
                        	var hour24;
                        	var min;
                        	
                        	day=date.value[0]+date.value[1];
                        	month=date.value[3]+date.value[4];
							year=date.value[6]+date.value[7]+date.value[8]+date.value[9];
							hour12=date.value[11]+date.value[12];
							min=date.value[14]+date.value[15];
							hour24=parseInt(hour12);
							if (date.value[16]=='P')
							{
								hour24+=12;
							}
							var dateString=day + '/' + month + '/' + year + ' ' + hour24 + ':' + min;			
														
                            picker=document.getElementById('scroller');
                            picker.value=dateString;


                        },
                        function () {alert('Error getting dateString\n');},
                        {formatLength:'short', selector:'date and time'}
                      );
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
                
                var smallSpinnerOpts = 
                {
					lines: 9, // The number of lines to draw
					length: 3, // The length of each line
					width: 2, // The line thickness
					radius: 3, // The radius of the inner circle
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
					top: 'auto', // Top position relative to parent in px
					left: 'auto' // Left position relative to parent in px
                };
                            
				var HugeSpinnerOpts = 
				{
				  lines: 13, // The number of lines to draw
				  length: 13, // The length of each line
				  width: 6, // The line thickness
				  radius: 13, // The radius of the inner circle
				  corners: 1, // Corner roundness (0..1)
				  rotate: 0, // The rotation offset
				  direction: 1, // 1: clockwise, -1: counterclockwise
				  color: '#000', // #rgb or #rrggbb or array of colors
				  speed: 0.9, // Rounds per second
				  trail: 58, // Afterglow percentage
				  shadow: false, // Whether to render a shadow
				  hwaccel: false, // Whether to use hardware acceleration
				  className: 'spinner', // The CSS class to assign to the spinner
				  zIndex: 2e9, // The z-index (defaults to 2000000000)
				  top: 'auto', // Top position relative to parent in px
				  left: 'auto' // Left position relative to parent in px
				};                 
				

				function LoadContactsFromStorage()
				{
					var contact;
					var n;
					var len;
					if (!localStorage.getItem(maxContacts+1))
					{
						contactsCounter=0;
					}
					else
					{
						contactsCounter=localStorage.getItem(maxContacts+1);
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
					mail=document.getElementById('email').value;
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
				function OnRegLoad()
				{

					
				}

				
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
						
						
						alert("Tel: " + phoneNumber + "\n" +
								"Email: " + mail + "\n" +
								"Birth date: " + birthDate +"\n" +
								"Sex: " + sex + "\n");
					}
				}
				
				function BeforeSumbit()
				{
					if (true)	//if all inputs are valid
					{
						return true;
					}
					return false;
				}

//onfocus="document.getElementById('crimeLocation').readOnly=true" onblur="document.getElementById('crimeLocation').readOnly=false"