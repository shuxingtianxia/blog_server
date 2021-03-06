<template>
  <ass-table
    ref="AssTable"
    :searchData="searchData"
    :formConfig="formConfig"
    :tableConfig="tableConfig"
    :requestConfig="requestConfig"
  >
    <template slot="isAdmin" slot-scope="{data}">
      {{data.row.isAdmin ? '是' : '否'}}
    </template>
    <template slot="type" slot-scope="{data}">
      {{data.row.type === 'wx' ? '小程序' : 'web端'}}
    </template>
    <template v-slot:handle="{data}">
      <el-button type="danger" size="mini" @click="del(data.row._id)">删除</el-button>
    </template>
  </ass-table>
</template>

<script type="text/javascript">
import { getUsers, delUsers } from '@/api/user/user'
export default {
  data() {
    return {
      searchData: {},
      formConfig: [
        {
          componentType: 'input',
          key: 'userId',
          label: '用户名',
          placeholder: '用户名'
        }
      ],
      tableConfig: [
        {
          label: '用户id',
          key: '_id'
        },
        {
          label: '用户名',
          key: 'username'
        },
        {
          label: '管理员',
          key: 'isAdmin',
          slotName: 'isAdmin',
          width: 100
        },
        {
          label: '来源',
          key: 'type',
          slotName: 'type',
          width: 100
        },
        {
          label: '操作',
          width: 110,
          slotName: 'handle'
        }
      ],
      requestConfig: {
        getTableData: getUsers
      }
    }
  },
  methods: {
    // 删除用户
    del(id) {
      this.$confirm('确定要删除该用户吗？删除后无法找回！', '温馨提示').then(() => {
        delUsers({ id }).then(res => {
          if (res.code === 0) {
            this.$message(res.msg)
            this.$refs.AssTable.getTableData()
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
