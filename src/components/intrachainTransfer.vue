<template>
  <div class="it_con">
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
    <div class="it_all">
      <div class="it_all_con">
        <div class="it_all_con_left">
          {{$t('table.transaction_hash')}}
        </div>
        <div class="it_all_con_right">
          {{all_data.hash}}
        </div>
      </div>
      <div class="it_all_con">
        <div class="it_all_con_left">
          {{$t('table.state')}}
        </div>
        <div class="it_all_con_right">
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
      <div class="it_all_con">
        <div class="it_all_con_left">
          {{$t('table.ov_block')}}
        </div>
        <div class="it_all_con_right show_color_choose">
          <span class="to_tr color_choose" @click="to_all_blocks(all_data.height,all_data.chainId)"
                v-show="is_zh==0">{{chainid_change_zh(all_data.chainId)+' > '+all_data.height}}</span>
          <span class="to_tr color_choose" @click="to_all_blocks(all_data.height,all_data.chainId)"
                v-show="is_zh==1">{{chainid_change_en(all_data.chainId)+' > '+all_data.height}}</span>
          <span class="to_tr color_choose" @click="to_all_blocks(all_data.height,all_data.chainId)"
                v-show="is_zh==2">{{chainid_change_ja(all_data.chainId)+' > '+all_data.height}}</span>
          <span class="to_tr color_choose" @click="to_all_blocks(all_data.height,all_data.chainId)"
                v-show="is_zh==3">{{chainid_change_ko(all_data.chainId)+' > '+all_data.height}}</span>
        </div>
      </div>
      <div class="it_all_con">
        <div class="it_all_con_left">
          {{$t('table.timestamp')}}
        </div>
        <div class="it_all_con_right ">
          <!--{{all_data.theDateString}}-->
          {{timestampToTime(all_data.timestamp)}}

        </div>
      </div>
      <div class="it_all_con">
        <div class="it_all_con_left">
          {{$t('table.transaction_type')}}
        </div>
        <div class="it_all_con_right">
          <span v-show="is_zh==0">{{tr_change_zh(all_data.txType)}}</span>
          <span v-show="is_zh==1">{{tr_change_en(all_data.txType)}}</span>
          <span v-show="is_zh==2">{{tr_change_ja(all_data.txType)}}</span>
          <span v-show="is_zh==3">{{tr_change_ko(all_data.txType)}}</span>
        </div>
      </div>
      <div class="it_all_con">
        <div class="it_all_con_left ">
          {{$t('table.issuer')}}
        </div>
        <div class="it_all_con_right show_color_choose" @click="to_address_details(all_data.chainId,all_data.from)">
          {{slice_address1(all_data.from)}}
        </div>
      </div>
      <div class="it_all_con">
        <div class="it_all_con_left ">
          {{$t('table.recipient')}}
        </div>
        <div class="it_all_con_right show_color_choose">
          <span class="to_tr color_choose" @click="to_address_details(all_data.chainId,all_data.to)">{{slice_address1(all_data.to)}}</span>
        </div>
      </div>
      <div class="it_all_con">
        <div class="it_all_con_left">
          {{$t('table.transfer_amount')}}
        </div>
        <div class="it_all_con_right">
          {{scientificCounting(all_data.value)}} TKM
        </div>
      </div>
      <div class="it_all_con">
        <div class="it_all_con_left">
          {{$t('table.transaction_fee')}}
        </div>
        <div class="it_all_con_right ">
          {{scientificCounting(all_data.gasFee)}} TKM
        </div>
      </div>
      <div class="it_all_con" v-show="all_data.chainId==2&&all_data.from=='0x1111111111111111111111111111111111111111'">
        <div class="it_all_con_left" style="line-height:12">
          {{$t('table.award_details')}}
        </div>
        <div class="it_all_con_right" style="line-height:1.5" v-show="is_zh==0">
          <p> 在 {{extraDetails.chain}} 链参与共识挖矿</p>
          <p> 处于第 {{extraDetails.turn}} 个委员会</p>
          <p> 处于该委员会期间共出块 {{extraDetails.block}} 个</p>
          <p> 参与第 {{extraDetails.epoch}} 个千块共识</p>
        </div>
        <div class="it_all_con_right" style="line-height:1.5" v-show="is_zh==1">
          <p> in {{extraDetails.chain}} Chain participation in consensus mining</p>
          <p> At first {{extraDetails.turn}} Committees</p>
          <p> Produced blocks while in the committee {{extraDetails.block}} Each</p>
          <p> Participation {{extraDetails.epoch}} Thousand consensus</p>
        </div>
        <div class="it_all_con_right" style="line-height:1.5" v-show="is_zh==2">
          <p> で {{extraDetails.chain}} コンセンサスマイニングへのチェーン参加</p>
          <p> 最初は {{extraDetails.turn}} 委員会</p>
          <p> 委員会にいる間に生産されたブロック {{extraDetails.block}} それぞれ</p>
          <p> 参加 {{extraDetails.epoch}} 千のコンセンサス</p>
        </div>
        <div class="it_all_con_right" style="line-height:1.5" v-show="is_zh==3">
          <p> 안으로 {{extraDetails.chain}} 컨센서스 마이닝에 체인 참여</p>
          <p> 처음에 {{extraDetails.turn}} 위원회</p>
          <p> 위원회에있는 동안 생산 된 블록 {{extraDetails.block}} 각각</p>
          <p> 참여 {{extraDetails.epoch}} 천의 합의</p>
        </div>
      </div>
      <div class="it_all_con">
        <div class="it_all_con_left it_all_con_left_last" style="line-height: 100px">
          {{$t('title.input_data')}}
        </div>

        <div class="it_all_con_right it_all_con_right_last" v-show="utf8_is">
          {{all_data.input}}
        </div>
        <div class="it_all_con_right it_all_con_right_last" v-show="!utf8_is">
          {{utf8_input(all_data.input)}}
        </div>
      </div>
    </div>
    <el-button type="primary" style="margin-left: 25%;margin-top: 20px" @click="utf8_input_tr()" v-show="utf8_is">
      {{$t('table.convert_text')}}
    </el-button>
    <el-button type="primary" style="margin-left: 25%;margin-top: 20px" @click="utf8_input_tr()" v-show="!utf8_is">
      {{$t('table.raw_data')}}
    </el-button>
  </div>
