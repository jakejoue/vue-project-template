<template>
    <nav id="aside">
        <i-Menu mode="vertical" width="auto">
            <SideLinks v-for="(menu, i) in asides" :option="menu" :key="i" />
        </i-Menu>
    </nav>
</template>

<script>
// 单个link
const SideLink = {
    functional: true,
    props: ['option', 'depth'],
    render(h, context) {
        const { to, text, prefix, suffix } = context.props.option;
        const depth = context.props.depth;

        const name = String(to || text);

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

        return (
            <i-MenuItem name={name} style={{ 'padding-left': depth + 'em' }} to={to} {...config}>
                {prefix ? <i-Icon type={prefix} /> : ''}
                {text}
                {suffix ? <i-Icon type={suffix} /> : ''}
            </i-MenuItem>
        );
    },
};
// 多个link
const SideLinks = {
    functional: true,
    components: { SideLink },
    props: ['option', 'depth'],
    render(h, context) {
        const { option, depth = 1 } = context.props;
        const { children } = option;

        if (children) {
            return (
                <li>
                    <SideLink option={option} depth={depth} />
                    <ul style={{ 'list-style': 'none' }}>
                        {children.map(cOption => (
                            <SideLinks option={cOption} depth={depth + 1} />
                        ))}
                    </ul>
                </li>
            );
        }

        return <SideLink option={context.props.option} depth={depth} />;
    },
};

export default {
    components: { SideLinks },
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

    .ivu-menu-vertical {
        &.ivu-menu-light:after,
        .ivu-menu-item-active:after {
            display: none;
        }
    }
}
</style>
