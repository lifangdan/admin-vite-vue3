<template>
    <div class="page-con">
        <div class="text">{{ test }}</div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            test:'测试VUE2用法'
        }
    },
    created () {
        console.log('测试VUE2用法')
    }
}
</script>

<style scoped lang="scss">
.text{
    color:$height_default_header;
    height: $header_height;
}
</style>