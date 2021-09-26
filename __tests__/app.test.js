import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Caught from '../lib/models/Caught';
import Favorites from '../lib/models/Favorites';
import Seen from '../lib/models/Seen';

const swampert = {
  sprite: 'example.png',
  name: 'swampert',
  primaryType: 'water',
  secondaryType: 'ground',
}

const pikachu = {
  sprite: 'example.png',
  name: 'pikachu',
  primaryType: 'electric',
  secondaryType: 'n/a',
}

const ralts = {
  sprite: 'example.png',
  name: 'ralts',
  primaryType: 'psychic',
  secondaryType: 'fairy',
}

describe('caught routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a mon', async () => {
    const res = await request(app)
      .post('/api/v1/caught')
      .send(swampert);

    expect(res.body).toEqual({
      id: '1',
      ...swampert
    });
  });

  afterAll(() => {
    pool.end();
  });
});
