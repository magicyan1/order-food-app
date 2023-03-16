<template>
  <!-- 顶部地址 -->
<view class="addressbox">
    <view>
      <view class="address-phone-box">
        <text>{{address}}</text>
        <text class="address-phone">{{nickname}} {{phoneNumber}}</text>
      </view>
	  <view class="nextbox" @click="goaddress">></view>
    </view>
    <view>
      <text>尽快送达</text>
      <text>预计<text class="address-reach-time">{{arriveHtime}}:{{arriveMtime}}</text>送达</text>
    </view>
</view>
  <!-- 用餐列表 -->
<view class="foodlistbox">
    <text>用餐列表</text>
    <view class="foodlistbox-foods" v-for="(v,i) in orderlist" :key="i">
      <view>
        <image :src="v.image"></image>
        <view class="foodlist-food">
          <text>{{v.goodsName}}</text>
          <text class="foodlist-num">{{v.goodsDetails}}</text>
        </view>
      </view>
      <view>
        <text>￥{{v.goodsPrice}}</text>
        <text>×{{v.goodsCount}}</text>
      </view>
    </view>
</view>
  <!-- 优惠券 -->
<view class="couponsbox">
    <view>
      <text>优惠券</text>
      <text @click="open"><text class="coupons">2张可用</text> ></text>
    </view>
    <view>
      <text>配送费</text>
      <text>￥5.0</text>
    </view>
    <view>
      <text>小计</text>
      <text class="coupons-totalmoney">￥{{tatalmoney1}}</text>
    </view>
</view>
  <!-- 餐具数量 -->
<view class="tablewarebox">
    <view>
      <text class="address-phone">餐具数量 ×{{ tablewarenum }}</text>
      <text @click="opencoupons"><text class="coupons">请选择</text> ></text>
    </view>
    <view>
      <text class="address-phone">备注</text>
      <textarea
        v-model="text"
        class="tableware-textarea"
        placeholder="请输入订单备注...."
        placeholder-style="color:#eaeaea;font-size:36rpx"
      />
    </view>
</view>
  <div class="kong"></div>
  <!-- 提交支付 -->
  <view class="paybox">
    <text>合计 ￥{{ tatalmoney }}</text>
    <text @click="sucessbtn">提交支付</text>
  </view>
  <!-- 优惠券弹框 -->
<view>
    <uni-popup ref="popupCoupon" type="bottom">
      <view class="coupons-popup">
        <view>
          <text>选择优惠</text>
          <text @click="close">×</text>
        </view>
        <radio-group>
          <view class="coupons-popup-bottom">
            <view class="coupons-popup-alltext">
              <view class="kk">
                <text style="color: orange"
                  >￥
                  <text class="coupons-popupmoney">30</text>
                </text>
                <view class="hhh">
                  <text>新用户注册优惠券</text>
                  <text>满100可用</text>
                </view>
              </view>
              <radio
                color="orange"
                style="transform: scale(0.5)"
                checked="checked"
                value="30"
              />
            </view>
            <view class="coupons-popup-overtime">
              <text>有效期至2019.08.06</text>
              <text>外卖可用</text>
            </view>
          </view>
          <view class="coupons-popup-bottom">
            <view class="coupons-popup-alltext">
              <view class="kk">
                <text style="color: orange"
                  >￥
                  <text class="coupons-popupmoney">5</text>
                </text>
                <view class="hhh">
                  <text>新用户注册优惠券</text>
                  <text>满50可用</text>
                </view>
              </view>
              <radio color="orange" style="transform: scale(0.5)" value="5" />
            </view>
            <view class="coupons-popup-overtime">
              <text>有效期至2019.08.06</text>
              <text>外卖可用</text>
            </view>
          </view>
          <view class="coupons-popup-bottom">
            <view class="coupons-popup-alltext">
              <view class="kk">
                <text style="color: orange"
                  >￥
                  <text class="coupons-popupmoney">2</text>
                </text>
                <view class="hhh">
                  <text>新用户注册优惠券</text>
                  <text>满30可用</text>
                </view>
              </view>
              <radio color="orange" style="transform: scale(0.5)" value="2" />
            </view>
            <view class="coupons-popup-overtime">
              <text>有效期至2019.08.06</text>
              <text>外卖可用</text>
            </view>
          </view>
        </radio-group>
      </view>
    </uni-popup>
