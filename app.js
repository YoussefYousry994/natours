const express = require('express');
const app = express();
const port = 8080;
const fs = require('fs');

const middleware = app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/api/v1/tours-simple.json`)
);

app.get('/api/v1/tours-simple.json', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours-simple.json/:id', (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours-simple.json', (req, res) => {
  //   console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  // req.body.id = newId;

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/api/v1/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'created',
        data: {
          tour: newTour,
        },
      });
    }
  );
  // res.send('Done!');
});

app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
