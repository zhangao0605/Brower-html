<template>
  <div class="hc_con">
    <div class="con_title">
      {{$t("title.blockchain_details")}}
    </div>
    <div class="hc_search">
      <div class="hc_search1_1">
        <div class="hc_search1_1_top">
          <div class="hc_search1_1_top_title"> {{$t("title.block_details_query")}}</div>
        </div>
        <div class="hc_search2_1">
          <div class="hc_search2_1_input">
            <!--<span class="el-icon-search hc_search2_1_input_icon"></span>-->
            <el-input @input="handinput()" v-model="search_height"
                      :placeholder="$t('placeholder.placeholder_1')"></el-input>
          </div>
          <el-button type="primary" class="hc_search_submit" @click="go_search_height()">{{$t("placeholder.search")}}
          </el-button>
        </div>
      </div>
      <div class="hc_search1_2">
        <div class="hc_search1_1_top">
          <div class="hc_search1_1_top_title">{{$t("title.transaction_details_inquiry")}}</div>
          <div>
          </div>
        </div>
        <div class="hc_search2_1">
          <div class="hc_search2_1_input">
            <!--<span class="el-icon-search hc_search2_1_input_icon"></span>-->
            <el-input v-model="search_transaction" :placeholder="$t('placeholder.placeholder_2')"></el-input>
          </div>
          <el-button type="primary" class="hc_search_submit" @click="go_search_tr()">{{$t("placeholder.search")}}
          </el-button>
        </div>
      </div>
    </div>
    <div class="hc_tishi">
      {{$t("prompt.prompt_1")}}
    </div>
    <div class="chain_part">
      <div class="chain_part_item">
        <div class="chain_part_padding">
          <div class="chain_part_item_title">
            {{$t("title.main_chain")}}
          </div>
          <div class="chain_part_item_img">
            <div class="chain_part_item_text">
              {{chain_info.mainChainCount}}
            </div>
          </div>
        </div>
      </div>
      <div class="chain_part_item">
        <div class="chain_part_padding">
          <div class="chain_part_item_title">
            {{$t("title.task_chain")}}
          </div>
          <div class="chain_part_item_img_1">
            <div class="chain_part_item_text">
              {{chain_info.childrensCount}}
            </div>
          </div>
        </div>
      </div>
      <div class="chain_part_item">
        <div class="chain_part_padding">
          <div class="chain_part_item_title">
            {{$t("title.trading_chain")}}
          </div>
          <div class="chain_part_item_img_2">
            <div class="chain_part_item_text">
              {{chain_info.childrensSon}}
            </div>
          </div>
        </div>
      </div>
      <div class="chain_part_item">
        <div class="chain_part_padding">
          <div class="chain_part_item_title">
            {{$t("title.data_node")}}
          </div>
          <div class="chain_part_item_img_3">
            <div class="chain_part_item_text">
              {{chain_info.dataNodeCount}}
            </div>
          </div>
        </div>
      </div>
      <div class="chain_part_item">
        <div class="chain_part_padding">
          <div class="chain_part_item_title">
            {{$t("title.consensus_node")}}
          </div>
          <div class="chain_part_item_img_4">
            <div class="chain_part_item_text">
              {{chain_info.commonCount}}
            </div>
          </div>
        </div>
      </div>

    </div>
    <!--<div class="block_related">-->
    <!--<div class="block_related_item_1">-->
    <!--<div class="block_related_item_padding">-->
    <!--<div class="chain_part_item_title">-->
    <!--{{$t("title.network_market_value")}}-->
    <!--</div>-->
    <!--<div class="chain_part_item_img_6">-->
    <!--<div class="chain_part_item_text_1">-->
    <!--$ {{NewTickers_2}} {{$t("title.billion")}}-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->

    <!--<div class="block_related_item_2">-->
    <!--<div class="block_related_item_padding">-->
    <!--<div class="chain_part_item_title">-->

    <!--{{$t("title.total_online_transaction_volume")}}-->
    <!--</div>-->
    <!--<div id="echats_2" style="width:110%;height:100%">-->

    <!--</div>-->
    <!--</div>-->
    <!--</div>-->

    <!--<div class="block_related_item_3">-->
    <!--<div class="block_related_item_padding">-->
    <!--<div class="chain_part_item_title">-->
    <!--TPS-->
    <!--</div>-->
    <!--<div id="echats_1" style="width:120%;height:120%">-->

    <!--</div>-->
    <!--</div>-->

    <!--</div>-->
    <!--</div>-->
    <div class="hc_overview hc_overview_1">
      <div>
        <span style="display: inline-block;line-height: 80px;font-size: 18px" class="color_choose"
              @click='to_main_chain_interface()'>{{$t("title.main_chain")}}</span>
      </div>
      <div>
        <span class="hc_overview_he">{{$t("title.block_height")}}</span><br/>
        <br/>
        <span class="color_choose"
              @click="click_main_height(chain_data.currentheight)">{{chain_data.currentheight||0}}</span>
      </div>
      <!--<div style="border-right:1px solid #DCDFE6 ">-->
      <!--<span class="hc_overview_he">{{$t("title.current_committee_member")}}</span>-->
      <!--<br/>-->
      <!--<br/>-->
      <!--<span class="color_choose" @click="to_main_chaincommittee(0,0)">{{chain_data.currentcomm}}</span>-->
      <!--</div>-->
      <div style="border-right:1px solid #DCDFE6 ">
        <span
          class="hc_overview_he">{{$t("title.number_of_sub_chains")}}</span>
        <br/>
        <br/>
        <span class="">{{chain_data.ChildrenCount||0}}</span>
      </div>
      <!--<div>-->
      <!--<span class="hc_overview_he">{{$t("title.miner")}}</span>-->
      <!--<br/>-->
      <!--<br/>-->
      <!--<span class="color_choose">{{slice_hash(chain_data.miner)||''}}</span>-->
      <!--</div>-->
    </div>
    <div class="con_title ">
      {{$t("title.split_subchain")}}
    </div>
    <el-table
      :data="chainStatA"
      border
      style="width: 100%;margin-bottom: 30px"
      :header-cell-style="this.tableHeaderColor"
    >
      <el-table-column
        :label="$t('table.subchain_id')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr color_choose" v-show="is_zh==0" @click="to_subchain_interface(scope.row.chainId)">{{chainid_change_zh(scope.row.chainId)}}</span>
          <span class="to_tr color_choose" v-show="is_zh==1" @click="to_subchain_interface(scope.row.chainId)">{{chainid_change_en(scope.row.chainId)}}</span>
          <span class="to_tr color_choose" v-show="is_zh==2" @click="to_subchain_interface(scope.row.chainId)">{{chainid_change_ja(scope.row.chainId)}}</span>
          <span class="to_tr color_choose" v-show="is_zh==3" @click="to_subchain_interface(scope.row.chainId)">{{chainid_change_ko(scope.row.chainId)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.block_height')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr color_choose" @click="click_slice_height(0,scope.row.chainId,scope.row.currentheight)">{{scope.row.currentheight}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column-->
      <!--:label="$t('table.current_committee_member')"-->
      <!--align="center">-->
      <!--<template slot-scope="scope">-->
      <!--<span class="to_tr color_choose" @click="to_main_chaincommittee(1,scope.row.chainId)">{{scope.row.currentcomm}}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        :label="$t('table.number_of_fragments')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr ">{{scope.row.ChildrenCount}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.total_share_of_its_segmented_chain')"
        align="center"
        width="350"
      >
        <template slot-scope="scope">
          <span class="to_tr ">{{scope.row.ChildrenTxcount}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column-->
      <!--:label="$t('table.miner')"-->
      <!--align="center">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{slice_hash(scope.row.miner)}}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <div class="con_title ">
      {{$t("title.unfragmented_subchain")}}
    </div>
    <el-table
      :data="chainStatB"
      border
      style="width: 100%;margin-bottom: 30px"
      :header-cell-style="this.tableHeaderColor"
    >
      <el-table-column
        :label="$t('table.subchain_id')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr color_choose" v-show="is_zh==0" @click="to_unfragmented_interface(scope.row.chainId)">{{chainid_change_zh(scope.row.chainId)}}</span>
          <span class="to_tr color_choose" v-show="is_zh==1" @click="to_unfragmented_interface(scope.row.chainId)">{{chainid_change_en(scope.row.chainId)}}</span>
          <span class="to_tr color_choose" v-show="is_zh==2" @click="to_unfragmented_interface(scope.row.chainId)">{{chainid_change_ja(scope.row.chainId)}}</span>
          <span class="to_tr color_choose" v-show="is_zh==3" @click="to_unfragmented_interface(scope.row.chainId)">{{chainid_change_ko(scope.row.chainId)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.block_height')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr color_choose" @click="click_slice_height(1,scope.row.chainId,scope.row.currentheight)">{{scope.row.currentheight}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column-->
      <!--:label="$t('table.current_committee_member')"-->
      <!--align="center">-->
      <!--<template slot-scope="scope">-->
      <!--<span class="to_tr color_choose" @click="to_Unfragmented_chaincommittee(scope.row.chainId)">{{scope.row.currentcomm}}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        :label="$t('table.trading_volume')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr ">{{scope.row.txcount}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column-->
      <!--:label="$t('table.miner')"-->
      <!--align="center">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{slice_hash(scope.row.miner)}}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <div class="con_title ">
      {{$t("title.trading_information")}}
    </div>
    <el-table
      :data="tr_data"
      border
      style="width: 100%;margin-bottom: 30px;min-height: 529px"
      :header-cell-style="this.tableHeaderColor"
    >
      <el-table-column
        :label="$t('table.transaction_hash')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr color_choose"
                @click="see_transaction_information(scope.row.chainId,scope.row.txType,scope.row.hash)">{{slice_hash(scope.row.hash)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.own_chain')"
        align="center">
        <template slot-scope="scope">
          <span class="to_tr color_choose" v-show="is_zh==0" @click="to_unfragmented_interface(scope.row.chainId)">{{chainid_change_zh(scope.row.chainId)}}</span>
          <span class="to_tr color_choose" v-show="is_zh==1" @click="to_unfragmented_interface(scope.row.chainId)">{{chainid_change_en(scope.row.chainId)}}</span>
          <span class="to_tr color_choose" v-show="is_zh==2" @click="to_unfragmented_interface(scope.row.chainId)">{{chainid_change_ja(scope.row.chainId)}}</span>
          <span class="to_tr color_choose" v-show="is_zh==3" @click="to_unfragmented_interface(scope.row.chainId)">{{chainid_change_ko(scope.row.chainId)}}</span>
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
          <span class="to_tr color_choose"
                @click="to_address_interface(0,scope.row.chainId,scope.row.from,scope.row.txType)">{{slice_address(scope.row.from)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.receiver')"
        align="center">
        <template slot-scope="scope">
          <span :class="scope.row.txType==1?'to_tr':'to_tr color_choose'"
                @click="to_address_interface(1,scope.row.chainId,scope.row.to,scope.row.txType)">{{slice_address(scope.row.to)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.transfer_amount')"
        align="center">
        <template slot-scope="scope">
          <span>{{scientificCounting(scope.row.value)}} TKM</span>
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
    <el-button style="width: 100%;margin-bottom: 50px;margin-top: 20px" type="primary"
               @click="to_transaction_information()">
      {{$t("title.see_more_deals")}}
    </el-button>
  </div>

</template>
<script>
  import {
    getMainPageInfo,
    getMainChainStat,
    getChainStatByType,
    getBlockNewTxPage,
    getBlockDataByPage,
    getMainPageChainInfo,
    getNewTickers,
    getMainPageTxByDay
  } from '../../api/interface'
  import echarts from 'echarts'

  export default {
    name: "idnex",
    data() {
      return {
        search_height: '',
        search_transaction: '',
        marke: '',
        chain_data: '',
        chainStatA: [],
        chainStatB: [],
        tr_data: [],
        loading: false,
        loading1: false,
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
        set_sta: '',
        chain_info: '',
        chain_market_info: [],
        NewTickers_1: 0,
        NewTickers_2: 0
      }
    },
    methods: {

      getTickers() {
        getNewTickers().then(response => {
          this.NewTickers_1 = response.data.priceInfo
        })
      },
      getMainChainStat() {
        let data = {"chainId": '0'}
        getMainChainStat(data).then(response => {
          this.chain_data = response.data
          this.chain_data.currentcomm = this.chain_data.currentcomm.length

        })
      },
      getChainStatByType() {
        this.loading = true
        getChainStatByType().then(response => {
          this.chainStatA = response.data.chainStatA
          this.chainStatB = response.data.chainStatB
          this.chainStatA.forEach((item, index, self) => {
            self[index].currentcomm = self[index].currentcomm.length
          })
          this.chainStatB.forEach((item, index, self) => {
            self[index].currentcomm = self[index].currentcomm.length
          })
          this.loading = false
        })
      },
      getBlockNewTxPage() {
        this.loading1 = true
        let data = {
          'page': 1,
          'chainId': '',
          'hash': '',
          'pagesize': 10,
        }
        getBlockNewTxPage(data).then(response => {
          this.tr_data = response.data.transactionsList.dataList
          this.loading1 = false
        })
      },
      go_search_height() {
        if (this.search_height == '') {
          if (this.$store.getters.language == 'en') {
            this.$message.error('The query block height cannot be empty!');
          } else if (this.$store.getters.language == 'zh') {
            this.$message.error('查询区块高度不能为空！');
          }else if (this.$store.getters.language == 'ja') {
            this.$message.error('クエリブロックの高さは空にできません！');
          }else if (this.$store.getters.language == 'ko') {
            this.$message.error('쿼리 블록 높이는 비워 둘 수 없습니다！');
          }

        } else {
          let data = {
            "height": this.search_height,
            "chainId": '',
            "page": 1,
            "pagesize": 10,
            "hash": '',
          }
          getBlockDataByPage(data).then(response => {
            if (response.data.dataList.length == 0) {
              if (this.$store.getters.language == 'en') {
                this.$message.error('The current block height query result is empty, please check and enter again!');
              } else if (this.$store.getters.language == 'zh') {
                this.$message.error('当前区块高度查询结果为空，请检查后再次输入！');
              }else if (this.$store.getters.language == 'ja') {
                this.$message.error('現在のブロックの高さのクエリ結果は空です。チェックした後にもう一度入力してください！');
              }else if (this.$store.getters.language == 'ko') {
                this.$message.error('현재 블록 높이 쿼리 결과가 비어 있습니다. 확인 후 다시 입력하십시오！');
              }

            } else {
              this.$store.dispatch('app/setSearchHeight', data).then(() => {
                this.$router.push({path: '/search_blockheight'})
              })
            }
          })
        }

      },
      go_search_tr() {
        if (this.search_transaction == '') {
          if (this.$store.getters.language == 'en') {
            this.$message.error('Query transaction details transaction hash/account address cannot be empty!');
          } else if(this.$store.getters.language == 'zh') {
            this.$message.error('查询交易详情账户详情不能为空！');
          }else if(this.$store.getters.language == 'ja') {
            this.$message.error('取引の詳細のクエリアカウントの詳細は空にできません！');
          }else if(this.$store.getters.language == 'ko') {
            this.$message.error('거래 세부 정보 조회 계정 세부 사항은 비워 둘 수 없습니다.！');
          }

        } else {
          if (this.search_transaction.length == 35) {
            let adress16 = this.to_16_decimal(this.search_transaction)
            let data = {"chainId": '', "address": adress16}
            this.$store.dispatch('app/setAddressDetails', data).then(() => {
              this.$router.push({path: '/address_details'})
            })
          } else {
            let data = {
              'page': 1,
              'chainId': '',
              'hash': this.search_transaction,
              'pagesize': 5,
            }
            getBlockNewTxPage(data).then(response => {
              if (response.data.transactionsList.dataList.length == 0) {
                if (this.$store.getters.language == 'en') {
                  this.$message.error('The current transaction details transaction hash/account address query result is empty, please check and enter again!');
                } else if(this.$store.getters.language == 'zh')  {
                  this.$message.error('当前交易详情账户详情查询结果为空，请检查后再次输入！');
                }else if(this.$store.getters.language == 'ja') {
                  this.$message.error('現在の取引の詳細アカウントの詳細のクエリ結果は空です。もう一度確認して入力してください！');
                }else if(this.$store.getters.language == 'ko') {
                  this.$message.error('현재 거래 세부 정보 계정 세부 사항 조회 결과가 비어 있습니다. 확인 후 다시 입력하십시오.！');
                }
              } else {
                if (response.data.transactionsList.dataList[0].txType == 3) {
                  this.$store.dispatch('app/setSearchTr1', data).then(() => {
                    this.$router.push({path: '/intrachain_transfer'})
                  })
                } else if (response.data.transactionsList.dataList[0].txType == 2) {
                  this.$store.dispatch('app/setSearchTr3', data).then(() => {
                    this.$router.push({path: '/contract_transaction'})
                  })
                } else if (response.data.transactionsList.dataList[0].txType == 1) {
                  this.$store.dispatch('app/setSearchTr4', data).then(() => {
                    this.$router.push({path: '/contract_release'})
                  })
                } else if (response.data.transactionsList.dataList[0].txType == 4) {
                  this.$store.dispatch('app/setSearchTr2', data).then(() => {
                    this.$router.push({path: '/transfer_withdrawal'})
                  })
                } else if (response.data.transactionsList.dataList[0].txType == 5) {
                  this.$store.dispatch('app/setSearchTr5', data).then(() => {
                    this.$router.push({path: '/transfer_deposit'})
                  })
                } else if (response.data.transactionsList.dataList[0].txType == 6) {
                  this.$store.dispatch('app/setSearchTr6', data).then(() => {
                    this.$router.push({path: '/transfer_cancellation'})
                  })
                }
              }
            })
          }

        }
      },
      handinput() {
        if (/[^\d]/.test(this.search_height)) {
          this.search_height = this.search_height.replace(/[^\d]/g, '');
        }
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
      to_main_chain_interface() {
        this.$router.push({path: '/main_chain'})
      },
      click_main_height(e) {
        let data = {
          "height": e.toString(),
          "chainId": '0',
          "page": 1,
          "pagesize": 10,
          "hash": '',
        }
        this.$store.dispatch('app/setCrosschainBlock', data).then(() => {
          this.$router.push({path: '/mainchain_blockdetails'})
        })
      },
      click_slice_height(e, q, w) {
        if (e == 0) {
          let data = {
            "height": w.toString(),
            "chainId": q.toString(),
            "pagesize": 10,
            "hash": '',
          }
          this.$store.dispatch('app/setCrosschainBlock', data).then(() => {
            this.$router.push({path: '/mainchain_blockdetails'})
          })
        } else {
          let data = {
            "height": w.toString(),
            "chainId": q.toString(),
            "pagesize": 10,
            "hash": '',
          }
          this.$store.dispatch('app/setCrosschainBlock_1', data).then(() => {
            this.$router.push({path: '/slicechain_blockdetails'})
          })

        }

      },
      to_main_chaincommittee(e, q) {
        if (e == 0) {
          let data = {"chainId": '0', "epoch": ''}
          this.$store.dispatch('app/setMainChaincommittee', data).then(() => {
            this.$router.push({path: '/mainchain_committee'})
          })
        } else {
          let data = {"chainId": q.toString(), "epoch": ''}
          this.$store.dispatch('app/setMainChaincommittee', data).then(() => {
            this.$router.push({path: '/mainchain_committee'})
          })
        }

      },
      to_Unfragmented_chaincommittee(e) {
        let data = {"chainId": e.toString(), "epoch": ''}
        this.$store.dispatch('app/setUnmainChaincommittee', data).then(() => {
          this.$router.push({path: '/fragmentchain_committee'})
        })
      },
      to_subchain_interface(e) {
        let data = {"chainId": e.toString()}
        this.$store.dispatch('app/setFragmentedDetails', data).then(() => {
          this.$router.push({path: '/split_subchain'})
        })
      },
      to_unfragmented_interface(e) {
        let data = {"chainId": e.toString()}
        this.$store.dispatch('app/setUnfragmentedDetails', data).then(() => {
          this.$router.push({path: '/unfragmented_subchain'})
        })
      },
      to_address_interface(peo, id, address, type) {
        if (peo == 0) {
          let data = {"chainId": id.toString(), "address": address}
          this.$store.dispatch('app/setAddressDetails', data).then(() => {
            this.$router.push({path: '/address_details'})
          })
        } else {
          if (type == 1) {

          } else if (type == 2) {
            let data = {"chainId": id.toString(), "address": address}
            this.$store.dispatch('app/setContractDetails', data).then(() => {
              this.$router.push({path: '/contract_details'})
            })
          } else if (type == 3) {
            let data = {"chainId": id.toString(), "address": address}
            this.$store.dispatch('app/setAddressDetails', data).then(() => {
              this.$router.push({path: '/address_details'})
            })
          } else if (type == 4 || type == 5 || type == 6) {
            let data = {"chainId": id.toString(), "address": address}
            this.$store.dispatch('app/setCrossChainContract', data).then(() => {
              this.$router.push({path: '/crosschain_contract'})
            })
          }
        }

      },
      to_transaction_information() {
        let data = {
          "chainId": "",
          "page": 1,
          "hash": "",
          "pagesize": 10
        }
        this.$store.dispatch('app/setMainChaintotr', data).then(() => {
          this.$router.push({path: '/trading_information'})
        })
      },
      see_transaction_information(id, type, hash) {
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
        } else if (type == 2) {
          this.$store.dispatch('app/setSearchTr3', data).then(() => {
            this.$router.push({path: '/contract_transaction'})
          })
        } else if (type == 1) {
          this.$store.dispatch('app/setSearchTr4', data).then(() => {
            this.$router.push({path: '/contract_release'})
          })
        } else if (type == 4) {
          this.$store.dispatch('app/setSearchTr2', data).then(() => {
            this.$router.push({path: '/transfer_withdrawal'})
          })
        } else if (type == 5) {
          this.$store.dispatch('app/setSearchTr5', data).then(() => {
            this.$router.push({path: '/transfer_deposit'})
          })
        } else if (type == 6) {
          this.$store.dispatch('app/setSearchTr6', data).then(() => {
            this.$router.push({path: '/transfer_cancellation'})
          })
        }


      },
      timed_refresh() {
        let _this = this
        this.set_sta = setInterval(function () {
          _this.getMainChainStat()
          _this.getChainStatByType()
          _this.getBlockNewTxPage()
        }, 10000)
      },
      chain_related_quantity() {
        getMainPageChainInfo().then(response => {
          this.chain_info = response.data
        })
      },
    }
    ,
    computed: {
      lang() {
        if (this.$store.getters.language == 'zh') {
          this.NewTickers_2 = this.NewTickers_1
        } else {

          this.NewTickers_2 = (Number(this.NewTickers_1) / 10).toFixed(3)
        }
        return this.NewTickers_2;
      },
      lang_1() {
        return this.$store.getters.language;
      }
    }
    ,
    created() {
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
      // this.getMainPageInfo()
      this.getMainChainStat()
      this.getChainStatByType()
      this.getBlockNewTxPage()
      this.timed_refresh()
      this.chain_related_quantity()
      // this.chain_market_related()
      // this.getTickers()

    },
    watch: {
      lang_1(a, b) {
        if (a == 'zh') {
          this.is_zh = 0
        } else if (a == 'en') {
          this.is_zh = 1
        } else if (a == 'ja') {
          this.is_zh = 2
        } else if (a == 'ko') {
          this.is_zh = 3
        }
      },
      lang(a, b) {

      }
    },
    beforeDestroy() {
      let _this = this
      clearInterval(_this.set_sta)
    }
  }
</script>
<style>
  .hc_con .hc_search2_1 .hc_search2_1_input input {
    /*text-indent: 30px;*/
  }
</style>
<style scoped>
  #echats_1 {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    position: relative;
    left: -10%;
    top: -12%;
  }

  #echats_2 {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    position: relative;
    /*left: -10%;*/
    top: -8%;
  }

  .block_related {
    width: 100%;
    padding-bottom: 40px;
    display: flex;
    justify-content: space-between;
  }

  .chain_part_item_img {
    background: url("../../assets/images/circle_1.png") no-repeat;
    background-position: center center;
    background-size: 55%;
    height: 75%;
    margin: 0 auto;
  }

  .chain_part_item_img_1 {
    background: url("../../assets/images/circle_2.png") no-repeat;
    background-position: center center;
    background-size: 55%;
    height: 75%;
    margin: 0 auto;
  }

  .chain_part_item_img_2 {
    background: url("../../assets/images/circle_3.png") no-repeat;
    background-position: center center;
    background-size: 55%;
    height: 75%;
    margin: 0 auto;
  }

  .chain_part_item_img_3 {
    background: url("../../assets/images/circle_4.png") no-repeat;
    background-position: center center;
    background-size: 55%;
    height: 75%;
    margin: 0 auto;
  }

  .chain_part_item_img_4 {
    background: url("../../assets/images/circle_5.png") no-repeat;
    background-position: center center;
    background-size: 55%;
    height: 75%;
    margin: 0 auto;
  }

  .chain_part_item_img_6 {
    background: url("../../assets/images/circle_bg.png") no-repeat;
    background-position: center center;
    background-size: 55%;
    height: 75%;
    margin: 0 auto;
  }

  .chain_part_item_text {
    font-size: 25px;
    text-align: center;
    line-height: 7
  }

  .chain_part_item_text_1 {
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    line-height: 7;
    color: #5D14CE;
  }

  .chain_part_item_title {
    font-size: 17px;
    height: 20px;
  }

  .chain_part {
    width: 100%;
    padding-bottom: 40px;
    display: flex;
    justify-content: space-between;
  }

  .chain_part_padding {
    padding: 8%;
    /*height: 100%;*/
  }

  .block_related_item_padding {
    padding: 20px;
    height: 100%;
    width: 90%;
  }

  .chain_part_item {
    width: 17%;
    height: 240px;
    background-color: #ffffff;
    /*border-radius: 5px;*/
  }

  .block_related_item_1 {
    width: 25%;
    height: 300px;
    background-color: #ffffff;
    /*border-radius: 5px;*/
  }

  .block_related_item_2 {
    width: 43%;
    height: 300px;
    background-color: #ffffff;
    /*border-radius: 5px;*/
  }

  .block_related_item_3 {
    width: 25%;
    height: 300px;
    background-color: #ffffff;
    /*border-radius: 5px;*/
  }

  .hc_overview_he {
    display: inline-block;
    height: 22px;
  }

  .color_choose {
    color: #800080;
    cursor: pointer;
  }

  .hc_overview {
    /*border: 1px solid #DCDFE6;*/
    width: 100%;
    display: flex;
    /*justify-content: space-between;*/
    background-color: #ffffff;
  }

  .hc_overview div {
    width: 33.33%;
    height: 80px;
    text-align: center;
    padding: 30px 0;
  }

  .hc_overview_1 div {
    width: 33.3%;
    text-align: center;
    padding: 25px 0;

  }

  .hc_overview_1 {
    margin-bottom: 30px;
  }

  .hc_overview div:nth-child(2) {
    border-left: 1px solid #DCDFE6;
    border-right: 1px solid #DCDFE6;
  }

  .hc_tishi {
    height: 15px;
    font-size: 12px;
    margin: 20px 0 30px 0;
  }

  .hc_search2_1_input_icon {
    position: absolute;
    margin-left: 15px;
    margin-top: 12px;
    z-index: 1;
  }

  .hc_search2_1_input {
    display: flex;
    width: 70%;
  }

  .hc_search2_1 {
    width: 100%;
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
  }

  .hc_search1_1_top_title {
    line-height: 2.5;
    font-size: 16px;
  }

  .hc_search1_1_top {
    display: flex;
    justify-content: space-between;
  }

  .hc_con {
    width: 100%;
    margin-bottom: 80px;
  }

  .con_title {
    height: 25px;
    font-size: 18px;
    color: #800080;
    padding-bottom: 20px;
  }

  .hc_search {
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
  }

  .hc_search1_1 {
    width: 40%;
  }

  .hc_search1_2 {
    width: 40%;
  }

  .hc_search_submit {
    width: 100px;
    /*background-color: #634DFF;*/
    border: none;
  }
</style>
