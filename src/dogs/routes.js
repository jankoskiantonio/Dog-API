const { Router } = require("express");
const controller = require('./controller');

const router = Router();

router.get("/list/all", controller.getBreeds);
router.post("/create/breed", controller.addBreed);
router.get("/:breed/images/random", controller.getRandomBreedImage);
router.get("/:breed/:sub_breed/images/random", controller.getRandomBreedImageWithSubBreed);
router.post("/create/image", controller.addImage);
module.exports = router;