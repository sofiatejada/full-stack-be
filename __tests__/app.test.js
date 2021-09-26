import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Caught from '../lib/models/Caught';
// import Favorites from '../lib/models/Favorites';
// import Seen from '../lib/models/Seen';

const swampert = {
  sprite: 'example.png',
  name: 'swampert',
  primaryType: 'water',
  secondaryType: 'ground',
};

const pikachu = {
  sprite: 'example.png',
  name: 'pikachu',
  primaryType: 'electric',
  secondaryType: 'n/a',
};

const ralts = {
  sprite: 'example.png',
  name: 'ralts',
  primaryType: 'psychic',
  secondaryType: 'water',
};

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

  it('gets a mon by id', async () => {
    const currentMon = await Caught.insert(swampert);

    const res = await request(app).get(`/api/v1/caught/${currentMon.id}`);

    expect(res.body).toEqual(currentMon);
  });

  it('gets all mon', async () => {
    const mon1 = await Caught.insert(swampert);
    const mon2 = await Caught.insert(pikachu);
    const mon3 = await Caught.insert(ralts);

    const res = await request(app).get('/api/v1/caught');

    expect(res.body).toEqual([mon1, mon2, mon3]);
  });

  it('updates a mon by id', async () => {
    const currentMon = await Caught.insert(ralts);

    const res = await request(app)
      .put(`/api/v1/caught/${currentMon.id}`)
      .send({ secondaryType: 'fairy' });

    expect(res.body).toEqual({ ...currentMon, secondaryType: 'fairy' });
  });

  it('deletes a mon by id', async () => {
    const currentMon = await Caught.insert(pikachu);

    const res = await request(app)
      .delete(`/api/v1/caught/${currentMon.id}`);

    expect(res.body).toEqual({
      message: `Pokemon ${currentMon.name} was deleted from your 'Caught' list.`
    });
  });

  afterAll(() => {
    pool.end();
  });
});
