<template>
    <i-Header class="header-wrapper">
        <i-Menu mode="horizontal" theme="dark" active-name="1">
            <div class="header-wrapper-logo"></div>
            <div class="header-wrapper-nav">
                <i-MenuItem name="1">
                    <i-Icon type="ios-navigate"></i-Icon>
                    Item 1
                </i-MenuItem>
                <i-MenuItem name="2">
                    <i-Icon type="ios-keypad"></i-Icon>
                    Item 2
                </i-MenuItem>
                <i-MenuItem name="3">
                    <i-Icon type="ios-analytics"></i-Icon>
                    Item 3
                </i-MenuItem>
                <i-MenuItem name="4">
                    <i-Icon type="ios-paper"></i-Icon>
                    Item 4
                </i-MenuItem>
            </div>
        </i-Menu>
    </i-Header>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.header-wrapper {
    &-logo {
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }

    &-nav {
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }
}
</style>
