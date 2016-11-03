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
	newsUrl = 'http://news-at.zhihu.com/api/4/news/latest',
	detailUrl = 'http://news-at.zhihu.com/api/4/news/',
	extraDetail = 'http://news-at.zhihu.com/api/4/story-extra/',
	//shortCommentUrl = detailUrl + id + short-comments
	menuUrl = 'http://news-at.zhihu.com/api/4/themes',
	themeDetail = 'http://news-at.zhihu.com/api/4/theme/'

app.get('/getImage',(req,res) => {
	request.get(imgUrl,(err,responce) => {
		
		var fName = JSON.parse(responce.body).text
		fName = fName.replace(' ','_')

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
	
	request.get(newsUrl,(err,responce) => {
		//date: 时间，stories:[{title,id,images:{}}]
		res.send(responce.body)
	})
})

app.get('/getNewsDetail',(req,res) => {
	let detailId = req.query.id 
	let data = {} //整合需要返回的内容

	request.get(detailUrl+detailId, (err,responce) => {
		request.get(detailUrl + detailId + '/short-comments',(err2,responce2) => {
			request.get(extraDetail + detailId, (err3,responce3) => {
				let extra = {
					popularity: JSON.parse(responce3.body).popularity,
					short_comments: JSON.parse(responce3.body).short_comments,
					title: JSON.parse(responce.body).title,
					image: JSON.parse(responce.body).image,
					comments : JSON.parse(responce2.body).comments
				}
				data.body = JSON.parse(responce.body).body
				data.extra = extra
				res.send(data)
			})
		})
	})
})

app.get('/getMenu', (req,res) => {
	request.get(menuUrl, (err,responce) => {
		res.send(responce.body)
	})
})

app.get('/getThemeDetail',(req,res) => {
	let themeId = req.query.id
	request.get(themeDetail + themeId,(err,responce) => {
		res.send(responce.body)
	})
})

module.exports = function(){
	app.listen(3333,_ => {
		console.log("node is listening at port 3333")
	})
}

