<template>
  <div class="ct_con">
    <div class="con_title">
      {{$t('table.own_chain')}}：
      <span class="to_tr color_choose" v-show="is_zh==0">{{chainid_change_zh(all_data.chainId)}}</span>
      <span class="to_tr color_choose" v-show="is_zh==1">{{chainid_change_en(all_data.chainId)}}</span>
      <span class="to_tr color_choose" v-show="is_zh==2">{{chainid_change_ja(all_data.chainId)}}</span>
      <span class="to_tr color_choose" v-show="is_zh==3">{{chainid_change_ko(all_data.chainId)}}</span>
    </div>
    <div class="con_title" style="font-size: 17px">
      {{$t('title.transaction_details')}}
    </div>
    <div class="ct_all">
      <div class="ct_all_con">
        <div class="ct_all_con_left">
          {{$t('table.transaction_hash')}}
        </div>
        <div class="ct_all_con_right">
          {{all_data.hash}}
        </div>
      </div>
      <div class="ct_all_con">
        <div class="ct_all_con_left">
          {{$t('table.state')}}
        </div>
        <div class="ct_all_con_right">
          <span class="el-icon-success state_success" v-show="all_data.status==1"></span>
          <span class="state_success_text" v-show="all_data.status==1&&is_zh==0">成功</span>
          <span class="state_success_text" v-show="all_data.status==1&&is_zh==1">success</span>
          <span class="state_success_text" v-show="all_data.status==1&&is_zh==2">成功</span>
          <span class="state_success_text" v-show="all_data.status==1&&is_zh==3">성공</span>
          <span class="el-icon-error state_error" v-show="!all_data.status==1"></span>
          <span class="state_error_text" v-show="all_data.status!=1&&is_zh==0">失败</span>
          <span class="state_error_text" v-show="all_data.status!=1&&is_zh==1">failure</span>
          <span class="state_error_text" v-show="all_data.status!=1&&is_zh==2">失敗する</span>
          <span class="state_error_text" v-show="all_data.status!=1&&is_zh==3">실패</span>
        </div>
      </div>
      <div class="ct_all_con">
        <div class="ct_all_con_left">
          {{$t('table.ov_block')}}
        </div>
        <div class="ct_all_con_right show_color_choose">
          <span class="to_tr color_choose" @click="to_block_details(all_data.height,all_data.chainId)"
                v-show="is_zh==0">{{chainid_change_zh(all_data.chainId)+' > '+all_data.height}}</span>
          <span class="to_tr color_choose" @click="to_block_details(all_data.height,all_data.chainId)"
                v-show="is_zh==1">{{chainid_change_en(all_data.chainId)+' > '+all_data.height}}</span>
          <span class="to_tr color_choose" @click="to_block_details(all_data.height,all_data.chainId)"
                v-show="is_zh==2">{{chainid_change_ja(all_data.chainId)+' > '+all_data.height}}</span>
          <span class="to_tr color_choose" @click="to_block_details(all_data.height,all_data.chainId)"
                v-show="is_zh==3">{{chainid_change_ko(all_data.chainId)+' > '+all_data.height}}</span>
        </div>
      </div>
      <div class="ct_all_con">
        <div class="ct_all_con_left">
          {{$t('table.timestamp')}}
        </div>
        <div class="ct_all_con_right ">
          <!--{{all_data.theDateString}}-->
          {{timestampToTime(all_data.timestamp)}}
        </div>
      </div>
      <div class="ct_all_con">
        <div class="ct_all_con_left">
          {{$t('table.transaction_type')}}
        </div>
        <div class="ct_all_con_right">
          <span v-show="is_zh==0">{{tr_change_zh(all_data.txType)}}</span>
          <span v-show="is_zh==1">{{tr_change_en(all_data.txType)}}</span>
          <span v-show="is_zh==2">{{tr_change_ja(all_data.txType)}}</span>
          <span v-show="is_zh==3">{{tr_change_ko(all_data.txType)}}</span>
        </div>
      </div>
      <div class="ct_all_con">
        <div class="ct_all_con_left ">
          {{$t('table.initiator')}}
        </div>
        <div class="ct_all_con_right show_color_choose">
          {{all_data.from}}
        </div>
      </div>
      <div class="ct_all_con">
        <div class="ct_all_con_left ">
          {{$t('table.receiver')}}
        </div>
        <div class="ct_all_con_right">
          {{all_data.to}}
        </div>
      </div>
      <div class="ct_all_con">
        <div class="ct_all_con_left">
          {{$t('table.transfer_amount')}}
        </div>
        <div class="ct_all_con_right">
          {{all_data.value}}
        </div>
      </div>
      <div class="ct_all_con">
        <div class="ct_all_con_left">
          {{$t('table.transaction_fee')}}
        </div>
        <div class="ct_all_con_right ">
          {{all_data.txCost}}
        </div>
      </div>
      <div class="ct_all_con">
        <div class="ct_all_con_left ct_all_con_left_last" style="line-height: 100px">
          {{$t('table.input_data')}}
        </div>
        <div class="ct_all_con_right ct_all_con_right_last">
          {{all_data.input}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getBlockNewTxPage,

  } from '../api/interface'

  export default {
    name: "crosschainTransfer",
    data() {
      return {
        is_success: true,
        all_data: '',
        is_zh: 0,
        tr_zh: [
          {'name': '合约发布', 'value': 1},
          {'name': '合约交易', 'value': 2},
          {'name': '链内交易', 'value': 3},
          {'name': '跨链转账取款', 'value': 4},
          {'name': '跨链转账存款', 'value': 5},
          {'name': '跨链转账撤销', 'value': 6},
        ],
        tr_en: [
          {'name': 'Contract release', 'value': 1},
          {'name': 'Contract transaction', 'value': 2},
          {'name': 'Intra-chain trading', 'value': 3},
          {'name': 'Cross-chain transfer withdrawal', 'value': 4},
          {'name': 'Cross-chain transfer deposit', 'value': 5},
          {'name': 'Cross-chain transfer cancellation', 'value': 6},
        ],
        tr_ja: [
          {name: "全部", value: ""},
          {name: "契約解除", value: 1},
          {name: "契約取引", value: 2},
          {name: "チェーン内トランザクション", value: 3},
          {name: "クロスチェーン転送の引き出し", value: 4},
          {name: "クロスチェーン振込預金", value: 5},
          {name: "クロスチェーン転送キャンセル", value: 6}
        ],
        tr_ko: [
          {name: "모두", value: ""},
          {name: "계약 해제", value: 1},
          {name: "계약 거래", value: 2},
          {name: "인체 인 거래", value: 3},
          {name: "교차 체인 이체 인출", value: 4},
          {name: "교차 체인 이체 예금", value: 5},
          {name: "교차 체인 전송 취소", value: 6}
        ],
        chain_list: {},
      }
    },
    methods: {
      retrieve_data() {
        let data = this.$store.getters.home_search_tr_2
        getBlockNewTxPage(data).then(response => {
          this.all_data = response.data.transactionsList.dataList[0]
        })

      },
      tr_change_zh(e) {
        let a = ''
        this.tr_zh.forEach((item, index) => {
          if (e == item.value) {
            a = item.name
          }
        })
        return a
      },
      tr_change_en(e) {
        let a = ''
        this.tr_en.forEach((item, index) => {
          if (e == item.value) {
            a = item.name
          }
        })
        return a
      },
      chainid_change_zh(e) {
        let a = ''
        this.chain_list.zh_chain_arr.forEach((item, index) => {
          if (e == item.value) {
            a = item.label
          }
        })
        return a
      },
      chainid_change_en(e) {
        let a = ''
        this.chain_list.en_chain_arr.forEach((item, index) => {
          if (e == item.value) {
            a = item.label
          }
        })
        return a
      },
      chainid_change_ja(e) {
        let a = ''
        this.chain_list.ja_chain_arr.forEach((item, index) => {
          if (e == item.value) {
            a = item.label
          }
        })
        return a
      },
      chainid_change_ko(e) {
        let a = ''
        this.chain_list.ko_chain_arr.forEach((item, index) => {
          if (e == item.value) {
            a = item.label
          }
        })
        return a
      },
      tr_change_ja(e) {
        let a = ''
        this.tr_ja.forEach((item, index) => {
          if (e == item.value) {
            a = item.name
          }
        })
        return a
      },
      tr_change_ko(e) {
        let a = ''
        this.tr_ko.forEach((item, index) => {
          if (e == item.value) {
            a = item.name
          }
        })
        return a
      },
      to_block_details(e, q) {
        let data = {
          "height": e.toString(),
          "chainId": q.toString(),
          "page": 1,
          "pagesize": 10,
          "hash": '',
        }
        this.$store.dispatch('app/setCrosschainBlock_1', data).then(() => {
          this.$router.push({path: '/slicechain_blockdetails'})
        })
      }
    },
    created() {
      this.chain_list = this.getChainInfoStruct()
      if (this.$store.getters.language === 'en') {
        this.is_zh = 1
      } else if (this.$store.getters.language === 'zh') {
        this.is_zh = 0
      } else if (this.$store.getters.language === 'ja') {
        this.is_zh = 2
      } else if (this.$store.getters.language === 'ko') {
        this.is_zh = 3
      }
      this.retrieve_data()
    },
    computed: {
      lang() {
        return this.$store.getters.language;
      }
    },
    watch: {
      lang(a, b) {
        if (a == 'zh') {
          this.is_zh = 0
        } else if (a == 'en') {
          this.is_zh = 1
        } else if (a == 'ja') {
          this.is_zh = 2
        } else if (a == 'ko') {
          this.is_zh = 3
        }
      }
    }
  }
