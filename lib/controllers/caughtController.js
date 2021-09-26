import { Router } from 'express';
import Caught from '../models/Caught';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const caught = await Caught.insert(req.body);
      res.send(caught);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const caught = await Caught.getById(id);

      res.send(caught);
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const allCaught = await Caught.getAll();

      res.send(allCaught);
    } catch (error) {
      next(error);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { sprite, name, primaryType, secondaryType } = req.body;

      const updateCaught = await Caught.updateById(id, { sprite, name, primaryType, secondaryType });

      res.send(updateCaught)
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedCaught = await Caught.deleteById(id);

      res.send({
        message: `Pokemon ${deletedCaught.name} was deleted from your 'Caught' list.`
      });
    } catch (error) {
      next(error);
    }
  });
