import { useState, useEffect } from 'react';
import axios from 'axios';
//import StoreCity from './Store_City.js';
import Store from './Store.js';
import './App.css';

function App() {
  // setup state
  const [error, setError] = useState("");
  //const [animals, setAnimals] = useState([]);
  const [stores, setStores] = useState([]);
  const [store_animals, setStoreAnimals] = useState([]);
  const [store_name, setStoreName] = useState("");
  const [city, setCity] = useState("");
  const [update, setUpdate] = useState(true);
  const [animal_name, setAnimalName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");


  const fetchStores = async() => {
    try {
      const response = await axios.get("/app/store");
      setStores(response.data);
    } catch(error) {
      setError("error retrieving stores: " + error);
    }
  };
  
  /*
  const fetchAnimals = async(animal) => {
    try {      
      const response = await axios.get("/app/animal" + animal.id);
      setStoreAnimals(response.data);
    } catch(error) {
      setError("error retrieving animals: " + error);
    }
  }
  */
  
  const createStore = async() => {
    try {
      await axios.post("/app/store", {store_name: store_name, city: city, store_animals: store_animals});
    } catch(error) {
      setError("error adding a store: " + error);
    }
  };
  
  const deleteOneStore = async(store) => {
    try {
      await axios.delete("/app/store/" + store.id);
    } catch(error) {
      setError("error deleting a store" + error);
    }
  };
  
  const adoptOneAnimal = async(store, animal_id) => {
    try {
      await axios.delete("/app/animal/" + store.store_name + "/" + animal_id);
    } catch(error) {
      setError("error adopting an animal" + error);
    }
  }
  
  const addOneAnimal = async(store) => {
    try {
      await axios.post("/app/animal/" + store.store_name, {animal_name: animal_name, type: type, breed: breed});
    } catch(error) {
      setError("error adding a store: " + error);
    }
  }

  // fetch ticket data
  useEffect(() => {
    if (update) {
      fetchStores();
      setUpdate(false);
    }
  },[update]);

  const addStore = async(e) => {
    e.preventDefault();
    await createStore();
    //console.log("MY STORES")
    //console.log(stores);
    setUpdate(true);
    //setStoreAnimals([]);
  };

  const deleteStore = async(store) => {
    await deleteOneStore(store);
    setUpdate(true);
  };
  
  const adoptAnimal = async(store, animal_id) => {
    await adoptOneAnimal(store, animal_id);
    setUpdate(true);
  }
  
  const addAnimal = async(store) => {
    await addOneAnimal(store)
    setUpdate(true);
  }
  

  // render results
  return (
    <div className="App">
      <div className="header-holder">
            <div className="header">
              <h1> Keep track of the incoming and adopted animals in your state! </h1>
            </div>
      </div>
      {error}
      <h2>Add an Animal Store:</h2>
      <div className="add_a_store">
        
        <form onSubmit={addStore}>
          <div>
            <label className="form-text">
              Name:
              <input type="text" value={store_name} onChange={e => setStoreName(e.target.value)} />
            </label>
          </div>
          <div>
            <label className="form-text">
              City:
              <input value={city} onChange={e=>setCity(e.target.value)}></input>
            </label>
          </div>
          <input class="submit_button" type="submit" value="Submit" />
        </form>
      </div>
      
        <h2 className="current-animal-stores">Current Animal Stores</h2>
        <div className="store_holder_holder">
          <Store stores={stores} deleteStore={deleteStore} adoptAnimal={adoptAnimal} 
            addAnimal={addAnimal} animal_name={animal_name} setAnimalName={setAnimalName} 
            type={type} setType={setType} breed={breed} setBreed={setBreed}/>
          
        </div>
        
        <div className="footer-holder">
            <div className="footer">
              <a href='https://github.com/makennahardy/animal_store'>GitHub</a>
            </div>
      </div>
    </div>   
  );
}

export default App;