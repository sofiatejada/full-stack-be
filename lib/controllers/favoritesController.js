import { Router } from 'express';
import Favorites from '../models/Favorites';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const favorite = await Favorites.insert(req.body);
      res.send(favorite);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const favorite = await Favorites.getById(id);

      res.send(favorite);
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const allFavorites = await Favorites.getAll();

      res.send(allFavorites);
    } catch (error) {
      next(error);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { sprite, name, primaryType, secondaryType } = req.body;

      const updateFavorites = await Favorites.updateById(id, { sprite, name, primaryType, secondaryType });

      res.send(updateFavorites);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedFavorite = await Favorites.deleteById(id);

      res.send({
        message: `Pokémon ${deletedFavorite.name} was deleted from your 'Favorites' list.`
      });
    } catch (error) {
      next(error);
    }
  });
