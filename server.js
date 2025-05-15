import express from 'express';
const app = express();
const PORT = 5000;

app.get('/api/products', (req, res) => {
  // ส่งข้อมูล JSON ไปยัง frontend
  res.json([{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
