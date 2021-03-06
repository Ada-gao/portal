<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button-group>
        <el-button type="primary" v-if="deptManager_btn_add" icon="plus" @click="handlerAdd">添加</el-button>
        <el-button type="primary" v-if="deptManager_btn_edit" icon="edit" @click="handlerEdit">编辑</el-button>
        <el-button type="primary" v-if="deptManager_btn_del" icon="delete" @click="handleDelete">删除</el-button>
      </el-button-group>
    </div>

    <el-row>
      <el-col :span="8" style='margin-top:15px;'>
        <el-tree
          class="filter-tree"
          :data="treeData"
          node-key="id"
          highlight-current
          :props="defaultProps"
          :filter-node-method="filterNode"
          @node-click="getNodeData"
          default-expand-all
        >
        </el-tree>
      </el-col>
      <el-col :span="16" style='margin-top:15px;'>
        <el-card class="box-card">
          <el-form :label-position="labelPosition" label-width="80px" :model="form" ref="form">
            <el-form-item label="父级节点" prop="parentId">
              <el-input v-model="form.parentId" :disabled="formEdit" placeholder="请输入父级节点"></el-input>
            </el-form-item>
            <el-form-item label="节点编号" prop="parentId" v-if="formEdit">
              <el-input v-model="form.deptId" :disabled="formEdit" placeholder="节点编号"></el-input>
            </el-form-item>
            <el-form-item label="公司名称" prop="name">
              <!-- <el-input v-model="form.name"   placeholder="请输入名称"></el-input> -->
                <el-select v-model="form.name" filterable placeholder="请选择公司名称" :disabled="formEdit">
                    <el-option v-for="item in company_list" :key="item.companyName" :label="item.companyName" :value="item.companyName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="排序" prop="orderNum">
              <el-input v-model="form.orderNum" @change="validNum" :disabled="formEdit" placeholder="请输入排序"></el-input>
            </el-form-item>
            <el-form-item v-if="formStatus == 'update'">
              <el-button type="primary" @click="update">更新</el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
            <el-form-item v-if="formStatus == 'create'">
              <el-button type="primary" @click="create">保存</el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { fetchTree, getObj, addObj, delObj, putObj } from '@/api/dept'
  import { mapGetters } from 'vuex'
  import request from "@/router/axios";
  export default {
    name: 'menu',
    data() {
      return {
        list: null,
        total: null,
        formEdit: true,
        formAdd: true,
        formStatus: '',
        showElement: false,
        typeOptions: ['0', '1'],
        methodOptions: ['GET', 'POST', 'PUT', 'DELETE'],
        listQuery: {
          name: undefined
        },
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        labelPosition: 'right',
        form: {
          name: undefined,
          compantId:undefined,
          orderNum: undefined,
          parentId: undefined,
          deptId: undefined
        },
        currentId: 0,
        deptManager_btn_add: false,
        deptManager_btn_edit: false,
        deptManager_btn_del: false,
        company_list:[],                //公司列表
      }
    },
    filters: {
      typeFilter(type) {
        const typeMap = {
          0: '菜单',
          1: '按钮'
        }
        return typeMap[type]
      }
    },
    created() {
      this.getList();
      this.get_company();
      this.deptManager_btn_add = this.permissions['sys_dept_add']
      this.deptManager_btn_edit = this.permissions['sys_dept_edit']
      this.deptManager_btn_del = this.permissions['sys_dept_del']
    },
    computed: {
      ...mapGetters([
        'elements',
        'permissions'
      ])
    },
    watch:{
      'form.orderNum':function(){
        this.clearNoNum(this.form.orderNum)
      }
    },
    methods: {
      //获取公司
      get_company() {
          request({
              url: "/admin/company/company",
              method: "get",
          }).then(response => {
              if (response.status == 200) {
                  this.company_list = response.data;
              } else {
                  this.$toast.show({
                      text:response.data.msg,
                      type:'error'
                  })
              }
          }).catch(() => {})
      },
      getList() {
        fetchTree(this.listQuery).then(response => {
          this.treeData = response.data
        })
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      clearNoNum(val){ 
          val = val.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
          val = val.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
          val = val.replace(/^(\-)*(\d+)\.().*$/,'$1$2.$3');//只能输入两个小数 
          val = val.replace(/[^\d]/g,"");  //清除“数字”和“.”以外的字符 
          if(val.indexOf(".")< 0 && val !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
              val = parseFloat(val)
          } 
          return val
      },
      validNum(e){
        this.form.orderNum = this.clearNoNum(e)
      },
      getNodeData(data) {
        if (!this.formEdit) {
          this.formStatus = 'update'
        }
        getObj(data.id).then(response => {
          this.form = response.data
        })
        this.currentId = data.id
        this.showElement = true
      },
      handlerEdit() {
        if (this.form.deptId) {
          this.formEdit = false
          this.formStatus = 'update'
        }
      },
      handlerAdd() {
        this.resetForm()
        this.formEdit = false
        this.formStatus = 'create'
      },
      handleDelete() {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delObj(this.currentId).then(() => {
            this.getList()
            this.resetForm()
            this.onCancel()
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          })
        })
      },
      update() {
        for(var i in this.company_list){
            if(this.company_list[i].companyName == this.form.name){
                this.form.companyId = this.company_list[i].companyId
            }
        }
        putObj(this.form).then(() => {
          this.getList()
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        })
      },
      create() {
        for(var i in this.company_list){
            if(this.company_list[i].companyName == this.form.name){
                this.form.companyId = this.company_list[i].companyId
            }
        }
        addObj(this.form).then(() => {
          this.getList()
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
        })
      },
      onCancel() {
        this.formEdit = true
        this.formStatus = ''
      },
      resetForm() {
        this.form = {
          permission: undefined,
          name: undefined,
          menuId: undefined,
          parentId: this.currentId,
          url: undefined,
          icon: undefined,
          sort: undefined,
          component: undefined,
          type: undefined,
          method: undefined
        }
      }
    }
  }
</script>

