-- ============================================
-- Notes App Database Schema
-- NIM: 123230050 | Nama: Anak Agung Ngurah Sadewa Tedja
-- ============================================

CREATE DATABASE IF NOT EXISTS notes_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE notes_db;

CREATE TABLE IF NOT EXISTS notes (
  id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  judul       VARCHAR(255)    NOT NULL,
  isi         TEXT            NOT NULL,
  tanggal_dibuat DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample data
INSERT INTO notes (judul, isi) VALUES
  ('Selamat Datang!', 'Ini adalah catatan pertama kamu. Silakan tambah, edit, atau hapus catatan sesuai kebutuhan.'),
  ('Tugas Infrastruktur', 'Deadline minggu depan:\n- Setup VM di GCP\n- Migrasi database ke Cloud SQL\n- Deploy frontend ke VM'),
  ('Ide Project TA', 'Topik: Deteksi halusinasi pada LLM menggunakan semantic entropy\nReferensi: Farquhar et al. (2024)');
