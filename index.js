const express = require('express');
const cors = require('cors');
const  ipFilterMiddleware = require('./middleware/ipFilterMiddleware')
const app = express();
const port = 3000;
const html_to_pdf = require('html-pdf-node');

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(ipFilterMiddleware)

app.post('/generatePdf', async (req, res) => {
  const content = req.body.content

  // Генерация пдф
  let options = { format: 'A4', printBackground: true };

  const pdfBuffer = await html_to_pdf.generatePdf({ content }, options);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=generated.pdf');
  res.send(pdfBuffer);

  console.log('Файл успешно отправлен');
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
