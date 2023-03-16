import { createStore } from 'vuex'
import addressSave from './modules/addressSave.js'

const store = createStore({
	state:{//存放状态
		"username":"foo",
		"age":18,
		kk:'',
	},
	modules:{

		addressSave:addressSave

		

	}
})

export default store