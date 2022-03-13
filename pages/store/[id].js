import mockData from '../../data/mockData.json'
import Image from "next/image";
import Link from "next/link";
import fetchShabuStores from '../../lib/shabuStore';

export async function getStaticProps(staticProps) {

    const params = staticProps.params;

    const stores = await fetchShabuStores();
    const findStoreById = stores.find((store) => {
        return store.id.toString() === params.id;
    })

    // console.log(findStoreById) ;
    return {
        props: {
            store: findStoreById? findStoreById : {},
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
        fallback: true // false or 'blocking'
    };
}

const Store = (props) => {

    const { id, name, imgUrl } = props.store;


    return (
        <div>
            <Link href='/.'><a>back</a></Link>
            <h2> Hello This is store id #{id}</h2>
            <h3>{name}</h3>
            <Image src={imgUrl} width={300} height={200} />

        </div>
    )

}

export default Store;