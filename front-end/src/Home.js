import { useState, useEffect } from 'react';
import React from 'react'
import { Outlet, Link } from "react-router-dom";
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from 'axios';
import Store from './Store.js';
import AdoptedComponent from './Adopted-Component.js';


function Home() {
  const [error, setError] = useState("");
  const [stores, setStores] = useState([]);
  const [store_animals, setStoreAnimals] = useState([]);
  //const [img, setImg] = useState([]);
  const [store_name, setStoreName] = useState("");
  const [city, setCity] = useState("");
  const [update, setUpdate] = useState(true);
  const [animal_name, setAnimalName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [adopted_animals, setAdoptedAnimals] = useState([]);
  

  const fetchStores = async() => {
    try {
      const response = await axios.get("/app/store");
      setStores(response.data);
    } catch(error) {
      setError("error retrieving stores: " + error);
    }
  };
  
  const fetchAdoptedAnimals = async() => {
    try {
      const response = await axios.get("/app/adopted");
      setAdoptedAnimals(response.data);
      console.log(" WHAT YOU ARE LOOKING FOR: ");
      console.log(response.data);
    } catch(error) {
      setError("error retrieving adopted animals: " + error);
    }
  }
  
  
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
      fetchAdoptedAnimals();
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
  
  const addOneAdoptedAnimal = async(animal) => {
    animal.preventDefault();
    setUpdate(true);
  }

  const deleteStore = async(store) => {
    await deleteOneStore(store);
    setUpdate(true);
  };
  
  const adoptOneAnimal = async(store, index, animal) => {
    try {
      await axios.post("/app/adopted", animal);
      await axios.delete("/app/animal/" + store.store_name + "/" + index);
        
    } catch(error) {
      setError("error adopting an animal" + error);
    }
  }
  
  const adoptAnimal = async(store, index, animal) => {
    console.log("This is the animal I'm passing in:")
    console.log(animal);
    await adoptOneAnimal(store, index, animal);
    setUpdate(true);
  }
  
  const oneDeadAnimal = async(animal) => {
    try {
      await axios.delete("/app/adopted/" + animal);
        
    } catch(error) {
      setError("error deading an animal" + error);
    }
  }
  
  const deadAnimal = async(animal) => {
    await oneDeadAnimal(animal);
    setUpdate(true);
  };
  
  const addAnimal = async(store) => {
    await addOneAnimal(store);
    setUpdate(true);
  }
  
  const navigate = useNavigate();
  const navigateToAdopted = () => {
          navigate('/adopted');
      }
  
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
            type={type} setType={setType} breed={breed} setBreed={setBreed} 
            adopted_animals={adopted_animals} addOneAdoptedAnimal={addOneAdoptedAnimal}/>
          
        </div>
        
        <h1 className = 'adopted-header'>Animals that have been adopted!</h1>
        <div className="adopted-animals-holder">
          <AdoptedComponent adopted_animals={adopted_animals} deadAnimal={deadAnimal}/>
        </div>
        
        <div className="footer-holder">
          
            <div className="footer">
              <a href='https://github.com/makennahardy/animal_store'>GitHub</a>
            </div>
      </div>
      <Outlet />
    </div>
    );
    
}

export default Home;