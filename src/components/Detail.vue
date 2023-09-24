
<template>
    <el-main class="content" v-loading="!docInfo" element-loading-background="rgba(0,0,0,0.1)">
        <el-row v-if="docInfo" justify="space-around" style="align-items: flex-start;">
            <el-col :xs="22" :sm="22" :md="8" :lg="8" :xl="8">
                <div class="about-img">
                    <img :src="docInfo.picture" alt="about" style="width: 100%;object-fit: cover;" height="350">
                </div>
            </el-col>
            <el-col :xs="22" :sm="22" :md="12" :lg="12" :xl="12">
                <div style="max-height: 1000px;display: flex;flex-direction: column; justify-content: space-between;align-items: start;">
                    <div class="vhtml" v-if="docInfo.html" v-html="docInfo.html" />
                    <div v-else>
                        <div class="title">{{docInfo.title}}</div>
                        <div class="text">{{docInfo.text}}</div>
                        <div class="text">课程内容: {{docInfo.coursesDeesc}}</div>
                        <div class="text">课程日期：{{docInfo.duration}}</div>
                        <div class="text">课程周期：{{docInfo.arrange}}</div>
                        <div>发布时间{{moment(docInfo.releaseTime).format('ll')}}</div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row justify="center" style="margin: 3rem 0;">
            <el-col :span="11">
                <div><el-button link type="primary" @click="router.back()">&lt; 返回上级</el-button></div>
            </el-col>
            <el-col :span="11">
                <div style="text-align: right;" v-if="docInfo && !docInfo.html">
                    <el-button link type="primary" @click="onJump('pre')" :disabled="!hasPre">上一篇</el-button>
                    <span style="margin: 0 12px;">|</span>
                    <el-button link type="primary" @click="onJump('next')" :disabled="!hasNext">下一篇</el-button>
                </div>
            </el-col>
        </el-row>
    </el-main>
</template>

<script setup>
import moment from 'moment';
import http from '@/utils/request.js';
import { useRoute, useRouter } from 'vue-router';

