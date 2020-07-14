<template>
    <nav id="aside">
        <ul>
            <template v-for="(menu, i) in asides">
                <SideLink :option="menu" :key="i" />
            </template>
        </ul>
    </nav>
</template>

<script>
const prefixCls = 'side-link';

const SideLink = {
    functional: true,
    props: ['option'],
    render(h, context) {
        // const key = context.data.key;
        const { /* to, */ tag = 'a', text, prefix, suffix, children } = context.props.option;

        if (children) {
            return (
                <li class={prefixCls + '-group'}>
                    {h(tag, { class: prefixCls + '-group-title' }, [
                        prefix ? <i-Icon type={prefix} /> : '',
                        text,
                        suffix ? <i-Icon type={suffix} /> : '',
                    ])}
                    <ul>
                        {children.map(cOption => (
                            <SideLink option={cOption} />
                        ))}
                    </ul>
                </li>
            );
        }
        return (
            <li class={prefixCls + '-item'}>
                <a>
                    {prefix ? <i-Icon type={prefix} /> : ''}
                    {text}
                    {suffix ? <i-Icon type={suffix} /> : ''}
                </a>
            </li>
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

    & > ul {
        list-style: none;
    }

    .@{prefixCls}-group {
        & > ul {
            list-style: none;

            padding-left: 1.3em;
        }
    }
}
</style>
