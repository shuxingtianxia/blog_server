<template>
  <div class="login-container">
    <el-form
      autoComplete="off"
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-position="left"
      label-width="0px"
      class="card-box login-form"
    >
      <h3 class="title">登录书行天下个人博客</h3>
      <input
        type="text"
        name="username"
        style="position: absolute; left: 0; top: 0; visibility: hidden;"
      >
      <input
        type="text"
        name="password"
        style="position: absolute; left: 0; top: 0; visibility: hidden;"
      >
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
        </span>
        <el-input
          name="a"
          type="text"
          @keyup.enter.native="handleLogin"
          v-model="loginForm.username"
          autoComplete="off"
          placeholder="请输入账号"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
        </span>
        <el-input
          name="b"
          type="password"
          @keyup.enter.native="handleLogin"
          v-model="loginForm.password"
          autoComplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="width:100%;"
          :loading="loading"
          @click="handleLogin"
        > 登录 </el-button>
      </el-form-item>
      <div>
        <p @click="$router.push({name: 'Register'})">还没有账号？现在注册</p>
      </div>
    </el-form>
  </div>
</template>
<script>
import Md5 from 'js-md5'
export default {
  data() {
    return {
      loading: false,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入账号' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
      },
      timer: 0
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const loginForm = JSON.parse(JSON.stringify(this.loginForm))
          loginForm.password = Md5(loginForm.password)
          const nowTime = new Date().getTime()
          if ((nowTime - this.timer) < 2000) return
          this.timer = nowTime
          this.$store.dispatch('Login', loginForm).then(_ => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(_ => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    showPwd() {}
  }
}
</script>
<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;
  .login-container {
    height: 100vh;
    background-color: $bg;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select:none;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
  .item-content .el-form-item__content{
    display: flex;
    align-items: center;
  }
  .login-code {
    width: 33%;
    float: right;
    img {
      cursor: pointer;
      vertical-align: middle;
    }
  }
  ::v-deep .el-input__inner {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: $light_gray;
    height: 47px;
  }
</style>
