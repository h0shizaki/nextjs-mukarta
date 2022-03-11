import Card from '../components/Card';
import Style from '../styles/Home.module.css'
import mockData from '../data/mockData.json'

export async function getStaticProps(context) {

  const data = mockData
  // console.log(data)
  return {
    props: {
      stores: data
    },
  }
}


const Index = (props) => {

  // console.log(props.stores)
  const stores = { props };
  return (
    <div className={Style.container}>
      <h1>Mukarta</h1>

      <div className={Style.cardLayout}>

        {stores && (

          <div className={Style.cardLayout}>
            {props.stores.map((store) => {
              // console.log(store)

              return (<Card
                key = {store.id}
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

export default Index;