</script>
<style scoped>
  .state_success {
    color: #6DC542;
    font-size: 25px;
    position: relative;
    top: 3px;
  }

  .state_error {
    color: #F56C6C;
    font-size: 25px;
    position: relative;
    top: 3px;
  }

  .state_success_text {
    color: #6DC542
    /*font-size: 25px;*/
  }

  .state_error_text {
    color: #F56C6C;
  }

  .show_color {
    color: #800080;
  }

  .show_color_choose {
    color: #800080;
    cursor: pointer;
  }

  .ct_con {
    padding: 0 100px;
    margin-bottom: 80px;
  }

  .con_title {
    height: 25px;
    font-size: 18px;
    color: #800080;
    padding-bottom: 20px;
  }

  .ct_all_con_right_last::-webkit-scrollbar { /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .ct_all_con_right_last::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(218, 218, 218, 0.2);
    background: #b5b5b5;
  }

  .ct_all_con_right_last::-webkit-scrollbar-track { /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    background: #ffffff;
  }

  .ct_all_con_right_last {
    height: 100px;
    overflow: auto;
  }

  .ct_all_con_left_last {
    height: 100px;
  }

  .ct_all_con {
    display: flex;
    border-bottom: 1px solid #DCDFE6;
    padding: 0 15px;
  }

  .ct_all_con_left {
    width: 25%;
    line-height: 3;
    border-right: 1px solid #DCDFE6;
  }

  .ct_all_con_right {
    word-break: break-all;
    width: 75%;
    line-height: 3;
    padding: 0 15px;
  }

  .ct_all {
    width: 100%;
    border: 1px solid #DCDFE6;
    border-bottom: 0px;
    /*display: flex;*/
  }
</style>
