<template>
    <div  class="basic_info common_style box_adorn">
    	<div class="spec_head">
    		<em class="in_b"></em>
            <span>产品设定</span>
    	</div>
    	<div>
            <!--产品设定-->
            <el-form class="mt20" :model="form">
                <div class="product_set">产品设定</div>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="产品类型" label-width="80px" prop="select_data">
                            <el-select style="width:100%" v-model="form.select_data" multiple filterable allow-create default-first-option placeholder="请选择产品类型"  size="medium" @change="change_product_type">
                                <el-option v-for="item in productType_list" :key="item.label" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="select_con" v-for="(plist,key) in form.select_data" :key="key">
                <p>{{productType_list[key].label}}</p>
                <el-form class="form-border style"> <!--数据  :model="list"-->
                    <el-row>
                        <el-checkbox-group v-model="checkList">
                            <el-col :span="6" v-for="(item,index) in product_info" :key="index" v-if="item.productType == plist">
                                <el-form-item>
                                    <el-checkbox :label="item.productId" :key="item.productId" @change="change_product(key,index,item)"><span>{{item.productName}}</span><input type="text" :value="item.productPrice" :disabled="item.status == 0 ? false : true" v-model="item.productPrice"><em>元</em></el-checkbox>
                                </el-form-item>
                            </el-col>
                        </el-checkbox-group>
                    </el-row>
                </el-form>
            </div>
            <!--产品设定 结束-->
            <el-col :span="24" slot="footer" class="clearfix" style="text-align: center; float: none; margin-top: 20px;">
                <el-button class="search_btn" @click="$router.back()">取 消</el-button>
                <el-button type="primary" @click="updata">修 改</el-button>
            </el-col>
        </div>
    </div>
</template>

<script>
import request from "@/router/axios";
export default {
    data () {
        return {   
            checkList:[],
            type:[],
            productType_list:[],                    //产品类型列表
            product_info:[],                        //核验列表
            userId:'',                              //用户idthis.userId
            form:{
                select_data:[],                     //选中的产品类型
            },
        }
    },
    created() {
        this.userId = this.$route.query.userId;
        this.get_produceType();
    },
    methods: {
        //获取产品类型
        get_produceType(){
            request({
                url: "/admin/dict/type/" + 'product_type',
                method: "get",
            }).then(res => {
                this.productType_list = res.data;
                this.get_userProduct()
            }).catch(() => {})
        },
        change_product(key,index,item){
            if(item.status == 1){
                this.product_info[index].status = 0;
            }else{
                this.product_info[index].status = 1;
            }
        },
        //获取用户的产品设定
        get_userProduct(){
            request({
                url: "/admin/product/productList",
                method: "get",
                params:{
                    userId:this.userId
                },
            }).then(res => {
                this.product_info = res.data;
                for(var i in this.product_info){
                    if(this.product_info[i].productPrice == null){
                        this.product_info[i].productPrice = 0;
                        this.product_info[i].status = 1;
                    }
                    this.form.select_data.push(this.product_info[i].productType)
                    //勾选
                    if(this.product_info[i].status == 0){
                        var index = Number(i) + 1;
                        this.checkList.push(index)
                    }
                }
                //去重
                for(var i = 0; i< this.form.select_data.length; i++){
                    if(this.form.select_data.indexOf(this.form.select_data[i]) != i){
                        this.form.select_data.splice(i,1);
                        i--;
                    }
                }
            }).catch(() => {})
        },
        //选择产品类型
        change_product_type(e){
            this.product_info = [];
            this.form.select_data = [];
            for(var i in e){
                request({
                    url: "/admin/product/productList",
                    method: "get",
                    params:{
                        productType:e[i],
                        userId:this.userId
                    },
                }).then(res => {
                    for(var i in res.data){
                        this.product_info.push(res.data[i]);
                    }
                    for(var i = 0; i< this.product_info.length;i++){
                        this.product_info[i].status = 1;
                        this.product_info[i].productPrice = 0;
                        this.form.select_data.push(this.product_info[i].productType)
                    }
                    //去重
                    for(var i = 0; i< this.form.select_data.length; i++){
                        if(this.form.select_data.indexOf(this.form.select_data[i]) != i){
                            this.form.select_data.splice(i,1);
                            i--;
                        }
                    }
                }).catch(() => {})
            }
        },
        //修改提交
        updata(){
            var reg = /^[1-9]\d{0,2}\.\d{0,2}$|^[0-9]*$/;
            for(var i in this.product_info){
                if(!reg.test(this.product_info[i].productPrice)){
                    this.$message.error('请输入有效数字');
                }
                if(this.product_info[i].userId == null){
                    this.product_info[i].userId = Number(this.userId);
                }
            }
            this.params = {};
            this.params = this.product_info;
            request({
                url: "/admin/productUser",
                method: "put",
                data:this.params,
            }).then(res => {
                this.$message.success('产品设定成功');
                this.$router.back()
            }).catch(() => {})
        }
    }
}
</script>

<style lang="scss" scoped>
.common_style{ padding-top: 0!important;}
.set_info{ margin:20px 0 0 30px; font-size: 16px; font-weight: 600;}

//产品设定
.product_set{ margin:0 0 25px 30px; font-size: 16px; font-weight: 600;}
.select_con>p{ padding-left: 10px; margin-bottom: 15px; }
.select_con .style{ padding:0 10px;}
.select_con span{ margin-left: 5px;}
.select_con input{ width: 46px!important; height: 26px; line-height: 26px; padding:0 5px; text-align: center; border:1px solid #C8C8C8; border-radius: 2px; -webkit-border-radius: 2px; margin:0 5px; }
input:disabled{ background-color: #F5F7FA;}
</style>