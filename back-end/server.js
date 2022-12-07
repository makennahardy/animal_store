const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//ANIMAL//
const animalSchema = new mongoose.Schema({
  animal_name: String,
  type: String,
  breed: String
});

animalSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
  
animalSchema.set('toJSON', {
  virtuals: true
});

//STORE//
const storeSchema= new mongoose.Schema({
  store_name: String,
  city: String,
  store_animals: [animalSchema]
})

storeSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
  
storeSchema.set('toJSON', {
  virtuals: true
});



const Store = mongoose.model('Store', storeSchema);
//const Animal = mongoose.model('Animal', animalSchema);

//middleware

//FOR STORE//
app.get("/app/store", async (req,res) => {
    try {
        let stores = await Store.find();
        res.send(stores);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

app.post('/app/store', async (req, res) => {
    const store = new Store({
    store_name: req.body.store_name,
    city: req.body.city,
    store_animals: req.body.store_animals
  });
  try {
    await store.save();
    res.send({store:store});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/app/store/:id', async (req, res) => {
  try {
    await Store.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


//FOR ANIMAL//
/*
app.get("/api/animal", async (req,res) => {
    try {
        let animals = await Animal.find();
        res.send(animals);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})*/

/*
app.post('/api/animal', async (req, res) => {
    const animal = new Animal({
    animal_name: req.body.animal_name,
    type: req.body.type,
    breed: req.body.breed
  });
  try {
    await animal.save();
    res.send({animal:animal});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}); */


app.post('/app/animal/:store_name', async (req, res) => {
  try {
    const {store_name} = req.params
    const store = await Store.findOne({store_name})
    store.store_animals.push(req.body);
    store.save()
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.delete('/app/animal/:store_name/:id', async (req, res) => {
  try {
    const { store_name, id } = req.params;
    const store = await Store.findOne({store_name})
    store.store_animals.splice(id, 1)
    store.save()
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// connect to the database
mongoose.connect('mongodb://localhost:27017/animal_stores', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var db = mongoose.connection;

db.once('open', () => {
  console.log("Connection successful");
  
  const og_store_list = [
    {store_name: "PetCo", city: "Provo", 
    store_animals:  [ {
                        animal_name: "Cleo",
                        type: "Cat",
                        breed: "Siamese"
                      },
                      {
                        animal_name: "Claire",
                        type: "Cat",
                        breed: "Persian"
                      },
                      {
                        animal_name: "Crispy",
                        type: "Cat",
                        breed: "Burmese"
                      },
                      {
                        animal_name: "Geico",
                        type: "Lizard",
                        breed: "Gecko"
                      } ]
    },
    //{store_name: "PetsRUs", city: "Provo"},
    {store_name: "We Only Love Birds", city: "Salt Lake City",
    store_animals:  [ {
                        animal_name: "Jerry",
                        type: "Bird",
                        breed: "Parakeet"
                      },
                      {
                        animal_name: "Paul",
                        type: "Bird",
                        breed: "Parrot"
                      }, 
                      {
                        animal_name: "Rodizio",
                        type: "Bird",
                        breed: "Toucan"
                      }, 
                      {
                        animal_name: "Stuffing",
                        type: "Bird",
                        breed: "Turkey"
                      } ]
    },
    {store_name: "PETS R US", city: "Ogden",
    store_animals:  [ {
                          animal_name: "Bob",
                          type: "Dog",
                          breed: "Fluffy"
                        },
                        {
                          animal_name: "Chocolate",
                          type: "Dog",
                          breed: "Labrador"
                        }, 
                        {
                          animal_name: "Fido",
                          type: "Lizard",
                          breed: "Chameleon"
                        } ]
    }
    ];
    
    
    Store.collection.insertMany(og_store_list, (err, store) => {
      if (err){ 
          return console.error(err);
      } else {
        console.log("Multiple documents inserted to Collection");
      }
    });
  
 // og_store_list.save( (err, store) => {
  //  if (err) return console.error(err);
  //    console.log(store.name + " saved to store collection.");
  //});
});


app.listen(3003, () => console.log('Server listening on port 3003!'));