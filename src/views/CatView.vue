<template>
  <div class="aheade">
    <div class="iconfont icon-geren ab1"></div>
    <router-link :to="{ path: '/cat' }">
      <div class="iconfont icon-xiangsu_mao ab1 ab2"></div>
    </router-link>
    <router-link :to="{ path: '/home' }">
      <div class="iconfont icon-shouye ab1 ab2"></div>
    </router-link>
  </div>
  <div class="bb">
    <el-carousel :interval="4000" type="card" height="480px">
      <el-carousel-item
        v-for="item in result"
        :key="item.id"
        @click.native="click(item)"
      >
        <div class="pic_txt">
          <img v-bind:src="item.picture" alt="猫猫" />
          <h3>{{ item.name }}</h3>
          <h5>{{ item.txt }}</h5>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import axios from 'axios'
import router from "@/router";

export default defineComponent({
  data() {
    const result = ref([])
    axios
      .request({
        method: 'get',
        url: 'http://124.71.212.214:8983/cat/home',
        data: {}
      })
      .then(
        (res) => {
          result.value = res.data.data
        },
        (err) => {
          console.log(err)
        }
      )
    return { result }
  },
  methods: {
    newLink() {
      location.reload()
      console.log('reload')
    },
    click(item) {
      const store = this.$store
      store.commit('changeCat', item.id)
      console.log('cat/detail?catId=' + store.state.catId)
      router.push({ name: 'me' })
    }
  },
  watch: {
    'router': 'newLink'
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
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
img {
  width: 350px;
  height: 260px;
  margin: 30px 0 0 220px;
}
.pic_txt h3 {
  height: 40px;
  margin-top: 30px;
  text-align: center;
}
.pic_txt h5 {
  height: 150px;
  text-align: center;
}
.bb {
  margin-top: 50px;
}
</style>
