const pool = require('./db');
const { Pool } = require("pg");

/*const clearDatabaseQuery = `
DROP DATABASE IF EXISTS breeds;
`
const createDatabaseQuery = `
CREATE DATABASE breeds;
`*/

const createBreedTableQuery = `
DROP TABLE IF EXISTS breeds;
CREATE TABLE IF NOT EXISTS breeds
(
    breed character varying COLLATE pg_catalog."default" NOT NULL,
    sub_breed character varying[] COLLATE pg_catalog."default",
    CONSTRAINT breeds_pkey PRIMARY KEY (breed),
    CONSTRAINT breeds_unique UNIQUE (breed)
        INCLUDE(breed)
);`;

const populateBreedTableQuery = `
INSERT INTO breeds (breed, sub_breed) VALUES
('bulldog', ARRAY['boston', 'english', 'french']),
('eskimo', NULL),
('hound', ARRAY['blood', 'english']),
('mountain', ARRAY['bernese', 'swiss']),
('pitbull', NULL),
('retriever', ARRAY['curly', 'flatcoated', 'golden']),
('rottweiler', NULL),
('samoyed', NULL),
('shiba', NULL),
('shihtzu', NULL);
`;

const createImageTableQuery = `
DROP TABLE IF EXISTS images;
CREATE TABLE IF NOT EXISTS images
(
    link character varying COLLATE pg_catalog."default" NOT NULL,
    breed character varying COLLATE pg_catalog."default" NOT NULL,
    sub_breed character varying COLLATE pg_catalog."default",
    CONSTRAINT images_pkey PRIMARY KEY (link),
    CONSTRAINT fk_breed FOREIGN KEY (breed)
        REFERENCES breeds (breed) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);`;

