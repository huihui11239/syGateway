<template>
  <div class="system-wrap">
    <!-- SIP服务 -->
    <div class="show-title">
      <span>SIP服务</span>
    </div>
    <div class="ipList">
      <el-form
        :inline="true"
        :model="form1.ruleForm1"
        ref="from1"
        :rules="form1.rules1"
        class="demo-form-inline ip-form"
      >
        <el-form-item label="SIP地址" prop="sip_host_ip" show-overflow-tooltip>
          <el-input v-model="form1.ruleForm1.sip_host_ip" message="SIP地址" placeholder></el-input>
        </el-form-item>
        <el-form-item label="SIP端口" prop="sip_host_port">
          <el-input v-model.number="form1.ruleForm1.sip_host_port" message="SIP端口" placeholder="0"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="onSubmit1('from1')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 省（部）级云平台 -->
    <div class="show-title">
      <span>省（部）级云平台</span>
    </div>
    <div class="ipList">
      <el-form
        :inline="true"
        :model="form2.ruleForm2"
        ref="form2"
        :rules="form2.rules2"
        class="demo-form-inline ip-form"
      >
        <el-form-item label="云平台服务地址" prop="platform_service_uri">
          <el-input
            v-model="form2.ruleForm2.platform_service_uri"
            message="TIRI地址"
            placeholder
            show-overflow-tooltip
          ></el-input>
        </el-form-item>
        <el-form-item label="本机设备编码" prop="platform_device_code">
          <el-input v-model="form2.ruleForm2.platform_device_code" message="本机设备编码" placeholder></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="platform_user_name">
          <el-input v-model="form2.ruleForm2.platform_user_name" message="请输入用户名" placeholder></el-input>
        </el-form-item>
        <el-form-item label="初始令牌环" prop="platform_original_token">
          <el-input v-model="form2.ruleForm2.platform_original_token" message="初始令牌环" placeholder></el-input>
        </el-form-item>
        <el-form-item label="SM2私钥文件" prop="platform_sm2_public_key_file">
          <el-input
            v-model="form2.ruleForm2.platform_sm2_public_key_file"
            message="SM2私钥文件"
            placeholder
          ></el-input>
        </el-form-item>
        <el-form-item label="SM2公钥文件" prop="platform_sm2_private_key_file">
          <el-input
            v-model="form2.ruleForm2.platform_sm2_private_key_file"
            message="SM2公钥文件"
            placeholder
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="onSubmit2('form2')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 本地RTMP发布服务 -->
    <div class="show-title">
      <span>本地RTMP发布服务</span>
    </div>
    <div class="ipList">
      <el-form
        :inline="true"
        :model="form3.ruleForm3"
        ref="form3"
        :rules="form3.rules3"
        class="demo-form-inline ip-form"
      >
        <el-form-item label="RTMP地址" prop="local_rtmp_host_ip">
          <el-input v-model="form3.ruleForm3.local_rtmp_host_ip" message="RTMP地址" placeholder></el-input>
        </el-form-item>
        <el-form-item label="RTMP端口" prop="local_rtmp_host_port">
          <el-input
            v-model.number="form3.ruleForm3.local_rtmp_host_port"
            message="RTMP端口"
            placeholder="0"
          ></el-input>
        </el-form-item>
        <el-form-item label="摄像机视频推流、断流" prop="local_video_control">
          <el-checkbox v-model="form3.video_control_checked"></el-checkbox>
        </el-form-item>
        <el-form-item label="云台控制" prop="local_yt_control">
          <el-checkbox v-model="form3.yt_control_checked"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="onSubmit3('form3')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 定时任务 -->
    <div class="show-title">
      <span>定时任务</span>
    </div>
    <div class="ipList">
      <el-form
        :inline="true"
        :model="form4.ruleForm4"
        ref="form4"
        :rules="form4.rules4"
        class="demo-form-inline ip-form"
      >
        <el-form-item label="SIP Catalog刷新间隔" prop="sip_catalog_refresh_interval">
          <el-input
            v-model.number="form4.ruleForm4.sip_catalog_refresh_interval"
            message
            placeholder="0"
          ></el-input>
        </el-form-item>
        <span class="second">分钟</span>
        <el-form-item label="摄像机状态刷新间隔" prop="camera_status_refresh_interval">
          <el-input
            v-model.number="form4.ruleForm4.camera_status_refresh_interval"
            message
            placeholder="0"
          ></el-input>
        </el-form-item>
        <span class="second">分钟</span>
        <el-form-item label="省（部）级云平台令牌刷新间隔" prop="platform_token_refresh_interval">
          <el-input
            v-model.number="form4.ruleForm4.platform_token_refresh_interval"
            message
            placeholder="0"
          ></el-input>
        </el-form-item>
        <span class="second">分钟</span>
        <el-form-item>
          <el-button type="primary" plain @click="onSubmit4('form4')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 修改密码 -->
    <div class="show-title">
      <span>修改密码</span>
    </div>
    <div class="ipList">
      <el-form
        :inline="true"
        :model="form5.ruleForm5"
        ref="form5"
        :rules="form5.rules5"
        class="demo-form-inline ip-form"
      >
        <el-form-item label="新密码" prop="admin_pwd">
          <el-input
            v-model="form5.ruleForm5.admin_pwd"
            :type="[flag?'text':'password']"
            style="border:1px solid #fff;width:250px;"
            placeholder="请输入新密码"
          >
            <i
              slot="suffix"
              :class="[flag?'el-icon-minus':'el-icon-view']"
              style="margin-top:8px;font-size:18px;"
              autocomplete="auto"
              @click="flag=!flag"
            />
          </el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="admin_pwd_confirm">
          <!-- <el-input v-model="form5.ruleForm5.admin_pwd_confirm" message placeholder></el-input> -->
          <el-input
            v-model="form5.ruleForm5.admin_pwd_confirm"
            :type="[flag?'text':'password']"
            style="border:1px solid #fff;width:250px;"
            placeholder="确认新密码"
          >
            <i
              slot="suffix"
              :class="[flag?'el-icon-minus':'el-icon-view']"
              style="margin-top:8px;font-size:18px;"
              autocomplete="auto"
              @click="flag=!flag"
            />
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="onSubmit5('form5')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getData, postData } from "../../utils/request/http";

