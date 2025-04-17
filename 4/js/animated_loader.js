var context;
var canvasWidth;
var canvasHeight;
var image_loaded;
var img = new Image();
var arr;
var framesCount;
let animationReq = null;
var offsetX = 50;
var dotColor = "#2800D7";
const progressBar = document.querySelector('.progress-fill');
const progressText = document.querySelector('.progress-text');
var currentProgress = 0;

let startProgress = 0;
let endProgress = 0;
let defaultAnimationDuration = 5000;
let currentAnimationDuration = defaultAnimationDuration;
let startTime;
let updateStartTime = true;
let progressAnimating = false;
let progressFinishing = false;

function startProgressBar(){
	setEndProgressValue(0.60);
}

function setEndProgressValue(progress, force = false){
	if (!force && (progress <= endProgress || currentProgress == 1))
		return;

	progressAnimating = false;
	if (progress > 0.6)
	{
		defaultAnimationDuration = 1000;	
		currentAnimationDuration = defaultAnimationDuration;
	}

	startProgress = currentProgress;
	endProgress = progress;
	updateStartTime = true;

	if (progressAnimating == false)
	{
		progressAnimating = true;
		requestAnimationFrame(updateProgress);
	}
}

function updateProgress(timestamp) {
	if (!progressAnimating)
	{
		return;
	}

	if (updateStartTime){
		updateStartTime = false;
		startTime = timestamp;
	}

    const elapsedTime = timestamp - startTime;
    const progress = Math.min(1, elapsedTime / currentAnimationDuration);
    currentProgress = (startProgress + (endProgress - startProgress) * progress);
		var roundedProgress = Math.round(currentProgress * 100);
    progressBar.style.width = `${currentProgress * 100}%`;
    progressText.textContent = `${roundedProgress}%`;

    if (progress < 1) {
    	if (!progressFinishing && endProgress >= 0.9 && roundedProgress >= 90) {
    		setEndProgressValue(1);
    		currentAnimationDuration = 10000;
    	}
    	else {
			currentAnimationDuration = defaultAnimationDuration;
    	}

      requestAnimationFrame(updateProgress);
    }else{
    	progressAnimating = false;
    }
}

function closeProgress(){
	console.log("closeProgress");
	progressFinishing = true;
	setEndProgressValue(1, true);
	document.querySelector("#unity-canvas").style.opacity = 1;
	hideLoaderWithAnimation();
}

function checkProgressFinishing(){
	setTimeout(function () {
		console.log("checkProgressFinishing: " + progressAnimating + " " + currentAnimationDuration + " " + progressFinishing);
		if (progressAnimating){
			checkProgressFinishing();
		}else {
			document.querySelector("#unity-canvas").style.opacity = 1;
			hideLoaderWithAnimation();
		}
	}, 100);
}

function hideLoaderWithAnimation() {
	var loader = document.querySelector('.loader-wrapper');
    loader.classList.add('fade-out');
    setTimeout(function () {
        loader.style.display = 'none';
    }, 1000);
}

function showEnteringPortalsLoader(){
	showLoader("TemplateData/SPLASH_SCREEN_JPG.jpg");
}

function showLoader(imageSRC) {
	if (animationReq != null){
		return;
	}
	
	var loader = document.getElementById('loader_canvas_div');
	loader.style.display = "block";
	
	// Setup the canvas element.
	var canvas = $("canvas.dots");
	context = canvas[0].getContext("2d");
	canvasWidth = canvas.width();
	canvasHeight = canvas.height();
	//canvas.attr({ height: canvasHeight, width: canvasWidth });
	image_loaded = false;
	img = new Image();
	img.src = imageSRC;
	img.onload = () => {
		//sendEvent(Splash_Screen_Loading_Started);
	  image_loaded =true;
	  context.drawImage(img, 0, 0)
	};

	// Set the number of frames we want to run.
	framesCount = 170;
	
	var incr = 0.5;
	var dotRadius = 0;

	// Set and create our dot.
	var dot1 = { x: 0, y: 0, radius: dotRadius, currentFrame: 0, incr: incr, delayFrame: 0 };
	var dot2 = { x: 0, y: 0, radius: dotRadius, currentFrame: 0, incr: incr, delayFrame: 0 };
	var dot3 = { x: 0, y: 0, radius: dotRadius, currentFrame: 0, incr: incr, delayFrame: 0 };
	var dot4 = { x: 0, y: 0, radius: dotRadius, currentFrame: 0, incr: incr, delayFrame: 0 };
	var dot5 = { x: 0, y: 0, radius: dotRadius, currentFrame: 0, incr: incr, delayFrame: 0 };
	arr = [dot1];

	animationReq = requestAnimationFrame(function() {
			moveDot(535, 565)
		})

	var timeout = 180;

	setTimeout(function () {
		arr.push(dot2);
	}, timeout);

	setTimeout(function () {
		arr.push(dot3);
	}, timeout * 2);

	setTimeout(function () {
		arr.push(dot4);
	}, timeout * 3);

	setTimeout(function () {
		arr.push(dot5);
	}, timeout * 4);
}

function closeLoader(needRemove = false){
	var loader = document.getElementById('loader_canvas_div');
	if (animationReq != null){
		//loader.remove();
		cancelAnimationFrame(animationReq);
		animationReq = null;
		context = null;
		image_loaded = false;
		img = null;
		arr = null;
		framesCount = 0;
	}
	if (needRemove)
		loader.remove();
	else
		loader.style.display = "none";
}

// This function moves the dot down and to the right in each frame.
function moveDot(startX, startY) {
  // Clear the canvas so we can draw on it again.
  context.clearRect(0, 0, canvasWidth, canvasHeight);

	if (image_loaded) {
		context.drawImage(img, 0, 0)
	}
	
	for (var i = 0; i < arr.length; i++){
		calcDot(arr[i]);
	}
	
	drawDot(startX, startY);

animationReq = requestAnimationFrame(function() {
        moveDot(startX, startY)
    })
}

function calcDot(dot)
{
  // Adjust the dot's x and y values down and to the right.
  dot.x += dot.incr;
  dot.y += dot.incr;

  // Move the current time forward by one frame.
  dot.currentFrame += 1;
  
  
  
  if (dot.currentFrame == framesCount / 2)
  {
	  if (dot.incr < 0)
	  {
		  dot.delayFrame += 1;
		  dot.currentFrame -= 1;
		  dot.x = 0;
		  dot.y = 0;
		  
		  if (dot.delayFrame == 80)
		  {
			  dot.incr *= -1;
			  dot.currentFrame = 0;
			  dot.delayFrame = 0;
		  }
	  }
	  else
	  {
		dot.incr *= -1;
		dot.currentFrame = 0;
	  }
  }
}

function drawDot(startX, startY) {
  context.beginPath();
  for (var i = 0; i < arr.length; i++){
    var dot = arr[i];
	context.rect(startX + (offsetX * i) - dot.x / 2, startY   - dot.x / 2, dot.radius + dot.x, dot.radius + dot.x, false);
  }
  context.fillStyle = dotColor;
  context.fill();
}
