import { Router } from 'express';
import Seen from '../models/Seen';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const seen = await Seen.insert(req.body);
      res.send(seen);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const seen = await Seen.getById(id);

      res.send(seen);
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const allSeen = await Seen.getAll();

      res.send(allSeen);
    } catch (error) {
      next(error);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { sprite, name, primaryType, secondaryType } = req.body;

      const updateSeen = await Seen.updateById(id, { sprite, name, primaryType, secondaryType });

      res.send(updateSeen)
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedSeen = await Seen.deleteById(id);

      res.send({
        message: `Pokemon ${deletedSeen.name} was deleted from your 'Seen' list.`
      });
    } catch (error) {
      next(error);
    }
  });
