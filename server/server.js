const path = require('path')
const express = require('express')
const request = require('request')
const fs = require('fs')
const app = express()

const {setImgUrl,changeUrl} = require('../src/appFunc.js')

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

//获取首屏图像
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

//获取首页最新文章列表
app.get('/getNews',(req,res) => {
	request.get(newsUrl,(err,responce) => {
		//date: 时间，stories:[{title,id,images:{}}]
		let data = JSON.parse(responce.body)
		for(let i = 0, len = data.stories.length; i < len; i++){
			data.stories[i].images[0] = changeUrl(data.stories[i].images[0])
		}
		res.send(data)
	})
})
//获取文章详情
app.get('/getNewsDetail',(req,res) => {
	let detailId = req.query.id 
	let data = {} //整合需要返回的内容

	request.get(detailUrl+detailId, (err,responce) => {
		request.get(detailUrl + detailId + '/short-comments',(err2,responce2) => {
			request.get(extraDetail + detailId, (err3,responce3) => {
				let result = JSON.parse(responce.body),
					result2 = JSON.parse(responce2.body),
					result3 = JSON.parse(responce3.body)

				for(let i = 0,len = result2.comments.length; i < len; i++){
					result2.comments[i].avatar = changeUrl(result2.comments[i].avatar)
				}
				let extra = {
					popularity: result3.popularity,
					short_comments: result3.short_comments,
					title: result.title,
					image: result.image ? changeUrl(result.image) : '',
					comments : result2.comments
				}
				data.body = setImgUrl(JSON.parse(responce.body).body)
				data.extra = extra
				res.send(data)
			})
		})
	})
})
//获取主题列表
app.get('/getMenu', (req,res) => {
	request.get(menuUrl, (err,responce) => {
		res.send(responce.body)
	})
})
//获取主题文章列表
app.get('/getThemeDetail',(req,res) => {
	let themeId = req.query.id
	request.get(themeDetail + themeId,(err,responce) => {
		let data = JSON.parse(responce.body)
		data.background = changeUrl(data.background)
		data.image = changeUrl(data.image)
		for(let i = 0,len = data.editors.length;i < len;i++){
			data.editors[i].avatar = changeUrl(data.editors[i].avatar)
		}
		for(let i = 0,len = data.stories.length;i < len;i++){
			if(data.stories[i].images){
				data.stories[i].images[0] = changeUrl(data.stories[i].images[0])
			}
		}
		res.send(data)
	})
})

module.exports = function(){
	app.listen(3333,_ => {
		console.log("node is listening at port 3333")
	})
}

