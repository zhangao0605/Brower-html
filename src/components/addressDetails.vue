<template>
  <div class="sbh_con">
    <div class="con_title">
      {{$t('title.blockchain_details')}}
    </div>
    <div class="con_title" style="font-size: 17px">
      {{$t('title.address_de')}}： <span style="color: #82848a;margin-left: 20px">{{slice_address1(get_data.address)}}</span>
    </div>
    <div class="con_title" style="font-size: 17px">
      {{$t('title.amount')}}： <span style="color: #82848a;margin-left: 50px">{{scientificCounting(account_data.balances)}} <span>TKM</span></span>
    </div>
    <div class="con_title" style="font-size: 17px;padding-bottom: 0">
      {{$t('table.ac_any_other')}}：
    </div>
    <div class="dd_all">
      <div class="ad_amount">
        <div class="ad_amount_deail">
          <div   :class="[{'ad_amount_deail_left':true}]" v-for="item,index in account_data.details">
            <div >
              <span class="to_tr"style="color: #800080;" v-show="is_zh==0">{{chainid_change_zh(item.chainId)}}</span>
              <span class="to_tr"style="color: #800080;" v-show="is_zh==1">{{chainid_change_en(item.chainId)}}</span><br>
              <span class="to_tr"style="color: #800080;" v-show="is_zh==2">{{chainid_change_ja(item.chainId)}}</span><br>
              <span class="to_tr"style="color: #800080;" v-show="is_zh==3">{{chainid_change_ko(item.chainId)}}</span><br>
              <span>{{item.balance==''?0:scientificCounting(item.balance)}} TKM</span>
            </div>
          </div>
          <!--<div class="ad_amount_deail_right">-->
          <!---->
          <!--</div>-->
        </div>

      </div>


    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%;margin-bottom: 30px;margin-top: 30px;min-height: 529px"
      :header-cell-style="this.tableHeaderColor"
    >
      <el-table-column
        :label="$t('table.transaction_hash')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr show_color_choose"
                @click="see_trfor_hash(scope.row.chainId,scope.row.txType,scope.row.hash)">{{slice_hash(scope.row.hash)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.timestamp')"
        align="center">
        <template slot-scope="scope">
          <span>{{timestampToTime(scope.row.timestamp)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.transaction_type')"
        align="center">
        <template slot-scope="scope">
          <span v-show="is_zh==0">{{tr_change_zh(scope.row.txType)}}</span>
          <span v-show="is_zh==1">{{tr_change_en(scope.row.txType)}}</span>
          <span v-show="is_zh==2">{{tr_change_ja(scope.row.txType)}}</span>
          <span v-show="is_zh==3">{{tr_change_ko(scope.row.txType)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.initiator')"
        align="center">
        <template slot-scope="scope">
          <span :class="is_click(scope.row.txType,scope.row.from)"
                @click="view_initiator(scope.row.chainId,scope.row.from,scope.row.txType)">{{slice_address(scope.row.from)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.receiver')"
        align="center">
        <template slot-scope="scope">
          <span :class="is_click_1(scope.row.txType,scope.row.to)"
                @click="view_recipient(scope.row.chainId,scope.row.to,scope.row.txType)">{{slice_address(scope.row.to)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.transfer_amount')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr ">{{scientificCounting(scope.row.value)}} TKM</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.transaction_fee')"
        align="center">
        <template slot-scope="scope">
          <span>{{scientificCounting(scope.row.gasFee)}} TKM</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="currentPageChange"
      :current-page="currentPage"
      :page-size="pagesize"
      layout="prev, pager, next"
      :total="totla">
    </el-pagination>
  </div>
</template>

<script>
  import {
    getBlockTxByAddress,
    getAccountByAddress,
  } from '../api/interface'

  export default {
    name: "addressDetails",
    data() {
      return {
        currentPage: 1,
        pagesize: 10,
        totla: 0,
        tableData: [],
        chain_data: '',
        loading: false,
        chain_list: {},
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
        ],  tr_ja: [
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
        get_data: '',
        account_data: ''
      }
    },
    methods: {
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
      currentPageChange(e) {
        this.currentPage = e
        this.loading = true
        let data = {
          "chainId": this.get_data.chainId.toString(),
          "address": this.get_data.address,
          "page": this.currentPage,
          "pagesize": 10
        }
        getBlockTxByAddress(data).then(response => {
          this.loading = false
          this.tableData = response.data.transactionsList.dataList
          this.totla = response.data.transactionsList.total
        })
      },
      getAccountByAddress() {
        let data = {"chainId": this.get_data.chainId.toString(), "address": this.get_data.address}
        getAccountByAddress(data).then(response => {
          // response.data.details=response.data.details.concat(response.data.details)
          this.account_data = response.data
        })
      },
      getBlockTxByAddress() {
        this.loading = true
        let data = {
          "chainId": this.get_data.chainId.toString(),
          "address": this.get_data.address,
          "page": 1,
          "pagesize": 10
        }
        getBlockTxByAddress(data).then(response => {
          this.loading = false
          this.tableData = response.data.transactionsList.dataList
          this.totla = response.data.transactionsList.total
        })
      },
      view_initiator(e, q, w) {
        if (w == 1) {
        } else if (q == this.get_data.address) {
        } else {
          let data = {"chainId": e.toString(), "address": q}
          this.$store.dispatch('app/setAddressDetails', data).then(() => {
            this.$router.push({path: '/address_details'})
            this.get_data = this.$store.getters.address_details
          })
          getAccountByAddress(data).then(response => {
            this.account_data = response.data
          })
          this.loading = true
          let data1 = {
            "chainId": e.toString(),
            "address": q,
            "page": 1,
            "pagesize": 10
          }
          getBlockTxByAddress(data1).then(response => {
            this.loading = false
            this.tableData = response.data.transactionsList.dataList
            this.totla = response.data.transactionsList.total
          })
        }

      },
      view_recipient(e, q, w) {
        if (w == 1) {
        }
        else if (w == 2) {
          let data = {"chainId": e.toString(), "contract": q}
          this.$store.dispatch('app/setContractDetails', data).then(() => {
            this.$router.push({path: '/contract_details'})
          })
        }
        else if (w == 3) {
          if (q == this.get_data.address) {
          } else {
            let data = {"chainId": e.toString(), "address": q}
            this.$store.dispatch('app/setAddressDetails', data).then(() => {
              this.$router.push({path: '/address_details'})
              this.get_data = this.$store.getters.address_details
            })
            getAccountByAddress(data).then(response => {
              this.account_data = response.data
            })
            this.loading = true
            let data1 = {
              "chainId": e.toString(),
              "address": q,
              "page": 1,
              "pagesize": 10
            }
            getBlockTxByAddress(data1).then(response => {
              this.loading = false
              this.tableData = response.data.transactionsList.dataList
              this.totla = response.data.transactionsList.total
            })
          }
        }
        else if (w == 4 || w == 5 || w == 6) {
          let data = {"chainId": e.toString(), "address": q}
          this.$store.dispatch('app/setCrossChainContract', data).then(() => {
            this.$router.push({path: '/crosschain_contract'})
          })
        }
      },
      is_click(e, q) {
        let a = ''
        if (e == 3) {
          if (q == this.get_data.address) {
            a = 'to_tr'
          } else {
            a = 'to_tr show_color_choose'
          }
        } else {
          a = 'to_tr'
        }
        return a
      },
      is_click_1(e, q) {
        let a = ''
        if (e == 1) {
          a = 'to_tr'
        } else if (e == 4 || e == 5 || e == 6 || e == 2) {
          a = 'to_tr show_color_choose'
        } else if (e == 3) {
          if (q == this.get_data.address) {
            a = 'to_tr'
          } else {
            a = 'to_tr show_color_choose'
          }
        }
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
      see_trfor_hash(id, type, hash) {
        let data = {
          'page': 1,
          'chainId': id.toString(),
          'hash': hash,
          'pagesize': 5,
        }
        if (type == 3) {
          this.$store.dispatch('app/setSearchTr1', data).then(() => {
            this.$router.push({path: '/intrachain_transfer'})
          })
        }
        else if (type == 2) {
          this.$store.dispatch('app/setSearchTr3', data).then(() => {
            this.$router.push({path: '/contract_transaction'})
          })
        }
        else if (type == 1) {
          this.$store.dispatch('app/setSearchTr4', data).then(() => {
            this.$router.push({path: '/contract_release'})
          })
        }
        else if (type == 4) {
          this.$store.dispatch('app/setSearchTr2', data).then(() => {
            this.$router.push({path: '/transfer_withdrawal'})
          })
        }
        else if (type == 5) {
          this.$store.dispatch('app/setSearchTr5', data).then(() => {
            this.$router.push({path: '/transfer_deposit'})
          })
        }
        else if (type == 6) {
          this.$store.dispatch('app/setSearchTr6', data).then(() => {
            this.$router.push({path: '/transfer_cancellation'})
          })
        }


      },
    },
    created() {
      this.get_data = this.$store.getters.address_details
      if (this.$store.getters.language === 'en') {
        this.is_zh = 1
      } else if (this.$store.getters.language === 'zh') {
        this.is_zh = 0
      } else if (this.$store.getters.language === 'ja') {
        this.is_zh = 2
      } else if (this.$store.getters.language === 'ko') {
        this.is_zh = 3
      }
      this.chain_list = this.getChainInfoStruct()
      this.getAccountByAddress()
      this.getBlockTxByAddress()
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
  .el-pagination {
    position: relative;
    float: right;
    margin-right: 3%;
    margin-top: 30px;
  }

  .show_color_choose {
    color: #800080;
    cursor: pointer;
  }

  .ad_amount_deail_right {
    width: 80%;
    text-align: center;
  }

  .ad_amount_deail_left {
    /*text-indent: 30px;*/
    width: 22.5%;
    margin-left: 2%;
    text-align: center;
    border: 1px solid #DCDFE6;
    margin-top: 20px;

  }
  .dd_bor{
    border-right: 1px solid #DCDFE6;
  }
  .ad_amount {
    width: 100%;

    /*border: 1px solid #DCDFE6;*/
    border-bottom: none;
    /*height: 200px;*/
  }

  .ad_amount_deail {
    width: 100%;
    line-height: 3;
    display: flex;
    flex-wrap: wrap;

    /*border-bottom: 1px solid #DCDFE6;*/
  }
  .ma_left{
   margin-left: 0;
  }
  .dd_all{
    /*border-bottom: 1px solid #DCDFE6;*/
  }

  .sbh_con {
    width: 100%;
    margin-bottom: 180px;
  }

  .con_title {
    height: 25px;
    font-size: 18px;
    color: #800080;
    padding-bottom: 20px;
  }
</style>
