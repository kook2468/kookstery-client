import style from "./shipping-row-skeleton.module.css";

export default function ShippingRowSkeleton() {
  return (
    <div className={style.container}>
      <div className={style.cover_img}></div>
      <div className={style.info_container}>
        <div className={style.title}></div>
        <div className={style.subTitle}></div>
        <br />
        <div className={style.author}></div>
      </div>
    </div>
  );
}
