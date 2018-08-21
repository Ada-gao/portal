import Vue from 'vue'
//保留两位有效数字
Vue.filter("formatMoney",function(value){
	if(value == 'undefined' || value === '' || value == null) return 0;
    value = parseFloat(value)
    return value.toFixed(2)
});

//输出年月日
Vue.filter("toDate",function(number,is_hfs){
	var n = number*1000;
	var date = new Date(n);
	var Y = date.getFullYear();
	var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) ;
	var D = (date.getDate() < 10 ? "0" + (date.getDate()) : date.getDate());
	var H = (date.getHours() < 10 ? "0" + (date.getHours()) : date.getHours());
	var F = (date.getMinutes() < 10 ? "0" + (date.getMinutes()) : date.getMinutes());
	var S = (date.getSeconds() < 10 ? "0" + (date.getSeconds()) : date.getSeconds());
	
	if (is_hfs==1){
		return (Y+'-'+M+'-'+D);
	}else if (is_hfs==2){
        return (Y+'.'+M+'.'+D);
    }else if (is_hfs == 3){
    	return (Y+'-'+M+'-'+D+' '+H+':'+F)
    }
	return (Y+'-'+M+'-'+D+' '+H+':'+F+':'+S)
});

//设置默认值
Vue.filter('setdefault', function (item, val) {
    if(typeof item == 'undefined' || item == '' || item == null){
        return val
    }
    return item
});

// 图片路径
Vue.filter('upload', function(item){
	if(item){
		item = process.env.BASE_API + '/file?fileUuid=' + item
	}else{
		item = ''
	}
	return item
})
