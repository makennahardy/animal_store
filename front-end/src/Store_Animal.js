import './App.css';

function StoreAnimal(props) {
    const store = props.store;
    const adoptAnimal = props.adoptAnimal;
   
    
    return (
        <div>
           
            {(store.store_animals).map( (store_animal , index) => (
            <div>
                <div key={store_animal.id} className="store_animal">
                    
                        <strong><p>{store_animal.animal_name}</p></strong>
                        <p>{store_animal.type}</p>
                        <p>{store_animal.breed}</p>
                        
                    <div className="adopted_button">
                        <button onClick={()=>adoptAnimal(store,index,store_animal)}>Adopted!</button>
                    </div>
                </div>
                
            </div>
                
            ))}
                
        </div>
     );
    
    
   
}

export default StoreAnimal;