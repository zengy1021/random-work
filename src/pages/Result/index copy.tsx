import React, { Fragment, useEffect, useState } from 'react';
import TableListRow from './components/TableListRow';
import { useNavigate } from 'react-router-dom';
import style from './index.module.less';
import api from './api';

export default function Result() {
  const users = [
    { name: '袁和启', sex: '1' },
    { name: '杨斌', sex: '1' },
    { name: '徐浩洋', sex: '1' },
    { name: '彭日钥', sex: '1' },
    { name: '彭玮标', sex: '1' },
    { name: '王孝杭', sex: '1' },
    { name: '谢浪', sex: '1' },
    { name: '胡仲舜', sex: '1' },
    { name: '李甲栋', sex: '1' },
    { name: '曾园', sex: '1' },
    { name: '陈思锐', sex: '2' },
    { name: '陶佩佩', sex: '2' },
    { name: '黎秋韵', sex: '2' },
    { name: '谢誉萍', sex: '2' },
    { name: '田焕玲', sex: '2', isScope: true },
    { name: '罗萍', sex: '2' },
    { name: '郑雪', sex: '2' },
  ];
  const obj: any = {
    washGround: [],
    cleanMeeting: '',
    flower: '',
    bigDoor: '',
    officeTable: [],
    officeRoom: [],
    cleanGround: [],
    teaRoom: '',
    sportRoom: '',
    free: [],
  };
  const list = [
    {
      title: '拖地',
      key: 'washGround',
      type: 'list',
      asType: '1',
      randomNum: 3,
    },
    {
      title: '会议室',
      key: 'cleanMeeting',
      randomNum: 1,
    },
    {
      title: '浇花',
      key: 'flower',
      randomNum: 1,
      isScope: true,
    },
    {
      title: '大门前台',
      key: 'bigDoor',
      randomNum: 1,
    },
    {
      title: '办公桌',
      key: 'officeTable',
      type: 'list',
      randomNum: 2,
    },
    {
      title: '三个办公室',
      key: 'officeRoom',
      type: 'list',
      randomNum: 3,
    },
    {
      title: '扫地',
      key: 'cleanGround',
      type: 'list',
      randomNum: 3,
    },
    {
      title: '茶水间',
      key: 'teaRoom',
      randomNum: 1,
    },
    {
      title: '运动区',
      key: 'sportRoom',
      randomNum: 1,
    },
  ];
  const navigate = useNavigate();

  const [newObj, setNewObj] = useState({ ...obj });
  const [nullObj, setNullObj] = useState<any>({});
  const randomIndex = function (length?: number) {
    let count = length || users.length;
    return Math.floor(Math.random() * count);
  };
  function getUser(type?: string) {
    let rIndex = randomIndex();
    let newUsers = [];

    let user = users[rIndex];
    if (type) {
      newUsers = users.filter((item) => item.sex === '1');
      rIndex = randomIndex(newUsers.length);
      user = newUsers[rIndex];
    }
    // debugger;
    if (user.name === '田焕玲') {
      getUser(type);
    } else if (type) {
      if (user.sex !== '1') {
        // debugger;
        getUser(type);
      } else {
        return user;
      }
    } else {
      return user;
    }
    //  else if (type && user.sex !== '1' && users.length > 1) {
    //     getUser(type);
    //   } else {
    //     return user;
    //   }
  }
  const getClearMan = (length: number, item: any) => {
    if (obj.washGround.length < length) {
      let cUser = getUser('1');

      console.log('cUser', cUser);
    }
  };

  const getOneClearMan = () => {
    let user2: any = getUser('1');
    if (user2) {
      return user2;
    } else {
      getOneClearMan();
    }
  };

  const getNewUser = () => {
    let user3: any = getUser();
    if (user3) {
      return user3;
    } else {
      getNewUser();
    }
  };

  const getRandomUser = (
    num: number,
    rowItem: any,
    sexType?: boolean,
    isScope?: boolean
  ) => {
    if (users.length === 0) {
      return;
    }

    for (let index = 1; index <= num; index++) {
      let useName = '';
      if (isScope) {
        let user = users.filter((item) => item.name === '田焕玲')[0];
        if (user) {
          let fIndex = users.findIndex((item) => item.name === '田焕玲');
          users.splice(fIndex, 1);
          useName = user.name;
        }
      } else if (sexType) {
        let user2: any = getOneClearMan();
        if (user2) {
          let fIndex = users.findIndex((item) => item.name === user2.name);
          users.splice(fIndex, 1);
          useName = user2.name;
        }
      } else {
        let user3: any = getNewUser();
        // if (rowItem.key === 'cleanMeeting' && !user3) {
        //   debugger;
        // }
        if (user3) {
          let fIndex = users.findIndex((item) => item.name === user3.name);
          users.splice(fIndex, 1);
          useName = user3.name;
        }
      }
      if (rowItem.type) {
        obj[rowItem.key].push(useName);
      } else {
        obj[rowItem.key] = useName;
      }
    }
  };
  const randomCalc = () => {
    list.map((item: any, index: number) => {
      if (item.key !== 'flower') {
        // if (index == 0) {
        //   // 单独处理拖地男生事件
        //   getClearMan(item.randomNum, item);
        // } else {
        getRandomUser(item.randomNum, item, !!item.asType, !!item.isScope);
        // }
      } else {
        obj['flower'] = '田焕玲';
        let fIndex = users.findIndex((item) => item.name === '田焕玲');
        if (fIndex || fIndex === 0) {
          users.splice(fIndex, 1);
        }
      }
    });
  };
  const getData = () => {};
  useEffect(() => {
    // getData();
    api.getDataList({}).then((res: any) => {
      console.log(res);
      let customObj: any = {};
      Object.keys(obj).forEach((key) => {
        customObj[key] = res.data[key];
      });
      setNewObj(customObj);
    });
    if (users.length !== 0) {
      // randomCalc();
      // setNewObj(obj);
      // setNullObj(users[0]);
      // // console.log(obj);
      // console.log(users);
    }
    return () => {};
  }, []);
  const goBack = () => {
    navigate('/home', { replace: true });
  };
  return (
    <div className={style.home_box}>
      <div className={style.home_content}>
        <div className={style.home_header}>
          <div className={style.home_title}></div>
          <div className={style.home_arrow}>
            <div className={style.home_arrow_scoll}></div>
          </div>
        </div>
        <div className={style.home_show_box}>
          <div className={style.show_box_info}>
            本次轮空
            <span className={style.show_box_info_null}></span>
          </div>
          <div className={style.show_box_info2}>
            <span className={style.show_box_info_null}></span>
            123
            {/* {nullObj.name} */}
          </div>
        </div>
        <div className={style.home_show_table}>
          {list.map((item, index) => (
            <Fragment key={index}>
              <TableListRow option={item} obj={newObj}></TableListRow>
            </Fragment>
          ))}
        </div>
        <div className={style.home_back_btn} onClick={goBack}>
          返回
        </div>
      </div>
    </div>
  );
}
