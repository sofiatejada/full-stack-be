import pool from '../utils/pool.js';

export default class Favorites {
  id;
  sprite;
  name;
  primaryType;
  secondaryType;

  constructor(row) {
    this.id = row.id;
    this.sprite = row.sprite;
    this.name = row.name;
    this.primaryType = row.primary_type;
    this.secondaryType = row.secondary_type;
  }

  static async insert({ sprite, name, primaryType, secondaryType }) {
    const { rows } = await pool.query('INSERT INTO favorite_mon (sprite, name, primary_type, secondary_type) VALUES ($1, $2, $3, $4) RETURNING *', [sprite, name, primaryType, secondaryType]);

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

  static async updateById(id, {sprite, name, primaryType, secondaryType}) {
    const existingCaught = await Favorites.getById(id);

    const newSprite = sprite ?? existingCaught.sprite;
    const newName = name ?? existingCaught.name;
    const newPrimaryType = primaryType ?? existingCaught.primaryType;
    const newSecondaryType = secondaryType ?? existingCaught.secondaryType;

    const { rows } = await pool.query('UPDATE favorite_mon SET sprite=$1, name=$2, primary_type=$3, secondary_type=$4 WHERE id=$5 RETURNING *', [newSprite, newName, newPrimaryType, newSecondaryType, id]);

    return new Favorites(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query('DELETE FROM favorite_mon WHERE id=$1 RETURNING *', [id]);

    return new Favorites(rows[0]);
  }
}
