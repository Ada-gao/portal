<template>
  <div>
    <input id="excel-upload-input" type="file" accept=".xlsx, .xls" class="c-hide" @change="handkeFileChange">
      <div @click="handleUpload">
        <el-input v-model="filename" placeholder="请选择上传文件" readonly></el-input>
      </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'

export default {
  data () {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null
      },
      filename: ''
    }
  },
  methods: {
    generateDate ({ header, results, formData }) {
      this.excelData.header = header
      this.excelData.results = results
      this.excelData.filename = this.filename
      this.$emit('on-selected-file', this.excelData)
    },
    handleUpload () {
      document.getElementById('excel-upload-input').click()
    },
    handkeFileChange (e) {
      if (e.target.files[0] === null) return
      const files = e.target.files
      const itemFile = files[0] // only use files[0]
      this.filename = itemFile.name
      let formData = new FormData()
      formData.append('file', itemFile)
      this.readerData(itemFile, formData)
      document.getElementById('excel-upload-input').value = ''
    },
    readerData (itemFile, formData) {
      const reader = new FileReader()
      reader.onload = e => {
        const data = e.target.result
        const fixedData = this.fixdata(data)
        const workbook = XLSX.read(btoa(fixedData), { type: 'base64' })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const header = this.get_header_row(worksheet)
        const results = XLSX.utils.sheet_to_json(worksheet)
        this.generateDate({ header, results, formData })
      }
      reader.readAsArrayBuffer(itemFile)
    },
    fixdata (data) {
      let o = ''
      let l = 0
      const w = 10240
      for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
      return o
    },
    get_header_row (sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */
        var hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    }
  }
}
</script>

<style scoped lang="scss">
#excel-upload-input{
  display: none;
  z-index: -9999;
}
#drop{
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
  margin-bottom: 35px;
  overflow: visible;
}
.el-upload__text {
  position: absolute;
  line-height: 20px;
  height: 20px;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  em {
    color: #0299CC;
    font-weight: bold;
  }
}
.el-upload__tip {
  height: 20px;
  line-height: 20px;
   a {
    color: #0299CC;
   }
}
</style>
