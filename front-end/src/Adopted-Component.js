import './App.css';

function AdoptedComponent(props) {
    
    const adopted_animals = props.adopted_animals;
    const deadAnimal = props.deadAnimal;
    
    return (
        <div className='adopted-animals'>
        
            {(adopted_animals).map( animal => ( 
            <div className="adoptee-holder">
                <div key={animal.adopted_animals[0]._id} className="adoptee">
                  
                    <h2>{animal.adopted_animals[0].animal_name}</h2>
                    <p>{animal.adopted_animals[0].type}</p>
                    <p>{animal.adopted_animals[0].breed}</p>
                    <button className="delete_button" onClick={e => deadAnimal(animal._id)}>Delete Animal</button>

                </div>
            </div>
                
                    
                
            ))}
        </div>
     );
    
    
   
}

export default AdoptedComponent;