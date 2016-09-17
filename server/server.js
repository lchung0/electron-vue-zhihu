var path = require('path')
var express = require('express')
var request = require('request')
var fs = require('fs')

var app = express()

app.use(function(req, res, next) {
    res.set({
        'Access-Control-Allow-Origin': '*'
    })
    next()
})

var imgUrl = 'http://news-at.zhihu.com/api/4/start-image/1080*1776',
	newsUrl = 'http://news-at.zhihu.com/api/4/news/latest'
var opt = {
	url: '',
	headers: {
		'referer': 'www.zhihu.com'
	}
}
// app.get('/*', function(req, res, next) {
//     //这里面判断图片是否盗链
//     req.headers.referer = 'www.zhihu.com'
// 	console.log(req.headers.referer)
//     next()
// })


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

app.get('/getNews',(req,res) => {
	opt.url = newsUrl
	request.get(opt,(err,responce) => {
		res.send(responce.body)
	})
})

module.exports = function(){
	app.listen(3333,_ => {
		console.log("node is listening at port 3333")
	})
}