</view>
  <!-- 餐具数量弹框 -->
<view>
    <uni-popup ref="popupCoupon1" type="bottom">
      <view class="coupons-popup">
        <view>
          <text>选择餐具</text>
          <text @click="closecoupons">×</text>
        </view>
        <text style="font-size: 30rpx">餐具数量</text>
        <view class="tableware-num">
          <view :class="se2 == 0 ? 'ocolor' : 'gcolor'" @click="wu"
            >无需餐具</view
          >
          <view
            v-for="(v, i) in cnums"
            :key="i"
            :class="i == sel ? 'ocolor' : 'gcolor'"
            @click="numck(i)"
            >{{ v }}份</view
          >
          <div
		 @click="changeaddclo()"
            class="tableware-addnum"
            :class="isocolor == true ? 'ocolor' : 'gcolor'"
          >
            <view @click="reduce()">-</view>
            <text>{{ num }}份</text>
            <view @click="add()">+</view>
          </div>
        </view>
        <button @click="paysucessbtn" class="tableware-butn">确定</button>
      </view>
    </uni-popup>
</view>
</template>

<script setup>
import { ref,onMounted } from "vue";
import { onShow,onLoad} from "@dcloudio/uni-app";
import uniPopup from "../../uni_modules/uni-popup/components/uni-popup/uni-popup.vue";
import store from "@/store/index.js";
import http from "@/utils/http.js";
const popupCoupon = ref(null);
const popupCoupon1 = ref(null);
const isocolor = ref(false);
const text = ref("");
const sel = ref(0);
const se2 = ref(0);
const cnums = ref([1, 2, 3, 4, 5, 6, 7]);
const num = ref(8);
const tablewarenum = ref("");
const tatalmoney = ref(0);
const tatalmoney1 = ref(0);
const orderlist=ref('');
const arriveHtime=ref('')
const arriveMtime=ref('')
const phoneNumber=ref('')
const nickname=ref('')
const address=ref('')
const orderNumber=ref('')
//选择地址
const goaddress=()=>{
	uni.redirectTo({
		url:"../mine/address/address?whereaddress=1"
	})
}
// 打开优惠券弹框
const open = () => {
  popupCoupon.value.open("bottom");
};
// 关闭优惠券弹框
const close = () => {
  popupCoupon.value.close();
};
// 关闭餐具数量
const closecoupons = () => {
  popupCoupon1.value.close();
};
// 提交支付跳转
const sucessbtn = () => {
  let v=tatalmoney.value
  uni.navigateTo({
  	url:"sucess/sucess?tatalmoney="+v
  })
  http({
    url: "/oder/customer/customer/submit",
    method: "post",
    data: {
      orderNumber: orderNumber.value,
      remarks: text.value,
      tablewareNumber: tablewarenum.value,
    },
  }).then((res) => {
    console.log(res);
  });
};
// 打开餐具数量
const opencoupons = () => {
  se2.value=0
   sel.value=8
   isocolor.value = false;
     if(tablewarenum.value>0 && tablewarenum.value<=7){
		 sel.value=tablewarenum.value-1
		 se2.value=1
	 }else if(tablewarenum.value>7){
		isocolor.value = true;
		 se2.value=1
	 }else{
		se2.value=0 
	 }
  popupCoupon1.value.open("bottom");

  
};
// 减少数量
const reduce = () => {
	se2.value=1
	sel.value=8
  if (num.value <=9) {
    num.value = 8;
    isocolor.value = false;
  } else {
    num.value--;
    isocolor.value = true;
  }
  tablewarenum.value = num.value;
};
// 增加数量
const add = () => {
	se2.value=1
	sel.value=8
  isocolor.value = true;
  num.value++;
  tablewarenum.value = num.value;
};
//点击餐具数据加减键
const changeaddclo=()=>{
	tablewarenum.value=num.value
	se2.value=1
	sel.value=8
	isocolor.value = true;
}
//确定餐具数量按钮
const paysucessbtn=()=>{
	popupCoupon1.value.close();
}
//点击餐具数量
const numck = (v) => {
  se2.value=8
  sel.value = v;
  isocolor.value = false;
  tablewarenum.value = cnums.value[v];
};
//无需餐具的按钮
const wu = () => {
	se2.value=0
	isocolor.value = false;
	sel.value=8
    tablewarenum.value=0
};
//获取数据
onLoad(()=>{
	//获取时间
	var time=30*60*1000;
	var clicktime = new Date();
	var timestamp = new Date(clicktime.getTime()+time);
	// arriveHtime.value=timestamp.getTime()
	arriveHtime.value=timestamp.getHours()
	arriveMtime.value=timestamp.getMinutes() 
	//获取购物车数据
	 let value2=uni.getStorageSync('trolley')
	 let value1=uni.getStorageSync('priceList')
	  orderlist.value=value2
	  tatalmoney1.value=value1.priceAll
	  // orderNumber.value=value1.priceAll
	//获取地址
	let value3=uni.getStorageSync('user')
	address.value=value3.address
	nickname.value=value3.nickname
	phoneNumber.value=value3.phoneNumber
	//获取订单编号
	let value4=uni.getStorageSync('list2')
	orderNumber.value=value4.orderNumber
	tatalmoney.value=value4.finalPrice
	
})
const ll = () => {
	let value4=uni.getStorageSync('list1')
	address.value=value4.address
	nickname.value=value4.nickname
	phoneNumber.value=value4.phoneNumber
};
onMounted(()=>{	
	ll()
})

