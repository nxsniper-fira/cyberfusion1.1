import { pool } from "../db";

export const toolService = {
  async listTools({ page, pageSize, team, category, search }: any) {
    const offset = (page - 1) * pageSize;
    let where = [];
    let params: any[] = [];
    if (team) { params.push(team); where.push(`team = $${params.length}`); }
    if (category) { params.push(category); where.push(`category = $${params.length}`); }
    if (search) { params.push(`%${search}%`); where.push(`name ILIKE $${params.length}`); }
    let sql = `SELECT * FROM tools`;
    if (where.length) sql += ` WHERE ${where.join(" AND ")}`;
    sql += ` ORDER BY name LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(pageSize, offset);

    const result = await pool.query(sql, params);
    return result.rows;
  },

  async createTool(data: any) {
    const result = await pool.query(
      `INSERT INTO tools (name, description, team, category, default_parameters, requires_scope, ui_schema, icon)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [
        data.name,
        data.description,
        data.team,
        data.category,
        data.default_parameters,
        data.requires_scope,
        data.ui_schema,
        data.icon
      ]
    );
    return result.rows[0];
  },

  async updateTool(id: string, data: any) {
    const result = await pool.query(
      `UPDATE tools SET
        name=$1, description=$2, team=$3, category=$4, default_parameters=$5, requires_scope=$6, ui_schema=$7, icon=$8
      WHERE id=$9 RETURNING *`,
      [
        data.name,
        data.description,
        data.team,
        data.category,
        data.default_parameters,
        data.requires_scope,
        data.ui_schema,
        data.icon,
        id
      ]
    );
    return result.rows[0];
  },

  async deleteTool(id: string) {
    const result = await pool.query(`DELETE FROM tools WHERE id=$1 RETURNING id`, [id]);
    return !!result.rows[0];
  }
};