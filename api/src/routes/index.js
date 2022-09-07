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
            altura: el.height.metric,
            peso: el.weight.metric,
            anosDeVida: el.life_span,
            imagen: el.image.url
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
 const infoTt = infoApi.concat(infoDb);
 return infoTt
};

router.get ("/dogs", async (req,res) =>{
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

router.get ("/temperaments", async(req,res) => {
    const tempApi = await axios.get ('https://api.thedogapi.com/v1/breeds')
    const temps = tempApi.data.map( n => n.temperament.split(',')) 
    const tempEach = temps.map (n => {
        for (let i = 0; i < n.length; i++)
        return n[i] })
        console.log(tempEach)
        tempEach.forEach(el => {
            temperament.findOrCreate({
                where : {name : el}
            })
        })
        const allTemperaments = await temperament.findAll();
        res.send(allTemperaments)
    })


module.exports = router;