export default {
  data() {
    /*ip正则验证*/
    var validcodeip = (rule, value, callback) => {
      const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
      if (reg.test(value) || value.length == 0) {
        callback();
      } else {
        return callback(new Error("请输入正确的IP格式！"));
      }
    };
    // 密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form5.ruleForm5.admin_pwd !== "") {
          this.$refs.form5.validateField("admin_pwd_confirm");
        }
        callback();
      }
    };
    // 确认密码
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form5.ruleForm5.admin_pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      flag: false,
      //SIP服务
      form1: {
        ruleForm1: {
          sip_host_ip: "",
          sip_host_port: ""
        },
        rules1: {
          sip_host_ip: [
            { required: false, message: "", trigger: "blur" },
            { validator: validcodeip, trigger: "blur" }
          ],
          sip_host_port: [
            { required: false, message: "" },
            { type: "number", message: "必须为数字值" }
          ]
        }
      },
      //省（部）级云平台
      form2: {
        ruleForm2: {
          platform_service_uri: "",
          platform_device_code: "",
          platform_user_name: "",
          platform_original_token: "",
          platform_sm2_public_key_file: "",
          platform_sm2_private_key_file: ""
        },
        rules2: {
          platform_service_uri: [
            {
              required: false,
              message: "",
              trigger: "blur"
            }
          ],
          platform_device_code: [
            {
              required: false,
              message: "",
              trigger: "blur"
            }
          ],
          platform_user_name: [
            {
              required: false,
              message: "",
              trigger: "blur"
            }
          ],
          platform_original_token: [
            {
              required: false,
              message: "",
              trigger: "blur"
            }
          ],
          platform_sm2_public_key_file: [
            {
              required: false,
              message: "",
              trigger: "blur"
            }
          ],
          platform_sm2_private_key_file: [
            {
              required: false,
              message: "",
              trigger: "blur"
            }
          ]
        }
      },
      //本地RTMP发布服务
      form3: {
        ruleForm3: {
          local_rtmp_host_ip: "",
          local_rtmp_host_port: ""
        },
        rules3: {
          local_rtmp_host_ip: [
            { required: false, message: "", trigger: "blur" },
            { validator: validcodeip, trigger: "blur" }
          ],
          local_rtmp_host_port: [
            { required: false, message: "" },
            { type: "number", message: "必须为数字值" }
          ]
        },
        video_control_checked: false,
        yt_control_checked: false //云台控制
      },
      //定时任务
      form4: {
        ruleForm4: {
          sip_catalog_refresh_interval: "",
          camera_status_refresh_interval: "",
          platform_token_refresh_interval: ""
        },
        rules4: {
          sip_catalog_refresh_interval: [
            { required: false, message: "" },
            { type: "number", message: "必须为数字值" }
          ],
          camera_status_refresh_interval: [
            { required: false, message: "" },
            { type: "number", message: "必须为数字值" }
          ],
          platform_token_refresh_interval: [
            { required: false, message: "" },
            { type: "number", message: "必须为数字值" }
          ]
        }
      },
      //修改密码
      form5: {
        ruleForm5: {
          admin_pwd: "",
          admin_pwd_confirm: ""
        },
        rules5: {
          admin_pwd: [{ validator: validatePass, trigger: "blur" }],
          admin_pwd_confirm: [{ validator: validatePass2, trigger: "blur" }]
        }
      }
    };
  },
  mounted() {
    this.getSysconfig1();
    this.getSysconfig2();
    this.getSysconfig3();
    this.getSysconfig4();
    //this.getSysconfig5();
  },
  methods: {
    /*
       @Desc: 获取系统配置 1
       @Author: HHH , @Date: 2020-08-11 14:18:47
      */
    getSysconfig1() {
      var that = this;
      //获取当前时间戳
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000;
      postData("/web/sysconfig/get?timestamp=" + timestamp, {
        fields: "sipService"
      })
        .then(res => {
          that.logining = false;
          console.log(res);
          if (res.code == "0") {
            let datas = res.data;
            this.form1.ruleForm1.sip_host_ip = datas.sip_host_ip;
            this.form1.ruleForm1.sip_host_port = datas.sip_host_port;
          } else {
            that.$message.error(res.code + "，" + res.msg);
          }
        })
        .catch(res => {
          that.$message.error(res.code + "，" + res.msg);
        });
    },
    /*
       @Desc: 获取系统配置 2
       @Author: HHH , @Date: 2020-08-11 14:18:47
      */
    getSysconfig2() {
      var that = this;
      postData("/web/sysconfig/get", {
        fields: "platform"
      })
        .then(res => {
          that.logining = false;
          console.log(res);
          if (res.code == "0") {
            let datas = res.data;
            this.form2.ruleForm2.platform_service_uri =
              datas.platform_service_uri;
            this.form2.ruleForm2.platform_device_code =
              datas.platform_device_code;
            this.form2.ruleForm2.platform_user_name = datas.platform_user_name;
            this.form2.ruleForm2.platform_original_token =
              datas.platform_original_token;
            this.form2.ruleForm2.platform_sm2_public_key_file =
              datas.platform_sm2_public_key_file;
            this.form2.ruleForm2.platform_sm2_private_key_file =
              datas.platform_sm2_private_key_file;
          } else {
            that.$message.error(res.code + "，" + res.msg);
          }
        })
        .catch(res => {
          that.$message.error(res.code + "，" + res.msg);
        });
    },
    /*
       @Desc: 获取系统配置 3
       @Author: HHH , @Date: 2020-08-11 14:18:47
      */
    getSysconfig3() {
      var that = this;
      postData("/web/sysconfig/get", {
        fields: "localRtmp"
      })
        .then(res => {
          that.logining = false;
          console.log(res);
          if (res.code == "0") {
            let datas = res.data;
            this.form3.ruleForm3.local_rtmp_host_ip = datas.local_rtmp_host_ip;
            this.form3.ruleForm3.local_rtmp_host_port =
              datas.local_rtmp_host_port;
            this.form3.video_control_checked = datas.local_video_control;
            this.form3.yt_control_checked = datas.local_yt_control;
          } else {
            that.$message.error(res.code + "，" + res.msg);
          }
        })
        .catch(res => {
          that.$message.error(res.code + "，" + res.msg);
        });
    },
    /*
       @Desc: 获取系统配置 4
       @Author: HHH , @Date: 2020-08-11 14:18:47
      */
    getSysconfig4() {
      var that = this;
      postData("/web/sysconfig/get", {
        fields: "schedule"
      })
        .then(res => {
          that.logining = false;
          console.log(res);
          if (res.code == "0") {
            let datas = res.data;
            this.form4.ruleForm4.sip_catalog_refresh_interval =
              datas.sip_catalog_refresh_interval;
            this.form4.ruleForm4.camera_status_refresh_interval =
              datas.camera_status_refresh_interval;
            this.form4.ruleForm4.platform_token_refresh_interval =
              datas.platform_token_refresh_interval;
          } else {
            that.$message.error(res.code + "，" + res.msg);
          }
        })
        .catch(res => {
          that.$message.error(res.code + "，" + res.msg);
        });
    },
    /*
     @Desc: 获取密码展示
     @Author: HHH , @Date: 2020-08-13 11:05:47
    */
    getSysconfig5() {
      var that = this;
      postData("/web/sysconfig/get", {
        fields: "admin"
      })
        .then(res => {
          that.logining = false;
          console.log(res);
          if (res.code == "0") {
            let datas = res.data;
          } else {
            that.$message.error(res.code + "，" + res.msg);
          }
        })
        .catch(res => {
          that.$message.error(res.code + "，" + res.msg);
        });
    },
    /*
    @Desc: SIP服务提交
    @Author: HHH , @Date: 2020-08-11 13:34:19
   */
    onSubmit1(formName) {
      var that = this;
      that.logining = true;
      that.$refs[formName].validate(valid => {
        if (valid) {
          postData("/web/sysconfig/set", {
            fields: "sipService",
            sip_host_ip: this.form1.ruleForm1.sip_host_ip,
            sip_host_port: this.form1.ruleForm1.sip_host_port
          })
            .then(res => {
              that.logining = false;
              console.log(res);
              if (res.code == "0") {
                that.$message.success("设置成功！");
              } else {
                that.$message.error(res.code + "，" + res.msg);
              }
            })
            .catch(res => {
              that.$message.error(res.code + "，" + res.msg);
            });
        } else {
          that.$message.error("error");
          return false;
        }
      });
    },
    /*
    @Desc: 省（部）级云平台
    @Author: HHH , @Date: 2020-08-11 13:34:19
   */
    onSubmit2(formName) {
      console.log(formName);
      var that = this;
      that.logining = true;
      that.$refs[formName].validate(valid => {
        if (valid) {
          postData("/web/sysconfig/set", {
            fields: "platform",
            platform_service_uri: this.form2.ruleForm2.platform_service_uri,
            platform_device_code: this.form2.ruleForm2.platform_device_code,
            platform_user_name: this.form2.ruleForm2.platform_user_name,
            platform_original_token: this.form2.ruleForm2
              .platform_original_token,
            platform_sm2_public_key_file: this.form2.ruleForm2
              .platform_sm2_public_key_file,
            platform_sm2_private_key_file: this.form2.ruleForm2
              .platform_sm2_private_key_file
          })
            .then(res => {
              that.logining = false;
              console.log(res);
              if (res.code == "0") {
                that.$message.success("设置成功！");
              } else {
                that.$message.error(res.code + "，" + res.msg);
              }
            })
            .catch(res => {
              that.$message.error(res.code + "，" + res.msg);
            });
        } else {
          that.$message.error("error");
          return false;
        }
      });
    },
    /*
    @Desc: 本地RTMP发布服务   提交
    @Author: HHH , @Date: 2020-08-11 13:34:19
   */
    onSubmit3(formName) {
      var that = this;
      that.logining = true;
      that.$refs[formName].validate(valid => {
        if (valid) {
          postData("/web/sysconfig/set", {
            fields: "localRtmp",
            local_rtmp_host_ip: this.form3.ruleForm3.local_rtmp_host_ip,
            local_rtmp_host_port: this.form3.ruleForm3.local_rtmp_host_port,
            local_video_control: this.form3.video_control_checked,
            local_yt_control: this.form3.yt_control_checked
          })
            .then(res => {
              that.logining = false;
              console.log(res);
              if (res.code == "0") {
                that.$message.success("设置成功！");
              } else {
                that.$message.error(res.code + "，" + res.msg);
              }
            })
            .catch(res => {
              that.$message.error(res.code + "，" + res.msg);
            });
        } else {
          that.$message.error("error");
          return false;
        }
      });
    },
    /*
    @Desc: 定时任务 提交
    @Author: HHH , @Date: 2020-08-11 13:34:19
   */
    onSubmit4(formName) {
      var that = this;
      that.logining = true;
      that.$refs[formName].validate(valid => {
        if (valid) {
          postData("/web/sysconfig/set", {
            fields: "schedule",
            sip_catalog_refresh_interval: this.form4.ruleForm4
              .sip_catalog_refresh_interval,
            camera_status_refresh_interval: this.form4.ruleForm4
              .camera_status_refresh_interval,
            platform_token_refresh_interval: this.form4.ruleForm4
              .platform_token_refresh_interval
          })
            .then(res => {
              that.logining = false;
              console.log(res);
              if (res.code == "0") {
                that.$message.success("设置成功！");
              } else {
                that.$message.error(res.code + "，" + res.msg);
              }
            })
            .catch(res => {
              that.$message.error(res.code + "，" + res.msg);
            });
        } else {
          that.$message.error("error");
          return false;
        }
      });
    },
    /*
    @Desc: 修改密码 提交
    @Author: HHH , @Date: 2020-08-11 13:34:19
   */
    onSubmit5(formName) {
      var that = this;
      that.logining = true;
      that.$refs[formName].validate(valid => {
        if (valid) {
          postData("/web/sysconfig/set", {
            fields: "admin",
            admin_pwd: this.form5.ruleForm5.admin_pwd
          })
            .then(res => {
              that.logining = false;
              console.log(res);
              if (res.code == "0") {
                that.$message.success("设置成功！");
              } else {
                that.$message.error(res.code + "，" + res.msg);
              }
            })
            .catch(res => {
              that.$message.error(res.code + "，" + res.msg);
            });
        } else {
          that.$message.error("error");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
/*标题*/
.show-title {
  width: 100%;
  height: 30px;
  line-height: 30px;
  position: relative;
  background: #bed7da;
  padding-left: 15px;
  font-size: 14px;
  margin: 6px 0 10px 0;
  border-radius: 10px 10px 0 0;
}

.show-title::before {
  content: "";
  width: 2px;
  height: 12px;
  /* background: #29c0b7; */
  background: #676a6d;
  position: absolute;
  top: 9px;
  left: 27px;
}

.show-title span {
  color: #676a6d;
  margin-left: 25px;
}
/* ip列表 */
.ipList {
  margin: 30px 0;
}

/* 更改form表单默认样式,表头 */
/* .system-wrap >>> .el-table--border th,
.el-table__fixed-right-patch {
  background: #c0dee2;
}

.system-wrap >>> .el-table .cell,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding-left: 10px;
  text-align: center;
}
.system-wrap >>> .demo-form-inline {
  width: 96%;
  margin: 0 auto;
  margin-top: 35px;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid #c0dee2;
  box-shadow: 0px 3px 1px #ceece8;
  border-radius: 25px;
} */
.system-wrap >>> .el-form-item {
  margin-right: 20px !important;
}
.second {
  color: #676a6d;
  font-size: 15px;
  line-height: 40px;
  margin-right: 30px;
}
</style>
