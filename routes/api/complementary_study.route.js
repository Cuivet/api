const router = require('express').Router();
const complementaryStudyService = require('../../services/complementary_study.service');

// Obtener un Complementary Study por ID
router.get('/:id', async (req, res) => {
  console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
  try {
    const cs = await complementaryStudyService.findOne(req.params.id);
    if (!cs) {
      return res.status(404).json({ message: "Complementary Study no encontrado" });
    }
    res.json(cs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el Complementary Study" });
  }
});

// Actualizar un Complementary Study
router.put('/:id', async (req, res) => {
  console.log('Request to ' + req.method + ' on: ' + req.baseUrl + req.url);
  try {
    const updatedCs = await complementaryStudyService.updateOne(req.params.id, req.body);
    if (!updatedCs) {
      return res.status(404).json({ message: "Complementary Study no encontrado para actualizar" });
    }
    res.json({ message: "Complementary Study actualizado correctamente", data: updatedCs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el Complementary Study" });
  }
});

module.exports = router;
