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
//验证数字
const validNumber = (rule, value, callback) => {
    var reg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
    if (!value) {
        callback(new Error('请输入金额'))
    } else if (!reg.test(value)) {
        callback(new Error('请您输入正确的金额'))
    } else {
        callback()
    }
}
//验证省份证号
const validIdCart = (rule, value, callback) => {
    var reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;
    if (!value) {
        callback(new Error('请输入身份证号'))
    } else if (!reg.test(value)) {
        callback(new Error('请您输入正确的身份证号'))
    } else {
        callback()
    }
}
//验证银行卡号
//var pattern = /^([1-9]{1})(\d{14}|\d{18})$/
const validCardNo = (rule, value, callback) => {
    var reg = /^([1-9]{1})(\d{14}|\d{18})$/;
    if (!value) {
        callback(new Error('请输入银行卡号'))
    } else if (!reg.test(value)) {
        callback(new Error('请您输入正确的银行卡号'))
    } else {
        callback()
    }
}
//调用
module.exports = {
  isvalidateMobile: isvalidateMobile,
  validatePass: validatePass,
  numberPass: numberPass,
  validEmail:validEmail,
  validNumber:validNumber,
  validIdCart:validIdCart,
  validCardNo:validCardNo
}
