import sql from "mssql";

export default async function handler(req, res) {
  try {
    const config = {
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      server: process.env.DB_HOST,
      database: process.env.DB_NAME,
      options: {
        encrypt: true,
        trustServerCertificate: false,
      },
    };

    await sql.connect(config);

    const result = await sql.query`
      SELECT GETDATE() AS currentTime
    `;

    res.status(200).json({
      success: true,
      data: result.recordset,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
