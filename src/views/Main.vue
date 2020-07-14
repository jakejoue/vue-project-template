<template>
    <main class="main-wrapper">
        <div class="inner">
            <div class="left">
                <img class="logo" src="@/assets/img/logo.png" alt="vue logo" />
            </div>
            <div class="right">
                <h1>
                    渐进式
                    <br />
                    JavaScript 框架
                </h1>
            </div>
        </div>
    </main>
</template>

<style lang="less">
.main-wrapper {
    padding: 40px 40px 30px;

    .inner {
        max-width: 1260px;
        margin: 0 auto;

        & > * {
            display: inline-block;
            vertical-align: top;
        }

        .left {
            width: 39%;

            .logo {
                width: 215px;
                height: 215px;
                float: right;
                margin-right: 60px;
            }
        }

        .right {
            width: 61%;

            h1 {
                color: #273849;
                font-weight: 300;
                font-size: 3.2em;
            }
        }
    }
}
</style>