const populateImageTableQuery = `
INSERT INTO images (link, breed, sub_breed) VALUES
('https://upload.wikimedia.org/wikipedia/commons/d/d7/Boston-terrier-carlos-de.JPG', 'bulldog', 'boston'),
('https://i.pinimg.com/564x/ac/61/a7/ac61a7dcebce8b93e4a9c53b0d3e29d7.jpg', 'bulldog', 'boston'),
('https://www.pumpkin.care/wp-content/uploads/2021/03/BostonTerrier-Hero.jpg', 'bulldog', 'boston'),
('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Bulldog_inglese.jpg/1200px-Bulldog_inglese.jpg', 'bulldog', 'english'),
('https://www.thesprucepets.com/thmb/zXkzVVV5P8h2JG0ZUFtXtvIq-lM=/3600x0/filters:no_upscale():strip_icc()/bulldog-4584344-hero-8b60f1e867f046e792ba092eec669256.jpg', 'bulldog', 'english'),
('https://cdn.britannica.com/07/234207-050-0037B589/English-bulldog-dog.jpghttps://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Bulldog_inglese.jpg/1200px-Bulldog_inglese.jpg', 'bulldog', 'english'),
('https://cdn.britannica.com/44/233844-050-A0F9F39C/French-bulldog.jpg', 'bulldog', 'french'),
('https://www.purina.co.uk/sites/default/files/styles/square_medium_440x440/public/2022-07/French-Bulldog.jpg?itok=I5aDJHqi', 'bulldog', 'french'),
('https://global-uploads.webflow.com/59dbe1c3542805000192616b/62f39e4f0b52a6a9d2126d63_French%20Bulldog%20Full-min.png', 'bulldog', 'french'),
('https://www.firthvet.com/wp-content/uploads/2023/01/american-eskimo-g451b5f062_1920.jpg', 'eskimo', NULL),
('https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12154700/American-Eskimo-puppy-sitting-in-the-grass.jpg', 'eskimo', NULL),
('https://www.dailypaws.com/thmb/jBj5iIZEzYsDjCiJd-Ke1fQuKVY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/american-eskimo-dog-grass-146784693-2000-61b75a34427c435686c87aad3496dcd5.jpg', 'eskimo', NULL),
('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Bloodhound_Erland22.jpg/800px-Bloodhound_Erland22.jpg', 'hound', 'blood'),
('https://topdogtips.com/wp-content/uploads/2022/06/american-bloodhound-profile-1021x580.jpg', 'hound', 'blood'),
('https://media-be.chewy.com/wp-content/uploads/2021/06/02120800/Bloodhound_FeaturedImage-Specs-768x461.jpg', 'hound', 'blood'),
('https://www.thesprucepets.com/thmb/8g2kjd0C5gyLC1jLMj0HIa0tYyk=/3008x0/filters:no_upscale():strip_icc()/GettyImages-93607391-ff031ae6911a4e9c94c1528371a1f3b1.jpg', 'hound', 'english'),
('https://cdn-images.vetstreet.com/0f/38/55ad95bb4dbcb5615b0aed3a4438/english-foxhound-ap-1eaea4.jpg', 'hound', 'english'),
('https://doglime.com/wp-content/uploads/2019/03/English-Foxhound-Information..jpg', 'hound', 'english'),
('https://www.thesprucepets.com/thmb/VSHG310pF30ZDEem5sbro6EKhkU=/1500x0/filters:no_upscale():strip_icc()/bernese-mountain-dog-4427890-hero-21e3d74070d0462cb9b7301491f37ec4.jpeg', 'mountain', 'bernese'),
('https://images.squarespace-cdn.com/content/v1/61ccb17203b2956faba35dce/dacdd013-486b-4095-ba21-34ad4019bd31/Bernese+Mountain+Dogs+Are+cute+as+puppy.jpg', 'mountain', 'bernese'),
('https://cdn.britannica.com/49/161649-050-3F458ECF/Bernese-mountain-dog-grass.jpg', 'mountain', 'bernese'),
('https://www.petfinder.com/sites/default/files/images/content/greater-swiss-mountain-dog-detail-scaled.jpg', 'mountain', 'swiss'),
('https://www.akc.org/wp-content/uploads/2017/11/Greater-Swiss-Mountain-Dog-laying-down-in-the-grass.jpg', 'mountain', 'swiss'),
('https://www.dogsnsw.org.au/media/img/BrowseAllBreed/Great-Swiss-Mountain-Dog.jpg', 'mountain', 'swiss'),
('https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cq_auto:eco%2Cw_1200/MTk2MTcwNDk2NjQ2MDYzMjQ5/why-pitbull-dog-is-banned-in-25-countries.png', 'pitbull', NULL),
('https://www.dailypaws.com/thmb/y925Oz1taslCKB4kRS_JuWc6UPI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/american-staffordshire-terrier-lying-on-grass-1150214235-2000-4637750b8b6d45898b4c32789545bd9f.jpg', 'pitbull', NULL),
('https://www.perfectdogbreeds.com/wp-content/uploads/2020/05/Pit-Bull-Chasing-A-Ball.jpg', 'pitbull', NULL),
('https://www.petfinder.com/static/1988a0fd6fdfde2abfd5e23f3167c0e4/1108d/curly-coated-retriever-card-large.jpg', 'retriever', 'curly'),
('https://www.prodograw.com/wp-content/uploads/2023/04/curly-coated-retriever.jpg', 'retriever', 'curly'),
('https://tf-prod-bunny-pullzone-1.gooddog.com/images/x4ifthbingqe0yixv0n7e1w8l686.jpg?resize=1000x1000', 'retriever', 'curly'),
('https://www.dogsnsw.org.au/media/img/BrowseAllBreed/Flat-Coated-Retriever.jpg', 'retriever', 'flatcoated'),
('https://cdn.shortpixel.ai/spai/w_977+q_lossy+ret_img+to_webp/https://betterpet.com/wp-content/uploads/2023/04/flatcoated-retriever.jpg', 'retriever', 'flatcoated'),
('https://assets.pets4homes.co.uk/image/8f7284a4-dea5-4c8a-a923-0f22ac839fb1/image_wm/image.webp', 'retriever', 'flatcoated'),
('https://static1.squarespace.com/static/54e7a1a6e4b08db9da801ded/t/61eb41b698b5f077a9637a40/1642807755677/81.jpg?format=1500w', 'retriever', 'golden'),
('https://nypost.com/wp-content/uploads/sites/2/2023/05/Facetune-05-01-2023-16-03-25.jpg?quality=75&strip=all&w=1024', 'retriever', 'golden'),
('https://global-uploads.webflow.com/59dbe1c3542805000192616b/63178a7970d1b57a4c6a7a05_golden-retriever.png', 'retriever', 'golden'),
('https://www.dailypaws.com/thmb/-p5VyaOMxdnepW4PwgbPqFe_Ba0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rottweiler-headshot-678833089-2000-e87e6d01c6964debad70bedee2094120.jpg', 'rottweiler', NULL),
('https://hellobark.com/wp-content/uploads/rottweiler-image.jpg', 'rottweiler', NULL),
('https://www.dogster.com/wp-content/uploads/2015/05/shutterstock_219143260.jpg.optimal.jpg', 'rottweiler', NULL),
('https://www.thefarmersdog.com/digest/wp-content/uploads/2022/04/Samoyed-top.jpg', 'samoyed', NULL),
('https://media-be.chewy.com/wp-content/uploads/2021/06/01091708/Samoyed-FeaturedImage-768x461.jpg', 'samoyed', NULL),
('https://img.freepik.com/premium-photo/cute-samoyed-white-dog-is-sitting-winter-forest-bench_231786-2322.jpg?w=2000', 'samoyed', NULL),
('https://cdn.britannica.com/71/234471-050-093F4211/shiba-inu-dog-in-the-snow.jpg', 'shiba', NULL),
('https://royvon.co.uk/wp-content/uploads/2020/12/ShibaInu.jpg', 'shiba', NULL),
('https://stickerly.pstatic.net/sticker_pack/CywitGCGNigg6dFKUxGdAg/B0TFVE/3/ea43ce81-6cb2-479d-8c2e-fadd443af6f6.png', 'shiba', NULL),
('https://cdn.shopify.com/s/files/1/0531/2475/9744/files/1_1_2.jpg?v=1634102796', 'shihtzu', NULL),
('https://www.rover.com/blog/wp-content/uploads/2020/06/Shih-Tzu.jpg', 'shihtzu', NULL),
('https://i.pinimg.com/474x/be/14/6a/be146a7c7b1069bdf07af1d52a90e57c.jpg', 'shihtzu', NULL);
`;


