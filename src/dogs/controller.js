//Defines functions that the API will use for handling each request appropriately.

const { resolve } = require('path/posix');
const pool = require('../../db');
const queries = require('./queries');
const { error } = require('console');
const { response } = require('express');

const getBreeds = (req, res) => {
  pool.query(queries.getBreeds, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const adjustedData = {};

    for (let i = 0; i < results.rows.length; i++) {
      const { breed, sub_breed } = results.rows[i];

      if (Array.isArray(sub_breed)) {
        adjustedData[breed] = sub_breed;
      } else if (sub_breed) {
        adjustedData[breed] = sub_breed
          .replace(/[' "]/g, '')
          .split(',');
      } else {
        adjustedData[breed] = [];
      }
    }

    const response = { message: adjustedData, status: 'success' };

    res.status(200).json(response);
  });
};

const getRandomBreedImage = (req, res) => {
  const breed = req.params.breed;
  pool.query(queries.getImage, [breed], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Breed not found' });
    }
    res.status(200).json({ message: results.rows[0].link, status: 'success' });
  });
};

const getRandomBreedImageWithSubBreed = (req, res) => {
  const { breed, sub_breed } = req.params;
  const values = [breed, sub_breed];

  pool.query(queries.getSpecificBreed, values, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const breedRow = results.rows[0];
    if (!breedRow || !breedRow.sub_breed.includes(sub_breed)) {
      return res.status(404).json({ error: 'Breed or sub-breed not found' });
    }

    pool.query(queries.getImageWithSubBreed, [breed, sub_breed], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (results.rows.length === 0) {
        return res.status(404).json({ error: 'Image not found' });
      }
      res.status(200).json({ message: results.rows[0].link, status: 'success' });
    });
  });
};

const addBreed = (req, res) => {
  const { breed, sub_breed } = req.body;
  pool.query(queries.checkBreedExists, [breed], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.rows.length) {
      return res.status(400).json({ error: 'Breed already exists' });
    }

    pool.query(queries.addBreed, [breed, sub_breed], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }

      res.status(201).send('Breed added successfully.');
    });
  });
};

const addImage = (req, res) => {
  const { link, breed, sub_breed } = req.body;
  pool.query(queries.addImage, [link, breed, sub_breed], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(201).send('Image added successfully.');
  });
};
module.exports = {
    getBreeds,
    getRandomBreedImage,
    getRandomBreedImageWithSubBreed,
    addBreed,
    addImage
}