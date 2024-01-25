<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.authority" style="width: 200px;" class="filter-item" :placeholder="$t('user.role')"
        clearable @change="handleFilter">
        <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-input v-model="listQuery.search" :placeholder="$t('table.search')" style="width: 200px;margin-left: 10px;"
        class="filter-item" @keyup.enter="handleFilter" />
      <el-button class="filter-item" type="primary" @click="handleFilter">
        <el-icon style="margin-right: 10px;">
          <el-icon-search />
        </el-icon>{{ $t('table.search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="handleCreate">
        <el-icon style="margin-right: 10px;">
          <el-icon-edit />
        </el-icon>{{ $t('table.add') }}
      </el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
      <el-table-column align="center" :label="$t('table.id')" width="65">
        <template v-slot="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" :label="$t('user.username')">
        <template v-slot="scope">
          <span>{{ scope.row.login }}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" :label="$t('user.nickname')">
        <template v-slot="scope">
          <span>{{ scope.row.nickName }}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" :label="$t('user.mobile')">
        <template v-slot="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('user.role')">
        <template v-slot="scope">
          <span>{{ formatAuthorities(scope.row.authorities) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" class-name="small-padding fixed-width">
        <template v-slot="scope">
          <el-button type="primary" @click="handleUpdate(scope.row)">
            {{ $t('table.edit') }}</el-button>
          <el-button type="warning" @click="handlePassword(scope.row)">
            {{ $t('login.password') }}
          </el-button>
          <el-button type="danger" @click="handleDelete(scope.row, getData)">
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" v-model:page="listQuery.page" v-model:limit="listQuery.size"
      @pagination="getData" />

    <el-dialog v-model="dialog.visible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px"
        style="width: 400px; margin-left:50px;">
        <!-- 编辑 -->
        <template v-if="dialog.status == STATUS_UPDATE || dialog.status == STATUS_CREATE">
          <el-form-item v-if="dialog.status !== STATUS_CREATE" :label="$t('table.id')">
            <el-input v-model="temp.id" type="text" placeholder="id" disabled />
          </el-form-item>
          <el-form-item :label="$t('user.username')" prop="login" label-width="100px">
            <el-input v-model="temp.login" type="text" placeholder="登录名" :disabled="dialog.status !== STATUS_CREATE" />
          </el-form-item>
          <el-form-item :label="$t('user.role')" prop="authorities" label-width="100px">
            <el-select v-model="temp.authorities" :placeholder="$t('user.role')" clearable multiple>
              <el-option v-for="item in updateRoleOptions" :key="item.value" :label="item.label" :value="item.value"
                :disabled="item.disabled" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('user.nickname')" label-width="100px">
            <el-input v-model="temp.nickName" type="text" placeholder="昵称" />
          </el-form-item>
          <el-form-item :label="$t('user.mobile')" prop="mobile" label-width="100px">
            <el-input v-model="temp.mobile" type="text" placeholder="电话号码" />
          </el-form-item>
        </template>

        <template v-if="dialog.status == STATUS_PASSWORD">
          <el-form-item :label="$t('user.adminPassword')" prop="currentPassword" label-width="130px">
            <el-input v-model="temp.currentPassword" type="password" placeholder="当前管理员密码" />
          </el-form-item>
          <el-form-item :label="$t('user.password')" prop="newPassword" label-width="130px">
            <el-input v-model="temp.newPassword" type="password" placeholder="需要改的密码" />
          </el-form-item>
        </template>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialog.visible = false">{{ $t('table.cancel') }}
          </el-button>
          <el-button v-if="dialog.status == STATUS_CREATE" type="primary" @click="createData">{{ $t('table.confirm') }}
          </el-button>
          <el-button v-if="dialog.status == STATUS_UPDATE" type="primary" @click="updateData">{{ $t('table.confirm') }}
          </el-button>
          <el-button v-if="dialog.status == STATUS_PASSWORD" type="primary" @click="changePwd">{{ $t('table.confirm') }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
import Pagination from '@/components/Pagination/index.vue'
import { formatAuthorities, roleOptions, updateRoleOptions } from '@/utils/user'
import useUserData from './composables/useUserData'
import useDialog from './composables/dialog'
import useCreateData from './composables/dialog/useCreateData'
import useUpdateData from './composables/dialog/useUpdateData'
import usePassword from './composables/dialog/usePassword'
import { deleteUser } from '@/api/user'

const instance = getCurrentInstance();
const app = instance.appContext.config.globalProperties;

const { list, total, listLoading, listQuery,
  getData, handleFilter } = useUserData()

const { temp, dialog, rules } = useDialog()
const { handleCreate, createData, STATUS_CREATE } = useCreateData(temp, dialog, 'dataForm', getData)
const { handleUpdate, updateData, STATUS_UPDATE } = useUpdateData(temp, dialog, 'dataForm', getData)
const { handlePassword, changePwd, STATUS_PASSWORD } = usePassword(temp, dialog, 'dataForm')

const handleDelete = async (row, getData) => {
  try {
    await app.$confirm('该操作比较危险', '确认删除吗？', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    listLoading.value = true
    await deleteUser(row.login)
    await getData()
    listLoading.value = false
  } catch (err) {
    console.log(err)
  }
}

</script>

<script>
export default {
  name: 'UserManagement'
}
</script>

<style></style>
