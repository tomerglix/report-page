		var i=0;
		
		var goatSoundSrc;
		var src;
		function AddGoatImages()
		{
			var goatImgSource;
			goatsImages=document.getElementById('goatsImages');
			for (i=0;i<12;++i)
			{

				goatImgSource='./media/goat'+i+'.jpg';
				goatsImages.innerHTML+="<img src=" + goatImgSource + " class='goatImg' onclick='PlayGoatSound(" + i + ")'>";
				
			}

			
		}
		
		function CreateGoatVoices()
		{
			goatsVoices=document.getElementById('goatsVoices');
			var goatSource;
			var goatAudio;
			var goatPic;
			for (i=0;i<12;++i)
			{
	
				goatSource=document.createElement('source');
				goatSource.src="./media/goatVoice" + i +".mp3";
				goatSource.type="audio/mpeg";
				goatAudio=document.createElement('audio');
				goatAudio.id='goatSound' + i;
				goatAudio.appendChild(goatSource);
				goatsVoices.appendChild(goatAudio);	

			}
		}
		
	function PlayGoatSound(num)
	{
		var goatAudioId='goatSound'+num;
		document.getElementById(goatAudioId).load();
		document.getElementById(goatAudioId).play();
	}

