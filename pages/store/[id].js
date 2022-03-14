import Style from '../../styles/store.module.css'
import Image from "next/image";
import Link from "next/link";
import fetchShabuStores from '../../lib/shabuStore';
import Head from 'next/head';
import cls from "classnames";
import { useState } from 'react';


export async function getStaticProps(staticProps) {

    const params = staticProps.params;

    const stores = await fetchShabuStores();
    const findStoreById = stores.find((store) => {
        return store.id.toString() === params.id;
    })

    // console.log(findStoreById) ;
    return {
        props: {
            store: findStoreById ? findStoreById : {},
        },

    };
}

export async function getStaticPaths() {

    const stores = await fetchShabuStores();

    const paths = await stores.map((store) => {
        return {
            params: {
                id: store.id.toString(),
            }
        };
    })

    return {
        paths,
        fallback: true
    };
}

const Store = (props) => {

    console.log(props.store)
    const [votingCount, setVotingCount] = useState(0)
    const { id, name, imgUrl, address, neighborhood } = props.store;

    return (
        <div className={Style.layout}>

            <Head>
                <title>{name}</title>
            </Head>

            <div className={Style.backToHomeLink}>
                <Link href='/'><a>← Back to Home</a></Link>
            </div>

            <div className={Style.container}>

                <div className={Style.col1}>
                    <div className={Style.nameWrapper}>
                        <h1 className={Style.name}>{name}</h1>
                    </div>

                    <Image src={imgUrl} width={600} height={360} className={Style.storeImg} />

                </div>

                <div className={cls("glass", Style.col2)}>
                    {address && (
                        <div className={Style.iconWrapper}>
                            <Image src={"/static/icons/nearMe.svg"} width="24" height="24" />
                            <p className={Style.text}>{address}</p>
                        </div>
                    )}


                    {neighborhood && (
                        <div className={Style.iconWrapper}>
                            <Image src={"/static/icons/places.svg"} width="24" height="24" />
                            <p className={Style.text}>{neighborhood}</p>
                        </div>
                    )}

                    {!neighborhood && !address && (
                        <div className={Style.iconWrapper}>
                            <p className={Style.text}>No data</p>
                        </div>
                    )}

                    <div className={Style.iconWrapper}>
                        <Image
                            src={"/static/icons/stars.svg"}
                            width="24"
                            height="24"
                            alt="star icon"
                        />
                        <p className={Style.text}>{votingCount}</p>
                    </div>

                    <button className={Style.upvoteButton} onClick={() => { setVotingCount(votingCount + 1) }}>Up vote</button>

                </div>

            </div>

        </div>
    )

}

export default Store;