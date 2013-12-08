				var map;
                var marker;
                var latlng;
                var lastCenter="";
                var city = "";
                var street = "";  
                var streetNum = "";
        		var spinner;
            	var littleSpinner;
            	var camSpinner;   
            	var hugeSpinner;
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
			                 
                function FirstLoad()
                {
                	document.getElementById('SOSTab').style.borderBottomColor='#33B5E5';
	                littleSpinner = new Spinner(smallSpinnerOpts).spin(document.getElementById('addressBar'));
	                GetLocation(GetAddress);
	                PrintDate();
                	
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
						contactsList[contactsCounter][0]=name;
						contactsList[contactsCounter][1]=number;
		
	
						DisplaySingleContact(contactsCounter);												 
						contactsCounter++;
						
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
						alert("Please enter a valid Number.");
					}
	
				}
				
				function isNumber(n) 
				{
	  				return !isNaN(parseFloat(n)) && isFinite(n);
				}
				
				function DisplaySingleContact(contactIndex)
				{	
					document.getElementById('contactsList').innerHTML+= "<tr> <td style='width:5%'> <img src='./images/x.png' class='icons'  onclick='DeleteContact(" +contactIndex +"); return false' ></td>  <td style='width:47.5%;'>"
																		+ contactsList[contactIndex][0] + "</td> <td  style='width:47.5%'> " + contactsList[contactIndex][1] + "</td> </tr>";
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
		
							contactsList[i][0]=contactsList[i+1][0];
							contactsList[i][1]=contactsList[i+1][1];
						}
		
						if (contactsCounter==3)
						{
							ToggleDisplay('addbutton','inline');
						}
						--contactsCounter;
						DisplayContactList();
					}
				}
				
				function SOSLongPress()
				{
					hugeSpinner = new Spinner(HugeSpinnerOpts).spin(document.getElementById('buttonSection'));  
					GetLocation(SendLocationToPoliceAndContacts, onError);
					
					
					ChangeButtonToNormal();
					
				}
				
			    function SendLocationToPoliceAndContacts(position) 
			    {
			    	hugeSpinner.stop();
			    	alert(	"Coordinates:\n" +
			    			"Latitude: "	+ position.coords.latitude 	+ "\n" +
			    			"Longitude: "		+ position.coords.longitude + "\n\n" +
			    			"Your'e location has been sent to the local police.\n");
			    	
		
			    }
				
				function SOSShortPress()
				{
					//ToggleDisplay('blankSection');
					$("#pressLongMessage").fadeTo(2000,1);
					
					ChangeButtonToNormal();
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
                	 camSpinner = new Spinner(smallSpinnerOpts).spin(document.getElementById('addPhotoButtons'));
                      // Take picture using device camera and retrieve image as base64-encoded string
                      navigator.camera.getPicture(AddPhotoToFromCaption, onFail, { quality: 50,
                        destinationType: destinationType.DATA_URL });
                }         
                function AddPhotoToFromCaption(imageData) 
                {
                	camSpinner.stop();
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
                   	littleSpinner.stop();
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
                
                
                function ViewLocationOnMap()
                {
                    spinner = new Spinner(bigSpinnerOpts).spin(document.getElementById('reportPageWrap'));  
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
                        ToggleDisplay('mapDisplay','inline');
                        ToggleDisplay('reportData','inline');
                        ToggleDisplay('closeMapButton','inline');
                        
                        lastCenter=map.getCenter(); 
                        google.maps.event.trigger(map, 'resize');
                        map.setCenter(lastCenter);

                    }
                    else        
                    {
                        ToggleDisplay('mapDisplay','inline');
                        ToggleDisplay('reportData','inline');
                        ToggleDisplay('closeMapButton','inline');
                        
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
														
                            picker=document.getElementById('picker');
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
                            
				var HugeSpinnerOpts = {
				  	lines: 17, // The number of lines to draw
				  	length: 40, // The length of each line
				  	width: 14, // The line thickness
				  	radius: 60, // The radius of the inner circle
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