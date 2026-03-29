const express = require('express');
const router  = express.Router();
const db      = require('../db');

// ─── GET /api/notes ───────────────────────────────────────────────────────────
// Ambil semua catatan, diurutkan dari yang terbaru
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM notes ORDER BY tanggal_dibuat DESC'
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('[GET /notes]', err);
    res.status(500).json({ success: false, message: 'Gagal mengambil catatan.' });
  }
});

// ─── GET /api/notes/:id ───────────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM notes WHERE id = ?', [req.params.id]);
    if (rows.length === 0)
      return res.status(404).json({ success: false, message: 'Catatan tidak ditemukan.' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error('[GET /notes/:id]', err);
    res.status(500).json({ success: false, message: 'Gagal mengambil catatan.' });
  }
});

// ─── POST /api/notes ──────────────────────────────────────────────────────────
// Body: { judul, isi }
router.post('/', async (req, res) => {
  const { judul, isi } = req.body;

  if (!judul || !isi)
    return res.status(400).json({ success: false, message: 'Judul dan isi wajib diisi.' });

  try {
    const [result] = await db.query(
      'INSERT INTO notes (judul, isi) VALUES (?, ?)',
      [judul.trim(), isi.trim()]
    );
    const [rows] = await db.query('SELECT * FROM notes WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, message: 'Catatan berhasil ditambahkan.', data: rows[0] });
  } catch (err) {
    console.error('[POST /notes]', err);
    res.status(500).json({ success: false, message: 'Gagal menambahkan catatan.' });
  }
});

// ─── PUT /api/notes/:id ───────────────────────────────────────────────────────
// Body: { judul, isi }
router.put('/:id', async (req, res) => {
  const { judul, isi } = req.body;

  if (!judul || !isi)
    return res.status(400).json({ success: false, message: 'Judul dan isi wajib diisi.' });

  try {
    const [result] = await db.query(
      'UPDATE notes SET judul = ?, isi = ? WHERE id = ?',
      [judul.trim(), isi.trim(), req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ success: false, message: 'Catatan tidak ditemukan.' });

    const [rows] = await db.query('SELECT * FROM notes WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Catatan berhasil diperbarui.', data: rows[0] });
  } catch (err) {
    console.error('[PUT /notes/:id]', err);
    res.status(500).json({ success: false, message: 'Gagal memperbarui catatan.' });
  }
});

// ─── DELETE /api/notes/:id ────────────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM notes WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ success: false, message: 'Catatan tidak ditemukan.' });

    res.json({ success: true, message: 'Catatan berhasil dihapus.' });
  } catch (err) {
    console.error('[DELETE /notes/:id]', err);
    res.status(500).json({ success: false, message: 'Gagal menghapus catatan.' });
  }
});

module.exports = router;