</template>

<script>
  import {
    getBlockNewTxPage,

  } from '../api/interface'

  export default {
    name: "intrachainTransfer",
    data() {
      return {
        is_success: true,
        extraDetails: {
          chain: '',
          turn: '',
          block: '',
          epoch: '',
        },
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
        utf8_is: true,

      }
    },
    methods: {
      utf8_input_tr() {
        this.utf8_is = !this.utf8_is
      },
      initialization_data() {
        let data = this.$store.getters.home_search_tr_1
        getBlockNewTxPage(data).then(response => {
          this.all_data = response.data.transactionsList.dataList[0]
          this.extraDetails = this.all_data.extraDetails
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
      to_all_blocks(e, q) {
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
      },
      to_address_details(id, address) {
        let data = {"chainId": id, "address": address}
        this.$store.dispatch('app/setAddressDetails', data).then(() => {
          this.$router.push({path: '/address_details'})
        })
      },
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
      this.initialization_data()
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

  .it_con {
    width: 100%;
    margin-bottom: 80px;
  }

  .con_title {
    height: 25px;
    font-size: 18px;
    color: #800080;
    padding-bottom: 20px;
  }

  .it_all_con_right_last::-webkit-scrollbar { /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .it_all_con_right_last::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(218, 218, 218, 0.2);
    background: #b5b5b5;
  }

  .it_all_con_right_last::-webkit-scrollbar-track { /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    background: #ffffff;
  }

  .it_all_con_right_last {
    max-height: 300px;
    overflow: auto;
  }

  .it_all_con_left_last {
    height: 100px;
  }

  .it_all_con {
    display: flex;
    border-bottom: 1px solid #DCDFE6;
    padding: 0 15px;
  }

  .it_all_con_left {
    width: 25%;
    line-height: 3;
    border-right: 1px solid #DCDFE6;
  }

  .it_all_con_right {
    word-break: break-all;
    width: 75%;
    line-height: 3;
    padding: 0 15px;
  }

  .it_all {
    width: 100%;
    border: 1px solid #DCDFE6;
    border-bottom: 0px;
    /*display: flex;*/
  }
</style>
