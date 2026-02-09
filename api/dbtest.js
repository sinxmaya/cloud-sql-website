import sql from "mssql";

export default async function handler(req, res) {
  try {
    const config = {
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      server: process.env.DB_HOST, // host only, no comma
      port: parseInt(process.env.DB_PORT), // port as number
      database: process.env.DB_NAME,
      options: {
        encrypt: true,
        trustServerCertificate: true, // often needed for cloud servers
      },
    };

    await sql.connect(config);
    const result = await sql.query`SELECT GETDATE() AS currentTime`;

    res.status(200).json({ success: true, data: result.recordset });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
