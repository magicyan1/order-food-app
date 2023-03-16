import { createStore } from 'vuex'
import * as order from '../../apis/order/order.js'
export const orderStore = createStore({
	state:{
		status:'',
		des:'无'
		},
	 /* mutations: {
		editAll(state,option){
			state.status=option.status   
		 },
	  },
	  actions:{
		 actionAll({commit},option){
			order.getOneOrder({
					   	orderNumber: 1
					   })
					   .then(res=>{
								   commit('editAll',{
									   state.status:res.data.status
								   })
							   })
			.catch((err)=>{reject(err);})
		 }
	  } */
	 
})

