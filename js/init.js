$(document).on('ready', function(){

// for a rainy day, this allows for an iphone5 compatible view
// var outerPadding = (1362 - 1024)/2;
var outerPadding = 0

function WinOpen(url, params, width, height) {
var left, top;
if (width !== 'undefined') {
		left = (screen.width / 2) - (width / 2);
		top = (screen.height / 2) - (height / 2);
		params += ",top=" + top + "px,left=" + left + "px";
}
return window.open(url, "", params + ",width=" + width + ",height=" + height + "");
};

function setHeight() {
// if ($('canvas').height() < $(window.top).height()) {
		var difference = $(window.top).height() - $('canvas').height()
		//$('canvas').css({marginTop : difference/2})
// }
}
$(window).resize(function() {
setHeight()
})

// http://createjs.com/#!/TweenJS/demos/sparkTable
// http://createjs.com/Docs/TweenJS/modules/TweenJS.html
// view-source:http://createjs.com/Demos/EaselJS/Game.html COPY THIS
var stage, w, h, loader, pipe1height, pipe2height, pipe3height, startX, startY, wiggleDelta, topFill;
var background, bird, ground, pipe, bottomPipe, pipes, rotationDelta, counter, counterOutline;
var started = false; 
var startJump = false; // Has the jump started?

var jumpAmount = 120; // How high is the jump?
var jumpTime = 266;

var dead = false; // is the bird dead?
var KEYCODE_SPACE = 32;     //usefull keycode
var gap = 250;
var masterPipeDelay = 78; // delay between pipes
var pipeDelay = masterPipeDelay; //counter used to monitor delay
var highscore = 0;



var counterShow = false;

document.onkeydown = handleKeyDown;

function init() {

	// createjs.MotionGuidePlugin.install();

	stage = new createjs.Stage("flappygame");

	createjs.Touch.enable(stage);
	// stage.canvas.width = document.body.clientWidth; //document.width is obsolete
	// stage.canvas.height = document.body.clientHeight; //document.height is obsolete

	// grab canvas width and height for later calculations:
	w = stage.canvas.width;
	h = stage.canvas.height;

	//creamos el preloader
	canvas = document.getElementById("flappygame");
	messageField = new createjs.Text("Loading", "86px", "#000000");
	messageField.maxWidth = 1000;
	messageField.textAlign = "center";
	messageField.x = canvas.width / 2;
	messageField.y = canvas.height / 2;
	stage.addChild(messageField);
	stage.update();

	manifest = [
			{id:"fly_fx", src:"sound/sfx_wing.ogg"},
			{id:"hit_fx", src:"sound/sfx_hit.ogg"},
			{id:"die_fx", src:"sound/sfx_die.ogg"},
			{id:"point_fx", src:"sound/sfx_point.ogg"},
			{id:"swooshing_fx", src:"sound/sfx_swooshing.ogg"},
			{src:"img/bird.png", id:"bird"},
			{src:"img/background2.png", id:"background"},
			{src:"img/ground.png", id:"ground"},
			{src:"img/pipe.png", id:"pipe"},
			{src:"img/restart.png", id:"start"},
			{src:"img/share.png", id:"share"},
			{src:"img/gameover.png", id:"gameover"},
			{src:"fonts/FB.eot"},
			{src:"fonts/FB.svg"},
			{src:"fonts/FB.ttf"},
			{src:"fonts/FB.woff"}
	];

	loader = new createjs.LoadQueue(false);
	loader.installPlugin(createjs.Sound);
	loader.addEventListener("complete", handleComplete);
	loader.addEventListener("progress", updateLoading);
	loader.loadManifest(manifest);
	}

	function news(){

	box_news_feeds = new createjs.Text("18/02/2014 - Se agregaron sonidos fx\n18/02/2014 - Update a 1.2beta\nPronto más actualizaciones!!!", "11px", "#543847");
	box_news_feeds.lineHeight = 13;
	box_news_feeds.lineWidth = 240;
	box_news_feeds.setTransform(40.5,57.2);

	box_news_text = new createjs.Shape();
	box_news_text.graphics.f("#FC7858").s().p("AH9A/IAAgjIAvAAIAAgMIgvAAIAAhOIBQAAIAAAjIguAAIAAALIAuAAIAABPgAGiA/IAAh9IBQAAIAABOIguAAIAAAMIAuAAIAAAjgAHEgQIAMAAIAAgLIgMAAgAF0A/IAAhPIgLAAIAABPIgjAAIAAhxIBQAAIAABxgADrA/IAAhxIBQAAIAABxgAENAcIAMAAIAAgsIgMAAgAC9A/IAAhPIAiAAIAABPgABhA/IAAhxIBQAAIAAAuIgiAAIAAgMIgMAAIAAAsIAMAAIAAgXIAiAAIAAA6gAAFA/IAAhPIAvAAIAAgLIgjAAIAAgjIBEAAIAAB9gAAnAcIANAAIAAgMIgNAAgAhUA/IAAhPIAuAAIAAgLIguAAIAAgjIBQAAIAABOIguAAIAAAMIAuAAIAAAjgAiCA/IAAhPIAiAAIAABPgAiwA/IAAh9IAiAAIAAB9gAkMA/IAAhPIAvAAIAAgLIgkAAIAAgjIBGAAIAAB9gAjpAcIAMAAIAAgMIgMAAgAlnA/IAAhxIAiAAIAABOIAMAAIAAhOIAiAAIAABxgAnDA/IAAh9IAiAAIAAAYIAuAAIAAAiIguAAIAAAgIANAAIAAgXIAhAAIAAA6gAofA/IAAhxIBRAAIAAAuIgjAAIAAgMIgMAAIAAAsIAMAAIAAgXIAjAAIAAA6gApMA/IAAgvIgMAAIAAAvIgiAAIAAh9IBQAAIAAB9gApYgQIAMAAIAAgLIgMAAgAJZAoIAAgjIAiAAIAAAjgAJZgEIAAgiIAiAAIAAAigAC9gbIAAgjIAiAAIAAAjgAiCgbIAAgjIAiAAIAAAjg");
	box_news_text.setTransform(107.1,39.2);

	box_news_bg = new createjs.Shape();
	box_news_bg.graphics.f("#DED895").s().p("A16LeIAAgaIg1AAIgBgWIAAggIgaAAIAEoxIgErpIAbgBIAAg2IA1AAIAAgbIABAAMAr0AAAIAAAbIA1AAIABAXIAAAfIAaABIAAUaIgbAAIAAA2Ig1AAIgBAagAgRmJIBOAAIAAhQIguAAIAAgLIAuAAIAAgjIhOAAIAABQIAsAAIAAAMIgsAAgAhsmJIBQAAIAAgiIguAAIAAgMIAuAAIAAhQIhQAAgAianZIAABQIAiAAIAAhzIhQAAIAABzIAiAAIAAhQgAkkmJIBQAAIAAhzIhQAAgAlSmJIAiAAIAAhQIgiAAgAmumJIBQAAIAAg6IgiAAIAAAYIgLAAIAAguIALAAIAAALIAiAAIAAguIhQAAgAoJmJIBQAAIAAh+IhFAAIAAAjIAjAAIAAALIguAAgApkmJIBQAAIAAgiIguAAIAAgMIAuAAIAAhQIhQAAIAAAjIAuAAIAAALIguAAgAqSmJIAhAAIAAhQIghAAgArAmJIAhAAIAAh+IghAAgAsdmJIBRAAIAAh+IhFAAIAAAjIAjAAIAAALIgvAAgAt4mJIBQAAIAAhzIgiAAIAABRIgMAAIAAhRIgiAAgAvUmJIBRAAIAAg6IgiAAIAAAYIgMAAIAAgjIAuAAIAAgiIguAAIAAgXIgjAAgAwvmJIBRAAIAAg6IgjAAIAAAYIgMAAIAAguIAMAAIAAALIAjAAIAAguIhRAAgAxcm3IAAAuIAiAAIAAh+IhQAAIAAB+IAhAAIAAgugABImgIAjAAIAAgjIgjAAgABInOIAjAAIAAgiIgjAAgAlSnkIAiAAIAAgjIgiAAgAqSnkIAhAAIAAgjIghAAgAkCmrIAAguIANAAIAAAugAnnmrIAAgMIAMAAIAAAMgAr6mrIAAgMIAMAAIAAAMgAhKnZIAAgLIAMAAIAAALgAxpnZIAAgLIANAAIAAALg");
	box_news_bg.setTransform(160,85);

	box_news_line = new createjs.Shape();
	box_news_line.graphics.f("#543847").s().p("A16L5IAAgbIg1AAIAAgaIA1AAIAAAaMAr0AAAIAAAbgAV7LeIAAgaIA1AAIAAg2IAbAAIAA0bIAbAAIAAUcIgbAAIAAA1IgbAAIAAAagA3LLEIAAg1IgaAAIAA0cIAbAAIAELpIgEIyIAaAAIAAAfIAAAXgAWxqNIAAgfIAAgXIAbAAIAAA2gA3KqNIAAg2IAbAAIAAgbIA1AAIAAAbIg1AAIAAA2gAV7rDIAAgbMgr0AAAIAAgaMAr0AAAIAAAaIA1AAIAAAbg");
	box_news_line.setTransform(160,85);

	stage.addChild(box_news_text, box_news_bg, box_news_line,box_news_feeds)
	}

	function updateLoading() {
	messageField.text = "Loading " + (loader.progress*100|0) + "%"
	stage.update();
	}

	function handleComplete() {

	background = new createjs.Shape();
	background.graphics.beginBitmapFill(loader.getResult("background")).drawRect(0,0,w,h);
	background.y = 0 + outerPadding

	var groundImg = loader.getResult("ground");
	ground = new createjs.Shape();
	ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, w+groundImg.width, groundImg.height);
	ground.tileW = groundImg.width;
	ground.y = h-groundImg.height-outerPadding;


	var data = new createjs.SpriteSheet({
			"images": [loader.getResult("bird")],
			//set center and size of frames, center is important for later bird roation
			"frames": {"width": 92, "height": 64, "regX": 46, "regY": 32, "count": 3}, 
			// define two animations, run (loops, 0.21x speed) and dive (returns to dive and holds frame one static):
			"animations": {"fly": [0, 2, "fly", 0.21], "dive": [1, 1, "dive", 1]}
	});
	bird = new createjs.Sprite(data, "fly");

	startX = (w/2) - (92/2)
	startY = 512 + outerPadding
	wiggleDelta = 18

	// Set initial position and scale 1 to 1
	bird.setTransform(startX, startY, 1, 1);
	// Set framerate
	bird.framerate = 30;

	//338, 512
	// Use a tween to wiggle the bird up and down using a sineInOut Ease
	createjs.Tween.get(bird, {loop:true}).to({y:startY + wiggleDelta}, 380, createjs.Ease.sineInOut).to({y:startY}, 380, createjs.Ease.sineInOut);

	stage.addChild(background);

	// Add padding to the top to make up for the small background graphic
	topFill = new createjs.Graphics()
	topFill.beginFill("#70c5ce").rect(0, 0, w, outerPadding); //color of the sky
	topFill = new createjs.Shape(topFill)
	stage.addChild(topFill)

	pipes = new createjs.Container(); 
	stage.addChild(pipes)

	stage.addChild(bird, ground);
	stage.addEventListener("stagemousedown", handleJumpStart);


	// Same thing as topFill on the bottom, but after the bird, ground 
	// and pipes because they'll always be behind this layer
	bottomFill = new createjs.Graphics()
	bottomFill.beginFill("#ded895").rect(0, h - outerPadding, w, outerPadding); //color of the ground
	bottomFill = new createjs.Shape(bottomFill)
	stage.addChild(bottomFill)


	counter = new createjs.Text(0, "86px 'Flappy Bird'", "#ffffff");
	counterOutline = new createjs.Text(0, "86px 'Flappy Bird'", "#000000");
	counterOutline.outline = 5
	counterOutline.textAlign = 'center'
	counter.textAlign = 'center'
	counterOutline.x = w/2
	counterOutline.y = 150 + outerPadding
	counter.x = w/2
	counter.y = 150 + outerPadding
	counter.alpha = 1
	counterOutline.alpha = 1
	stage.addChild(counter, counterOutline)

	createjs.Ticker.timingMode = createjs.Ticker.RAF;
	createjs.Ticker.addEventListener("tick", tick);

	news()

	}

	function handleKeyDown(e) {
	//cross browser issues exist
	if(!e){ var e = window.event; }
	switch(e.keyCode) {
			case KEYCODE_SPACE: handleJumpStart();
	}
	}

	function handleJumpStart() {
	if (!dead) {
			createjs.Tween.removeTweens ( bird )
			bird.gotoAndPlay("jump");
			startJump = true
			if (!started) {
					started = true
					counterShow = true                        
			}
			createjs.Sound.play("fly_fx");
	}
	stage.removeChild(box_news_text, box_news_bg, box_news_line,box_news_feeds)
	}

	function diveBird() {
	bird.gotoAndPlay("dive");
	}

	function restart() {
	//hide anything on stage and show the score
	pipes.removeAllChildren();
	createjs.Tween.get(start).to({y:start.y + 10}, 50).call(removeStart)
	counter.text = 0
	counterOutline.text = 0
	counterOutline.alpha = 0
	counter.alpha = 0
	counterShow = false
	pipeDelay = masterPipeDelay
	dead = false
	started = false
	startJump = false
	createjs.Tween.removeTweens ( bird )
	bird.x = startX
	bird.y = startY
	bird.rotation = 0
	createjs.Tween.get(bird, {loop:true}).to({y:startY + wiggleDelta}, 380, createjs.Ease.sineInOut).to({y:startY}, 380, createjs.Ease.sineInOut);
	}

	function die() {
	dead = true
	bird.gotoAndPlay("dive");

	createjs.Tween.removeTweens ( bird )
	createjs.Tween.get(bird).wait(0).to({y:bird.y + 200, rotation: 90}, (380)/1.5, createjs.Ease.linear) //rotate back
					.call(diveBird) // change bird to diving position
					.to({y:ground.y - 30}, (h - (bird.y+200))/1.5, createjs.Ease.linear); //drop to the bedrock
	createjs.Tween.get(stage).to({alpha:0}, 100).to({alpha:1}, 100)

	start = new createjs.Bitmap(loader.getResult("start"));
	start.alpha = 0
	start.x = w/2 - start.image.width/2 - 120
	start.y = h/2 - start.image.height/2 - 50

	share = new createjs.Bitmap(loader.getResult("share"));
	share.alpha = 0
	share.x = w/2 - share.image.width/2 + 120
	share.y = h/2 - share.image.height/2 - 50

	gameover = new createjs.Bitmap(loader.getResult("gameover"));
	gameover.alpha = 0
	gameover.x = w/2 - gameover.image.width/2
	gameover.y = h/2 - gameover.image.height/2 - 350

	stage.addChild(start)
	stage.addChild(share)
	stage.addChild(gameover)

	createjs.Tween.get(start).to({alpha:1, y: start.y + 50}, 400, createjs.Ease.sineIn).call(addClickToStart)
	createjs.Tween.get(share).to({alpha:1, y: share.y + 50}, 400, createjs.Ease.sineIn).call(addClickToStart)
	createjs.Tween.get(gameover).to({alpha:1, y: gameover.y + 50}, 400, createjs.Ease.sineIn).call(addClickToStart)

	createjs.Sound.play("hit_fx");

	//console.log(counter.text, highscore)

	if( highscore < counter.text ){
			highscore = counter.text //se marca el puntaje mas alto
	}

	}
	function removeStart() {
	stage.removeChild(start)
	stage.removeChild(share)
	stage.removeChild(gameover)
	}
	function addClickToStart() {
	start.addEventListener("click", restart);
	share.addEventListener("click", goShare);
	}

	function goShare() {
	var countText
	if (counter.text == 1) {
			countText = "1 punto"
	} else {
			countText = counter.text + " puntos"
	}

	var descrip, img, link, titulo, uriEncode, url;
	/*titulo = "Flappy Bird en Facebook";
	descrip = "Hice " + countText +  " Flappy Bird en Facebook!!, juegalo que esperas!!!";
	img = "https://friki.pe/flappy-bird-peru/img/apple-icon.png";
	url = "https://apps.facebook.com/flappy-bird-facebook/";
	link = "http://www.facebook.com/sharer.php?s=100" + "&p[url]=" + url + "&p[title]=" + titulo + "&p[summary]=" + descrip + "&&p[images][0]=" + img;
	uriEncode = encodeURI(link);

	WinOpen(uriEncode, "scrollbars=no", 590, 458);*/

	FB.ui({
	  method: 'feed',
	  link: 'https://apps.facebook.com/flappy-bird-facebook/',
	  picture : 'http://friki.pe/flappy-bird-peru/img/apple-icon.png',
	  name: 'Flappy Bird en Facebook',
	  caption: 'Diviertete!!!',
	  description: "Hice " + countText +  " Flappy Bird en Facebook!!, juegalo que esperas!!!"
	}, function(response){});

	//window.open("https://twitter.com/share?url=https%3A%2F%2Fapps.facebook.com%2Fflappy-bird-peru%2F&text=Hice " + countText +  " Flappy Bird en Facebook!!.");
	}

	function tick(event) {
	var deltaS = event.delta/1000;

	var l = pipes.getNumChildren();

	if (bird.y > (ground.y - 40)) {
			if (!dead) {
					die()
			}
			if (bird.y > (ground.y - 30)) {
					createjs.Tween.removeTweens ( bird )
			}
	}

	if (!dead) {
			ground.x = (ground.x-deltaS*300) % ground.tileW;
	}


	if (started && !dead) {
			if (pipeDelay == 0) {

					pipe = new createjs.Bitmap(loader.getResult("pipe"));
					pipe.x = w+600
					pipe.y = (ground.y - gap*2) * Math.random() + gap*1.5
					pipes.addChild(pipe);
					// createjs.Tween.get(pipe).to({x:0 - pipe.image.width}, 5100)

					pipe2 = new createjs.Bitmap(loader.getResult("pipe"));
					pipe2.scaleX = -1
					pipe2.rotation = 180
					pipe2.x = pipe.x //+ pipe.image.width
					pipe2.y = pipe.y - gap
					// createjs.Tween.get(pipe2).to({x:0 - pipe.image.width}, 5100)

					pipes.addChild(pipe2);

					pipeDelay = masterPipeDelay

			} else {
					pipeDelay = pipeDelay - 1
			}
			for(var i = 0; i < l; i++) {
					pipe = pipes.getChildAt(i);
					if (pipe) {
							if (true) { // tried replacing true with this, but it's off: pipe.x < bird.x + 92 && pipe.x > bird.x 
									var collision = ndgmr.checkRectCollision(pipe,bird,1,true)
									if (collision) {
											if (collision.width > 8 && collision.height > 8) {
													die()
											}
									}
							}
							pipe.x = (pipe.x - deltaS*300);
							if (pipe.x <= 338 && pipe.rotation == 0 && pipe.name != "counted") {
									pipe.name = "counted" //using the pipe name to count pipes
									counter.text = counter.text + 1
									counterOutline.text = counterOutline.text + 1
									createjs.Sound.play("point_fx");
							}
							if (pipe.x + pipe.image.width <= -pipe.w) { 
									pipes.removeChild(pipe)
							}
					}
			}
			if (counterShow) {
					counter.alpha = 1
					counterOutline.alpha = 1
					counterShow = false
			}

	}



	if (startJump == true) {
			startJump = false
			bird.framerate = 60;
			bird.gotoAndPlay("fly");
			if (bird.roation < 0) {
					rotationDelta = (-bird.rotation - 20)/5
			} else {
					rotationDelta = (bird.rotation + 20)/5
			}
			if (bird.y < -200) {
					bird.y = -200
			}
			createjs
					.Tween
					.get(bird)
					.to({y:bird.y - rotationDelta, rotation: -20}, rotationDelta, createjs.Ease.linear) //rotate to jump position and jump bird
					.to({y:bird.y - jumpAmount, rotation: -20}, jumpTime - rotationDelta, createjs.Ease.quadOut) //rotate to jump position and jump bird
					.to({y:bird.y}, jumpTime, createjs.Ease.quadIn) //reverse jump for smooth arch
					.to({y:bird.y + 200, rotation: 90}, (380)/1.5, createjs.Ease.linear) //rotate back
					.call(diveBird) // change bird to diving position
					.to({y:ground.y - 30}, (h - (bird.y+200))/1.5, createjs.Ease.linear); //drop to the bedrock
	}

	stage.update(event);
}

init();

$("#fbshare").on('click', function(){
	FB.ui({
	  method: 'feed',
	  link: 'https://developers.facebook.com/docs/dialogs/',
	  picture : 'https://friki.pe/flappy-bird-peru/img/apple-icon.png',
	  name: 'Name??',
	  caption: 'An example caption',
	  description: 'La descrip bla bla bla'
	}, function(response){});
})

});