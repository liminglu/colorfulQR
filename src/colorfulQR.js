(function( $ ){
	$.fn.qrcode = function(options) {
		// if options is string, 
		if( typeof options === 'string' ){
			options	= { text: options };
		}

		// set default values
		// typeNumber < 1 for automatic calculation
		options	= $.extend( {}, {
			render		: "canvas",
			width		: 80,//256
			height		: 80,//256
			typeNumber	: -1,
			correctLevel	: QRErrorCorrectLevel.H, //QRErrorCorrectLevel.L
                        background      : "#ffffff",
                        foreground      : "#0BA0FF", //#000000
                        detectColor     : "#53FFFF",
                        imgSize         : 28,
                        imgSrc          : "http://liminglu.cn/images/icon.jpg" //必须是同域图片，否则报错
		}, options);
		
		var  Tool = {
				//detect position point
				detect:function(row,col,moduleCount) {
					var flag = false;
					if(2<= row && row <= 4 && 2 <= col && col <= 4 || moduleCount-5 <= row && row <= moduleCount-3 && 2 <=col && col <= 4 || moduleCount-5 <= col && col <= moduleCount-3 && 2 <=row && row <= 4) {
						flag = true;
					
					}
					return flag;
					
				},
				
				//detect img
				detectImg:function(row,col,moduleCount) {
					var minRow = Math.floor(options.width/2)-Math.ceil(options.imgSize/2);
					var maxRow = Math.floor(options.width/2)+Math.ceil(options.imgSize/2);								var minCol = Math.floor(options.height/2)-Math.ceil(options.imgSize/2);
					var maxCol = Math.floor(options.height/2)+Math.ceil(options.imgSize/2);
					var per = Math.floor(options.width / moduleCount);
					var flag = true;
					if(minRow <= row*per && row*per <= maxRow && minCol <= col*per && col*per <= maxCol) {
						flag = false;
					}
					return flag;
				}
				
			}
			

		var createCanvas	= function(){
			// create the qrcode itself
			var qrcode	= new QRCode(options.typeNumber, options.correctLevel);
			qrcode.addData(options.text);
			qrcode.make();

			// create canvas element
			var canvas	= document.createElement('canvas');
			canvas.width	= options.width;
			canvas.height	= options.height;
			var ctx		= canvas.getContext('2d');

			// compute tileW/tileH based on options.width/options.height
			var tileW	= options.width  / qrcode.getModuleCount();
			var tileH	= options.height / qrcode.getModuleCount();

			// draw in the canvas
			for( var row = 0; row < qrcode.getModuleCount(); row++ ){
				for( var col = 0; col < qrcode.getModuleCount(); col++ ){
				
					if(options.imgSize) {
						if(!Tool.detectImg(row,col,qrcode.getModuleCount())) {
							ctx.fillStyle =  options.background;
						}else {
							if(Tool.detect(row,col,qrcode.getModuleCount())) {
								ctx.fillStyle = options.detectColor;
							}else {
								ctx.fillStyle = qrcode.isDark(row, col) ? options.foreground : options.background;
							}
						}
						
						//set img position
						var img = new Image();
						img.src = options.imgSrc;
						img.onload = function () {
							var top = Math.floor(options.height/2)-Math.ceil(options.imgSize/3);
							var left = Math.floor(options.width/2)-Math.ceil(options.imgSize/3);
						    ctx.drawImage(img,left,top);
						}
						
					}else {
						if(Tool.detect(row,col,qrcode.getModuleCount())) {
							ctx.fillStyle = options.detectColor;
						}else {
							ctx.fillStyle = qrcode.isDark(row, col) ? options.foreground : options.background;
						}
					}
										
					var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW));
					//var h = (Math.ceil((row+1)*tileW) - Math.floor(row*tileW));
					var h = (Math.ceil((row+1)*tileH) - Math.floor(row*tileH));
					ctx.fillRect(Math.round(col*tileW),Math.round(row*tileH), w, h);  
				}	
			}
			
			// return just built canvas
			return canvas;
			
			
		}

		// from Jon-Carlos Rivera (https://github.com/imbcmdth)
		var createTable	= function(){
			// create the qrcode itself
			var qrcode	= new QRCode(options.typeNumber, options.correctLevel);
			qrcode.addData(options.text);
			qrcode.make();
			
			// width and height for the table should not squeeze or stretch the drawn QR code, high likelihood of invalid code
		    if(options.width % qrcode.getModuleCount() !== 0)
		      options.width = Math.floor(options.width / qrcode.getModuleCount()) * qrcode.getModuleCount();
		
		    if(options.height % qrcode.getModuleCount() !== 0)
		      options.height = Math.floor(options.height / qrcode.getModuleCount()) * qrcode.getModuleCount();
		      
			
			// create table element
			var $table	= $('<table></table>')
				.css("width", options.width+"px")
				.css("height", options.height+"px")
				.css("border", "0px")
				.css("border-collapse", "collapse")
				.css('background-color', options.background).css('margin','0 auto');
		  
			// compute tileS percentage
			var tileW	= options.width / qrcode.getModuleCount();
			var tileH	= options.height / qrcode.getModuleCount();
			//var tileW	= Math.round(options.width / qrcode.getModuleCount()); //Math.floor(xx)
			//var tileH	= Math.round(options.height / qrcode.getModuleCount());
			
			
			// draw in the table
			for(var row = 0; row < qrcode.getModuleCount(); row++ ){
				var $row = $('<tr></tr>').css('height', tileH+"px").appendTo($table);
				for(var col = 0; col < qrcode.getModuleCount(); col++ ){
				
					if(options.imgSize) {
					
						if(!Tool.detectImg(row,col,qrcode.getModuleCount())) {
							$('<td></td>')
									.css('width', tileW+"px")
									.css('background-color', options.background)
									.appendTo($row);
						}else {
							if(Tool.detect(row,col,qrcode.getModuleCount())) {
								$('<td></td>')
								.css('width', tileW+"px")
								.css('background-color',options.detectColor)
								.appendTo($row);
							}else{
								
								$('<td></td>')
									.css('width', tileW+"px")
									.css('background-color', qrcode.isDark(row, col) ? options.foreground : options.background)
									.appendTo($row);
							}
						}
						
						//set img position
						$("#qrImg").css('top',Math.floor(options.width/2)-Math.ceil(options.imgSize/32)).css('left',Math.floor(options.height/2)-Math.ceil(options.imgSize/3))
					}else {
						if(Tool.detect(row,col,qrcode.getModuleCount())) {
							$('<td></td>')
							.css('width', tileW+"px")
							.css('background-color',options.detectColor)
							.appendTo($row);
						}else{
							
								$('<td></td>')
									.css('width', tileW+"px")
									.css('background-color', qrcode.isDark(row, col) ? options.foreground : options.background)
									.appendTo($row);
						}
					}
					
				}	
			}
			// return just built canvas
			return $table;
		}
		
		var createImage = function() {
				return "<img src='" + createCanvas().toDataURL("image/png") + "'/>";
				
		}
  

		return this.each(function(){
			//var element	= options.render == "canvas" ? createCanvas() : createTable();
			var element;
			switch(options.render) {
				case "canvas" : element = createCanvas();break;
				case "table" : element = createTable();break;
				case "image" : element = createImage();break;
			}
			$(element).appendTo(this);
		});
	};
})( jQuery );