import Alert from 'components/alert/alert.vue'
	var Toast = {} // 定义插件对象
	Toast.install = function (Vue, options) { // vue的install方法，用于定义vue插件
	if(document.getElementsByClassName('alertBox').length){ 
		return
	}
	let toastTpl = Vue.extend(Alert)
	let $vm = new toastTpl()
	let tpl = $vm.$mount().$el
	document.body.appendChild(tpl)
	Vue.prototype.$toast = { // 在Vue的原型上添加实例方法，以全局调用
		show(options) {
			if (typeof options === 'string') { // 对参数进行判断
				$vm.text = options // 传入props
			}
			else if (typeof options === 'object') {
				if(typeof options.onClose != 'function'){
					options.onClose = null;
				}
				if(typeof options.type != 'string'){
					options.type = 'success';
				}
				Object.assign($vm, options) // 合并参数与实例
			}
			$vm.show = true // 显示toast
		},
		hide() {
			$vm.show = false
		}
	}
}
export default Toast;
