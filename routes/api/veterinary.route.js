const router = require("express").Router();
const veterinaryService = require("../../services/veterinary.service");

router.get("/all", async (req, res) => {
  console.log("Request to " + req.method + " on: " + req.baseUrl + req.url);
  const veterinarys = await veterinaryService.findAll();
  res.json(veterinarys);
});

router.get("/:id", async (req, res) => {
  console.log("Request to " + req.method + " on: " + req.baseUrl + req.url);
  const veterinary = await veterinaryService.findOne(req.params.id);
  res.json(veterinary);
});

router.get("/byMP/:mp", async (req, res) => {
  console.log("Request to " + req.method + " on: " + req.baseUrl + req.url);
  const veterinary = await veterinaryService.findOneByMP(req.params.mp);
  res.json(veterinary);
});

router.get("/VeterinaryDataByMP/:mp", async (req, res) => {
  console.log("Request to " + req.method + " on: " + req.baseUrl + req.url);
  try {
    const veterinaryData = await veterinaryService.findVeterinaryDataByMP(
      req.params.mp
    );
    res.json(veterinaryData);
  } catch {
    res
      .status(500)
      .send(
        "No existe un médico veteriario registrado con la matrícula ingresada "
      );
  }
});

router.post("/", async (req, res) => {
  console.log("Request to " + req.method + " on: " + req.baseUrl + req.url);
  const newVeterinary = await veterinaryService.save(req.body);
  res.json(newVeterinary);
});

router.put("/", async (req, res) => {
  console.log("Request to " + req.method + " on: " + req.baseUrl + req.url);
  const updatedVeterinary = await veterinaryService.save(req.body);
  res.json(updatedVeterinary);
});

router.delete("/:id", async (req, res) => {
  console.log("Request to " + req.method + " on: " + req.baseUrl + req.url);
  const response = await veterinaryService.remove(req.params.id);
  res.json(response);
});

module.exports = router;