moment.updateLocale('zh-cn', { longDateFormat: { ll: 'YYYY年M月D日' } })
const route = useRoute()
const router = useRouter()
let docId = route.params.id
let curType = route.params.type
let htmls = {
    'about-liuxue':   `<h2>关于留学</h2><h4>为什么选择留学:</h4><p>出国留学的意义，就是那些豁然开朗的瞬间，是让你能够学习到其他国度的思维方式，是让你能够知道书本的真正意义，是能够教会你学习方式的一种人生体验。</p><p>这种体验对于每个留学生而言，都是不可多得且只有一次的机会，我们希望尽自己最大的努力，帮助学生在这次体验中能有一个良好的环境，以及无懈可击的帮助，这就是我们存在的意义。</p><p>我们希望让每个学生知道：你在申请学校的时候，学校在给你offer的时候，其实是一个相互欣赏与理解的过程，在这个过程中，你要清楚的知道并且表达出来：你的想法。</p>`,//<ul><li><span>describe: </span>Better and better</li></ul>
    'about-meigao':   `<h2>美高选择介绍</h2><p>美国的中学分为公立和私立。中国国籍学生只能申请可以签发F-1的学校。（美国公立学校不具备签发F-1的资质）如果有美国绿卡或是美国国籍的学生方可申请公立学校。<br>其中私立中学又分为寄宿学校和走读学校，它们的不同如下：</p><h5>寄宿学校：</h5>住宿：学校宿舍2-4人不等取决于宿舍大小（宿舍位置一般在学校里或者在学校周边距离学校可以步行到达的位置）<br>管理：寄宿学校一般是有宿管24小时轮流值班，如果需要外出则需要出行前提前告知并且在争得宿管统一后方可离开。<br>活动：寄宿学校会经常组织一些活动，为学生的周末增加乐趣。（例如：在上映新电影的时候会组织学生们一起去观影，带领学生参加社区活动为申请大学的背景增加优势，对于美国假期不回家的学生学校会组织学生在美国旅行....，具体需要取决于学生所在学校。)<br>吃饭：学校食堂提供一日三餐，及一些额外的零食和水果<h5>走读学校（寄宿家庭）：</h5>住宿：寄宿家庭（住家会为学生提供一个独立房间），也有可能寄宿的室友。如果有室友的话，可能为两人一间或一人一个房间取决于住家对于寄宿学生的安排。（住家距离学校不会太远，一般情况会有校车接送）<br>管理：如需外出需要事先争得住家的同意。<br>活动：一般情况下寄宿家庭会学生周末去超市及参加家庭聚会。如果有宗教信仰的住家也会带学生去教堂参加活动。<br>吃饭：一般情况下住家为学生提供一日三餐及水果零食。<p></p>`,
    'about-youxue':   `<h2>游学简介</h2><h4>为什么游学</h4><p>一、观赏世界出名学府，让学生有一个清楚的未来规划和目标。二、结识国际友人，让学生对这个世界有不一样的认知。<br>三、充分了解和融入国外的生活。四、为学生以后的申请增添色彩。六、增加独立思考与团队协作能力。</p><p>游学不仅仅是享受，更多的是感受，是体验。“读万卷书，不如行万里路”，读书固然有用但当您走出来看世界的时候会发现用眼睛看到和用心感受到的东西与书里冰冷的文字是截然相反的。</p><p>短短几周的时间不能让您成为当地人，但可以让您看见不一样的世界。在国外亲身体验风土人情、接受异域文化氛围熏陶的游学活动，能让学生增加生活的磨练和乐趣，提高学生的独立思考和自主能力。体验是一种买不到的财富，几周的时间学生能获得更多的阅历和见识以及人生经验。当学生走出自己的舒适圈时会得到不一样的成长经历，并且留给学生一份终生难忘的记忆。</p>`, //<ul><li><span>describe: </span>Better and better</li></ul>
    'about-question': `<h2>留学常见问题</h2><p></p><h5>1.有留学的打算，去什么国家留学会比较好？</h5>当下热门的留学国家主要是美国，英国和加拿大等国家。对于高中留学来说，美国一直受众多国内学生的青睐。<h5>2.我大概需要的语言成绩是多少呢？</h5>这个得分开来讨论。首先，是高中方面，拿美高申请举例，一般情况下申请美高是不需要托福成绩的，毕竟学生才读高中，只有小部分美高需要学生有语言成绩。在大学方面，如果是美高的学生申请美本，且读满4年美高，那其实他们也不需要提交语言成绩，如果是国内高中申请美本，那则需要有语言成绩。<h5>3.如果英语成绩太差，在外面读书会不会跟不上或者毕不了业？</h5>因为英语作为很多海外留学国家必备的交流工具，因此很多院校会在英语方面有一定的语言要求，如果觉得自身的英语成绩太差或者能力不够，可以通过上预科或者语言课的方式来进入大学的正课。在上课的过程中，通过小班授课的方式，使每个学生在听说读写方面都能得到很好的锻炼和提升，在加上良好的语言环境氛围，所以是不用太过于担心的。<h5>4.一般申请周期大约是多久？</h5>申请的时间大致为4-8个月。一般情况下，如果申请9月份秋季入学的话，最好能提前1年开始申请。<h5>5.和国内的学校相比，海外留学有什么优势所在？</h5>和国内学校相比，海外留学的优势有：<br>（1）海外院校的国际排名通常会比国内院校排名靠前：<br>（2）在海外留学的过程中，多语言能力会得到提升；<br>（3）海外院校在成绩分布中会涉及到论文，演讲和测试等多种考核形式，期中期末的成绩占据；比例并不高，这点和国内的很多大学只有期中期末考是有所不同的，这样就能锻炼学生的综合能力。海外学校注重的是学生在过程中的努力，而不单单只是结果。<h5>6.如果曾经有过拒签的经历，对留学签证是否影响，如何处理？</h5>本科阶段基本不会发生。如果曾经有过签证拒签的历史，会对留学签证有一些影响。但是申请人可以在面签时，和签证官解释阐述签证拒签的原因，并给出新的出国的计划和未来的职业发展等方面打算，同时提供良好的存款收入证明，就可以得到签证。<p></p>`
}
let htmlsPic = {
    'about-liuxue':   new URL(`@/assets/aboutUs/about2.jpg`, import.meta.url).href,
    'about-meigao':   new URL(`@/assets/aboutUs/about3.jpg`, import.meta.url).href,
    'about-youxue':   new URL(`@/assets/aboutUs/about4.jpg`, import.meta.url).href,
    'about-question': new URL(`@/assets/aboutUs/about5.jpg`, import.meta.url).href,
}
onMounted(() => {
    if (docId.includes('about-')) {
        docInfo.value = {
            picture: htmlsPic[docId],
            html: htmls[docId]
        }
    } else {
        getDoc()
        getAround('pre')
        getAround('next')
    }
})

