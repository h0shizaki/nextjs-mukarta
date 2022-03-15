import Card from '../components/Card';
import Style from '../styles/Home.module.css'
import Banner from '../components/Banner';
import fetchShabuStores from "../lib/shabuStore";

import { useContext, useState, useEffect } from 'react';
import { ACTION_TYPES, StoreContext } from '../store/store-context';

import useTrackLocation from '../hooks/use-track-location';



export async function getStaticProps(context) {
  const data2 = await fetchShabuStores();
  // console.log(data2)

  return {
    props: {
      stores: data2
    },
  }
}


export default function Home(props) {
  // console.log(useTrackLocation)
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } = useTrackLocation();
  const { dispatch, state } = useContext(StoreContext);

  const { stores, latLong } = state;

  // console.log(stores);

  const [storesError, setStoresError] = useState('');

  //Search function

  const buttonClicked = () => {
    handleTrackLocation();
  }

  //Get store when receive user location
  useEffect(async () => {
    if (latLong) {

      try {
        let limit = 30;
        const res = await fetch(`/api/getStoresByLocation?latLong=${latLong}&limit=${limit}`);
        const fetchedStoresData = await res.json();

        dispatch({
          type: ACTION_TYPES.SET_STORES,
          payload: { stores: fetchedStoresData }
        })

        setStoresError('');

      } catch (err) {
        console.error({ err })
        setStoresError(err.message)

      }

      // console.log(state)
    }

  }, [latLong])



  // console.log(props.stores)

  return (
    <div className={Style.container}>
      <Banner
        title={'Mukarta'}
        header={"Don't know place to party we can help!"}
        buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
        searchClicked={buttonClicked}
      />

      {storesError && (
        <div className={Style.normalText} >
          Something went wrong : {storesError}
        </div>
      )}

      {locationErrorMsg && (
        <div className={Style.normalText} >
          Something went wrong : {locationErrorMsg}
        </div>
      )}

      {stores.length > 0 &&
        <>
          <div style={{ "marginTop": "4.5em" }}>
            <h2 className={Style.menuText}>Mukarta near me</h2>
          </div>

          <div className={Style.cardLayout}>
            {stores.map((store) => {
              return (<Card
                key={store.id}
                storeName={store.name}
                href={`/store/${store.id}`}
                imgUrl={store.imgUrl}
                className={Style.card}
              />)
            })}

          </div>

        </>
      }



      <div style={{ "marginTop": "4.5em" }}>
        <h2 className={Style.menuText}>Mukarta Na moor</h2>
      </div>

      <div className={Style.cardLayout}>

        {props.stores && (

          <div className={Style.cardLayout}>
            {props.stores.map((store) => {

              return (<Card
                key={store.id}
                storeName={store.name}
                href={`/store/${store.id}`}
                imgUrl={store.imgUrl}
                className={Style.card}
              />)
            })}
          </div>

        )}


      </div>
    </div>
  );




};
