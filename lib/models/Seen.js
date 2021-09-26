import pool from '../utils/pool';

export default class Seen {
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
    const { rows } = await pool.query('INSERT INTO seen (sprite, name, primaryType, secondaryType) VALUES ($1, $2, $3, $4) RETURNING *', [sprite, name, primaryType, secondaryType]);

    return new Seen(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM seen WHERE id=$1', [id]);

    return new Seen(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM seen');

    return rows.map((row) => new Seen(row));
  }

  static async updateById(id, {sprite, name, primaryType, secondaryType}) {
    const existingCaught = await Seen.getById(id);

    const newSprite = sprite ?? existingCaught.sprite;
    const newName = name ?? existingCaught.name;
    const newPrimaryType = primaryType ?? existingCaught.primaryType;
    const newSecondaryType = secondaryType ?? existingCaught.secondaryType;

    const { rows } = await pool.query('UPDATE seen SET sprite=$1, name=$2, primary_type=$3, secondary_type=$4 WHERE id=$5 RETURNING *', [newSprite, newName, newPrimaryType, newSecondaryType, id]);

    return new Seen(rows[0]);
  }
}
