import React, { useEffect, useState } from 'react'
import Spinner from './components/Spinner'
import Card from './components/Card'
import Home from './components/Home'
import Sidediv from './components/Sidediv'
import End from './components/End'
import Error from './components/Error'
import img from './images/home_img.png'
import LoadingBar from 'react-top-loading-bar'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  const client_id = "0f70246f393a437ba134bd61d306f821"
  const client_secret = "62f2184855d6454db2626ec3f6e70bab"
  const url = "https://accounts.spotify.com/api/token"

  const [ser,setser] = useState("")
  const [ac,setAc] = useState("")
  const [albums , setAlbums] = useState([])
  const [load,setLoad] = useState(false)
  const [error , setError] = useState(false)
  const [progress , setProgress] = useState(0)


  useEffect(()=>{
    let auth = {
      method: "POST",
      headers:{
        'content-type' : 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret
    }
    fetch(url,auth).then(res => res.json()).then(data => setAc(data.access_token))
  },[])



  function searchhandle(event){
    setser(event.target.value)
  }
  function keyhandler(event){
    if(event.key==='Enter'){
      get()
    }
  }

  async function get(){
    setProgress(50)
    if(ser===""){
      toast.error("Please enter name of Artist")
      setProgress(100)
      return
    }
    setLoad(true)
    let para = {
      method: 'GET',
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer '+ ac
      }
    }
    
    let artist = await fetch('https://api.spotify.com/v1/search?q='+ ser +'&type=artist', para)
    let response = await artist.json()
    if(response.artists.items.length===0){
      setError(true)
      setLoad(false)
      return
    }
    let ID = await response.artists.items[0].id
    
    try{
      let fetch_albums = await fetch("https://api.spotify.com/v1/artists/" + ID + "/albums" + "?include_groups=album&market=US&limit=50" ,para)
      let res = await fetch_albums.json()
      let data  = await res.items
      setAlbums(data)
    }
    catch(e){
      console.log(e)
      setAlbums([])
    }
    setProgress(100)
    setLoad(false)
  }

  
  return (
    <>
    <LoadingBar
        className='loadingbar'
        color='red'
        progress={progress}
        shadow = "true"
        onLoaderFinished={() => setProgress(0)}
      />
   <div className='main_container'>
   <div className="homeimg">
   <img src= {img}/>
   </div>
      <div className="left">
        <Sidediv/>
      </div>

      <div className="center">
         <div className="search">
          <input 
          type="text"
          value={ser}
          onChange={searchhandle}
          onKeyDown={keyhandler}
          placeholder=' Ex. Honey Singh'
            />
          <button  onClick={get}>Search</button>
       </div>
      {
        load? (
          <Spinner/>
        ):
        (
          albums.length> 0?
          (
            <div className="card_container">
              {
                albums.map(album =>{
                  return(
                    <Card album={album}/>
                  )
                })
              }
            </div>
          ):
          (
            error ? (<Error/>):(<Home/>)
          )
        )
      }
      </div>
      
      <div className="left">
      <Sidediv/>
      </div>
   </div>
   <End/>
   </>
  );
}

export default App;
