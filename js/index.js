// 画椭圆
var canvas = document.getElementById("canvas");
var circle = document.querySelector(".circle");
var rect = document.querySelector(".rect");
var fill = document.querySelector(".fill");
var ctx = canvas.getContext("2d");


var flag = false; //鼠标按下标志， true为按下 false为不按下
var imageData;

// 画圆
circle.onclick = function() {
	canvas.onmousedown = function(e) {
		flag = true;
		imageData = ctx.getImageData(0,0,900,500);
		var radX = e.clientX-canvas.offsetLeft;
		var radY = e.clientY-canvas.offsetTop;
		canvas.onmousemove = function(e1) {
			if(flag == true) {
				var x = e1.clientX-canvas.offsetLeft;
				var y = e1.clientY-canvas.offsetTop;
				var rad = Math.sqrt(Math.pow(x-radX,2) + Math.pow(y-radY,2));
				drawArc(radX,radY,rad);	
			}
		}
	}

	window.onmouseup = function() {
		flag = false;
	}

	// 画圆函数
	function drawArc(radX,radY,rad) {
		ctx.clearRect(0,0,900,500);
		ctx.putImageData(imageData,0,0);
		ctx.beginPath();
		ctx.lineWidth = strongThin();
		ctx.strokeStyle = color();

		fill.onclick = function() {
			ctx.fillStyle = color();
			ctx.fill();
		}

		ctx.arc(radX,radY,rad,0,Math.PI*2);
		ctx.stroke();
		
		ctx.closePath(); //控制点画直线到起点
	}	

}

// 画矩形
rect.onclick = function() {
	canvas.onmousedown = function(e) {
		flag = true;
		imageData = ctx.getImageData(0,0,900,500);
		var radX = e.clientX-canvas.offsetLeft;
		var radY = e.clientY-canvas.offsetTop;
		canvas.onmousemove = function(e1) {
			if(flag == true) {
				var x = e1.clientX-canvas.offsetLeft;
				var y = e1.clientY-canvas.offsetTop;
				var w = x-radX;
				var h = y-radY;
				drawRec(radX,radY,w,h);
			}
		}
	}

	window.onmouseup = function() {
		flag = false;
	}

	// 画矩形函数
	function drawRec(x,y,w,h) {
		ctx.clearRect(0,0,900,500);
		ctx.putImageData(imageData,0,0);
		ctx.beginPath();

		fill.onclick = function() {
			ctx.fillStyle = color();
			ctx.fill();
			ctx.fillRect(x,y,w,h);
		}

		ctx.lineWidth = strongThin();
		ctx.strokeStyle = color();
		ctx.strokeRect(x,y,w,h);
		ctx.stroke();
		ctx.closePath(); 
	}
}

// 画直线
var straight = document.querySelector(".straight");

straight.onclick = function() {
	canvas.onmousedown = function(e) {
		flag = true;
		imageData = ctx.getImageData(0,0,900,500);
		var radX = e.clientX-canvas.offsetLeft;
		var radY = e.clientY-canvas.offsetTop;
		canvas.onmousemove = function(e1) {
			if(flag == true) {
				var x = e1.clientX-canvas.offsetLeft;
				var y = e1.clientY-canvas.offsetTop;
				drawStraight(radX,radY,x,y);
			}
		}
	}


	window.onmouseup = function() {
		flag = false;
	}

	
}
function drawStraight(x,y,x1,y1) {
	ctx.clearRect(0,0,900,500);
	ctx.putImageData(imageData,0,0);
	ctx.beginPath();
	ctx.lineWidth = strongThin();
	ctx.strokeStyle = color();
	ctx.moveTo(x,y);
	ctx.lineTo(x1,y1);
	ctx.stroke();
	ctx.closePath(); 
}

//画贝塞尔曲线
var curve = document.querySelector(".curve");