let docInfo = ref()
function getDoc() {
    const options = {
        method: 'GET',
        url: '/blogs/getBlogInfo/' + docId,
    };

    http.request(options).then((res) => {
        docInfo.value = res.content
    })
}

let preC = ref()
let hasPre = ref(false)
let nextC = ref()
let hasNext = ref(false)

let typeMap = new Map([
    ['All', null],
    ['Art', 1],
    ['Academic', 2],
    ['Leadership', 3],
])
function getAround(order) {
    const options = {
        method: 'POST',
        url: '/blogs/getBlogsByNext',
        data: {
            id: docId, //1094358088158281728
            blogsType: typeMap.get(curType), //文章类型
            order: order //查询类型：next:下一条  pre：上一条
        }
    };

    http.request(options).then((res) => {
        if (order == 'pre') {
            if (res.content) {
                preC.value = res.content
                hasPre.value = true
            } else {
                hasPre.value = false
            }
        }
        if (order == 'next') {
            if (res.content) {
                nextC.value = res.content
                hasNext.value = true
            } else {
                hasNext.value = false
            }
        }
    })
}
function onJump(order) {
    if (order == 'pre') {
        router.replace({name: 'detail', params: {id: preC.value.id, type: curType }})
        docId = preC.value.id
        nextC.value = docInfo.value
        docInfo.value = preC.value
        hasNext.value = true
        getAround('pre')
    }
    if (order == 'next') {
        router.replace({name: 'detail', params: {id: nextC.value.id, type: curType }})
        docId = nextC.value.id
        preC.value = docInfo.value
        docInfo.value = nextC.value
        hasPre.value = true
        getAround('next')
    }
}
</script>


<style lang="scss" scoped>
.content {
    min-height: 50vh;
    margin: 10vh 0;
}
.title {
    margin-bottom: 1rem;
    font-size: 20px;
    color: #303030;
    font-weight: 600;
    font-family: 'Open Sans', sans-serif;
    text-transform: uppercase;
    line-height: 24px;
}
.text {
    margin-bottom: 1rem;
    width: 100%;
    font-size: 14px;
    color: dimgrey;
    text-align: left;
    white-space: pre-wrap;
}

:deep(.vhtml) {
    font-size: 14px;
    color: #606060;
    font-family: 'Open Sans', sans-serif;
    margin-bottom: 10px;

    h2 {
        color: #303030;
        font-family: "Open Sans", sans-serif;
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 3px;
        margin-top: 3px;
        text-transform: uppercase;
    }

    h4 {
        font-size: 18px;
        color: #929292;
        font-family: 'Open Sans', sans-serif;
        margin-top: 15px;
        margin-bottom: 18px;
        font-weight: 400;
        text-transform: uppercase;
    }

    h5 {
        font-size: 14px;
        color: #030303;
        font-family: 'Open Sans', sans-serif;
        margin-top: 5px;
        margin-bottom: 5px;
        font-weight: 400;
    }

    p {
        font-size: 14px;
        color: #606060;
        font-family: 'Open Sans', sans-serif;
        margin-bottom: 10px;
    }

    span {
        font-size: 14px;
        color: #303030;
        font-family: 'Open Sans', sans-serif;
        font-weight: 700;
        text-transform: uppercase;
    }

    ul {
        list-style: outside none none;
        margin-left: -2.5rem;
    }

    li {
        list-style: outside none none;
        font-weight: 600;
        margin-bottom: 15px;
    }
}
</style>