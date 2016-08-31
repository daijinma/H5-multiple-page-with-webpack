<template>
        <div id="pd-video-cover">
            <div class="ABP-Unit" :class="{'ABP-FullScreen':video.fullscreen}">
                <div class="ABP-Video" tabindex="10" style="bottom: 0px;">
                    <div class="ABP-Container" style="perspective: 342.353px; bottom: 0px;"></div>
                    <video 
                        id="new-video" 
                        src="http://static.cdn.moe/ccltestingvideos/otsukimi_recital.mp4" 
                        @waiting="videoWaiting()" 
                        @canplay="video.canplay = true" 
                        @playing="videoPlaying()" 
                        ></video>
                </div>
                <div class="ABP-Text">
                    <input type="text" @keyup.enter="fireMsg">
                </div>
                <div class="ABP-Control">
                    <div @click="activeStatus()" class="button ABP-Play" :class="{'ABP-Pause':video.status=='play'}"></div>
                    <div @click="activeDanmu()" class="button ABP-CommentShow">弹幕开关</div>
                    <div @click="activeScreen()" class="button ABP-FullScreen"></div>
                </div>
            </div>
        </div>
</template>

<script>
    import $ from 'jquery';
    //window.CM = CM;
    module.exports={
        data(){
            return {
	            video:{
                    status:'pause',
                    fullscreen:false,
                    canplay:false,
                    waiting:true,
                    playing:false
                }
	        }
        },
        //props: ['title','array'],
        ready(){
            this.$video = this.$el.getElementsByTagName('video')[0];
            this.cm = new CommentManager($(".ABP-Container")[0]);
            this.cm.setBounds();//测量弹幕区域大小
            this.cm.start(); //打开弹幕
            var _this = this;
            var danmu = [
                '666',
                '6666666666666666666666666666666',
                '233333333',
                '1111111111',
                "我一直很想质疑一下",
                '红A打B叔那伤害跟挠痒痒一样',
                '结果到闪闪这就是虐杀，几刀一条命，明明俩人对武器的话',
                '各种闪避，虽说没体现力量吧',
                '闪闪真TM该死',
                '但是和士郎打的时候简直让士郎追着砍，最后还给砍成了神',
                '首先，天之锁，完克b叔，第二，b叔完全狂化等于敏捷是负到',
                '天之锁是最后一条命才用的',
                '完全狂化等于敏捷是负的，完全',
                "微信公众号smallBj520",
                "今晚有没有LOL的一块啊？",
                "这种烟真心不好抽",
                "星期天我想去爬长城",
                "边喝酒边看电影",
                "春天来咯一块爬山去，谁去啊？"
             ];

            setInterval(function(){
                _this.cm.send({
                    "mode": 1,
                    "text": danmu[parseInt(Math.random()*19)],
                    "dur": 8000
                });
            },100)
        },
        methods:{
            activeStatus:function(){
                

                if(this.video.status=='play'){
                    this.video.status='pause';
                    this.$video.pause();
                }else{
                    this.video.status='play';
                    this.$video.play();
                }
            },
            activeDanmu:function(){
                if(this.cm.display == false){
                    this.cm.display = true;
                    this.cm.start();
                }else{
                    this.cm.display = false;
                    this.cm.clear();
                    this.cm.stop();
                }   
            },
            activeScreen:function(){
                this.video.fullscreen = !this.video.fullscreen;
                this.cm.setBounds();
            },
            videoWaiting:function(){
                this.video.waiting = true;
                this.video.playing = false;
            },
            videoPlaying:function(){
                this.video.waiting = false;
                this.video.playing = true;
            },
            fireMsg:function(e){
                this.cm.send({
                    "mode": 1,
                    'color':0x11c97e,
                    "text": e.target.value,
                    "dur": 8000
                });
                e.target.value = '';
            }
        }
    }
</script>

<style>

#pd-video-cover{height:10rem;}

</style>