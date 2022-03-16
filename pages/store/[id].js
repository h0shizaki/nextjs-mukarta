import Style from '../../styles/store.module.css'
import Image from "next/image";
import Link from "next/link";
import fetchShabuStores from '../../lib/shabuStore';
import Head from 'next/head';
import cls from "classnames";
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useContext, useState, useEffect } from 'react';
import { ACTION_TYPES, StoreContext } from '../../store/store-context';
import { isEmpty } from '../../utils';

export const fetcher = (url) => fetch(url).then((res) => res.json());

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

    const router = useRouter();
    const id = router.query.id;
    // console.log(id)

    const handleCreateStoreRecord = async (store) => {
        try {
            const { id, name, imgUrl, neighborhood, address } = store;
            const response = await fetch("/api/createStoreRecord",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id,
                        name,
                        vote: 0,
                        imgUrl,
                        neighborhood: neighborhood || "",
                        address: address || "",
                    })
                }
            );

            const dbStoreRecord = await response.json();
            // console.log(dbStoreRecord);

        } catch (err) {
            console.error("Error while creating store", err);
        }
    }

    // console.log(isEmpty(initialProps.store));
    useEffect(() => {

        // console.log(isEmpty(initialProps.store));
        if (isEmpty(initialProps.store)) {

            if (stores.length > 0) {

                const storeFromContext = stores.find((store) => {
                    return store.id.toString() === id; //check id from query which same id in context
                });

                if (storeFromContext) {
                    setStore(storeFromContext);
                    handleCreateStoreRecord(storeFromContext);
                    // console.log("Context props", storeFromContext)
                }
            }

        } else {
            // console.log("Init Prop", initialProps.store)
            handleCreateStoreRecord(initialProps.store)
        }

    }, [id, initialProps, initialProps.store, stores])



    const {
        address = "",
        name = "",
        neighborhood = "",
        imgUrl = "https://images.unsplash.com/photo-1566705474094-5bf047ce2754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDA4NzN8MHwxfHNlYXJjaHwzfHxrb3JlYW4lMjBiYnF8ZW58MHx8fHwxNjQ3MzIzNDI1&ixlib=rb-1.2.1&q=80&w=400",
    } = store;

    const { data, error } = useSWR(`/api/getStoreRecordById?id=${id}`, fetcher)

    useEffect(() => {
        if (data && data.length > 0) {
            setStore(data[0]);

            setVotingCount(data[0].vote);
        }
    }, [data]);


    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    const handleVotingButton = async () => {
        setVotingCount(votingCount + 1)
    }

    if (error) {
        return (<div>Something went wrong</div>);
    }

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