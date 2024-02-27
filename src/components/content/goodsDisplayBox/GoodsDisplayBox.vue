<template>
  <div class="goods-boxes" @click="()=>{this.$emit('show-modal-box', this.name, this.detail)}">
    <div class="img-box">
      <img :src="imgUrl" alt="商品图片">
    </div>
    <div class="content-box">
      <div class="content-name">{{ name }}</div>
      <div class="content-detail" ref="detail">{{ formatDetail }}</div>
      <div class="content-price">
        <span class="content-current-price">{{ '￥' + currentPrice }}</span>
        <span class="content-original-price">{{ '￥' + originalPrice }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsDisplayBox",
  props: {
    name: {
      type: String,
      default: '商品名称'
    },
    detail: {
      type: String,
      default: '这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的描述信息！'
    },
    imgUrl: {
      type: String,
      default: ''
    },
    currentPrice: {
      type: Number,
      default: 9.9
    },
    originalPrice: {
      type: Number,
      default: 50
    },
  },
  data() {
    return {
      formatDetail: ''
    }
  },
  methods: {
    getFormatDetail() {
      const textStyle = getComputedStyle(document.documentElement).getPropertyValue('--font-normal-size');
      const fontSize = parseFloat(textStyle);
      const boxWidth = this.$refs.detail.clientWidth;
      let textCount = Math.floor(boxWidth / fontSize) * 2
      console.log('实际与许可字数：' + this.detail.length + ' | ' + textCount);
      if (this.detail.length < textCount) {
        return this.detail;
      } else {
        return this.detail.substring(0, textCount) + '...'
      }
    },
    updateDetail() {
      this.formatDetail = this.getFormatDetail()
    }
  },
  mounted() {
    this.updateDetail()
  }
}
</script>

<style scoped>
.goods-boxes {
  border-top: var(--color-background-dark) 1px solid;
  border-bottom: var(--color-background-dark) 1px solid;
  width: 100%;
  height: 120px;
}

.img-box {
  display: inline-block;
  width: 120px;
  height: 120px;
  position: absolute;
  padding: 5px;
}

.img-box img {
  height: 110px;
  width: 110px;
}

.content-box {
  color: var(--color-text);
  font-size: var(--font-normal-size);
  display: inline-block;
  height: 120px;
  width: calc(100% - 120px);
  position: relative;
  top: 0;
  left: 120px;
  padding: 8px;
}

.content-name {
  font-size: var(--font-large-size);
  color: var(--color-high-text);
  margin-bottom: 5px;
}

.content-detail {
  text-align: justify;
}

.content-price {
  position: absolute;
  bottom: 8px;
}

.content-current-price {
  color: var(--color-tint);
  font-size: var(--font-large-size);
}

.content-original-price {
  text-decoration: line-through;
  margin-left: 8px;
}
</style>