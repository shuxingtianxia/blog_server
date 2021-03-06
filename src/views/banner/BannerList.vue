<template>
   <ass-table
    ref="AssTable"
    :searchData="searchData"
    :formConfig="formConfig"
    :tableConfig="tableConfig"
    :requestConfig="requestConfig"
  >
    <template slot="formButton">
      <el-button type="primary" @click="$router.push({name: 'AddBanner'})">添加banner</el-button>
    </template>
    <template slot="image" slot-scope="{data}">
      <img :src="data.row.url" alt="" width="50px" height="50px">
    </template>
    <template slot="handle" slot-scope="{data}">
      <el-button type="danger" size="mini" @click="del(data.row._id)">删除</el-button>
    </template>
  </ass-table>
</template>

<script type="text/javascript">
import { getBanner } from '@/api/banner/banner'
export default {
  name: "bannerList",
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
          label: '标题',
          key: 'title'
        },
        {
          label: '图片',
          key: 'url',
          slotName: 'image'
        },
        {
          label: '操作',
          width: 110,
          slotName: 'handle'
        }
      ],
      requestConfig: {
        getTableData: getBanner
      }
    }
  },
  components: {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
</style>