const connectionOptions = {
  user: process.env.PG_USER,
  //LOCAL host: process.env.PG_HOST,
  /*DOCKER*/ host: process.env.DOCKER_PG_HOST,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
};

const createDatabase = async () => {
  const pool = new Pool(connectionOptions);
  const dbName = "breeds";

  try {
    const client = await pool.connect();
    await client.query(`DROP DATABASE IF EXISTS ${dbName}`);
    console.log("Database dropped.");
    await client.query(`CREATE DATABASE ${dbName}`);
    console.log("Database created.");
    client.release();
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
};

const createDB = async () => {
  try {
    await createDatabase();
  } catch (err) {
    console.error(err);
  }
};


pool.on('connect', () => {
  console.log('Connected to the database.');
});

const createAndPopulateBreeds = async () => {
  const fullBreedQuery = `${createBreedTableQuery}; ${populateBreedTableQuery}`;
  try {
    await pool.query(fullBreedQuery);
    console.log('Table breeds created and populated successfully.');
  } catch (err) {
    console.error(err);
  }
};

const createAndPopulateImages = async () => {
  const fullImageQuery = `${createImageTableQuery}; ${populateImageTableQuery}`;
  try {
    await pool.query(fullImageQuery);
    console.log('Table images created and populated successfully.');
  } catch (err) {
    console.error(err);
  }
};

const seed = async () => {
  try {
    await createDB(); // Clear and create fresh database
    await createAndPopulateBreeds(); // Create and populate the breeds table
    await createAndPopulateImages(); // Populate the images table
    console.log('Tables created and populated successfully.');
  } catch (err) {
    console.error(err);
  } finally {
    pool.end(); // Close the database connection
    console.log('Disconnected from the database.');
  }
};

seed();
