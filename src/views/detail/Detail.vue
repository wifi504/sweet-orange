<template>
  <div>
    <!--  详情页顶部的 Bar  -->
    <detail-nav-bar/>
    <!--  主面板  -->
    <scroll class="detail-scroll" ref="detailScroll"
            :show-back-top-button="true">
      <!--  展示商品大图  -->
      <div class="goodImg">
        <svg v-if="!showGood" t="1709792309554" class="pre-load" viewBox="0 0 1117 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg"
             p-id="6699" width="200" height="200">
          <path
              d="M997.003183 39.703255v35.839983c0 21.829808-17.966537 39.703255-39.912709 39.703255H153.832657c-21.969445 0-39.912709 17.850174-39.912709 39.679982v598.597546c0 21.829808-17.966537 39.679982-39.912709 39.679982H39.912709A39.912709 39.912709 0 0 1 0 753.524021V39.703255C0 17.873446 17.966537 0 39.912709 0h917.177765c21.946172 0 39.912709 17.873446 39.912709 39.703255zM1070.544968 191.674095c25.716352 0 46.522161 20.712718 46.545433 46.26616v739.839664A46.335979 46.335979 0 0 1 1070.591513 1023.999535H233.285712c-25.693079 0-46.545433-20.712718-46.545433-46.219616v-739.839664c0-25.553443 20.852354-46.242888 46.545433-46.242888h837.282529z m-93.021049 693.573503h0.046546v-138.705392l-139.54321-138.705391-139.589754 138.705391-232.564258-231.167895-139.589755 138.728664v231.144623h651.240431z m-93.044321-369.873287c51.455977 0 93.044321-41.425436 93.044321-92.462503 0-51.153431-41.588345-92.485776-93.044321-92.485776-51.409431 0-92.997776 41.332345-92.997776 92.485776 0 51.037068 41.588345 92.462503 92.997776 92.462503z"
              fill="#C8C8C8" p-id="6700"></path>
        </svg>
        <div v-if="!showGood" class="pre-load-text">图片加载中...</div>
        <img v-if="showGood" :src="good.image" alt="商品图片" @click="imgClick">
      </div>
      <!--  商品名称 -->
      <div class="good-name">{{ good.name }}</div>
      <!--  数据信息  -->
      <div class="good-price">
        <span class="current-price">{{ '￥' + good.currentPrice }}</span>
        <span class="original-price">{{ '￥' + good.originalPrice }}</span>
        <span :class="{
        'content-stock-health': this.good.stock>=10,
        'content-stock-little': this.good.stock>=1 && this.good.stock<=9,
        'content-stock-nothing': this.good.stock<=0
      }">{{ stockText }}
        </span>
      </div>
      <!--  商品描述  -->
      <div class="good-detail">{{ good.detail }}</div>

      <!--  调试信息  -->
      <div class="debug">
        <pre class="data">{{ '调试信息：\ngetDetailViewData()\n' + dataText }}</pre>
      </div>
    </scroll>
    <!--  Foot Bar  -->
    <detail-foot-bar @contact-click="contactClick"
                     @cart-click="cartClick"
                     :id="this.good.id"
                     :stock="this.good.stock"/>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import Scroll from "@/components/common/scroll/Scroll";
import DetailFootBar from "@/views/detail/childComps/DetailFootBar";

import {getDetailViewData} from "@/network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    Scroll,
    DetailFootBar
  },
  data() {
    return {
      good: null,
      showGood: false
    }
  },
  computed: {
    dataText() {
      return JSON.stringify(this.good, null, 2)
    },
    stockText() {
      if (this.good.stock >= 10) {
        return '库存充足'
      } else if (this.good.stock >= 1) {
        return '仅剩 ' + this.good.stock + ' 件'
      } else {
        return '售罄'
      }
    }
  },
  activated() {
    getDetailViewData().then(res => {
      this.good = res.goods[this.$route.query.id - 1]
      this.showGood = true
    })
    this.$refs.detailScroll.doScrollRefresh()
  },
  deactivated() {
    this.initGood()
    this.showGood = false
  },
  updated() {
    this.$refs.detailScroll.doScrollRefresh()
  },
  created() {
    this.initGood()
  },
  mounted() {
    this.$refs.detailScroll.doScrollRefresh()
  },
  methods: {
    initGood() {
      this.good = {
        "id": -1,
        "stock": 0,
        "name": "加载中...",
        "detail": "加载中...",
        "image": "",
        "currentPrice": 0,
        "originalPrice": 0
      }
    },
    contactClick() {
      console.log('顾客需要联系我们并咨询商品ID：' + this.good.id)
    },
    cartClick() {
      console.log('加入购物车，ID：' + this.good.id)
      this.$store.commit('addGoodToCart', this.good.id)
    },
    imgClick() {
      alert('打开图片')
    }
  }
}
</script>

<style scoped>
.data {
  white-space: pre-wrap;
  word-break: break-word;
}

.detail-scroll {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 55px;
}

.goodImg {
  width: 100vw;
  height: 61.8vw;
  position: relative;
  background-color: var(--color-background-dark);
  box-shadow: 0 5px 5px rgba(0, 0, 0, .2);
  margin-bottom: 10px;
  overflow: hidden;
}

.goodImg img {
  width: 100%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.pre-load {
  width: 32%;
  position: absolute;
  left: 48%;
  top: 40%;
  transform: translateX(-50%) translateY(-50%);
}

.pre-load-text {
  font-size: var(--font-large-size);
  color: var(--color-light-text);
  position: absolute;
  left: 52%;
  top: 75%;
  transform: translateX(-50%) translateY(-50%);
}

.pre-load path {
  fill: var(--color-light-text);
}

.good-name {
  color: var(--color-text);
  font-size: var(--font-large-size);
  padding: 10px;
}

.good-price {
  padding: 10px;
  border-bottom: 1px solid var(--color-light-text);
  position: relative;
}

.current-price {
  color: var(--color-tint);
  font-size: var(--font-super-size);
}

.original-price {
  color: var(--color-light-text);
  font-size: var(--font-normal-size);
  margin-left: 10px;
  text-decoration: line-through;
}

.good-detail {
  color: var(--color-text);
  font-size: var(--font-normal-size);
  padding: 15px;
  border-bottom: 1px solid var(--color-light-text);
  line-height: var(--line-height);
  text-indent: 1.5em;
  text-align: justify;
}

.content-stock-health {
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: var(--font-normal-size);
  color: var(--color-text);
}

.content-stock-little {
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: var(--font-normal-size);
  color: var(--color-high-text);
  font-weight: bold;
}

.content-stock-nothing {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: var(--font-normal-size);
  color: var(--color-text);
}

.debug {
  margin: 5%;
  padding: 5px;
  border: green 1px solid;
  width: 80%;
  color: black;
}
</style>