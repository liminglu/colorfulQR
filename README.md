####前端眼中的二维码世界
##写在最前：其实它挺二且流氓！知道这点就够了！
#####二维码的世界很凌乱
![二维码](http://liminglu.cn/images/qr_construction.png)
#####二维码的生产工艺
* 数据分析
	* 如: http://liminglu.cn 
* 数据编码
	* 分组
		* h|t|t|p|:|/|/|l|i|m|i|n|g|l|u|.|c|n 
	* 转成二进制
		* h ---> 104 ----> 1101000 ;t ---> 116 --->1110100
	* 转成序列
		* 1101000 1110100 ….
	* 字符数(数据长度)转成二进制
		* http://liminglu.cn ---> 18 -----> 10010
* 纠错编码
* 构造最终数据信息 

#####二维码让前端又爱又恨
####烦人的转码
* 1.字符型转换成unicode编码
	* String.charCodeAt() 
* 2.unicode(十进制)转换成二进制
	* parseInt(num).toString(2)
	* 口诀:除以2取余数，最后倒过来,如18二进制是10010
![二进制](http://liminglu.cn/images/qr_expression.gif)

####烦人的储存
* 为什么用二进制8位储存? 

	*`位`是数据存储的最小单位，其中`8bit` 就称为一个字节(Byte)

####烦人的运算

* 为什么使用大量的位运算?
	* 底层算法，效率最高
![左位运算](http://liminglu.cn/images/left_bit_calculate.gif)

#####二维码红心

* version
	* 1---40 (21 * 21 --- 177 * 177) 公式:4 * version + 17
* modules
	* modules configuration:refers to the number of modules contained in a symbol, commencing with Version 1 (21 × 21 modules) up to Version 40 (177 × 177 modules)

#####二维码存储规则
遍历`给定长度`
当长度大于`this.length`/8时，`缓存`中开辟一个新位置进行存储,初始值为`0`

	var bufIndex = Math.floor(this.length / 8);
		if (this.buffer.length <= bufIndex) {
			this.buffer.push(0);
		}
		
当`数据长度num，(num >>> (length - i - 1) ) & 1) == 1`时，重置新开辟的数值

	this.buffer[bufIndex] |= (0x80 >>> (this.length % 8) );


#####个性化二维码
计算坐标值

* 位置探测着色
	
	```
		if(2<= row && row <= 4 && 2 <= col && col <= 4 || moduleCount-5 <= row && row <= moduleCount-3 && 2 <=col && col <= 4 || moduleCount-5 <= col && col <= moduleCount-3 && 2 <=row && row <= 4) {
						flag = true;
					
		}
	
	``` 
	
* 中心点图片

	```
		var minRow = Math.floor(options.width/2)-Math.ceil(options.imgSize/2);
		var maxRow = Math.floor(options.width/2)+Math.ceil(options.imgSize/2);
		var minCol = Math.floor(options.height/2)-Math.ceil(options.imgSize/2);
	    var maxCol = Math.floor(options.height/2)+Math.ceil(options.imgSize/2);
		var per = Math.floor(options.width / moduleCount);
		var flag = true;
		if(minRow <= row*per && row*per <= maxRow && minCol <= col*per && col*per <= maxCol) {
				flag = false;
			}
		return flag;
	
	```

#####识别率
无法识别的二维码都是耍流氓

* 存储数据长度 
* 二维码大小,150\200
* 二维码损坏程度，如canvas导出图片等
* 二维码的背景颜色
* **读码软件** ----`这是硬伤` 
 
##写在最后：以上说的都可以忘记，下面说的也可以忘记!
 