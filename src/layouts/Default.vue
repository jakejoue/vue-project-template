<template>
    <div class="layout">
        <i-Layout>
            <i-Header>
                <i-Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
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
            <i-Content :style="{ padding: '0 50px' }">
                <i-Breadcrumb :style="{ margin: '20px 0' }">
                    <i-BreadcrumbItem>Home</i-BreadcrumbItem>
                    <i-BreadcrumbItem>Components</i-BreadcrumbItem>
                    <i-BreadcrumbItem>Layout</i-BreadcrumbItem>
                </i-Breadcrumb>
                <i-Card>
                    <div style="min-height: 200px;">
                        <slot />
                    </div>
                </i-Card>
            </i-Content>
            <i-Footer class="layout-footer-center">2011-2016 &copy; TalkingData</i-Footer>
        </i-Layout>
    </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;

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

    &-footer-center {
        text-align: center;
    }
}
</style>
