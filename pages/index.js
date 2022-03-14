import Card from '../components/Card';
import Style from '../styles/Home.module.css'
import Banner from '../components/Banner';
import fetchShabuStores from "../lib/shabuStore";

import { useContext, useState } from 'react';
import { StoreContext } from '../store/store-context';

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
  

  //Search function

  const buttonClicked = () => {
    handleTrackLocation();
  }

  console.log(state)


  // console.log(props.stores)
  const stores = { props };
  return (
    <div className={Style.container}>
      <Banner
        title={'Mukarta'}
        header={"Don't know place to party we can help!"}
        buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
        searchClicked={buttonClicked}
      />

      {locationErrorMsg && (
        <div className={Style.normalText} >
          Something went wrong : {locationErrorMsg}
        </div>
      )}


      <h2 className={Style.menuText}>Mukarta in chiangmai</h2>
      <div className={Style.cardLayout}>

        {stores && (

          <div className={Style.cardLayout}>
            {props.stores.map((store) => {
              // console.log(store)

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
