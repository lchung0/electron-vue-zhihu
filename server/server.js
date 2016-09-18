var path = require('path')
var express = require('express')
var request = require('request')
var fs = require('fs')

var app = express()

app.use(function(req, res, next) {
	req.headers.referer = 'www.zhihu.com'
	req.headers.host = 'www.zhihu.com'
	req.headers.origin = 'www.zhihu.com'
    res.set({
        'Access-Control-Allow-Origin': '*'
    })
    next()
})

var imgUrl = 'http://news-at.zhihu.com/api/4/start-image/1080*1776',
	newsUrl = 'http://news-at.zhihu.com/api/4/news/latest'

app.get('/getImage',(req,res) => {
	request.get(imgUrl,(err,responce) => {
		
		var fName = JSON.parse(responce.body).text
		fName = fName.split("\"")[1] //获取图片名

		fs.exists('./static/images/' + fName + '.png', exists => {

			if(!exists){ //判断图片是否已经保存过
				request(JSON.parse(responce.body).img)
					.pipe(fs.createWriteStream('./static/images/' + fName + '.png'))
					.on('close',_ => {
						console.log(fName + '.png下载完成')
						res.send(fName)
					})
			} else{
				console.log('file exists')
				res.send(fName)
			}

		})
		
	})
})
var opt = {

}
app.get('/getNews',(req,res) => {
	
	request.get(newsUrl,(err,responce) => {
		//date: 时间，stories:[{title,id,images:{}}]
		res.send(responce.body)

		//尝试先把图片保存，再从本地读取
		/*fs.exists('./static/images/' + newsData.date, exists => {

			if(!exists){

				fs.mkdirSync('./static/images/' + newsData.date, 0755)
				var arr = newsData.stories
				newsData.stories.map((val,index,arr) => {
					var img = val.images.toString()
					var fileName = img.split('.com/')[1]

					request.get(img)
						.pipe(fs.createWriteStream('./static/images/' + newsData.date + '/' + fileName))
						.on('close',_ => {
							console.log(fileName + ' has downloaded')
							console.log(this)
						})
				})
				res.end()
				
			} else {
				res.send(newsData)
			}
		})*/
	})
})

app.get('/test',(req,res) => {
	request.get('https:\/\/pic2.zhimg.com\/v2-ca233494720fa706735030a011fbe0b9.jpg').pipe(res)
	//res.end()
})

module.exports = function(){
	app.listen(3333,_ => {
		console.log("node is listening at port 3333")
	})
}

