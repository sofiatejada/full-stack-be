import pool from '../utils/pool.js';

export default class Favorites {
  id;
  name;
  image;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.image = row.image;
  }

  static async insert({ name, image }) {
    const { rows } = await pool.query('INSERT INTO favorite_mon (name, image) VALUES ($1, $2) RETURNING *', [name, image]);

    return new Favorites(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM favorite_mon WHERE id=$1', [id]);

    return new Favorites(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM favorite_mon');

    return rows.map((row) => new Favorites(row));
  }

  static async updateById(id, {name, image}) {
    const existingCaught = await Favorites.getById(id);

    const newName = name ?? existingCaught.name;
    const newImage = image ?? existingCaught.image;

    const { rows } = await pool.query('UPDATE favorite_mon SET name=$1, image=$2 WHERE id=$3 RETURNING *', [newName, newImage, id]);

    return new Favorites(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query('DELETE FROM favorite_mon WHERE id=$1 RETURNING *', [id]);

    return new Favorites(rows[0]);
  }
}
