<template>
  <div id="pageQuiButton">
    <!--使用-->
    <qui-btn v-on:btnClickEvent="doSth" msg="我可以点击" class="small">
        <span slot="icon" class="ico" >asd</span>
    </qui-btn>
  </div>
</template>
<style>

</style>

<script>
    import quiBtn from '../components/QuiButton.vue'
    export default{
        name: "pageQuiButton",
        components: {
            'qui-btn': quiBtn /*注册自定义标签*/
        },
        methods: {
          doSth: function(){
            alert('你点击了组件的click:btnClickEvent');
          }
        }
    }
</script>
