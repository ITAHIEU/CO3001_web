const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware để xử lý JSON
app.use(express.json());

// Định nghĩa một route đơn giản
app.get('/', (req, res) => {
    res.send('HCMUT Smart Printing Service API is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
