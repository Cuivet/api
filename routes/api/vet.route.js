const router = require('express').Router();
const vetService = require('../../services/vet.service');

router.get('/all', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
  const vet = await vetService.findAll();
  res.json(vet);
});

router.get('/allByVetOwnerId/:vetOwnerId', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
  const vet = await vetService.findAllByVetOwnerId(req.params.vetOwnerId);
  res.json(vet);
});

router.get('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
  const vet = await vetService.findOne(req.params.id);
  res.json(vet);
});

router.post('/register', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
  const newVet = await vetService.save(req.body);
  res.json(newVet);
});

router.put('/', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
  const updatedVet = await vetService.save(req.body);
  res.json(updatedVet);
});

router.delete('/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
  const response = await vetService.remove(req.params.id);
  res.json(response);
});

router.post('/registerTemporalAssociation', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
    const newTemporalRegentAssociation = await vetService.saveTemporalAssociation(req.body);
  res.json(newTemporalRegentAssociation);
});

router.get("/temporalAssociationByCode/:code", async (req, res) => {
  console.log("Request to " + req.method + " on: " + req.baseUrl + req.url);
  try {
    const association = await vetService.findTemporalAssociationByCode(
      req.params.code
    );
    res.json(association);
  } catch (error) {
    if (error.message === "Code has expired") {
      res.status(410).send("El código ha expirado");
    } else {
      res.status(500).send("Asociación no existente");
    }
  }
});

router.get('/allByRegentId/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
  const vets = await vetService.findAllByRegentId(req.params.id);
  res.json(vets);
});

router.get('/allVetDataByIds/:id', async (req,res) => {
    console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
  const vets = await vetService.findAllVetDataByIds(req.params.id);
  res.json(vets);
});

router.put("/deactivate/:id", async (req, res) => {
  console.log("Request to " + req.method + " on: " + req.baseUrl + req.url);
  try {
    await vetService.deactivateVet(req.params.id);
    res.status(200).send({ message: "Vet deactivated successfully" });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.put("/activate/:id", async (req, res) => {
  console.log("Request to " + req.method + " on: " + req.baseUrl + req.url);
  try {
    await vetService.activateVet(req.params.id);
    res.status(200).send({ message: "Vet deactivated successfully" });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;