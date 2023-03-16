import http from '../../utils/http.js'
const queue = (data) => {
	return http({
		url: '/order/queue/getNum',
		params: data
	})
}
export {
	queue
}
