import React, { Fragment, useEffect, useState } from 'react';
import TableListRow from './components/TableListRow';
import { useNavigate } from 'react-router-dom';
import style from './index.module.less';
import api from './api';
// import { Loading, ActivityIndicator } from 'zarm';

export default function Result() {
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
  const [nullObj, setNullObj] = useState<any>([]);
  useEffect(() => {
    // Loading.show({
    //   content: <ActivityIndicator size="lg" />,
    //   stayTime: 2000,
    // });
    api.getDataList({}).then((res: any) => {
      let customObj: any = {};
      Object.keys(obj).forEach((key) => {
        if (res.data[key] instanceof Array) {
          customObj[key] = res.data[key].map((cItem: any) => {
            return cItem.name;
          });
        } else {
          customObj[key] = res.data[key].name;
        }
      });

      console.log('customObj', customObj);
      let nullList = res.data['free'].map((cItem: any) => {
        return cItem.name;
      });

      setNullObj(nullList);
      setNewObj(customObj);
    });
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
            {nullObj.join(' ')}
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
