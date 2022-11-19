import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { RootStoreContext } from "../../app/stores/rootStore";
import Feature from "./feature";
import FeaturedProdut from "./featuredProdcut";
import Footer from "./footer";
import Header from "./Header";
import RecentProducts from "./recentProduct";
import Reviews from "./reviews";
import Slider from "./slider";

const HomePage = () => {
  const rootStore = useContext(RootStoreContext);
  const [launch, setLaunch] = useState(false);
  const { productLoading, getProducts, products } = rootStore.productStore;

  useEffect(() => {
    if (!launch) {
      getProducts();
      setLaunch(true);
    }
  }, [launch]);
  return (
    <>
      <Header />
      <Slider />
      <Feature />
      {/* <FeaturedProdut /> */}
      <RecentProducts products={products} />
      <Reviews />
      <Footer />
    </>
  );
};

export default observer(HomePage);
