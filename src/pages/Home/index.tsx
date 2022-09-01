import React, { useRef } from 'react';
import style from './index.module.less';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const myRef: any = useRef(null);
  const navigate = useNavigate();
  const startRandom = () => {
    // console.log(myRef.current);
    // myRef.current.style.animation = 'shakeSlow 5s infinite ease-in-out';

    navigate('/result', { replace: true });
  };
  return (
    <div className={style.home_box}>
      <div className={style.home_content}>
        <div className={style.home_content_arrow}>
          <div className={style.home_content_arrow_scoll}></div>
        </div>
        <div className={style.home_content_title}></div>
        <div className={style.home_content_tip}>卫生打扫分配 Clean</div>
        <div className={style.home_content_gift}></div>
        <div className={style.home_content_gift_left} ref={myRef}></div>
        <div className={style.home_content_gift_right2}></div>
        <div className={style.home_content_gift_right}></div>

        <div className={style.home_content_btn} onClick={startRandom}>
          开始抽奖
        </div>
      </div>
    </div>
  );
}
