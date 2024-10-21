<template>
    <div class="footer-container" >
        <span>© XXXXXX公司 版权所有</span>
        <span>
            <img src="@/assets/images/jinghui.png" />
        </span>
        <a href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010202009537">京公网安备 11010202009537号</a>
        <span class="line">|</span>
        <a href="https://beian.miit.gov.cn/#/Integrated/index">京ICP备19002971号-1</a>
    </div>
</template>
<script setup>

</script>
<style lang="scss" scoped>
.footer-container{
    padding: 0 10px;
    font-size: 13px;
    line-height: $footer_height;
    height: $footer_height;
    color: #333;
    text-align: center;
    img{
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin: 0 0 3px 20px;
    }
    .line{
        padding: 0 6px;
    }

    a{
        color: #0000ff;
        &:hover{
            text-decoration: underline;
        }
    }

}
</style>
