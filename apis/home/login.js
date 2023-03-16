import http from "../../utils/http.js"

//增加用户
const addUser = (data) => {
	return http({
		url: '/membershipDetails/add',
		method: 'post',
		data: data
	})
}
//获取用户id
const queryId = (phone) => {
	return http({
		url: '/membershipDetails/queryByPhoneNumber',
		params: {
			phoneNumber: phone
		}
	})
}
//修改用户信息
const updatUser = (data) => {
	return http({
		url: '/membershipDetails/updateById',
		method: 'post',
		data: data
	})
}
export {
	addUser,
	queryId,
	updatUser
}
