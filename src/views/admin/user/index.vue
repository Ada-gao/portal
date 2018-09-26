<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名" v-model="listQuery.username"></el-input>
            <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
            <el-button v-if="sys_user_add" class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
        </div>

        <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 99%">

            <el-table-column align="center" label="用户名">
                <template slot-scope="scope">
                    <span style="display: flex;"><img v-if="scope.row.avatar" class="user-avatar vm" style="width: 20px; height: 20px; border-radius: 50%; margin:auto;" :src="scope.row.avatar+'?imageView2/1/w/20/h/20'"> <em class="vm" style="flex: 1;"> {{scope.row.username}}</em></span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="手机号">
                <template slot-scope="scope"><span>{{scope.row.phone}}</span></template>
            </el-table-column>

            <el-table-column align="center" label="邮箱">
                <template slot-scope="scope"><span>{{scope.row.email}}</span></template>
            </el-table-column>

            <el-table-column align="center" label="所属公司" show-overflow-tooltip>
                <template slot-scope="scope"><span>{{scope.row.deptName}} </span></template>
            </el-table-column>

            <el-table-column align="center" label="创建时间">
                <template slot-scope="scope"><span>{{scope.row.createTime | moment('YYYY-MM-DD HH:mm:ss')}}</span></template>
            </el-table-column>

            <el-table-column align="center" label="到期时间">
                <template slot-scope="scope"><span>{{scope.row.expirationDate | moment('YYYY-MM-DD HH:mm:ss')}}</span></template>
            </el-table-column>

            <el-table-column align="center" label="账户类型">
                <template slot-scope="scope"><span>{{scope.row.userTypeName}}</span></template>
            </el-table-column>

            <el-table-column align="center" class-name="status-col" label="状态">
                <template slot-scope="scope"><el-tag>{{scope.row.delFlag | statusFilter}}</el-tag></template>
            </el-table-column>

            <el-table-column align="center" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button v-if="sys_user_upd" size="small" type="success" @click="handleUpdate(scope.row)">编辑</el-button>
                    <el-button v-if="sys_user_del" size="small" type="danger" @click="deletes(scope.row)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
        <!--页码-->
        <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
        </div>

        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogDeptVisible">
            <el-tree class="filter-tree" :data="treeDeptData" :default-checked-keys="checkedKeys" check-strictly node-key="id" highlight-current ref="deptTree" :props="defaultProps" @node-click="getNodeData" default-expand-all></el-tree>
        </el-dialog>
        <!--弹框-->
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" v-if="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" placeholder="请输用户名"></el-input>
                </el-form-item>

                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="form.phone" placeholder="请输入手机号码"></el-input>
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>

                <el-form-item v-if="dialogStatus == 'create'" label="密码" placeholder="请输入密码" prop="password">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>

                <el-form-item label="所属公司" prop="deptName">
                    <el-input v-model="form.deptName" placeholder="请选择公司" @focus="handleDept()" readonly></el-input>
                    <input type="hidden" v-model="form.deptId" />
                </el-form-item>

                <el-form-item label="角色" prop="role">
                    <el-select class="filter-item" v-model="role" placeholder="请选择" multiple>
                        <el-option v-for="item in rolesOptions" :key="item.roleId" :label="item.roleDesc" :value="item.roleId" :disabled="isDisabled[item.delFlag]">
                            <span style="float: left">{{ item.roleDesc }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.roleCode }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="账户类型" prop="userType">
                    <el-select class="filter-item" v-model="form.userType" placeholder="请选择账户类型">
                        <el-option v-for="item in userType" :key="item.label" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="到期时间" prop="expirationDate">
                    <el-date-picker v-model="form.expirationDate" type="datetime" placeholder="请选择到期时间"></el-date-picker>
                </el-form-item>

                <el-form-item label="状态" v-if="dialogStatus == 'update' && sys_user_del " prop="delFlag">
                    <el-select class="filter-item" v-model="form.delFlag" placeholder="请选择">
                        <el-option v-for="item in statusOptions" :key="item" :label="item | statusFilter" :value="item"> </el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel('form')">取 消</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
                <el-button v-else type="primary" @click="update('form')">修 改</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Validate from '@/util/filter_rules'
