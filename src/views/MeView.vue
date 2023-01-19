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
  <div class="dleft">
    <div class="img1">
      <img :src="cat.picture" :alt="cat.name" />
    </div>
    <div class="dltx">
      <h4 itemref>{{ cat.name }}</h4>
      <div class="sex">{{ cat.sex }}</div>
      <div class="variety">{{ cat.kind }}</div>
      <div class="sterilization">{{ cat.breed }}</div>
      <div class="state">{{ cat.status }}</div>
    </div>
  </div>
  <div class="center">
    <div>
      <h3>品牌</h3>
      <el-form :model="mealForm">
        <el-radio-group
          v-for="items in category"
          :key="items.id"
          size="large"
          v-model="mealForm._category"
        >
          <el-radio-button :label="items.id">{{ items.name }}</el-radio-button>
        </el-radio-group>
        <br />
        <br />
        <br />
        <h3>食物</h3>
        <el-radio-group
          v-for="items in brand"
          :key="items.index"
          size="large"
          v-model="mealForm._brand"
        >
          <el-radio-button :label="items.id">{{ items.name }}</el-radio-button>
        </el-radio-group>
      </el-form>
    </div>
    <button class="btn1" @click="submit" type="submit" value="投喂">
      投喂
    </button>
  </div>
  <div class="dright">
    <h2>干饭记录</h2>
    <ul
      v-infinite-scroll="load"
      class="infiniteRecord"
      style="overflow-y: auto; overflow-x: hidden"
    >
      <div class="Recording" v-for="items in meal" :key="items.id">
        <div class="img2">
          <img src="" alt="" />
        </div>
        <div class="span1">投喂</div>
        <div class="span2">{{ items.brand }}{{ items.category }}</div>
        <div class="div1">{{ items.userName }}</div>
        <div class="time">{{items.time}}</div>
      </div>
    </ul>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {getBrand, getCat, getCategory, getMeal, postMeal} from '@/api/me'
import index from 'vuex'
import router from '@/router'

export default defineComponent({
  computed: {
    index() {
      return index
    }
  },
  data() {
    router.afterEach((to) => {
      if (to.name === 'cat') {
        location.reload()
      }
    })
    let cat = ref([])
    let category = ref([])
    let brand = ref([])
    let meal = ref([])
    getCat().then((res) => {
      cat.value = res.data
      // console.log(cat.value)
    })
    getCategory().then((res) => {
      category.value = res.data
      // console.log(category.value)
    })
    getBrand().then((res) => {
      brand.value = res.data
    })
    getMeal().then((res) => {
      meal.value = res.data
      console.log(meal.value)
    })
    return {
      cat,
      category,
      brand,
      meal,
      mealForm: {
        _category: 0,
        _brand: 0
      }
    }
  },
  methods: {
    submit() {
      const store = this.$store
      let data = {
        category: this.mealForm._category,
        brand: this.mealForm._brand,
        cat: store.state.catId.toString(),
        userId: store.state.userId
      }
      postMeal(data).then(
        (res) => {
          console.log(res)
          location.reload()
        },
        (err) => {
          console.log(err)
        }
      )
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
.dleft {
  position: absolute;
  width: 30vw;
  height: 100vh;
  margin-left: 2vw;
}
.img1 {

  position: absolute;
  width: 52vh;
  height: 39vh;
  margin-top: 5vh;
  margin-left: 1%;
  border: 2px solid black;
}
.img1 img {
  position: absolute;
  margin-left: 0.1vh;
  width: 52vh;
  height: 39vh;
}
.dltx {
  position: absolute;
  border: 2px solid black;
  width: 52vh;
  margin-left: 1%;
  margin-right: 1%;
  margin-top: 47vh;
  padding-bottom: 1vw;
  height: 39vh;
}
.dltx h4 {
  border-bottom: 1px solid #000000;
  text-align: center;
  padding-bottom: 1vw;
  margin-right: 0%;
}
.dltx div {
  border-bottom: 1px solid #3ec288;
  font-size: 14px;
  margin: 2vw 5%;
}
.btn1 {
  width: 70px;
  height: 30px;
  margin: 80%;
}
.dright {
  position: static;
  float: right;
  width: 30vw;
  height: 83.5vh;
  border: 1px solid black;
  margin-right: 2vw;
  margin-top: 5vh;
}
.dright h2 {
  border-bottom: 1px solid black;
  text-align: -webkit-center;
  margin-top: 2vh;
  margin-bottom: 0;
  padding-bottom: 2vh;
}
.dright .infiniteRecord{
  height: 75.5vh;
  width: 30vw;
  margin: 0.5vh 0.5vw;
  padding-left: 0.2vw;
}
.dright .Recording {
  width: 28vw;
  height: 12vh;
  border: 1px solid black;
  border-radius: 20px;
  margin-bottom: 2vh;
  margin-top: 1vh;
}
.dright .Recording .img2 {
  width: 6vh;
  height: 6vh;
  border: 1px solid black;
  margin-left: 2vh;
  margin-top: 2vh;
  float: left;
}
.dright .Recording .span1 {
  font-size: 10px;
  float: left;
  margin-left: 5vh;
  margin-top: 4.5vh;
}
.dright .Recording .span2 {
  float: left;
  margin-left: 5vh;
  margin-top: 4vh;
}
.dright .Recording .div1 {
  margin: 9vh 0 0 3vh;
  width: 5vh;
}
.dright .Recording .time{
  float: right;
  width: 30vh;
  margin-left: 10vh;
  margin-top: -3vh;
}
.center {
  position: absolute;
  width: 30vw;
  height: 83.5vh;
  border: 1px solid black;
  margin-right: 0;
  margin-left: 30vw;
  margin-top: 5vh;
}
</style>
