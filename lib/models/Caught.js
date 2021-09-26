import pool from '../utils/pool';

export default class Caught {
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
    const { rows } = await pool.query('INSERT INTO caught (sprite, name, primaryType, secondaryType) VALUES ($1, $2, $3, $4) RETURNING *', [sprite, name, primaryType, secondaryType]);

    return new Caught(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM caught WHERE id=$1', [id]);

    return new Caught(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM songs');

    return rows.map((row) => new Caught(row));
  }

  static async updateById(id, {sprite, name, type})


}
