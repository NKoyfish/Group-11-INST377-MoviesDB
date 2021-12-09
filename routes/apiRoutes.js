/* eslint-disable no-console */
import express from 'express';
import sequelize from 'sequelize';
// import { UPSERT } from "sequelize/types/lib/query-types";

import db from '../database/initializeDB.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('default route');
});

// db.Actor and db.Film work
router.route('/movies')
  .get(async (req, res) => {
    try {
      const filmlist = await db.Film.findAll();
      res.json({data: filmlist});
    } catch (error) {
      console.error(error);
      res.send('Something went wrong on /movies end');
    }
  })
  .post(async (req, res) => {
    try {
      console.log(req.body.name);
      let message = 'Post Recieved \n';
      if (req.body && !req.body.filmid) {
        console.log('actually adding a movie');
        await db.Film.create({
          name: req.body.name,
          director_id: parseInt(req.body.director),
          writer_id: parseInt(req.body.writer),
          genre_id: parseInt(req.body.genre),
          country: req.body.country,
          runtime: parseInt(req.body.runtime),
          year: parseInt(req.body.year),
          studio_id: parseInt(req.body.studio),
          score: parseFloat(req.body.score),
          votes: parseInt(req.body.votes),
          budget: parseInt(req.body.budget),
          gross: parseInt(req.body.gross),
         // released: `${req.body.released}}`,
          actor_id: parseInt(req.body.actor),
          rating: req.body.rating
        });
      } else {
      // below handles edits which have req.body.filmid
        const filmId = parseFloat(req.body.filmid);
        // console.log(filmId);
        const filmUpdate = await db.Film.findOne({where: {film_id: `${filmId}`}});
        try {
          const score = parseFloat(req.body.score);
          const runtime = parseInt(req.body.runtime);
          const genre = parseInt(req.body.genre);
          const writer = parseInt(req.body.writer);
          const budget = parseInt(req.body.budget);
          const votes = parseInt(req.body.votes);
          const gross = parseInt(req.body.gross);
          const actor = parseInt(req.body.actor);
          const studio = parseInt(req.body.studio);
          const year = parseInt(req.body.year);
          const director = parseInt(req.body.director);

          filmUpdate.score = score;
          filmUpdate.runtime = runtime;
          filmUpdate.genre = genre;
          filmUpdate.writer = writer;
          filmUpdate.budget = budget;
          filmUpdate.gross = gross;
          filmUpdate.actor = actor;
          filmUpdate.votes = votes;
          filmUpdate.studio = studio;
          filmUpdate.year = year;
          filmUpdate.director = director;
          filmUpdate.name = req.body.name;
          filmUpdate.rating = req.body.rating;
          filmUpdate.country = req.body.country;
          filmUpdate.save();
          message += (`${req.body.name} was updated successfully with new input`);
        } catch (err) {
          message += ('Some form input was not playing nice');
          console.log('weird parse error?');
        }
      }
      res.send(message);
    } catch (error) {
      console.error(error);
      res.send('Something went wrong on /movies end');
    }
  });

router.route('/movies/:filmId')
  .get(async (req, res) => {
    try {
      const {filmId} = req.params;
      const filmlist = await db.Film.findOne({where: {film_id: `${filmId}`}});
      res.json({data: filmlist});
    } catch (error) {
      console.error(error);
      res.send("Something went wrong on /movies end or the film_id isn't valid");
    }
  })
  .delete(async(req, res) => {
    try {
      console.log(req.params)
      const film = req.params.filmId
      const filmlist = await db.Film.destroy({where: {name: `${film}`}});
      console.log(filmlist)
      if (filmlist) {
        res.send('Success Deleting Film')
      }
      else {
        res.status(404)
        res.send('something didnt work')
      }
    } catch (error) {
      console.error(error);
    }
  });


