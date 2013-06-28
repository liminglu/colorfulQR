####二维码
##写在最前：其实它挺二的！知道这点就够了！
#####二维码构造
![二维码](file:///Users/apple/Pictures/%E4%BA%8C%E7%BB%B4%E7%A0%81%E7%BB%93%E6%9E%84.png)
#####生成过程
* 数据分析
* 数据编码
	* 分组
	* 转成二进制
	* 转成序列
	* 字符数(数据长度)转成二进制
* 纠错编码
* 构造最终数据信息 

#####10进制与二进制的转换
num.toString(2)
除以2取余数，最后倒过来,如18二进制是10010
![二进制](file:///Users/apple/Pictures/%E4%BA%8C%E8%BF%9B%E5%88%B6%E8%A1%A8%E7%A4%BA%E6%B3%95.gif)
#####为什么用二进制8位储存?
#####`位`是数据存储的最小单位，其中`8bit` 就称为一个字节(Byte)

#####为什么使用大量的位运算?
#####底层算法，效率最高
![左位运算](file:///Users/apple/Pictures/%E5%B7%A6%E4%BD%8D%E8%BF%90%E7%AE%97.gif)

#####计算typeNumber的目的是version,根据数据进行计算typeNumber
#####生成modules configuration:refers to the number of modules contained in a symbol, commencing with Version 1 (21 × 21 modules) up to Version 40 (177 × 177 modules)
#####`缓存`新增/存储规则
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
 
##写在最后：以上说的都可以忘记，下面说的也可以忘记!
 