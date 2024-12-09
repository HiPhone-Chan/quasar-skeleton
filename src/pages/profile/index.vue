<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="用户信息" name="account">
                <account v-model="user" @on-change="updateAccount" />
              </el-tab-pane>
              <el-tab-pane label="修改密码" name="password">
                <change-password />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user-store'
import UserCard from './components/UserCard.vue'
import Account from './components/Account.vue'
import ChangePassword from './components/ChangePassword.vue'
import { updateAccount } from '@/api/account'
import { logout } from '@/utils/auth';

export default {
  name: 'ProfileIndex',
  components: { UserCard, Account, ChangePassword },
  data() {
    return {
      user: {},
      activeTab: 'account'
    }
  },
  computed: {
    ...mapState(useUserStore, [
      'name',
      'nickname',
      'mobile',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        nickname: this.nickname,
        roles: this.roles,
        mobile: this.mobile,
        avatar: this.avatar
      }
    },
    async updateAccount() {
      await updateAccount({
        login: 'unused',
        nickName: this.user.nickname,
        mobile: this.user.mobile,
        imageUrl: this.user.avatar
      })
      useUserStore().getInfo()

      this.$message({
        message: '更新成功',
        type: 'success',
        duration: 5 * 1000
      })
    },
    async logout() {
      await logout();
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
}
</script>

<style></style>
