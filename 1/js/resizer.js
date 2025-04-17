let ROTETE_SCREEN_ERROR;
let UNITY_CANVAS;
let resizer_is_mobile = false;
let horizontalOr = true;
let resizerInitialized = false;

function ResizerInit() {
	resizer_is_mobile = checkIfMobile();
	ROTETE_SCREEN_ERROR = document.querySelector("#ROTATE_SCREEN_ERROR");
	UNITY_CANVAS = document.querySelector("#unity-canvas");

	window.addEventListener('load', resizerOnLoaded);
    window.addEventListener('resize', resizeCanvas);

	if (resizer_is_mobile) {
		let portrait = window.matchMedia("(orientation: portrait)");
		portrait.addEventListener("change", function(e) { OnOrientationChanged(e.matches); });
	}

	resizerOnLoaded();
}

function resizerOnLoaded() {
	if (!resizerInitialized) {
		resizerInitialized = true;
		OnWindowSizeChanged(window.innerWidth, window.innerHeight);
		OnOrientationChanged(checkVerticalOrientation(window.innerWidth, window.innerHeight));
	}
}

function resizeCanvas() {
    OnWindowSizeChanged(window.innerWidth, window.innerHeight);
}

function OnOrientationChanged(portrait) {
	if (resizer_is_mobile) {
		horizontalOr = !portrait;
		if(portrait) {
			if (ROTETE_SCREEN_ERROR != null) {
				ROTETE_SCREEN_ERROR.style.display = "none";
				UNITY_CANVAS.style.pointerEvents = 'auto';
				// ROTETE_SCREEN_ERROR.style.display = "block";
				// UNITY_CANVAS.style.pointerEvents = 'none';
			}
		}
		else {
			if (ROTETE_SCREEN_ERROR != null) {
				ROTETE_SCREEN_ERROR.style.display = "block";
				UNITY_CANVAS.style.pointerEvents = 'none';
				// ROTETE_SCREEN_ERROR.style.display = "none";
				// UNITY_CANVAS.style.pointerEvents = 'auto';
			}
		}
	}
}

function OnWindowSizeChanged(width, height) {
	// if (resizer_is_mobile) {
	// 	if (horizontalOr && checkVerticalOrientation(width, height)) {
	// 		OnOrientationChanged(true);
	// 	}
	// 	else if(!horizontalOr && !checkVerticalOrientation(width, height)) {
	// 		OnOrientationChanged(false);
	// 	}
	// }

	//canvas.style.width = window.innerWidth + "px";
	//canvas.style.height = window.innerHeight + "px";
}

function checkVerticalOrientation(width, height){
	return height > width;
}
