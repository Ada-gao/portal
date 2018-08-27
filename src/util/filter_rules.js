//验证手机号
const isvalidateMobile= (rule, value, callback) => {        
    let reg = /^((1[3-8][0-9])+\d{8})$/
    let flag = reg.test(value)
    if (!value || !flag) {
        callback(new Error('请输入正确的手机号'))
    } else {
        callback()
    }
}
//验证密码
const validatePass = (rule, value, callback) => {
  	var reg = /^[0-9a-zA-Z]+$/
  	if (!value) {
    	callback(new Error('请输入密码'))
  	} else if (value.length < 6) {
    	callback(new Error('密码不能少于6位'))
  	} else if (!reg.test(value)) {
    	callback(new Error('请您输入数字或字母'))
  	} else {
    	callback()
  	}
}
const numberPass = (rule, value, callback) => {
    if (!value || value.length < 6) {
        callback(new Error('密码不能小于6位'))
    } else {
        callback()
    }
}
//验证邮箱
const validEmail = (rule, value, callback) => {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    if (!value) {
        callback(new Error('请输入邮箱'))
    } else if (!reg.test(value)) {
        callback(new Error('请您输入正确的邮箱'))
    } else {
        callback()
    }
}
//调用
module.exports = {
  isvalidateMobile: isvalidateMobile,
  validatePass: validatePass,
  numberPass: numberPass,
  validEmail:validEmail
}
