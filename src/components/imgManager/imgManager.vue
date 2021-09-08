<template>
  <el-card>
    <!-- 1.面包屑 -->
    <my-bread level1="图片管理" level2="图表列表" />

    <!-- 上传图片 -->
    <el-row class="addBtn">
      <el-col>
        <el-upload
          class="upload-img"
          action=""
          :show-file-list="false"
          :multiple="false"
          accept="image/png,image/jpg,image/jpeg,image/bmp,image/gif"
          :http-request="uploadImg"
        >
          <el-button type="primary">上传图片</el-button>
        </el-upload>
      </el-col>
    </el-row>

    <!-- 图表表格 -->
    <el-table :data="recordList" border height="400px" class="tbClass">
      <el-table-column label="#" width="100" type="index" />
      <el-table-column prop="fileName" label="文件名称" />
      <el-table-column label="图片">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.filePath"
            :preview-src-list="scope.row.filePath.split(';')"
          />
        </template>
      </el-table-column>
      <el-table-column prop="uploadUserName" label="上传用户" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
            @click="showDelDia(scope.row.id)"
          />
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-download"
            circle
            @click="download(scope.row.fileName)"
          />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      recordList: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await this.$http.get("/sim/selectAll");
      this.recordList = res.data.data;
    },
    // 调用添加接口
    async uploadImg(param) {
      //文件检测是否合格
      let fileType = param.file.type;
      let fileSize = param.file.size / 1024 / 1024;
      if (
        fileType !== "image/jpg" &&
        fileType !== "image/png" &&
        fileType !== "image/jpeg" &&
        fileType !== "image/bmp" &&
        fileType !== "image/gif"
      ) {
        this.$message.error("上传图片只能是 JPG,PNG,JPEG,BMP,GIF 格式!");
        return false;
      }
      if (fileSize > 20) {
        this.$message.error("上传图片大小不能超过 20MB!");
        return false;
      }

      //调用后端上传图片接口
      let param1 = new FormData();
      param1.append("userId", localStorage.getItem("userId"));
      param1.append("file", param.file);
      const res = await this.$http.post("/sim/upload", param1);
      const { code, msg } = res.data;
      if (code === 0) {
        this.$message.success(msg);
        //重新更新数据
        this.getList();
      } else {
        this.$message.error(msg);
      }
    },
    //显示删除对话框
    showDelDia(id) {
      this.$confirm("删除该条记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.post("/sim/delete?id=" + id);
        const { code, msg } = res.data;
        if (code === 0) {
          this.$message.success(msg);
          //设置当前页是第一页
          this.start = 1;
          //重新更新数据
          this.getList();
        } else {
          this.$message.error(msg);
        }
      });
    },
    //文件下载
    download(fileName) {
      let downUrl = "/sim/download/" + fileName;
      this.$http({
        methods: "get",
        url: downUrl,
        responseType: "blob",
      })
        .then((res) => {
          let url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.download = fileName;
          link.click();
          window.URL.revokeObjectURL(url);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style>
.addBtn {
  margin-top: 20px;
}
.tbClass {
  width: 100%;
  margin-top: 20px;
}
</style>