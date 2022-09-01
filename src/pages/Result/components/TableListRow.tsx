import React, { Fragment, useEffect, useState } from 'react';
import style from '../index.module.less';
export default function TableListRow(props: any) {
  const [item, setItem] = useState(props.obj[props.option.key]);
  useEffect(() => {
    setItem(props.obj[props.option.key]);
  }, [props.obj]);
  if (props.option.type) {
    return (
      <div className={style.table_item}>
        <div className={style.left_item}>{props.option.title}</div>
        <div className={style.right_item}>
          {/* {props.obj[props.option.key].map((item: string, index: number) => (
            <Fragment key={index}>
              <span className={style.right_list_span}>{item}</span>
            </Fragment>
          ))} */}
          {item.map((Nitem: string, index: number) => (
            <Fragment key={index}>
              <span className={style.right_list_span}>{Nitem}</span>
            </Fragment>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className={style.table_item}>
      <div className={style.left_item}>{props.option.title}</div>
      <div className={style.right_item}>{item}</div>
      {/* <div className={style.right_item}>{props.obj[props.option.key]}</div> */}
    </div>
  );
}
