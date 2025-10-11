export default async function handler(req, res) {
  const { path } = req.query;

  // URL tujuan (ganti dengan URL InfinityFree kamu)
  const target = `https://herbal-ajie.free.nf/pethofar${path}`;

  try {
    const response = await fetch(target, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const text = await response.text();

    // Kirim balik ke frontend
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(200).send(text);

  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
}
