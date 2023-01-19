<template>
  <div class="login">
    <div class="mylogin" align="center">
      <div class="itu"><img src="../assets/xiangsu_mao.png" alt="" /></div>
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="ruleFormRef"
        label-width="0px"
      >
        <el-form-item label="" prop="account" style="margin-top: -50px">
          <el-row>
            <el-col :span="2">
              <span class="el-icon-s-custom"></span>
            </el-col>
            <el-col :span="200" style="margin-left: 70px">
              <el-input
                class="inps"
                placeholder="账号"
                v-model="loginForm.userId"
              >
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="" prop="passWord">
          <el-row>
            <el-col :span="2">
              <span class="el-icon-lock"></span>
            </el-col>
            <el-col :span="200" style="margin-left: 70px">
              <el-input
                class="inps"
                type="password"
                placeholder="密码"
                v-model="loginForm.passWord"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item style="margin: 30px 0 0 60px">
          <el-button
            type="primary"
            round
            class="submitBtn"
            @click="submitForm(ruleFormRef)"
            >登录
          </el-button>
        </el-form-item>
        <div class="unlogin" style="margin: 30px 0 0 -15px">
          <router-link :to="{ path: '/enroll' }">
            <a href="enrollView.vue" target="_blank" align="right"
              >注册新账号</a
            >
          </router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { login } from '@/api/user'
import router from '@/router'

export default defineComponent({
  data() {
    router.afterEach(to => {
      if (to.name === 'cat'){
        location.reload();
      }
    })
    return {
      ruleFormRef: null,
      loginForm: {
        userId: '',
        passWord: ''
      },
      loginRules: {
        userId: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        passWord: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.ruleFormRef = this.$refs.ruleFormRef
  },
  methods: {
    submitForm(ruleFormRef) {
      if (!ruleFormRef) return
      ruleFormRef.validate((valid) => {
        if (valid) {
          login({
            id: this.loginForm.userId,
            password: this.loginForm.passWord
          }).then((res) => {
            console.log('res--->', res)
            // this.updateUserInfo(res.data)
            if (res.code === '200') {
              router.push({ name: 'cat' })
              const userId = this.loginForm.userId
              const store = this.$store
              store.commit('changeUser', userId)
              console.log(store.state.userId)
            } else if (res.code === '403') {
              console.log('密码错误')
            } else {
              console.log('error')
            }
          })
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
    newLink() {
      location.reload()
      console.log('reload')
    }
  }
})
</script>

<style scoped>
.login {
  /* width: 100vw; */
  padding: 0;
  margin: 0;
  height: 100vh;
  font-size: 16px;
  background-position: left top;
  color: #fff;
  font-family: 'Source Sans Pro';
  position: relative;
}

.mylogin {
  width: 340px;
  height: 250px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  padding: 50px 40px 40px 40px;
  box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
  opacity: 1;
  background: #cbddf1;
  border-radius: 30px;
}

.inps input {
  border: none;
  color: #fff;
  background-color: transparent;
  font-size: 12px;
}

.submitBtn {
  background-color: transparent;
  color: #39f;
  width: 200px;
}
.itu {
  width: 50px;
  height: 50px;
  position: relative;
  top: -70px;
}
.itu img {
  width: 100%;
}
.el-form {
  margin-top: 30px;
}
</style>
