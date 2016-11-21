<template>
	<canvas id="canvas" style="background: #212121;width:100%;height:100%;">
		
	</canvas>
</template>
<style lang="less">
	
</style>
<script lang="babel">
	import Vue from 'vue'
	
	export default{
		data(){
			return {
				WIDTH: null,
				HEIGHT: null
			}
		},
		mounted(){
			this.setCanvas()
		},
		methods: {
			setCanvas(){
				console.log('set')
				this.WIDTH = $('#canvas').parent().width()
				this.HEIGHT = $('#canvas').parent().height()

				let canvas = document.getElementById("canvas")
				let context = canvas.getContext('2d')
				canvas.width = this.WIDTH
				canvas.height = this.HEIGHT
				let ballsQuery = this.getBall(context)
	            this.render(context,ballsQuery)
	            canvas.addEventListener('mousemove',function(e){
	                for(let i = 0, len = ballsQuery.length; i < len; i++){
	                    let self = ballsQuery[i],
	                    currentX = e.clientX,
	                    currentY = e.clientY
	                    if(Math.abs(currentX - self.x) < 50 && Math.abs(currentY - self.y) < 50){
	                        context.beginPath()
	                        context.moveTo(currentX,currentY)
	                        context.lineTo(self.x,self.y)
	                        context.lineWidth = 2
	                        context.strokeStyle = self.color
	                        context.stroke()
	                    }
	                }
	            })
			},
			getBall(ctx){
				let ballsArr = []
	            let ballsNum = 30
	            for(let i = 0; i < ballsNum; i++){
	                let cirX = Math.floor(this.WIDTH * Math.random()),
	                    cirY = Math.floor(this.HEIGHT * Math.random()),
	                    radius = 3 || Math.floor(3 + 5 * Math.random())
	                let ball = {
	                    x: cirX,
	                    y: cirY,
	                    currentX: cirX,
	                    currentY: cirY,
	                    g: 2,
	                    vx: (parseInt(2 * Math.random(),10) - 1) * -1,
	                    vy: (parseInt(2 * Math.random(),10) - 1) * 1,
	                    radius: radius,
	                    //color: 'rgba(255,255,255,' + Math.random() + ')',
	                    color: 'rgba(255,255,255,.3)',
	                    draw: function(){
	                        ctx.beginPath()
	                        ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2)
	                        ctx.closePath()
	                        ctx.fillStyle = this.color
	                        ctx.fill()
	                    }
	                }
	                ballsArr.push(ball)
	            }
            	return ballsArr
			},
			render(ctx,ballsQuery){
				setInterval(_ => {
	                let direct = null
	                ctx.clearRect(0,0,this.WIDTH,this.HEIGHT)
	                this.drawBall(ctx,ballsQuery)
	                this.update(ctx,ballsQuery)
	            },30)
			},
			update(ctx,ballsQuery){
				for(let i = 0,len = ballsQuery.length; i < len; i++){
	                let self = ballsQuery[i]
	                self.x += self.vx
	                self.y += self.vy
	                if(self.x >= self.currentX + 30) self.vx = -(self.vx * Math.random())
	                if(self.x <= self.currentX - 30) self.vx = Math.abs(self.vx)
	                if(self.y >= self.currentY + 50) self.vy = -(self.vy * Math.random())
	                if(self.y <= self.currentY - 50) self.vy = Math.abs(self.vy)
	                for(let p = 0; p < len; p++){
	                    let other = ballsQuery[p]
	                    if(Math.abs(self.x - other.x) < 50 && Math.abs(self.y - other.y) < 50){
	                        ctx.beginPath()
	                        ctx.moveTo(self.x,self.y)
	                        ctx.lineTo(other.x,other.y)
	                        ctx.strokeStyle = self.color
	                        ctx.stroke()
	                    }
	                }
	            }
			},
			drawBall(ctx,ballsQuery){
				for(let i = 0, len = ballsQuery.length; i < len; i++){
	                ballsQuery[i].draw()
	            }
			}
		}
	}

</script>