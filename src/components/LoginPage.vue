<template>
  <div id="container">
    <el-card class="login-card">
      <div class="login-form-title">管理登录</div>
      <el-form ref="loginFormRef" :model="loginForm" class="login-form" :rules="rules">
        <el-form-item prop="userName">
          <el-input v-model="loginForm.userName" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="密码" show-password></el-input>
        </el-form-item>
        <div class="captcha-input" style="display: flex; align-items: center">
          <el-form-item style="margin-right: 20px" prop="captcha">
            <el-input v-model="loginForm.captcha" placeholder="验证码"></el-input>
          </el-form-item>
          <img ref="captchaImgRef" style="height:30px; width: 100px; margin-bottom: 22px"/>
        </div>
      </el-form>
      <el-button type="primary" class="login-button" @click="doLogin">登录</el-button>
    </el-card>
  </div>
</template>

<script>
import {login} from "../apis/user_api"

export default {
  name: "LoginPage",
  data() {
    return {
      loginForm: {
        userName: "",
        password: "",
        captcha: ""
      },
      rules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        captcha: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ]
      },
      captchaKey: Date.now()
    }
  },
  methods: {
    getCaptcha() {
      this.$refs.captchaImgRef.src = "http://localhost:8080/user/captcha?captcha_key=" + this.captchaKey
    },
    async doLogin() {
      try {
        const {data: response} = await login(this.captchaKey, this.loginForm)
        if (response.code === 20000) {
          this.$message.success("登录成功")
          this.$router.push('/')
        } else {
          this.$message.error(response.message)
        }
      } catch (e) {
        this.$message.error("系统繁忙，请稍后再试")
      }

    }
  },
  mounted() {
    this.getCaptcha()
  }
}
</script>

<style scoped lang="less">

#container {
  position: relative;
  height: 100%;
  background: cornflowerblue;
}

.login-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  width: 400px;
  height: 350px;
  left: 70%;
  top: 50%;
  transform: translate(-50%, -50%);
}

::v-deep .el-card__body {
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

form, .el-button {
  width: 100%;
}

.login-form-title {
  font-size: 20px;
  margin-bottom: 20px;
}

</style>