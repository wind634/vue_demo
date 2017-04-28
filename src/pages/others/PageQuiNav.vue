<template>
  <div id="pageQuiNav">
    <!--使用-->
    <qui-nav></qui-nav>
  </div>
</template>

<script>
    import quiNav from '../components/quiNav.vue'
    export default{
        components: {
            'qui-nav': quiNav /*注册自定义标签*/
        },
        data(){
            return{
                msg:'hello vue'
            }
        }
    }
</script>
