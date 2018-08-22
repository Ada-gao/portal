<template>
    <div class="no_data tc">
        <i class="iconfont icon-comiiszanwushuju"></i>
        <p :style="{'font-size':size}">{{text}}</p>
    </div>
</template>
<script>

export default {
    data () {
        return {

        }
    },
    props: {
        text: { // 是否显示此toast
            default: "暂无数据"
        },
        size: {
            default: '14px'
        }
    }
}
</script>

<style scoped lang="scss">
.no_data{ padding:30px 0 20px 0; }
.no_data>i{ font-size: 100px; color: #E6E6E6;}
.no_data>p{ color: #C5C5C5; margin-top: 20px;}
.no_data img{ margin:0 auto;}
</style>
