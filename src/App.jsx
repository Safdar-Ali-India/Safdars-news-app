import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import NewsBoard from './Components/NewsBoard';
import Footer from './Components/Footer';


const App = () => {
  
  const [category, setCategory] = useState("general")
  
  return (
    <>
    <Navbar setCategory = {setCategory} category={category}/>
    <NewsBoard category= {category} />
    <Footer />
    </>

    
  )
}

export default App