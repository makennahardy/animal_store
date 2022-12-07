import './App.css';

function StoreAnimal(props) {
    const store = props.store;
    console.log("Specific Store: ")
    console.log(store);
    const adoptAnimal = props.adoptAnimal;
    

    return (
        <div>
           
            {(store.store_animals).map( store_animal => (
            <div>
                <div key={store_animal.id} className="store_animal">
                    
                        <strong><p>{store_animal.animal_name}</p></strong>
                        <p>{store_animal.type}</p>
                        <p>{store_animal.breed}</p>
                    <div className="adopted_button">
                        <button  onClick={e => adoptAnimal(store, store_animal.id)}>Adopted!</button>
                    </div>
                </div>
                
            </div>
                
            ))}
                
        </div>
     );
    
    
   
}

export default StoreAnimal;




