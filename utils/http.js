const BASE_URL = "http://120.55.97.163:8080";
const json2ur = (json) => {
  let arr = [];
  for (let key in json) {
    arr.push(key + "=" + json[key]);
  }
  return arr.join("&"); //a=1&b=2
};

const http = ({ url, method = "get", params = {}, data = {} }) => {
  if (!url) return;
  const token = uni.getStorageSync("token");
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url + "?" + json2ur(params), //仅为示例，并非真实的接口地址
      method: method,
      data: data,
      header: {
        "content-type": "application/json", // 默认值
        token: token,
      },
      success(res) {
        resolve(res.data);
      },
      fail(err) {
        reject(err);
        if (err.code == 401) {
        }
      },
    });
  });
};

export default http;
