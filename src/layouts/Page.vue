<template>
    <Default>
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
    </Default>
</template>

<script>
import Default from './Default';

export default {
    components: { Default },
};
</script>
