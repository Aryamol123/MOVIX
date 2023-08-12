import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchData } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration } from "./store/homeSlice";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import PageNotFound from "./pages/404/PageNotFound";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Explore from "./pages/explore/Explore";
import { getGenres } from "./store/homeSlice";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

  const fetchApiConfig = () => { 
    fetchData("/configuration")
      .then((res) => {
        const url = {
          backdrop:res.images.secure_base_url + "original",
          poster:res.images.secure_base_url + "original",
          profile:res.images.secure_base_url + "original"
        }

        dispatch(getApiConfiguration(url));
      })
      .catch((err) => {
        console.log(err);
      });
  };

   const genresCall = async() =>{
       let promises = [];
       let endPoints = ["tv","movie"];
       let allGenres = {};
      
       endPoints.forEach((url)=>{
         promises.push(fetchData(`/genre/${url}/list`))
       })

       const data = await Promise.all(promises);
       
       data.map(({genres}) =>{
          return genres.map((item) =>(allGenres[item.id] = item))
       })
       dispatch(getGenres(allGenres))         
   }

  useEffect(() => {
    fetchApiConfig();
    genresCall()
  }, []);
  return (
    <BrowserRouter>
    <Header/>
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path='/:mediaType/:id' element={<Details/>}/>
        <Route path='/search/:query' element={<SearchResult/>}/>
        <Route path='/explore/:mediaType' element={<Explore/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
