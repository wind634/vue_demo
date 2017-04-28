<template>
  <div class="qui-list">
    <span class="list-tips">{{tipsText}}</span>
    <!--<qui-btn v-on:btnClickEvent="btnClickEvent" :msg=msg class="small"></qui-btn>-->

    <component :is="currentView" v-on:btnClickEvent="btnClickEvent" :msg=msg class="small"  keep-alive></component>
  </div>
</template>

<script>
  import quiButton from '../components/quiButton.vue'
  export default{
    props:{
      msg: {
        default: '下载'
      },
      tipsText: {
        default: '默认的文案'
      },
      currentView:{
        default: 'qui-btn'
      }
    },
    components: {
      'qui-btn': quiButton
    },
    methods:{
      btnClickEvent:function(){
          alert('按钮点击事件')
      }
    }
  }
</script>
