import Cookies from 'js-cookie'
import store from '@/store'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
const TokenKey = 'x-access-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getExcel(id,name){
	var wb = XLSX.utils.table_to_book(document.querySelector('#'+id))
    //const wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} };
    //wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(list);
    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
    try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), name)
    } catch (e) {
        if (typeof console !== 'undefined'){
           console.log(e, wbout) 
        }
    }
    return wbout
}