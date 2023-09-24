<template>
    <div class="about">
        <el-row justify="center" style="align-items: flex-start;">
            <el-col :xs="22" :sm="22" :md="16" :lg="16" :xl="16">
                <div>
                    <img src="@/assets/aboutUs/about1.jpg" alt="about" style="width: 100%;object-fit: cover;">
                </div>
            </el-col>
            <el-col :span="4" :offset="1" class="hidden-sm-and-down">
                <div style="display: flex;flex-direction: column;align-items: flex-start;">
                    <p class="category" style="margin-bottom: 50px;font-size: 20px;">CATEGORIES</p>
                    <p class="category hover" @click="router.push({name: 'detail', params: {id: 'about-liuxue'  , type: 'All'}})">关于留学</p>
                    <p class="category hover" @click="router.push({name: 'detail', params: {id: 'about-meigao'  , type: 'All'}})">美高选择介绍</p>
                    <p class="category hover" @click="router.push({name: 'detail', params: {id: 'about-youxue'  , type: 'All'}})">游学简介</p>
                    <p class="category hover" @click="router.push({name: 'detail', params: {id: 'about-question', type: 'All'}})">常见问题</p>
                </div>
            </el-col>
            <el-col :xs="22" :sm="22" :md="16" :lg="16" :xl="16">
                <div class="course-details-content">
                    <h3>我们的优势</h3>
                    <p>1、我们有资深的申请团队和专业的律师团队为您提供服务。</p>
                    <p>2、全方位的为您提供完整的服务，24小时为您答疑解惑。</p>
                    <p>3、保证您的申请质量和升学率。 4、为您提供优质的资源并且为您提供法律服务和人身安全的保障。</p>
                    <div class="single-course-left">
                        <h3>美高好处</h3>
                        <h4>a. 为什么要选择美高</h4>
                        <p>
                            i.   提升英语水平，尽早适应全英授课环境<br>
                            ii.  锻炼学生独立生活能力与时间规划能力<br>
                            iii. 教育资源与活动资源 1. 弹性选课：根据自身能力选择相应课程<br>
                            iv.  素质教育全面发展 1. 美高运动与艺术活动丰富<br>
                            v.   了解美国当地文化<br>
                            vi.  美高环境 1. 更少的竞争对手与竞争压力，让学生能够在自己擅长的领域里大放异彩<br>
                            vii. 相对较低的师生比 1. 因材施教，圆桌教育
                        </p>
                        <h4>b. 上美高学生能获得什么</h4>
                        <p>
                            i.  美高学籍，为未来申请本科提供优势<br>
                            ii. 对事情独立思考的能力
                        </p>
                    </div>
                    <div class="single-course-left">
                        <h3>游学好处</h3>
                        <p>
                            1、观赏世界出名学府，让学生有一个清楚的未来规划和目标。<br>
                            2、结识国际友人，让学生对这个世界有不一样的认知。<br>
                            3、充分了解和融入国外的生活。<br>
                            4、为学生以后的申请增添色彩。<br>
                            5、增加独立思考与团队协作能力。
                        </p>
                    </div>
                </div>
            </el-col>
            <el-col :span="4" :offset="1"></el-col>
        </el-row>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style lang="scss" scoped>
.about {
    margin: 8vh 0;

    .category {
        font-size: 16px;
        color: #303030;
        font-weight: 600;
        font-family: 'Open Sans', sans-serif;
        text-transform: uppercase;
        margin-bottom: 35px;
        line-height: 26px;
    }

    .hover {
        position: relative;
        cursor: pointer;
    }

    .hover::after {
        content: '';
        display: block;
        width: 0;
        height: 1px;
        position: absolute;
        left: 0;
        bottom: -5px;
        background: #303030;
        transition: all 0.3s ease-in-out;
    }

    .hover:hover::after {
        width: 100%;
    }
}

.course-details-content {
    text-align: center;
}
.course-details-content h3 {
    font-size: 16px;
    color: #303030;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 15px;
    margin-top: 15px;
    font-family: 'Open Sans', sans-serif;
}
.course-details-content p {
    font-size: 14px;
    color: #606060;
    margin-bottom: 4px;
    margin-left: 10px;
    font-family: 'Open Sans', sans-serif;
}
.course-details-content h4 {
    font-size: 12px;
    color: #303030;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 15px;
    margin-top: 15px;
    font-family: 'Open Sans', sans-serif;
}
</style>
