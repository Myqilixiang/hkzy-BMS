<template>
  <div class="login-container">
    <el-card class="login-panel"
             shadow="always">
      <div class="clearfix title"
           slot="header">
        <h3>惠康智赢处方审核平台</h3>
      </div>
      <div class="clearfix">
        <el-form autoComplete="on"
                 :model="loginForm"
                 :rules="loginRules"
                 ref="loginForm"
                 label-position="left">
          <el-form-item prop="username">
            <el-input name="username"
                      type="text"
                      v-model="loginForm.username"
                      autoComplete="on"
                      placeholder="username">
              <template slot="prepend">
                <svg-icon icon-class="login-user" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input name="password"
                      type="password"
                      @keyup.enter.native="handleLogin"
                      v-model="loginForm.password"
                      autoComplete="on"
                      placeholder="password">
              <template slot="prepend">
                <svg-icon icon-class="login-password" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       style="width:100%;"
                       :loading="loading"
                       @click.native.prevent="handleLogin">
              登陆
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 100% 100%;
  // background-color: $bg;
  background-repeat: no-repeat;
  background-image: url('/static/images/bg-2.png');
  .login-panel {
    width: 35%;
    height: 300px;
  }
  .title {
    text-align: center;
  }
}
</style>
