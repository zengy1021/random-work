import request from '../../../api/request1';
// import qs from 'qs';
const flag = process.env.NODE_ENV !== 'development' ? '/demomall' : '/demomall';
// let paramsSerializer = function (p: any) {
//   return qs.stringify(p, { arrayFormat: 'repeat' })
// }
export default {
  // 获取数据
  getDataList: request.get(flag + `/office/run`, {}),
};
