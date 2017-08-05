$(document).ready(function(){
	var buttonIds = {0:'buttonZero',1:'buttonOne',2:'buttonTwo',3:'buttonThree'};
	var countUserClicked = 0;
	var patternArray = [];
	var userArray = [];
	var times = 0;
	var counter = 0;
	var strict = false;
	var start = false;
	var playing = false;
	var shotTheWholePatternTime = 1200;
	var elementShowPatternRemoveClassTime =1200/2;
	var elementButtonClickedRemoveClassTime = 100;
	var buttonZeroSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
	var buttonOneSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
	var buttonTwoSound =  new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
	var buttonThreeSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
	var sounds = [buttonZeroSound,buttonOneSound,buttonTwoSound,buttonThreeSound];
	function getRandomInt(min, max) {
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
	}
	function showPattern(element){
		playSound(element);
		var eleWithAsterisk = "#" + element;
		$(eleWithAsterisk).addClass('buttonShowPattern');
		setTimeout(function(){
			$(eleWithAsterisk).removeClass('buttonShowPattern');
		},elementShowPatternRemoveClassTime);
	}
	function buttonClicked(element){
		var eleWithAsterisk = "#" + element;
		$(eleWithAsterisk).addClass('buttonClicked');
		setTimeout(function(){
			$(eleWithAsterisk).removeClass('buttonClicked');
		},elementButtonClickedRemoveClassTime);
	}
	function playSound(element){
		Object.keys(buttonIds).forEach(function (key) {
    		var val = buttonIds[key];
    		if(val === element){
    			sounds[key].play();
    		}
    		return;
		});
	}
	function showResult(){
		$('.result').animate({top:'50px'},500);
	}
	function hideResult(){
		$('.result').animate({top:'-500px'},500);
	}
	function resetGame(){
		countUserClicked = 0;
		patternArray = [];
		userArray = [];
		times = 0;
		counter = 0;
		$('.gameCounter').text(0);
	}
	function showTheWholePattern(){
		if(patternArray.length === userArray.length){
			
			var randomNum = getRandomInt(0,4);
			var randomId = buttonIds[randomNum];
			patternArray[times] = randomId;
			counter=0;
			countUserClicked=0;
			userArray= [];
		}
		if(counter <= times){
			$('.fourButton').css({cursor:'default'});
			if(times >= 5){
				shotTheWholePatternTime           = 900;
				elementShowPatternRemoveClassTime = 900/2;
			}else if (times >= 10) {
				shotTheWholePatternTime           = 600;
				elementShowPatternRemoveClassTime = 600/2;
			}else if (times >= 15) {
				shotTheWholePatternTime           = 400;
				elementShowPatternRemoveClassTime = 400/2;
			}
			playing = true;
			showPattern(patternArray[counter]);
			counter+=1;
			setTimeout(showTheWholePattern,shotTheWholePatternTime);
		}else{
			playing =false;
			$('.fourButton').css({cursor:'pointer'});
		}
	}
	$('.start').on('click',function(){
		start= true;
		if(times === 0){
			showTheWholePattern();
		}
	});
	$('.strict').on('click',function(){
		if(!start){
			$('.light').css({color:'red'});
			strict = true;
		}
	});
	$('.reset').on('click',function(){
		if(!playing){
			resetGame();
			start=false;
		}
	});
	$('.fourButton').on('click',function(){
		if(start){
			var id = this.id;
			if(patternArray[countUserClicked] === id){
				if(!playing){
					playSound(id);
					buttonClicked(id);
					userArray[countUserClicked] = id;
					countUserClicked+=1;
					if(patternArray.length === userArray.length){
						if(times >= 5){
							showResult();
							$('.result').text("You Win");
							setTimeout(function(){
								hideResult()
							},1500);
							resetGame();
							return;
						}
						times+=1;
						$('.gameCounter').text(times);
						setTimeout(showTheWholePattern,shotTheWholePatternTime);
					}
				}
			}else{
				if(!playing){
					if(strict){
						resetGame();
					}
					showResult();
					$('.result').text("Try Again");
					counter=0;
					countUserClicked=0;
					userArray= [];
					setTimeout(function(){
						hideResult()
					},900);
					setTimeout(function(){
						$('.result').text("");
						showTheWholePattern();
					},1000);
				}
			}}
	});
});