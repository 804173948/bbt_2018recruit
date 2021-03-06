var SEL = SEL || {};
SEL.blurBar = $("#swipe");
SEL.swipeBar = $("#swipe");
SEL.intr = $("#intr");
SEL.quer = $("#quer");
SEL.recr = $("#recr");
/*SEL.bubbleFrame = document.getElementById('bubble-frame');*/
SEL.bubbleFrame = document.getElementById('n');

var bubbles = [];
var bubbleCount = 2;
var bubbleRate = 0.03;
var bubbleSpeed = 0.75;
var bubblePic = 'bubble.png';
var swiper = new Swiper(".swiper-container",{
		direction: "vertical",
		allowTouchMove: false,
		/*
		navigation: {
      		nextEl: '.bottomBar'
      		//prevEl: '.swiper-button-prev',
    	},*/
    	speed: 1500
});
//模糊
var blur = 8.0, maxBlur = 53, minBlur = 8, adder = 0.15;
var sty1 = "0 1px ", sty2 = "px 2px #ff63b2";
var blurKeeper = setInterval(function () {
	if(blur > maxBlur || blur < minBlur) adder *= -1;
	SEL.blurBar.css("box-shadow", sty1 + blur.toString() + sty2);
	blur += adder;
}, 2);
//滑动
SEL.swipeBar.click(function(event) {
	adder = 0.8, maxBlur = 250, blur = 50;
	setTimeout(swipe, 500);
});

SEL.intr.click(function(event) {
	window.location.assign("./introduction.html");
});
SEL.recr.click(function(event) {
	window.location.assign("./recruit.html");
});
SEL.quer.click(function(event) {
	window.location.assign("./query.html");
});

var gotoGame = function() {
	window.location.assign("./game.html");
}
var swipe = function() {
	swiper.slideNext();
	updateBubbles();
}

var updateBubbles = function(){
	if(bubbles.length<bubbleCount)
		if(Math.random()<bubbleRate)
			createBubble();
	for(var i=0;i<bubbles.length;i++){
		var bubble = bubbles[i];
			updateBubble(bubble);
	}
	requestAnimationFrame(updateBubbles);
}
var createBubble = function(){
	var bubble = document.createElement('img');
	bubble.src = 'img/'+bubblePic;
	bubble.className = 'bubble';
	bubble.targetLeft = Math.random()*50+25
	bubble.style.left = bubble.targetLeft +'%';
	bubble.style.height = Math.random()*12+12+'%';
	bubble.style.bottom = '1%';
	bubbles.push(bubble);
	bubble.addEventListener('click', gotoGame);
	SEL.bubbleFrame.appendChild(bubble);
}
var destroyBubble = function(bubble){
	bubbles.splice(bubbles.indexOf(bubble),1);
	SEL.bubbleFrame.removeChild(bubble);
}
var updateBubble = function(bubble){
	var bottom = parseFloat(bubble.style.bottom);
	var left = parseFloat(bubble.style.left);
	var height = parseInt(bubble.style.height);
	if(bottom>=100) destroyBubble(bubble)
	/*console.info(bubble.style.left)*/
	bubble.style.bottom = bottom+bubbleSpeed +'%';
	if(Math.abs(left-bubble.targetLeft)<1)
		bubble.targetLeft = left+(Math.round(Math.random()*40)-20);
	bubble.style.left = left+(bubble.targetLeft-left)*0.05+'%';
	/*bubble.style.opacity -= 0.01;*/
}
