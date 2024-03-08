// controller.js
const db = require('./db');

exports.getCustomers = async (req, res) => {
  try {
    const { page = 1, searchTerm = '', sortBy = '' } = req.query;
    const limit = 20;
    const offset = (page - 1) * limit;
    let orderBy = '';
    if (sortBy === 'date') {
      orderBy = 'ORDER BY created_at';
    } else if (sortBy === 'time') {
      orderBy = 'ORDER BY created_at::time';
    }
    let searchConditions = '';
    if (searchTerm) {
      const searchWords = searchTerm.trim().split(/\s+/);
      const searchClauses = searchWords.map(word => {
        return `(customer_name ILIKE '%${word}%' OR location ILIKE '%${word}%')`;
      });
      searchConditions = `WHERE ${searchClauses.join(' AND ')}`;
    }
    const query = `
      SELECT * FROM customer_records
      ${searchConditions}
      ${orderBy}
      LIMIT ${limit} OFFSET ${offset};
    `;
    const { rows } = await db.query(query);
    const countQuery = `SELECT COUNT(*) AS total FROM customer_records ${searchConditions};`;
    const totalCount = await db.query(countQuery);
    const totalPages = Math.ceil(totalCount.rows[0].total / limit);
    res.json({ data: rows, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
