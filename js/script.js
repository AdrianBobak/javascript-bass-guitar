const tones = {
		'0E': 'sounds/bass/E5.mp3',
		'1E': 'sounds/bass/F5.mp3',
		'2E': 'sounds/bass/Fis5.mp3',
		'3E': 'sounds/bass/G5.mp3',
		'4E': 'sounds/bass/Gis5.mp3',
		'5E': 'sounds/bass/A5.mp3',
		'6E': 'sounds/bass/Ais5.mp3',
		'7E': 'sounds/bass/B5.mp3',
		'8E': 'sounds/bass/C6.mp3',
		'9E': 'sounds/bass/Cis6.mp3',
		'10E': 'sounds/bass/D6.mp3',
		'11E': 'sounds/bass/Dis6.mp3',
		'12E': 'sounds/bass/E6.mp3',
		'0A': 'sounds/bass/A5.mp3',
		'1A': 'sounds/bass/Ais5.mp3',
		'2A': 'sounds/bass/B5.mp3',
		'3A': 'sounds/bass/C6.mp3',
		'4A': 'sounds/bass/Cis6.mp3',
		'5A': 'sounds/bass/D6.mp3',
		'6A': 'sounds/bass/Dis6.mp3',
		'7A': 'sounds/bass/E6.mp3',
		'8A': 'sounds/bass/F6.mp3',
		'9A': 'sounds/bass/Fis6.mp3',
		'10A': 'sounds/bass/G6.mp3',
		'11A': 'sounds/bass/Gis6.mp3',
		'12A': 'sounds/bass/A6.mp3',
		'0D': 'sounds/bass/D6.mp3',
		'1D': 'sounds/bass/Dis6.mp3',
		'2D': 'sounds/bass/E6.mp3',
		'3D': 'sounds/bass/F6.mp3',
		'4D': 'sounds/bass/Fis6.mp3',
		'5D': 'sounds/bass/G6.mp3',
		'6D': 'sounds/bass/Gis6.mp3',
		'7D': 'sounds/bass/A6.mp3',
		'8D': 'sounds/bass/Ais6.mp3',
		'9D': 'sounds/bass/B6.mp3',
		'10D': 'sounds/bass/C7.mp3',
		'11D': 'sounds/bass/Cis7.mp3',
		'12D': 'sounds/bass/D7.mp3',
		'0G': 'sounds/bass/G6.mp3',
		'1G': 'sounds/bass/Gis6.mp3',
		'2G': 'sounds/bass/A6.mp3',
		'3G': 'sounds/bass/Ais6.mp3',
		'4G': 'sounds/bass/B6.mp3',
		'5G': 'sounds/bass/C7.mp3',
		'6G': 'sounds/bass/Cis7.mp3',
		'7G': 'sounds/bass/D7.mp3',
		'8G': 'sounds/bass/Dis7.mp3',
		'9G': 'sounds/bass/E7.mp3',
		'10G': 'sounds/bass/F7.mp3',
		'11G': 'sounds/bass/Fis7.mp3',
		'12G': 'sounds/bass/G7.mp3',
	};
const fret = {F1: '1', F2: '2', F3: '3', F4: '4', F5: '5', F6: '6', F7: '7', F8: '8', F9: '9', F10: '10', F11: '11', F12: '12'};
const string = {0: 'E', 1: 'A', 2: 'A', 4: 'D', 5: 'D', 7: 'G', 8: 'G'};

function guitar(){
    let isHold = false;
    let isPlayed = false;
    
    function holdString(firstKey){
        let tone = '';
        firstKey.preventDefault();
        if(firstKey.key in fret){
            isHold = true;
            tone += fret[firstKey.key];
            
            function play(secondKey){
                let cache = tone;
                if(secondKey.key in string && !isPlayed){
                    isPlayed = true;
                    tone += string[secondKey.key];
					if(tone in tones){
						let audio = new Audio(tones[tone]);
						audio.play();
					}
                    tone = cache;
                }
            }
            
            document.addEventListener('keydown', play);
            document.addEventListener('keyup', function(upKey){
                isPlayed = false;
                if(upKey.key in fret){
                    document.removeEventListener('keydown', holdString);
                    isHold = false;
                    document.removeEventListener('keydown', play);
                    document.addEventListener('keydown', holdString);
                }
            });
        } else if(isHold === false && firstKey.key in string && !isPlayed){
            isPlayed = true;
            let tone = ('0' + string[firstKey.key]);
			if(tone in tones){
				let audio = new Audio(tones[tone]);
				audio.play();
				document.addEventListener('keyup', function(){
					isPlayed = false;
				});
			}
        }
    }
    
    document.addEventListener('keydown', holdString);
}
guitar();


let switchButton = document.querySelector('#heading-container .switch');
function switchGuitar(){
	for(let slug in tones){
		if (tones[slug].indexOf('bass') > -1){
			tones[slug] = tones[slug].replace(/bass/g,'guitar');
		} else if (tones[slug].indexOf('guitar') > -1){
			tones[slug] = tones[slug].replace(/guitar/g,'bass');
		}
	}
}
switchButton.addEventListener('click', switchGuitar);


function visualGuitar(){
    let isEmptyString = true;
    function showOnScreen(e){
        e.preventDefault();
        if(e.key in fret){
            isEmptyString = false;
            let frets = document.querySelectorAll('.' + e.key);
            for(let i = 0; i < frets.length; i++){
                frets[i].classList.add('steady');

                function play(e){
                    if(e.key in string){
                        let strings = document.querySelectorAll('.string' + e.key);
                        for(let j = 0; j < strings.length; j++){
                            if(strings[j].contains(frets[i])){
                                frets[i].classList.add('active');
                            }
                        }
                    }
                }
                document.addEventListener('keydown', play);

                function hideFromScreen(e){
                    let upString = document.querySelectorAll('.string' + e.key);
                    let upKey = document.querySelectorAll('.active');
                    if(e.key in string){
                        for(let i = 0; i < upKey.length; i++){
                            for(let j = 0; j < upString.length; j++){
                                if(upString[j].contains(upKey[i])){
                                    upKey[i].classList.remove('active');
                                }
                            }
                        }
                    } else if(e.key in fret){
                        let frets = document.querySelectorAll('.' + e.key);
                        for(let i = 0; i < frets.length; i++){
                            frets[i].classList.remove('steady');
                        }
                        document.removeEventListener('keydown', play);
                        isEmptyString = true;
                    }
                }
                document.addEventListener('keyup', hideFromScreen.bind());
            }
        } else if(e.key in string && isEmptyString === true){
            let emptyString = document.querySelector('.string' + e.key);
            emptyString.classList.add('empty');
            function removeEmptyClass(){
                emptyString.classList.remove('empty');
                document.removeEventListener('keyup', removeEmptyClass);
            }
            document.addEventListener('keyup', removeEmptyClass);
        }
    }

	document.addEventListener('keydown', showOnScreen.bind());
}
visualGuitar();



function howToPlay() {
	let howTo = document.querySelector('#howto');
	let closeHowTo = howTo.querySelector('.close');
	let openHowTo = document.querySelector('.learn');

	howTo.style.display = 'none';
	closeHowTo.addEventListener('click', onOff);
	openHowTo.addEventListener('click', onOff);

	function onOff(){
		if(howTo.style.display === 'none'){
			howTo.style.display = 'flex';
		} else {
			howTo.style.display = 'none';
		}
	}	
}
howToPlay();