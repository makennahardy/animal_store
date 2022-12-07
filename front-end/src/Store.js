import './App.css';
import StoreAnimal from './Store_Animal.js';

function Store(props) {
    
    const stores = props.stores;
    const deleteStore = props.deleteStore;
    const adoptAnimal = props.adoptAnimal;
    const addAnimal = props.addAnimal;
    const animal_name = props.animal_name;
    const setAnimalName = props.setAnimalName;
    const type = props.type;
    const setType = props.setType;
    const breed = props.breed;
    const setBreed = props.setBreed;
    
    console.log("stores: ");
    console.log(stores);
    
    return (
        <div className="store_holder">
        
            {stores.map( store => ( 
            <div key={store.id} className="store">
                <div className="name_city">
                    
                    <div className="store_stats">
                        <h2>{store.store_name}</h2>
                        <h4><i>{store.city}</i></h4>
                        <button className="delete_button" onClick={e => deleteStore(store)}>Delete Store</button>
                    </div>
                
                    
                    <div className="store_animals">
                        <StoreAnimal store={store} adoptAnimal={adoptAnimal}/>
                    </div>
                    
                  
                    <form onSubmit={e => addAnimal(store)}>
                    <h2> New Animal? </h2>
                    <div className="animal_form">
                      <div>
                        <label>
                          Animal Name?:
                          <input type="text" value={animal_name} onChange={e => setAnimalName(e.target.value)} />
                        </label>
                      </div>
                      <div>
                        <label>
                          Type of Animal?:
                          <input type="text" value={type} onChange={e=>setType(e.target.value)}></input>
                        </label>
                      </div>
                      <div>
                        <label>
                          Breed of Animal?:
                          <input type="text" value={breed} onChange={e=>setBreed(e.target.value)}></input>
                        </label>
                      </div>
                      </div>
                      <input class = "submit_button" type="submit" value="Add Animal" />
                    </form>
                  
                    
                </div>
                <hr></hr>
            </div> 
            ))}
        </div>
     );
    
    
   
}

export default Store;