import { fetchList, getObj, addObj, putObj, delObj } from "@/api/user";
import { deptRoleList, fetchDeptTree } from "@/api/role";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { mapGetters,mapState } from "vuex";
import ElRadioGroup from "element-ui/packages/radio/src/radio-group";
import ElOption from "element-ui/packages/select/src/option";
import request from "@/router/axios";
export default {
    components: { ElOption, ElRadioGroup},
    name: "table_user",
    directives: { waves },
    data() {
        return {
            treeDeptData: [],
            checkedKeys: [],
            defaultProps: {
                children: "children",
                label: "name"
            },
            list: null,
            total: null,
            listLoading: true,
            listQuery: {
                page: 1,
                limit: 20
            },
            role: [],
            form: {
                username: undefined,            //用户名
                password: undefined,        //密码
                delFlag: undefined,             //角色 
                deptId: undefined,              //所属公司
                phone: undefined,               //手机号
                email: undefined,               //邮箱
                expirationDate: undefined,      //到期时间
                userType: undefined,            //账户类型
            },
            rules: {
                username: [
                    { required: true, message: "请输入账户", trigger: "blur"},
                    { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur"}
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur"}
                ],
                deptId: [
                    { required: true, message: "请选择公司",trigger: "blur" }
                ],
                role: [
                    { required: true, message: "请选择角色", trigger: "blur" }
                ],
                phone: [
                    { required: true, trigger: 'blur', validator: Validate.isvalidateMobile },
                ],
                email: [
                    { required: true, trigger: 'blur', validator: Validate.validEmail }
                ],
                deptName: [
                    { required: true, message: "请选择所属公司", trigger: "blur"}
                ],
                userType: [
                    { required: true, message: "请选择账户类型", trigger: "blur"}
                ],
                expirationDate: [
                    { required: true, message: "请选择到期时间", trigger: "blur"}
                ],

            },
            statusOptions: ["0", "1"],
            rolesOptions: [],
            dialogFormVisible: false,
            dialogDeptVisible: false,
            userAdd: false,
            userUpd: false,
            userDel: false,
            dialogStatus: "",
            textMap: {
                update: "编辑",
                create: "创建"
            },
            isDisabled: {
                0: false,
                1: true
            },
            userType:[
                {label:'付费使用',value:0},
                {label:'试用体验',value:1}
            ],
            tableKey: 0
        };
    },
    computed: {
        ...mapGetters(["permissions"]),
        ...mapState({
            dic: state => state.dic
        }),
    },
    filters: {
        statusFilter(status) {
            const statusMap = {
                0: "有效",
                1: "无效",
                9: "锁定"
            };
            return statusMap[status];
        }
    },
    created() {
        this.sys_user_add = this.permissions["sys_user_add"];
        this.sys_user_upd = this.permissions["sys_user_upd"];
        this.sys_user_del = this.permissions["sys_user_del"];
        this.getList();
    },
    methods: {
        getList() {
            this.listLoading = true;
            this.listQuery.isAsc = false;
            fetchList(this.listQuery).then(response => {
                this.list = response.data.records;
                this.total = response.data.total;
                this.listLoading = false;
                for(var i in this.dic.userType){
                    for(var j in this.list){
                        if(this.list[j].userType == this.dic.userType[i].value){
                            this.list[j].userTypeName = this.dic.userType[i].label
                        }
                    }
                }
            });
        },
        getNodeData(data) {
            this.dialogDeptVisible = false;
            this.form.deptId = data.id;
            this.form.deptName = data.name;
            deptRoleList(data.id).then(response => {
                this.rolesOptions = response.data;
            });
        },
        //选择公司
        handleDept() {
            fetchDeptTree().then(response => {
                this.treeDeptData = response.data;
                this.dialogDeptVisible = true;
            });
        },
        handleFilter() {
            this.listQuery.page = 1;
            this.getList();
        },
        handleSizeChange(val) {
            this.listQuery.limit = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.getList();
        },
        //点击添加 新增用户管理
        // handleCreate() {
        //     this.resetTemp();
        //     this.dialogStatus = "create";
        //     this.dialogFormVisible = true;
        // },
        //点击添加 创建账号
        handleCreate() {
            this.$router.push({path:'/admin/user/create_account', query: {type:'add'}});
        },
        //点击编辑 修改用户信息
        handleUpdate(row) {
            var account_data = JSON.stringify(row);
            this.$router.push({path:'/admin/user/create_account', query: {type:'change',data:account_data}});
        },
        //点击编辑 用户管理编辑
        // handleUpdate(row) {
        //     getObj(row.userId).then(response => {
        //         this.form = response.data;
        //         this.dialogFormVisible = true;
        //         this.dialogStatus = "update";
        //         this.role = [];
        //         for (var i = 0; i < row.roleList.length; i++) {
        //             this.role[i] = row.roleList[i].roleId;
        //         }
        //         deptRoleList(response.data.deptId).then(response => {
        //             this.rolesOptions = response.data;
        //         });
        //     });
        // },
        //点击 弹框确定 创建新的用户
        create(formName) {
            const set = this.$refs;
            this.form.role = this.role;
            set[formName].validate(valid => {
                if (valid) {
                    addObj(this.form).then(() => {
                        this.dialogFormVisible = false;
                        this.getList();
                        this.$notify({
                            title: "成功",
                            message: "创建成功",
                            type: "success",
                            duration: 2000
                        });
                    });
                } else {
                    return false;
                }
            });
        },
        //点击弹框取消
        cancel(formName) {
            this.dialogFormVisible = false;
            this.$refs[formName].resetFields();
        },
        //点击弹框 修改用户信息 
        update(formName) {
            const set = this.$refs;
            this.form.role = this.role;
            set[formName].validate(valid => {
                if (valid) {
                    this.dialogFormVisible = false;
                    this.form.password = undefined;
                    putObj(this.form).then(() => {
                        this.dialogFormVisible = false;
                         this.getList();
                        this.$notify({
                            title: "成功",
                            message: "修改成功",
                            type: "success",
                            duration: 2000
                        });
                    });
                } else {
                    return false;
                }
            });
        },
        //删除用户
        deletes(row) {
            this.$confirm("此操作将永久删除该用户(用户名:" + row.username + "), 是否继续?","提示",{
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                delObj(row.userId).then(() => {
                    this.getList();
                    this.$notify({
                        title: "成功",
                        message: "删除成功",
                        type: "success",
                        duration: 2000
                    });
                }).cache(() => {
                    this.$notify({
                        title: "失败",
                        message: "删除失败",
                        type: "error",
                        duration: 2000
                    });
                });
            });
        },
        //点击添加 清空弹框里面的数据
        resetTemp() {
            this.role = [];
            this.form = {
                id: undefined,
                username: "",
                password: "",
                role: [],
                delFlag: "",
                deptId: "",
                phone: "",
                email: "",
                expirationDate:"",
                userType:"",
            };
        }
    }
};
</script>
