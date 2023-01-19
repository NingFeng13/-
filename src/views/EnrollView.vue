<template>
  <div class="login">
    <div class="mylogin" align="center">
      <div class="itu"><img src="../assets/xiangsu_mao.png" alt="" /></div>
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-width="0px"
      >
        <el-form-item label="" prop="" style="margin-top: 10px">
          <el-row>
            <el-col :span="2">
              <span class="el-icon-s-custom"></span>
            </el-col>
            <el-col :span="200" style="margin-left: 70px">
              <el-input
                class="inps"
                placeholder="用户名"
                v-model="loginForm.userName"
              >
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="" prop="userId">
          <el-row>
            <el-col :span="2">
              <span class="el-icon-s-custom"></span>
            </el-col>
            <el-col :span="200" style="margin-left: 70px">
              <el-input
                class="inps"
                placeholder="账号(十一位数字）"
                v-model="loginForm.userId"
                type="text"
                onkeyup="this.value=this.value.replace(/[^\d]/g,'')"
                onafterpaste="this.value=this.value.replace(/[^\d]/g,'') "
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
        <el-form-item label="" prop="config">
          <el-row>
            <el-col :span="2">
              <span class="el-icon-lock"></span>
            </el-col>
            <el-col :span="200" style="margin-left: 70px">
              <el-input
                class="inps"
                type="password"
                placeholder="确认密码"
                v-model="loginForm.config"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item style="margin: 30px 0 0 70px">
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >确认</el-button
          >
          <div class="unlogin" style="margin: -2px 0 0 55px">
            <router-link :to="{ path: '/' }">
              <el-button type="primary">取消</el-button>
            </router-link>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
import {enroll} from '@/api/user'
import {ElMessage} from 'element-plus'
import router from '@/router'

export default {
  name: 'Enroll',
  data: function () {
    router.afterEach((to) => {
      if (to.name === 'login') {
        location.reload()
      }
    })
    return {
      loginForm: {
        userId: '',
        passWord: '',
        config: '',
        userName: ''
      },
      loginRules: {
        userId: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }
        ],
        passWord: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        config: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
        ],
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
      }
    }
  },

  methods: {
    ...mapMutations(['changeLogin']),
    submitForm() {
      const userUserId = this.loginForm.userId
      const userPassword = this.loginForm.passWord
      const userConfig = this.loginForm.config
      const userName = this.loginForm.userName
      if (!userUserId) {
        ElMessage.error('账号不能为空!')
      } else if (!userPassword) {
        ElMessage.error('密码不能为空！')
      } else if (!userConfig) {
        ElMessage.error('请确认密码！')
      } else if (userConfig !== userPassword) {
        ElMessage.error('两次输入不一致！')
      } else if (!userName) {
        ElMessage.error('用户名不能为空！')
      } else if (userUserId.length !== 11) {
        console.log(typeof userUserId)
        ElMessage.error('请输入十一位数字账号！')
      } else {
        enroll({
          id: userUserId,
          password: userPassword,
          name: userName
        }).then(
          (res) => {
            console.log(res)
            if (res.code === '200') {
              router.push({ path: '/' })
            }
          },
          (err) => {
            console.log(err)
          }
        )
      }
      console.log('用户输入的账号为：', userUserId)
      console.log('用户输入的密码为：', userPassword)
      console.log('用户输入的密码为：', userConfig)
    }
  }
}
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
  margin-top: -40px;
}
</style>
