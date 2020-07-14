<template>
    <nav id="aside">
        <i-Menu mode="vertical" width="auto">
            <template v-for="(menu, i) in asides">
                <SideLink :option="menu" :key="i" />
            </template>
        </i-Menu>
    </nav>
</template>

<script>
const prefixCls = 'side-link';

// 声明一个匿名组件
const SideLink = {
    functional: true,
    props: ['option', 'name'],
    render(h, context) {
        const { to, text, prefix, suffix, children } = context.props.option;

        // 有限取router链接做为name，否则取key
        const name = String(to || context.props.name || context.data.key);

        let config = {};
        // 如果是个外部的url，附加相关参数
        if (/^(http|https):\/\//.test(to)) {
            // JSX Spread 目前只支持vnode结构的对象
            config = {
                attrs: {
                    target: '_blank',
                    rel: 'noopener',
                },
                props: {
                    replace: true,
                },
            };
        }

        if (children) {
            return (
                <li class={prefixCls + '-group'}>
                    <i-MenuItem name={name} to={to} {...config}>
                        {prefix ? <i-Icon type={prefix} /> : ''}
                        {text}
                        {suffix ? <i-Icon type={suffix} /> : ''}
                    </i-MenuItem>
                    <ul>
                        {children.map(cOption => (
                            <SideLink option={cOption} />
                        ))}
                    </ul>
                </li>
            );
        }

        return (
            <i-MenuItem name={name} to={to} {...config}>
                {prefix ? <i-Icon type={prefix} /> : ''}
                {text}
                {suffix ? <i-Icon type={suffix} /> : ''}
            </i-MenuItem>
        );
    },
};

export default {
    components: { SideLink },
    props: { asides: Array },
};
</script>

<style lang="less">
@prefixCls: side-link;
@top-height: @header-height + 1px;

#aside {
    z-index: @zindex-aside;

    position: fixed;
    top: @top-height;
    left: 0;
    bottom: 0;
    border-right: 1px solid #eaecef;

    box-sizing: content-box;
    width: @sidebar-width;
    padding: 35px 0px 60px 20px;

    font-size: 15px;
    overflow-y: auto;

    .@{prefixCls}-group {
        & > ul {
            list-style: none;

            padding-left: 1em;
        }
    }

    .ivu-menu-vertical {
        .ivu-menu-item-active:after {
            display: none;
        }

        &.ivu-menu-light:after {
            display: none;
            width: 0;
        }
    }
}
</style>
