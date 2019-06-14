<template>
    <div class="demo-image">
        <div>
        <span>预测得太准啦！给开发者们买杯咖啡吧：）</span>
        </div>
        <img src="../common/img/alipay.jpg"/>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>

<style scoped>
    .demo-image{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width:100%;
        height:100%
    }
    img{
        width:50%;
        height:50%;
    }


</style>
