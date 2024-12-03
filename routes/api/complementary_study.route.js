const router = require("express").Router();
const complementaryStudyService = require("../../services/complementary_study.service");

// Crear un nuevo Complementary Study
router.post("/", async (req, res) => {
  console.log("Request to " + req.method + " on: " + req.baseUrl + req.url);
  try {
    const newCs = await complementaryStudyService.save(req.body);
    res.status(201).json({
      message: "Complementary Study creado correctamente",
      data: newCs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el Complementary Study" });
  }
});

// Obtener un Complementary Study por ID
router.get("/:id", async (req, res) => {
  console.log("Request to " + req.method + " on: " + req.baseUrl + req.url);
  try {
    const cs = await complementaryStudyService.findOne(req.params.id);
    if (!cs) {
      return res
        .status(404)
        .json({ message: "Complementary Study no encontrado" });
    }
    res.json(cs);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener el Complementary Study" });
  }
});

// Actualizar un Complementary Study
router.put("/:id", async (req, res) => {
  console.log("Request to " + req.method + " on: " + req.baseUrl + req.url);
  try {
    const updatedCs = await complementaryStudyService.updateOne(
      req.params.id,
      req.body
    );
    if (!updatedCs) {
      return res
        .status(404)
        .json({ message: "Complementary Study no encontrado para actualizar" });
    }
    res.json({
      message: "Complementary Study actualizado correctamente",
      data: updatedCs,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al actualizar el Complementary Study" });
  }
});

router.get("/studies/:vetId", async (req, res) => {
  const vetId = req.params.vetId;
  try {
    const studies = await complementaryStudyService.findAllStudiesByVetId(
      vetId
    );
    res.json(studies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/tutorStudies/:tutorId", async (req, res) => {
  const tutorId = req.params.tutorId;
  try {
    const studies = await complementaryStudyService.findAllStudiesByPetIds(
      tutorId
    );
    res.json(studies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
