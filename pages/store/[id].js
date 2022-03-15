import Style from '../../styles/store.module.css'
import Image from "next/image";
import Link from "next/link";
import fetchShabuStores from '../../lib/shabuStore';
import Head from 'next/head';
import cls from "classnames";
import { useRouter } from 'next/router';
import { useContext, useState, useEffect } from 'react';
import { ACTION_TYPES, StoreContext } from '../../store/store-context';
import { isEmpty } from '../../utils';

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

const Store = (initialProps) => {

    //get data in context 
    const { state } = useContext(StoreContext);
    const stores = state.stores;

    // console.log("FROM CONTEXT",stores) ;

    const [votingCount, setVotingCount] = useState(0)

    //get init store from prop if not set it empty , then get from context
    const [store, setStore] = useState(initialProps.store || {})


    console.log("Init Prop", initialProps.store)

    const router = useRouter();
    const id = router.query.id;


    useEffect(() => {
        

        if (isEmpty(initialProps.store)) {

            if (stores.length > 0) {

                const storeFromContext = stores.find((store) => {
                    return store.id.toString() === id; //check id from query which same id in context
                });

                if (storeFromContext) {
                    setStore(storeFromContext);
                    console.log("Context props", storeFromContext)
                }
            }

        } else {

        }
    }, [id, initialProps, initialProps.store, stores])

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    const handleVotingButton = async () => {
        setVotingCount(votingCount + 1)
    }

    const {
        address = "",
        name = "",
        neighborhood = "",
        imgUrl = "https://images.unsplash.com/photo-1566705474094-5bf047ce2754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDA4NzN8MHwxfHNlYXJjaHwzfHxrb3JlYW4lMjBiYnF8ZW58MHx8fHwxNjQ3MzIzNDI1&ixlib=rb-1.2.1&q=80&w=400",
    } = store;


    // const { name, imgUrl, address, neighborhood } = store;
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

                    <button className={Style.upvoteButton} onClick={handleVotingButton}>Up vote</button>

                </div>

            </div>

        </div>
    )

}

export default Store;