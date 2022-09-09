const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const { Dog, Temp} = require ('../db.js')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const apiUrl = await axios.get ('https://api.thedogapi.com/v1/breeds')
    const apiInfo = await apiUrl.data.map ( el => {
        return {
            id:  el.id,
            name: el.name,
            height: el.height.metric,
            weight: el.weight.metric,
            years: el.life_span,
            image: el.image.url
        };
    });
    return apiInfo
};

const getDbInfo = async () => {
    return await Dog.findAll({ // hago un fin.all para que me traiga todo de la tabla Dog
        include: {
            model: Temp, // y a su vez incluya la tabla Temp
            attributes :['name'], // 
            through: { // mediante los atributos, comprobacion
                attributes: [],
            }
        },
    })
};

const getAllDogs = async () => {
   const infoApi = await getApiInfo();
    const infoDb = await getDbInfo() ;
    const infoTt = infoApi.concat(infoDb)
 return infoTt
};

router.get("/dogs", async (req,res) => {
    const name = req.query.name
    let dogsTotal = await getAllDogs()
    if(name){
    const dogName = await dogsTotal.filter(n => n.name.toLowerCase().includes(name.toLowerCase()))
    dogName.length ?
    res.status(200).send(dogName) :
    res.status(404).send(`Lo sentimos, ${name}, no se encontro.`)
    } else {
     res.status(200).send(dogsTotal)
    }
});

// router.get ("/temperaments", async(req,res) => {
//     const tempApi = await axios.get ('https://api.thedogapi.com/v1/breeds')
//     const temps = tempApi.data.map( n => n.temperament.split(",")) 
//     const tempEach = temps.map (n => {
//         for (let i = 0; i < n.length; i++)
//         return n[i] })
//         console.log(tempEach)
//         tempEach.forEach(el => {
//             Temp.findOrCreate({
//                 where : {name : el}
//             })
//         })
//         const allTemperaments = await Temp.findAll();
//         res.send(allTemperaments)
//     })

router.get("/temperament", async (req, res) => {
    const allData = await axios.get('https://api.thedogapi.com/v1/breeds');        
    let everyTemperament = allData.data.map((dog) => (dog.temperament ? dog.temperament : "No info"))
    .map((dog) => dog?.split(", "));
    let eachTemperament = [...new Set(everyTemperament.flat())]; // aplana las matrices anidadas
    console.log(eachTemperament)
    eachTemperament.forEach(el => {
        Temp.findOrCreate({
        where: { name: el },              
         })
        });
    const allTemperaments = await Temp.findAll();
    res.send(allTemperaments)       
});

router.post('/dogs',async (req,res)=>{   
        let {
            name,
            height,
            weight,
            years,
            image,
            createdInDb,
            temperament} =req.body;
        const dogCreated= await Dog.create({
            name,
            height,
            weight,
            years,
            image,
            createdInDb,
            temperament
        })
        let temperamentDb= await Temp.findAll({ 
            where: {name: temperament}
        })
dogCreated.addTemp(temperamentDb)
res.send('La raza fue creada con Exito')  
});

router.get('/dogs/:id' , async (req,res) => {
const id = req.params.id 
const dogsTotal = await getAllDogs()
if (id){
    let dogId = await dogsTotal.filter(el => el.id === id)
    dogId.length ?
    res.status(200).json(dogId) :
    res.status(404).send ('No se encontro esa raza')
}
});
module.exports = router;
