import Card from '../components/Card';
import Style from '../styles/Home.module.css'

const Index = () => {

  return (
    <div className={Style.container}>
      <h1>Mukarta</h1>

      <div className={Style.cardLayout}>

        <Card
          storeName={'Test 1'}
          className={Style.card}
        />

        <Card
          storeName={'Test 2'}
          className={Style.card}
        />

        <Card
          storeName={'Test 3'}
          className={Style.card}
        />

        <Card
          storeName={'Test 4'}
          className={Style.card}
        />

      </div>
    </div>
  );




};

export default Index;