</script>

<style>
.kong {
  height: 200rpx;
}
.foodlist-num {
  font-size: 24rpx;
  color: gray;
  margin-top: 10rpx;
}
/* <!-- 餐具弹框 --> */
.tableware-butn {
  background-color: #f57312;
  text-align: center;
  color: white;
  height: 80rpx;
  font-size: 34rpx;
  border-radius: 50rpx;
  margin-top: 80rpx;
}
.ocolor {
  background-color: #fef1e8;
}
.gcolor {
  background-color: #efefef;
}
.tableware-addnum {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 280rpx;
  color: #333333;
}
.tableware-addnum > view {
  color: white;
  background-color: #333333;
  margin-top: 0rpx;
  width: 22rpx;
  height: 22rpx;
  border-radius: 22rpx;
  text-align: center;
  line-height: 18rpx;
}
.tableware-num {
  margin-top: 10rpx;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.tableware-num > view {
  /* background-color: #efefef; */
  width: 120rpx;
  height: 50rpx;
  line-height: 50rpx;
  margin-top: 20rpx;
  border-radius: 40rpx;
  padding: 10rpx 20rpx;
  font-size: 30rpx;
  text-align: center;
  color: #9fa19f;
}
/* <!-- 优惠券弹框 --> */
.coupons-popup-overtime {
  font-size: 30rpx;
  color: gray;
  padding: 20rpx 10rpx;
  display: flex;
  justify-content: space-between;
  margin: 0 20rpx;
}
.kk {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.hhh {
  display: flex;
  flex-direction: column;
  margin-left: 8rpx;
}
.coupons-popup-alltext {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 20rpx;
  margin-right: 20rpx;
  border-bottom: 1px dashed #d4d1d0;
}
.hhh text:nth-child(1) {
  font-size: 34rpx;
}
.hhh text:nth-child(2) {
  color: gray;
  font-size: 30rpx;
}
.coupons-popupmoney {
  color: orange;
  font-weight: bold;
  font-size: 40px;
}
.coupons-popup {
  background-color: white;
  border-radius: 60rpx 60rpx 0 0;
  padding: 20rpx 30rpx;
}
.coupons-popup-bottom {
  box-shadow: 0px 0px 5px 0px #d4d1d0;
  border-radius: 20rpx;
  margin-top: 40rpx;
}
.coupons-popup > view:nth-child(1) {
  display: flex;
  justify-content: flex-end;
}
.coupons-popup > view:nth-child(1) text:nth-child(1) {
  margin-right: 260rpx;
}
/* <!-- 提交支付 --> */
.paybox {
  width: 670rpx;
  height: 104rpx;
  margin-left: 46rpx;
  display: flex;
  align-items: center;
  text-align: center;
  position: fixed;
  bottom: 30rpx;
}
.paybox text:nth-child(1) {
  background-color: #333333;
  color: white;
  padding: 26rpx 70rpx;
  width: 280rpx;
  border-radius: 100rpx 0 0 100rpx;
}
.paybox text:nth-child(2) {
  background-color: #f57312;
  color: white;
  padding: 26rpx;
  padding-right: 70rpx;
  border-radius: 0 100rpx 100rpx 0;
}
/* <!-- 餐具数量 --> */
.tablewarebox view:nth-child(2) {
  padding-bottom: 20rpx;
}
.tableware-textarea {
  padding-top: 20rpx;
  margin-bottom: 20rpx;
  width: 614rpx;
  height: 188rpx;
}
.tablewarebox view:nth-child(1) {
  display: flex;
  justify-content: space-between;
  padding: 30rpx 0;
  border-bottom: 2px solid #f7f5f6;
}
.tablewarebox {
  background-color: white;
  box-shadow: 0px 0px 5px 0px #d4d1d0;
  font-size: 28rpx;
  width: 614rpx;
  margin: 0 auto;
  margin-top: 24rpx;
  padding: 0 28rpx 0 28rpx;
  border-radius: 20rpx;
}
/* <!-- 优惠券 --> */
.coupons-totalmoney {
  font-size: 30rpx;
  font-weight: bold;
}
.coupons {
  color: orange;
}
.couponsbox view > text:nth-child(1) {
  color: #8a8583;
}
.couponsbox view {
  display: flex;
  justify-content: space-between;
  padding: 30rpx 0;
  border-bottom: 2px solid #f7f5f6;
}
.couponsbox {
  background-color: white;
  box-shadow: 0px 0px 5px 0px #d4d1d0;
  font-size: 28rpx;
  width: 614rpx;
  margin: 0 auto;
  margin-top: 24rpx;
  padding: 0 28rpx 0 28rpx;
  border-radius: 20rpx;
}
/* 订单列表 */
.foodlist-food {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 18rpx;
  width: 300rpx;
}
.foodlistbox-foods {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #f7f5f6;
  align-items: center;
  width: 588rpx;
  margin: 0 auto;
  padding: 20rpx 20rpx;
}
.foodlistbox-foods view:nth-child(1) {
  display: flex;
  align-items: center;
}
.foodlistbox-foods>view:nth-child(2) {
  display: flex;
  flex-direction: column;
  text-align: right;
  width: 120rpx;
  font-size: 30rpx;
}
.foodlistbox-foods image {
  width: 106rpx;
  height: 106rpx;
  border-radius: 6rpx;
}
.foodlistbox > text {
  margin-left: 30rpx;
}
.foodlistbox {
  background-color: white;
  box-shadow: 0px 0px 5px 0px #d4d1d0;
  font-size: 32rpx;
  width: 670rpx;
  margin: 0 auto;
  padding-top: 34rpx;
  border-radius: 20rpx;
}
/* 顶部地址 */
page {
  background-color: #f5f7f6;
}
.nextbox{
	width: 50rpx;
	font-size: 20px;
	text-align: center;	
}
.addressbox {
  width: 670rpx;
  background-color: white;
  margin: 34rpx auto;
  font-size: 32rpx;
  box-shadow: 0px 0px 5px 0px #d4d1d0;
  border-radius: 20rpx;
}
.address-phone-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20rpx 0;
}
.addressbox > view:nth-child(1) {
  padding: 10rpx 20rpx 6rpx 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.addressbox view:nth-child(2) {
  /* width: 592rpx; */
  margin: 0 auto;
  border-top: 2px solid #f7f5f6;
  display: flex;
  justify-content: space-between;
  padding: 36rpx 20rpx;
  margin: 0 20rpx;
}
.address-reach-time {
  color: orange;
}
.address-phone {
  color: #8a8583;
  margin-top: 20rpx;
}
.address-next {
  font-size: 40rpx;
  color: #8a8583;
}
</style>
