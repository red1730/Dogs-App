const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Dog, Temp } = require("../db.js");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
  const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds");
  const apiInfo = await apiUrl.data.map((el) => {
    return {
      id: el.id,
      name: el.name,
      height: el.height.metric,
      weight: el.weight.metric,
      years: el.life_span,
      temperament: el.temperament,
      image: el.image.url,
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Dog.findAll({
    // hago un fin.all para que me traiga todo de la tabla Dog
    include: {
      model: Temp, // y a su vez incluya la tabla Temp
      attributes: ["name"], //
      through: {
        // mediante los atributos, comprobacion
        attributes: [],
      },
    },
  });
};

const getAllDogs = async () => {
  const infoApi = await getApiInfo();
  const infoDb = await getDbInfo();
  const infoTt = infoApi.concat(infoDb);
  return infoTt;
};

router.get("/dogs", async (req, res) => {
  const name = req.query.name;
  let dogsTotal = await getAllDogs();
  if (name) {
    const dogNames = await dogsTotal.filter((n) =>
      n.name.toLowerCase().includes(name.toLowerCase())
    );
    dogNames.length
      ? res.status(200).send(dogNames)
      : res.status(404).send({ message: "this is a error" });
  } else {
    res.status(200).send(dogsTotal);
  }
});

router.get("/temperament", async (req, res) => {
  const allData = await axios.get("https://api.thedogapi.com/v1/breeds");
  let everyTemperament = allData.data
    .map((dog) => (dog.temperament ? dog.temperament : "No info"))
    .map((dog) => dog?.split(", "));
  let eachTemperament = [...new Set(everyTemperament.flat())]; // aplana las matrices anidadas
  console.log(eachTemperament);
  eachTemperament.forEach((el) => {
    Temp.findOrCreate({
      where: { name: el },
    });
  });
  const allTemperaments = await Temp.findAll();
  res.send(allTemperaments);
});

router.get("/dogs/:id", async (req, res) => {
  const id = req.params.id;

  const dogsTotal = await getAllDogs();
  if (id) {
    let dogid = await dogsTotal.filter((el) => el.id == id);
    console.log(id);
    dogid.length
      ? res.status(200).json(dogid)
      : res.status(404).send("No se encontro esa raza");
  }
});

router.post("/dogs", async (req, res) => {
  console.log(JSON.stringify(req.body));
  let { name, height, weight, years, image, createdInDb, temperament } =
    req.body;
  const dogCreated = await Dog.create({
    name,
    height,
    weight,
    years,
    image,
    createdInDb,
    temperament,
  });
  let temperamentDb = await Temp.findAll({
    where: { name: temperament },
  });
  dogCreated.addTemp(temperamentDb);
  res.send("The race was successfully created");
});

router.delete("/dogs/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id)
  const totalDogs = await getAllDogs();
  if(id){
  let dogid = await totalDogs.filter(
    (el) => el.createInDb === true && el.id == id
  );
  console.log("este es el dogid", dogid)
  dogid.length
    ? res.status(200).json(
        await Dog.destroy({
          where: { id: id },
          truncate: {cascade: true},
        })
      )
    : res.status(404).send("no se puede eliminar cDb");
}});

// router.delete ('/:id', async (req,res) => {
//   const id =req.params.id ;
//   const dogstotal = Dog.removdogse
// })
module.exports = router;

// const dogsTotal = await getAllDogs();
//   if (id) {
//     let dogid = await dogsTotal.filter((el) => el.id == id);
//     console.log(id);
//     dogid.length
//       ? res.status(200).json(dogid)
//       : res.status(404).send("No se encontro esa raza");
