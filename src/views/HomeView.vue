<template>
  <div class="aheade">
    <!--    <router-link :to="{ path: '/me' }">-->
    <div class="iconfont icon-geren ab1"></div>
    <!--    </router-link>-->
    <router-link :to="{ path: '/cat' }">
      <div class="iconfont icon-xiangsu_mao ab1 ab2"></div>
    </router-link>
    <router-link :to="{ path: '/home' }">
      <div class="iconfont icon-shouye ab1 ab2"></div>
    </router-link>
  </div>
  <div class="bhead">
    <div class="bleft">
      <input
        type="text"
        placeholder="请输入标题（必填）"
        id="title"
        v-model="homeForm.title"
      />
      <el-form :model="homeForm" label-width="0px">
        <el-input
          v-model="homeForm.txt"
          :rows="10"
          type="textarea"
          placeholder=""
        />
        <el-select
          v-model="homeForm.cat"
          class="m-2"
          placeholder="Select"
          size="large"
        >
          <el-option
            v-for="item in cats"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <input
          type="text"
          placeholder="地点"
          id="addressip"
          v-model="homeForm.address"
        />
      </el-form>
      <button class="n1" @click="submit" type="submit">发送</button>
    </div>
    <div class="bright">
      <ul
        v-infinite-scroll="load"
        class="infiniteRecord"
        style="overflow-y: auto; overflow-x: hidden"
      >
        <div class="cri" v-for="items in obj" :key="items.activityId">
          <img src="" alt="" class="img1" />
          <span>{{ items.userName }}</span>
          <h3 class="title">{{ items.title }}</h3>
          <h5 class="content">{{ items.txt }}</h5>
          <!--文本内容-->
          <h6 class="address">{{ items.address }}</h6>
          <!--地点-->
          <h6 class="time">{{ items.activityTime }}</h6>
          <!--时间-->
          <button class="drb" @click="">
            {{ items.catName }}
          </button>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>

import { defineComponent, ref } from 'vue'
import axios from 'axios'
import { send } from '@/api/home'
import router from '@/router'

export default defineComponent({
  data() {
    router.afterEach((to) => {
      if (to.name === 'cat') {
        location.reload()
      }
    })
    let obj = ref([])
    let cats = ref([])
    axios
      .request({
        method: 'get',
        url: 'http://124.71.212.214:8983/activity/home',
        data: {}
      })
      .then(
        (res) => {
          obj.value = res.data
          console.log(obj)
        },
        (err) => {
          console.log(err)
        }
      )
    axios
      .request({
        method: 'get',
        url: 'cat/home',
        data: {}
      })
      .then(
        (res) => {
          cats.value = res.data
        },
        (err) => {
          console.log(err)
        }
      )
    console.log(obj)
    console.log(cats)
    return {
      obj,
      cats,
      homeForm: {
        cat: '',
        txt: '',
        title: '',
        address: ''
      }
    }
  },
  mounted() {
    document
      .querySelector('body')
      .setAttribute('style', 'background-color:#f0f0f1')
  },
  beforeUnmount() {
    document.querySelector('body').removeAttribute('style')
  },
  methods: {
    submit() {
      const store = this.$store
      let data = {
        catId: this.homeForm.cat,
        userId: store.state.userId,
        txt: this.homeForm.txt,
        title: this.homeForm.title,
        address: this.homeForm.address
      }
      console.log(data)
      send(data).then((res) => {
        console.log(res)
        location.reload()
      })
    }
  }
})
</script>

<style scoped>
.aheade {
  height: 8vh;
  background-color: #2b2b2c;
}
.aheade .ab1 {
  font-size: 5vh !important;
  color: #3ec288;
  float: left;
  margin-left: 30%;
  margin-top: 1vh;
}
.aheade .ab2 {
  margin-left: 15%;
}

.bleft {
  width: 20vw;
  height: 30vh;
  float: left;
  margin-left: 5vw;
  margin-top: 10vh;
}
.bright {
  width: 50vw;
  float: right;
  background: #ffffff;
  border-left: 1px solid black;
  border-right: 1px solid black;
  height: 90vh;
  margin-right: 20vw;
}
.bright .infiniteRecord{
  height: 85vh;
  width: 50vw;
}
.n1 {
  margin: 30px 0 0 350px;
  width: 50px;
  height: 30px;
}
.bright .cri {
  width: 45vw;
  height: 25vh;
  border: 1px solid black;
  border-radius: 20px;
  margin-bottom: 2vh;
}
.cri .img1 {
  width: 8vh;
  height: 8vh;
  margin: 10px 0 0 20px;
  display: block;
  float: left;
}
.cri .span {
  margin: 20px 0 0 20px;
}
.cri .title {
  margin: 20px 0 0 100px;
}
.cri .content {
  margin: 10px 0 0 50px;
}
.cri .address {
  margin: 20px 0 0 10px;
}
.cri .time {
  margin: -13px 0 0 100px;
}
.cri .drb {
  margin: -10px 0 0 320px;
}
.drb {
  margin: 10px 0 0 320px;
  width: 100px;
}
#title {
  width: 20vw;
  height: 30px;
  border-radius: 5px;
}
#addressip {
  width: 200px;
  height: 30px;
}
</style>
