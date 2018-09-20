<template>
    <div>
        <div class="consump common_style mt20 box_adorn">
            <div class="common_head omit1">
                <i class="iconfont icon-lituizhi-"></i>
                <em class="font16">登录记录</em>
            </div>
            <!--一键导出-->
            <div class="common_btn tr">
                <button :class="{'disable':list.length == 0}" @click="get_excel"><i class="iconfont icon-xiazai"></i>一键导出</button>
            </div>
            <div class="table_style" v-if="list.length">
                <el-table id="login-table" :data="list" :key='0' v-loading="loading" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">

                    <el-table-column align="center" label="登录账号">
                        <template slot-scope="scope"><span>{{scope.row.loginName}}</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="登录IP地址">
                        <template slot-scope="scope"><span>{{scope.row.ipaddr}}</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="登录地点">
                        <template slot-scope="scope"><span>{{scope.row.loginLocation}}</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="浏览器">
                        <template slot-scope="scope"><span>{{scope.row.browser}}</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="操作系统">
                        <template slot-scope="scope"><span>{{scope.row.os}}</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="登录状态">
                        <template slot-scope="scope"><span class="login_status" :class="{'success':scope.row.status == 0,'fail':scope.row.status == 1}">{{scope.row.status == 0 ? '成功' : '失败'}}</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="操作信息" width="240px">
                        <template slot-scope="scope"><span>{{scope.row.message}}</span></template>
                    </el-table-column>

                    <el-table-column align="center" label="登录时间">
                        <template slot-scope="scope"><span>{{scope.row.loginTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span></template>
                    </el-table-column>

                </el-table>
                <div class="page clearfix mt20 box">
                    <el-col :span="24">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
                    </el-col>
                    <!-- <el-col :span="6">
                        <div class="tip pr">
                            <p class="tr"><em class="in_b cursor" ref="title"><i></i>累计登录次数：3次</em></p>
                        </div>
                    </el-col> -->
                </div>
            </div>
            <!--没有数据-->
            <v_no_data v-if="list.length == 0"></v_no_data>
        </div>
    </div>
</template>

<script>
import request from "@/router/axios";
import { getExcel } from '@/util/auth'
export default {
    data () {
        return {
            list:[],
            listQuery: {
                page: 1,                //当前页数
                limit: 10,              //一页显示数据量
            },
            total: null,            //数据总页码
            loading:false
        }
    },
    mounted(){
        this.login_data();
    },
    methods: {
        //获取登录信息
        login_data(type){
            if(type){
                this.limit = this.listQuery.limit;
                this.listQuery.limit = this.total
            }
            request({
                url: "/admin/sysLoginLog/logPage",
                method: "get",
                params: this.listQuery
            }).then(res => {
                this.loading = false;
                this.total = res.data.total;
                if(type){
                    this.listQuery.limit = this.limit
                    this.data_proces(res.data.records)
                }else{
                    this.list = res.data.records;
                }
            })
        },
        //页码修改
        handleSizeChange(val) {
            this.listQuery.limit = val;
            this.loading = true;
            this.login_data();
        },
        //页码修改
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.loading = true;
            this.login_data();
        },
        //导出
        get_excel(){
            if(this.list.length == 0) return;
            var num = Math.ceil(this.total/this.listQuery.limit);
            if(num == 1){
                this.data_proces(this.list);
            }else{
                this.login_data('excel')
            }
        },
        //导出数据处理
        data_proces(data){
            let list = []
            data.forEach((item,index) => {
                let obj = new Object()
                let date = new Date(item.loginTime)
                item.loginTime = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' +date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
                obj.登录账号 = item.loginName
                obj.登录IP地址 = item.ipaddr
                obj.登录地点 = item.loginLocation
                obj.浏览器 = item.browser
                obj.操作系统 = item.os
                if (item.status == 0){
                    obj.登录状态 = '成功'
                } else{
                    obj.登录状态 = '失败'
                }
                obj.操作信息 = item.message
                obj.登录时间 = item.loginTime
                list[index] = obj
            })
            getExcel(list,'登录记录.xlsx');
        },
    }
}
</script>

<style scoped>
.tip_title{ top: 50%; margin-top: -26px; padding:10px; width: 170px; background: rgba(38,41,50,0.60); border-radius: 4px; -webkit-border-radius: 4px;  }
.tip_title:after{ content: ""; display:block; width:0; height:0; border-width:6px 0 6px 6px; border-style:solid; border-color:transparent transparent transparent rgba(38,41,50,0.60); margin-top: -6px; position:absolute; top:50%; right:-6px; }
.tip_title em,.tip_title p{ white-space: nowrap; color: #fff; }
.tip_title em{display: block; font-size: 10px; margin-top: 2px; }
.tip:hover .tip_title{ display: block; }
.tip p i{ display: inline-block; width: 6px; }
.tip>p{ line-height: 32px; color: #1A8CE1; }

.login_status{ display: inline-block; width:60px; height: 30px; line-height: 30px; text-align: center; border-radius: 14px; font-size: 15px; font-weight: 700; color: #fff; }
.login_status.success{ background: #53b095; }
.login_status.fail{ background: #dc6068; }
</style>
