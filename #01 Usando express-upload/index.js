const express = require("express");
const fileUpload = require("express-fileupload");
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(fileUpload());

app.post("/upload", (req, res) => {
  
  if(!req.files) {
    return res.json({msg: "Envie um arquivo de imagem para continuar"});
  }

  const img = req.files.img;
  const imgName = req.files.img.name;
  const imgType = req.files.img.mimetype.split('/')[1];
  const imgAllowedFormats = ['jpg', 'jpeg', 'png'];
  
  

  if(!imgAllowedFormats.includes(imgType)) {
    return res.json({msg: "Formato de arquivo Inválido"});
  }

  const newName = uuidv4(imgName);
  imgFinaleName = `${newName}.${imgType}`;
  img.mv(`assets/images/${newName}.${imgType}`);
  return res.json({ msg: `Arquivo ${imgFinaleName} updado com sucesso!` });
  
  
});

app.listen(3001, () => {
  console.log("O server esta a rodar");
});


