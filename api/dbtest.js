import sql from "mssql";

export default async function handler(req, res) {
  try {
    // Split host and port if included
    let host = process.env.DB_HOST;
    let port = 1433; // default SQL Server port

    // Check if host contains a comma, e.g. "hostname,10066"
    if (host.includes(",")) {
      const parts = host.split(",");
      host = parts[0].trim();
      port = parseInt(parts[1].trim());
    }

    const config = {
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      server: host,
      port: port,
      database: process.env.DB_NAME,
      options: {
        encrypt: true,
        trustServerCertificate: true
      },
      connectionTimeout: 15000
    };

    await sql.connect(config);
    const result = await sql.query`SELECT GETDATE() AS currentTime`;

    res.status(200).json({ success: true, data: result.recordset });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
