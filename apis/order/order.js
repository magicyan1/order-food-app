import http from '../../utils/http.js'


// 查询所有订单信息
export const getAllOrder = (user_id) => {
 	return http({
		url:"/oder/customer/customer/list/{userId}",
		params: {
			user_id
		}
	})
}

// 查询单个订单的详细信息
export const getOneOrder = (orderNumber) => {
 	return http({
		url:'/oder/customer/customer/chakan',
		params: {
			orderNumber
		}
	})
}
export const getOneOrderInfo = (orderNumber,orderStatus) => {
 	return http({
		url:'/oder/customer/customer/one',
		params: {
			orderNumber,
			orderStatus
		}
	})
}

// 取消订单
export const cancelOrder = (orderRefundDto) => {
 	return http({
		url:'/oder/customer/customer/cancel',
		method:'post',
		data: {
			orderRefundDto:{
				"orderNumber": "",
				"refundAmount": "0",
				"refundCause": "1",
				"refundExplain": "1",
				"refundRemark": "1"
			}
		}
	})
}

// 删除订单
export const delOrder = (orderNumber) => {
 	return http({
		url:'/oder/customer/customer/delete',
		method:'DELETE',
		data: {
			orderNumber:''
		}
	})
}
