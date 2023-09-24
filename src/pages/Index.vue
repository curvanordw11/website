<template>
    <el-menu ref="menu" style="position: sticky; top: 0;" :default-active="activePath" mode="horizontal" router :ellipsis="false" menu-trigger="click" background-color="#000">
        <div class="menu" >
            <div style="width: 180px;overflow-x: hidden;">
                <img src="/assets/logo.jpg" alt="Eduhome" height="56">
            </div>
            <div style="flex-grow: 1;text-align: center;font-size: 2.5vw;font-family:FZShuTi;color: #ecf0f1">齊&emsp;魯&emsp;之&emsp;師&emsp;&emsp;&emsp;耀&emsp;武&emsp;中&emsp;華</div>
            <div class="hidden-xs-only" style="display: flex; align-items: flex-end;color: #ecf0f1">
                <el-menu-item index="/w/home" style="color: #909596">AQUILA ULTRA DESTRA</el-menu-item>
<!--                <el-menu-item index="/w/service">SERVICE</el-menu-item>-->
<!--                <el-menu-item index="/w/event">EVENT</el-menu-item>-->
                <el-menu-item  style="color: #909596">加入我们</el-menu-item>
<!--                <el-menu-item index="/w/about">加入我们</el-menu-item>-->
<!--                <el-menu-item index="/w/contact">CONTACT</el-menu-item>-->
            </div>
            <!-- <el-button type="primary" size="small" :icon="Search" circle /> -->
            <div class="hidden-sm-and-up">
                <el-sub-menu index="">
                    <template #title>
                        <el-icon><Grid /></el-icon>
                    </template>
                    <el-menu-item index="/w/home">AQUILA ULTRA DESTRA</el-menu-item>
<!--                    <el-menu-item index="/w/service">SERVICE</el-menu-item>-->
<!--                    <el-menu-item index="/w/event">EVENT</el-menu-item>-->
                    <el-menu-item >加入我们</el-menu-item>
<!--                    <el-menu-item index="/w/about">加入我们</el-menu-item>-->
<!--                    <el-menu-item index="/w/contact">CONTACT</el-menu-item>-->
                </el-sub-menu>
            </div>
        </div>
    </el-menu>
    <RouterView />
    <div class="footer">
        <el-row justify="center" style="align-items: center;">
            <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6" class="single-widget-parent">
                <div class="single-widget">
                    <div>
                        <div style="overflow: hidden;width: 100%;text-align: center">
                            <RouterLink to="/w/home"><img src="/assets/logo.jpg" alt="eduhome" height="80"></RouterLink>
                        </div>
                        <div style="overflow: hidden;width: 100%;text-align: center;font-size: 22px;"> <i>右翼之鹰</i><p style="white-space: nowrap;">AQUILA ULTRA DESTRA</p></div>
                    </div>
                <div></div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { Grid, Service, ChatSquare, Message, Location, Search } from '@element-plus/icons-vue'
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, onUnmounted, watch } from "vue";
let menu = ref(null);
let top = ref();
let activePath = ref('/')
function handleScrollx() {
    top.value = menu.value.$el.getBoundingClientRect().top;
    if (top.value = 0) {
        isTrue.value = true;
    }
}
onMounted(() => {
    activePath.value = window.location.pathname;
    window.addEventListener("scroll", handleScrollx, true);
})
onUnmounted(() => {
    window.removeEventListener("scroll", handleScrollx, true)
})
watch(() => top.value, (pev, old) => {
    if (pev == 0) {
        menu.value.$el.style.zIndex = 9999;
    }
})
</script>

<style lang="scss" scoped>
.top-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    height: 3rem;
    width: 100%;
    padding: 0 2rem;
}
.container {
    // height: 3rem;
    color: white;
    font-weight: 600;

    .header-gap {
        background-color: #000;
        transform: rotate(45deg);
        transform-origin: 50% 50%;
        height: 0.5rem;
        width: 9rem;
    }
}

.menu {
    flex-grow: 1;
    display: flex;
    margin-right: 0.5rem;
    align-items: center;
    justify-content: flex-end;
    padding: 0 1rem;
    width: 100vw;
    overflow: hidden;
}

.footer {
    background-color: #000000;
    position: relative;
}

.single-widget-parent {
    display: flex;
    justify-content: center;
    align-items: center;
}
.single-widget {
    width: 200px;
    margin-bottom: 1.5rem;
    margin-top: 1.5rem;
}

.single-widget h3 {
    font-weight: 700;
    text-transform: uppercase;
    font-family: 'Open Sans', sans-serif;
    color: #606060;
    margin-bottom: 35px;
    position: relative;
}

.single-widget h3::after {
    background: #606060 none repeat scroll 0 0;
    bottom: -10px;
    content: "";
    height: 1px;
    left: 0;
    position: absolute;
    width: 57px;
}

.single-widget h3::before {
    background: #606060 none repeat scroll 0 0;
    bottom: -13px;
    content: "";
    height: 1px;
    left: 0;
    position: absolute;
    width: 45px;
}
</style>
