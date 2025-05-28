const sql = require('mssql');
const config = require('../config/db.config');
const bcrypt = require('bcryptjs');

class Poty {
  constructor(poty) {
    this.username = poty.username;
    this.email = poty.email;
    this.password = poty.password;
  }

  static async create(newPoty) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPoty.password, salt);

    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('username', sql.NVarChar(50), newPoty.username)
      .input('email', sql.NVarChar(100), newPoty.email)
      .input('password', sql.NVarChar(100), hashedPassword)
      .query('INSERT INTO poty (username, email, password) VALUES (@username, @email, @password); SELECT SCOPE_IDENTITY() AS id');

    return result.recordset[0];
  }

  static async login(email, password) {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('email', sql.NVarChar(100), email)
      .query('SELECT * FROM poty WHERE email = @email');

    const user = result.recordset[0];

    if (!user) {
      return null;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return null;
    }

    delete user.password;
    return user;
  }

  static async findAll() {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .query('SELECT id, username, email, password FROM poty');

    return result.recordset;
  }

  static async updateById(id, poty) {
    const pool = await sql.connect(config);

    let password = poty.password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
    }

    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('username', sql.NVarChar(50), poty.username)
      .input('email', sql.NVarChar(100), poty.email)
      .input('password', sql.NVarChar(100), password)
      .query('UPDATE poty SET username = @username, email = @email, password = @password WHERE id = @id');

    return result.rowsAffected[0];
  }

  static async deleteById(id) {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM poty WHERE id = @id');

    return result.rowsAffected[0];
  }
}

module.exports = Poty;
