<template>
	<div class="alertBox" v-if="show">
		<div class="alert_mask" v-show="isShowMask"></div>
		<div class="alert animated fadeInDown">
			<div class="icon" :class="type" :type="type">
				<i v-if="type == 'success'" class="iconfont icon-chenggong"></i>
				<i v-if="type == 'error'" class="iconfont icon-shibai"></i>
				<i v-if="type == 'warning'" class="iconfont icon-tishi"></i>
			</div>
			<div class="content">
				<p class="type">
					<em v-if="type == 'success'">成功</em>
					<em v-if="type == 'error'">错误</em>
					<em v-if="type == 'warning'">提示</em>
				</p>
			 	<p class="con omit1" :class="type">{{text}}</p>
			</div>
			<span class="el-icon-close cursor" @click="show = false"></span>
		</div>
	</div>
</template>
 
<script>
export default {
	data() {
		return {
			
		}
	},
	props: {
		show: { // 是否显示此toast
			default: false
		},
		text: { // 提醒文字
			default: '加载中...'
		},
		position: { // 提醒容器位置
			default: 'middle'
		},
		isShowMask: { // 是否显示遮罩层
			default: false
		},
		time: { // 显示时间
			default: 2000
		},
		type:{ //显示状态
			default: 'success'
		}
	},
	watch:{
		show(){ // 时间控制
			var vm = this;
			if(this.show){
				setTimeout(() => {
					vm.show = false;
				}, vm.time)
			}
		}
	}
}
</script>
 
<style scoped>
.alertBox{ min-width: 1300px; }
.alert{position: fixed; display: flex; top: 20px; left: 50%; margin-left:-165px; padding: 22px 20px; width: 290px; background-color:#fff; z-index: 20; box-shadow: 0 2px 4px 0 rgba(0,0,0,0.12), 0 0 6px 0 rgba(0,0,0,0.04); border-radius: 2px; -webkit-border-radius: 2px; border: 1px solid #D3DCE6;}
.alert .icon{ width: 40px; height: 40px; }
.alert .icon i{ font-size: 40px; }
.alert .icon.success i{ color: #13CE66; }
.alert .icon.warning i{ color: #F7BA2A; }
.alert .icon.error i{ color: #FF4949; }
.alert .content{ flex: 1; margin-left: 14px; }
.alert .content .type{ color: #1F2D3D; }
.content .type em{ font-size: 16px; }
.content .con{ color: #8492A6; font-size: 13px; width: 220px; margin-top: 5px; word-break: break-all; }
.alert>span{ position: absolute; top: 20px; right: 20px; color: #C0CCDA; font-size: 18px; }

.alert.top{ top: 100px; margin-top: 0;}
.alert.center{ margin-top: -100px;}
.alert.bottom{top: auto;bottom: 50px; margin-top: 0;}

.alert_mask{ position: fixed; left: 0; top: 0; bottom: 0; right: 0; background:#fff; opacity: 0; filter: alpha(opacity=0); z-index:15;}
</style>

