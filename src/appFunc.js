let changeUrl = function(val){
	//解决盗链问题，参考http://www.yatessss.com/2016/07/08/使用vue完成知乎日报.html
	return val.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
}

let setImgUrl = function(str){
	if(!str) return '文章内容加载失败，请按F5刷新重试'
	//全局替换文章内容图片src属性链接
	let re = /(src=\")\S*\"/g //匹配src字符串
	let newStr = str.replace(re,function(data){
		let targetStr = data.split('\"')
		return "src=\"" + changeUrl(targetStr[1]) + "\""
	})
	return newStr
}
module.exports = {setImgUrl,changeUrl}