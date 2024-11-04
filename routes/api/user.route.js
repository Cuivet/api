const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const userService = require("../../services/user.service");

var cors = require("cors");
router.use(cors());

router.post(
  "/register",
  [
    check("user.password", "El password es obligatorio").not().isEmpty(),
    check("user.email", "El email es incorrecto").isEmail(),
  ],
  async (req, res) => {
    console.log("Request to " + req.method + " on: " + req.baseUrl + req.url);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errores: errors.array() });
    }
    try {
      res.json(await userService.checkUserAndGenerateCode(req.body));
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
);

router.post("/confirmRegister", async (req, res) => {
  console.log(
    "Request to confirm register" + req.method + " on: " + req.baseUrl + req.url
  );
  try {
    res.json(await userService.registerUser(req.body.email, req.body.code));
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post("/login", async (req, res) => {
  console.log("Request to " + req.method + " on: " + req.baseUrl + req.url);
  res.json(await userService.loginUser(req.body));
});

router.get("/profile", async (req, res) => {
  console.log("Request to " + req.method + " on: " + req.baseUrl + req.url);
  const profile = await userService.findProfile(req.headers.token);
  res.json(profile);
});

router.get("/all", async (req, res) => {
  console.log("Request to " + req.method + " on: " + req.baseUrl + req.url);
  const users = await userService.findAll(req.headers.token);
  res.json(users);
});

router.get("/all", async (req, res) => {
  console.log("Request to " + req.method + " on: " + req.baseUrl + req.url);
  const profile = await userService.findAll(req.headers.token);
  res.json(profile);
});

router.put("/deactivate/:id", async (req, res) => {
  console.log("Request to " + req.method + " on: " + req.baseUrl + req.url);
  const response = await userService.deactivateUser(req.params.id);
  res.json(response);
});

router.put("/activate/:id", async (req, res) => {
  console.log("Request to " + req.method + " on: " + req.baseUrl + req.url);
  const response = await userService.activateUser(req.params.id);
  res.json(response);
});

module.exports = router;