curve.onclick = function () {
	canvas.onmousedown = function down() {
		flag = true;
		imageData = ctx.getImageData(0,0,900,500);
		var x1 = event.clientX-canvas.offsetLeft;
		var y1 = event.clientY-canvas.offsetTop;
		canvas.onmousemove = function(e1) {
			if(flag == true) {
						var x2 = e1.clientX-canvas.offsetLeft;
						var y2 = e1.clientY-canvas.offsetTop;
						drawStraight(x1,y1,x2,y2);
								
					canvas.onmousedown = function() {
						flag = true;
						canvas.onmousemove = function (e1) {
							if(flag == true) {
								var x = e1.clientX-canvas.offsetLeft;
								var y = e1.clientY-canvas.offsetTop;
								ctx.clearRect(0,0,900,500);
								ctx.putImageData(imageData,0,0);
								ctx.beginPath();
								ctx.lineWidth = strongThin();
								ctx.strokeStyle = color();
								fill.onclick = function() {
									ctx.fillStyle = color();
									ctx.fill();
								}
								ctx.moveTo(x1,y1);
								ctx.quadraticCurveTo(x,y,x2,y2); // 绘制曲线到终点
								ctx.stroke();
								ctx.closePath();
								canvas.onmousedown = function() {
								down();
							}
						}
					}					
				}				
			}
		}
	}
	window.onmouseup = function() {
		flag = false;
	}
}


// 画橡皮
var eraser = document.querySelector(".eraser1");

eraser.onclick = function() {
	canvas.onmousedown = function() {
		flag = true;		
		canvas.onmousemove = function(e) {
			var radX = e.clientX-canvas.offsetLeft;
			var radY = e.clientY-canvas.offsetTop;
			if(flag == true) {
				drawEraser(radX,radY);
			}		
		}
	}

	function drawEraser(x,y) {
		ctx.beginPath();
		ctx.clearRect(x,y,20,20);
		ctx.fillStyle = "#fff";
		ctx.fill();
		ctx.closePath();
	}
}

// 我猜你画
var guss = document.querySelector(".guss");

guss.onclick = function() {
	canvas.onmousedown = function(e) {
		flag = true;
		var x = e.clientX-canvas.offsetLeft;
		var y = e.clientY-canvas.offsetTop;		
		canvas.onmousemove = function(e1) {
			if(flag == true) {
				var radX = e1.clientX-canvas.offsetLeft;
				var radY = e1.clientY-canvas.offsetTop;
				gussWhat(x,y,radX,radY);
				x = radX;
				y = radY;
			}
		}
	}

	window.onmouseup = function() {
		flag = false;
	}

	function gussWhat(x,y,x1,y1) {		
		ctx.beginPath();
		ctx.lineWidth = strongThin();
		ctx.strokeStyle = color();
		ctx.moveTo(x,y);
		ctx.lineTo(x1,y1);
		ctx.stroke();
		ctx.closePath(); 
	}
}

// 清除画布
var clear = document.querySelector(".clear");

clear.onclick = function() {
	ctx.clearRect(0,0,900,500);
}

// 颜色
function color() {
	var color = document.querySelector(".selectColor").value;
	return color;
}

// 线条粗细
function strongThin() {
	var selectStrog = document.getElementById("selectStrog").value;
	return selectStrog*3;
}

//点击选颜色
var arg1 = document.querySelector(".color1");
var arg2 = document.querySelector(".color2");

function selectColor(arg,flag) {
	$(arg).click (function() {
		arg.style.backgroundColor = "#FFC864";
		arg.style.border = "1px solid #ccc";
		$(".table p").click(function() {
			var value = $(this).css("background-color");
			if(flag == 1) {
				$(".select_color").css("background-color",value);
			} else if(flag == 2) {
				$(".select_color2").css("background-color",value);
			}
			
		})
	})

	arg.style.backgroundColor = "#DCE6F4";
	arg.style.border = "1px solid #DCE6F4";
} 

selectColor(arg1,1);
selectColor(arg2,2);
