import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import NewsBoard from './Components/NewsBoard';


const App = () => {
  
  const [category, setCategory] = useState("general")
  
  return (
    <>
    <Navbar setCategory = {setCategory}/>
    <NewsBoard category= {category} />
    
    </>

    
  )
}

export default App