//List of queries that the controllers use to handle requests appropriately

const getBreeds = "SELECT * FROM breeds";
const getBreedByName = "SELECT * FROM breeds WHERE breed = $1";
const checkBreedExists = "SELECT b FROM breeds b WHERE b.breed = $1";
const addBreed = "INSERT INTO breeds (breed, sub_breed) VALUES ($1, $2)";
const getSpecificBreed = "SELECT * FROM breeds WHERE breed = $1 AND $2 = ANY(sub_breed)";
const getImage = "SELECT link FROM images WHERE breed = $1 ORDER BY random() LIMIT 1;";
const getImageWithSubBreed = "SELECT link from images WHERE breed = $1 AND sub_breed = $2 ORDER BY random() LIMIT 1;";
const addImage = "INSERT INTO images (link, breed, sub_breed) VALUES ($1, $2, $3)";

module.exports = {
    addBreed,
    addImage,
    checkBreedExists,
    getBreeds,
    getBreedByName,
    getSpecificBreed,
    getImage,
    getImageWithSubBreed,
};