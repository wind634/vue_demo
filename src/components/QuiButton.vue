<template>
    <button class="qui-btn" v-on:click="btnClickEvent">
      <slot name="icon"></slot>
      <span>{{msg}}</span>
    </button>
</template>
<style>
</style>
<script>
    export default{
        props: {
            msg: {
              default: '下载'
            }
        },
        methods: {    //绑定事件的关键代码
            btnClickEvent: function(){
              alert(this.msg);

              this.$emit('btnClickEvent');
            }
        }

    }
</script>