// This is Jacky's SQL Controllers
router.route('/genres/:genreId')
  .get(async (req, res) => {
    try {
      const {genreId} = req.params;
      const genrelist = await db.Genre.findOne({where: {genre_id: `${genreId}`}});

      if (genrelist !== null) {
        res.send(genrelist);
      }
    } catch (error) {
      console.error(error);
      res.send("Something went wrong on the /genres end or the genre_id isn't valid");
    }
  })
  .post(async(req, res) => {
    try {
      const {genreId} = req.params;
      const genrelist = await db.Genre.create({genre_id: `${genreId}`, genre: 'Suspense'});
      res.send('Genre added');
    } catch (error) {
      console.error(error);
      res.send('Something went wrong on the /genres end and unable to update genre_id');
    }
  })
  .put((req, res) => {
    try {
    } catch (error) {
      console.error(error);
      res.send('Something went wrong on the /genres end');
    }
  })
  .delete(async(req, res) => {
    try {
      const {genreId} = req.params;
      const genrelist = await db.Genre.destroy({where: {genre: `${genreId}`}});
      console.log(genrelist)
      if (genrelist) {
        res.send('Success Deleting Genre')
      }
      else {
        res.status(404)
        res.send('something didnt work')
      }
    } catch (error) {
      console.error(error);
    }
  });

router.route('/actors/:actorName')
  .delete(async (req, res) => {
    try {
      console.log(req.params)
      const actor = req.params.actorName
      const actorlist = await db.Actor.destroy({where: {actor: actor}});
      console.log(actorlist)
      if (actorlist) {
        res.send('Success Deleting Actor')
      }
      else {
        res.status(404)
        res.send('something didnt work')
      }
    } catch (error) {
      console.error(error);
    }
  })
router.route('/actor/')
  .get(async (req, res) => {
    res.send('hello');
  })
  .post(async(req, res) => {
    try {
      const actor = req.body.name;
      const actorAdd = await db.Actor.create({actor: `${actor}`});
      res.send('Actor added');
    } catch (error) {
      console.error(error);
      res.send('Something went wrong on the /actor end and unable to update genre_id');
    }
  });
router.route('/genre/')
  .get(async (req, res) => {
    res.send('hello');
  })
  .post(async(req, res) => {
    try {
      const test = req.body.name;
      const genrelist = await db.Genre.create({genre: `${test}`});
      res.send('Genre added');
    } catch (error) {
      console.error(error);
      res.send('Something went wrong on the /genres end and unable to update genre_id');
    }
  })
  .delete(async(req, res) => {
    try {
      const {name} = req.body;
      const genrelist = await db.Genre.destroy({where: {genre: `${name}`}});
      res.send('Genre deleted');
    } catch (error) {
      console.error(error);
      res.send('Something went wrong on the /genres end and unable to delete from genre_id');
    }
  });

// Henry's SQL routes Post, Del, Get
router
  .route('/writers/:writerId')
  .get(async (req, res) => {
    try {
      const {writerId} = req.params;
      const writerlist = await db.Writer.findOne({where: {writer_id: `${writerId}`}});

      if (writerlist !== null) {
        res.send(writerlist);
      }
    } catch (error) {
      console.error(error);
      res.send("Something went wrong on the /writer end or the writer_id isn't valid");
    }
  })
  .post(async(req, res) => {
    try {
      const {writerId} = req.params;
      const writerlist = await db.Writer.create({writer_id: `${writerId}`, writer: 'testwriter'});
      res.send('Writer added');
    } catch (error) {
      console.error(error);
      res.send('Something went wrong on the /writers end and unable to update writer_id');
    }
  })
  .delete(async(req, res) => {
    try {
      const writername = req.params.writerId;
      const writer = await db.Writer.destroy({where: {writer: `${writername}`}});
      console.log(writer)
      if (writer) {
        res.send('Success Deleting writer')
      }
      else {
        res.status(404)
        res.send('something didnt work')
      }
    } catch (error) {
      console.error(error);
    }
  })
  .put((req, res) => {
    try {
      res.send('This request was put in blob!');
      console.log('put something inside blob');
    } catch (error) {
      console.log(error);
    }
  });

router.route('/writer/')
  .get(async (req, res) => {
    res.send('hello');
  })
  .post(async(req, res) => {
    try {
      const test = req.body.name;
      const writerlist = await db.Writer.create({writer: `${test}`});
      res.send('Writer added');
    } catch (error) {
      console.error(error);
      res.send('Something went wrong on the /writer end and unable to update writer_id');
    }
  });

export default router;