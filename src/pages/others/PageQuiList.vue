<template>
    <div>
        <qui-list tipsText="自定义文案，默认右边是按钮" msg="弹层"></qui-list>
    </div>
</template>
<style>

</style>
<script>
    import quiList from '../components/quiList.vue'
    export default{
        components: {
            'qui-list': quiList /*注册自定义标签*/
        },
        data(){
            return{
                msg:'hello vue'
            }
        },
        beforeCreate:function(){

        },//组件实例化之前
        created:function(){
          console.log("created..")
        },//组件实例化了
        beforeMount:function(){},//组件写入dom结构之前
        mounted:function(){//组件写入dom结构了
          console.log(this.$children);
          console.log(this.$refs);
        },
        beforeUpdate:function(){},//组件更新前
        updated:function(){},//组件更新比如修改了文案
        beforeDestroy:function(){},//组件销毁之前
        destroyed:function(){}//组件已经销毁
    }
</script>
