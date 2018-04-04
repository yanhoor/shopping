import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://127.0.0.1:8010/',
});
instance.interceptors.response.use(res => {
	return res.data;
});

let cityList = [];
instance.get('china.html')
	.then( res => {
		console.log(res);
		for (let key of Object.keys(res)){
			cityList.push({
				id: key,
				value: res[key],
				label: res[key],
				children: [],
				loading: false
			});
		}
		console.log(cityList);
	})
	.catch( err => console.log(err) );

export { instance, cityList };