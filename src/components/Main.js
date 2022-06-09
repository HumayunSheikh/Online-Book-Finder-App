import react ,{useState}from "react";
import axios from "axios";
import girlimage from '../bg2.png';
import Cards  from "./Cards";
import loader from '../loader.gif'

function Main(){
    const [search,setSearch]=useState("");
    const [bookData,setData]=useState([]);
    const[loading , getloading] = useState(false); //For Getting All books

    const searchBook=(e)=>{
        if(e.key==="Enter"){
            console.log("Key Pressed....");
            getloading(true);
      
            axios
              .get(
                `https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyA_5ie82WV7znpzJ-3_jKIX4XCRwQQc5XM`
              )
              .then(function (response) {
                // handle success
                // console.log(response.data.items);
               console.log(search);
               setData(response.data.items);
                getloading(false);
      
              })
              .catch(function (error) {
                // handle error
                console.log(error);
              });
          }
    }
    return(
        <>
            <div className="header">
                <div className="row1">
                    <h1>A room without books is like<br/> a body without a soul.</h1>
                </div>
                <div className="row2">
                    <h2>Find Your Book</h2>
                    <div className="search">
                        <input type="text" placeholder="Enter Your Book Name"
                        value={search} onChange={e=>setSearch(e.target.value)}
                        onKeyPress={searchBook}/>
                        <button><i className="fas fa-search"></i></button>
                    </div>
                    <img src={girlimage} alt="girl" />
                </div>
            </div>

            <div className="container">
              

                    {loading ? (
        // <p>Loading ...</p>
        <img src={loader} className="loader" alt="logo" />
      ) : (
        <Cards book={bookData}/>
        // <img src={loader} className="App-logo" alt="logo" />

      )}
                
            </div>
        </>
    )
}
export default Main;