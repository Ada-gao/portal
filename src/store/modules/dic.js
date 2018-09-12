import request from "@/router/axios"
const dic = {
    //state
    state: {
        productType:[],     //产品类型
        userType:[]         //账户类型
    },
    //actions
    actions: {
        //产品类型
        get_productType({ state, commit }){
            request({
                url: "/admin/dict/type/" + 'product_type',
                method: "get",
            }).then(res => {
                commit('set_productType',res.data)
            })
        },
        //账户类型
        get_userType({ state, commit }){
            request({
                url: "/admin/dict/type/" + 'user_type',
                method: "get",
            }).then(res => {
                commit('set_userType',res.data)
            })
        },
    },
    //mutations
    mutations: { 
        set_productType: (state,payload) => {
            state.productType = payload;
        },
        set_userType: (state,payload) => {
            state.userType = payload;
        }
    }
}
export default dic
