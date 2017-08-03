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
	function getRandomInt(min, max) {
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
	}
	function showPattern(element){
		var eleWithAsterisk = "#" + element;
		$(eleWithAsterisk).addClass('buttonShowPattern');
		setTimeout(function(){
			$(eleWithAsterisk).removeClass('buttonShowPattern');
		},500);
	}
	function buttonClicked(element){
		var eleWithAsterisk = "#" + element;
		$(eleWithAsterisk).addClass('buttonClicked');
		setTimeout(function(){
			$(eleWithAsterisk).removeClass('buttonClicked');
		},100);
	}
	function showTheWholePattern(){
		// playing = true;
		if(patternArray.length === userArray.length){
			if(times > 20){
				alert("You Won");
				return;
			}
			var randomNum = getRandomInt(0,4);
			var randomId = buttonIds[randomNum];
			patternArray[times] = randomId;
			counter=0;
			countUserClicked=0;
			userArray= [];
		}
		if(counter <= times){
			playing = true;
			showPattern(patternArray[counter]);
			counter+=1;
			setTimeout(showTheWholePattern,1000);
		}else{
			playing =false;
		}
	}
	$('.start').on('click',function(){
		start= true;
		if(times === 0){
			showTheWholePattern();
		}
	});
	$('.strict').on('click',function(){
		strict = true;
	});
	$('.fourButton').on('click',function(){
		if(start){
			var id = this.id;
			if(patternArray[countUserClicked] === id){
				if(!playing){
					buttonClicked(id);
					userArray[countUserClicked] = id;
					countUserClicked+=1;
					if(patternArray.length === userArray.length){
						times+=1;
						$('.gameCounter').text(times);
						setTimeout(showTheWholePattern,1000);
					}
				}
			}else{
				if(!playing){
					if(strict){
						countUserClicked = 0;
						patternArray = [];
						userArray = [];
						times = 0;
						counter = 0;
						$('.gameCounter').text(times);
						alert("You loose");
					}else{
						alert("Try again");
					}
				}
			}}
	});
});