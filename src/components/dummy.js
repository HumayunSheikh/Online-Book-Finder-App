import logo from './logo.svg';
import loader from './loader.gif';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import Main from './Components/Main';
import './Components/style.css';

function App() {

  const[search , setsearch] = useState(""); //For Search
  const[book , getbooks] = useState([]); //For Getting All books
  const[loading , getloading] = useState(false); //For Getting All books

  const searchbook=(e)=>{
    if(e.key==="Enter"){
      console.log("Key Pressed....");
      getloading(true);

      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyA_5ie82WV7znpzJ-3_jKIX4XCRwQQc5XM`
        )
        .then(function (response) {
          // handle success
          console.log(response.data.items);
         console.log(search);
          getbooks(response.data.items);
          getloading(false);

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }

  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="text" placeholder='search your book...' value={search} onChange={(e)=>setsearch(e.target.value)}
          onKeyPress={searchbook}/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <>
      <Main/>
    </>
        

   

{loading ? (
        // <p>Loading ...</p>
        <img src={loader} className="App-logo" alt="logo" />
      ) : (
        <ul>
            {
            book.map((item,id)=>{
          let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail;
          return(
            
            <div key={id}>

              <img src={thumbnail} className="App-logo" alt="logo" />
            </div>

            

          )
        })
        }
        </ul>
      )}


     
        
      </header>
    </div>
  );
}

export default App;
