import Image from "next/image";
import Link from "next/link";
import Style from "./Card.module.css";
import cls from "classnames";
const Card = (props) => {

    return (
        <div className={Style.cardWrapper}>
            <Link href={props.href}>
                <a className={Style.cardLink}>
                    <div className={cls("glass", Style.container)}>
                        <div className={Style.cardHeaderWrapper}>
                            <h2 className={Style.cardHeader}>{props.storeName}</h2>
                        </div>
                        <div className={Style.cardImageWrapper}>
                            <Image className={Style.cardImage} src={props.imgUrl} width={260} height={160} />
                        </div>

                    </div>
                </a>
            </Link>
        </div>
    )

}
export default Card;