<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="site-title-bar">
          <span class="site-title">每日知乎</span>
          <el-date-picker
            v-model="datePicker"
            type="date"
            placeholder="选择日期"
            value-format="yyyyMMdd"
          >
          </el-date-picker>
        </div>
      </el-header>
      <el-main v-loading="isLoading" element-loading-text="Loading">
        日报日期:{{ newsDate }}
        <el-tooltip
          effect="dark"
          content="这个时间是收录时间"
          placement="bottom"
        >
          <i class="el-icon-info"></i>
        </el-tooltip>
        <el-table
          class="main-table"
          @row-click="openNews"
          :data="newsData"
          stripe
        >
          <el-table-column prop="hint" label="栏目"> </el-table-column>
          <el-table-column prop="title" label="标题" min-width="200px">
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer
        >以上所有数据来自于<el-link
          type="primary"
          href="//zhihu.com"
          target="_blank"
          rel="noopener noreferrer"
          >知乎</el-link
        >,本站只负责数据整理<br />
        图标来源<el-link
          type="primary"
          href="//www.iconfont.cn/"
          target="_blank"
          rel="noopener noreferrer"
          >iconfont</el-link
        >,基于<el-link
          type="primary"
          href="//github.com/Vuejs/Vue"
          target="_blank"
          rel="noopener noreferrer"
          >Vue</el-link
        >&<el-link
          type="primary"
          href="//github.com/ElemeFE/element"
          target="_blank"
          rel="noopener noreferrer"
          >Element</el-link
        >构建
        <el-link
          type="primary"
          href="//github.com/yinyunsan/zhihudaily-vue"
          target="_blank"
          rel="noopener noreferrer"
          >Element</el-link
        >
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      datePicker: "",
      newsDate: "",
      isLoading: true,
      newsData: [{ hint: "没有数据", title: "请在上面选择一个日期" }],
    };
  },
  methods: {
    openNews(newsItem) {
      let newsLink = document.createElement("a");
      newsLink.href = newsItem.url;
      newsLink.target = "_blank";
      newsLink.rel = "noopener noreferrer";
      newsLink.click();
    },
    async getData(_date) {
      let data = await axios({
        method: "post",
        url: "//api.lostkotoba.top/zhihu",
        // url: "//127.0.0.1:8381/zhihu",
        data: "date=" + _date,
      });
      return data;
    },
  },
  mounted: async function() {
    let d = new Date();
    d.setDate(d.getDate() + 1);
    let _date =
      "" +
      d.getFullYear() +
      (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) +
      (d.getDate() < 10 ? "0" + d.getDate() : d.getDate());
    let data = await this.getData(_date);
    this.newsData = data.data.stories;
    this.newsDate = data.data.date;
    this.isLoading = false;
  },
  watch: {
    datePicker: async function(_value) {
      if (this.isLoading) {
        this.$message({
          showClose: true,
          message: "请等待上一次请求完成",
          type: "warning",
          duration: 1500,
        });
        return false;
      }
      this.isLoading = true;
      let data = await this.getData(_value);
      this.isLoading = false;
      this.newsData = data.data.stories;
      this.newsDate = data.data.date;
      this.$message({
        showClose: true,
        message: "加载完成",
        type: "success",
        duration: 1500,
      });
    },
  },
};
</script>

<style>
body {
  background-color: #eaedf7;
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
}
.el-header {
  z-index: 10;
  background-color: #eaf4fc;
  box-shadow: #b5b5b5ad 0px 1px 20px 1px;
  text-align: center;
}
.el-footer {
  margin: 0 auto;
  color: #636363;
  font-size: 10px;
}
.main-table {
  width: 100%;
  margin: 20px auto;
  color: #333;
}
.site-title {
  font-size: 24px;
  float: left;
}
.site-title-bar {
  margin: 0 auto;
  max-width: 800px;
}
@media screen and (min-width: 800px) {
  .main-table {
    border: 1px solid #3e3e3e14;
    max-width: 800px !important;
  }
}
</style>
