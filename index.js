const Fs = require('fs')  
const Path = require('path')  
const Axios = require('axios')

downloadImage = async () => {  
  //puede ser cualquier imagen, aunque fijémonos que coincida la extensión!
  const url = 'https://img.europapress.es/fotoweb/fotonoticia_20200808120635_1200.jpg'

  //path.resolve resuelve una ruta absoluta, y en este caso, uso __dirname para obtener la relativa y el directorio al que la quiero pasar
  const path = Path.resolve(__dirname, 'images', 'may-the-force.jpg')
  //abre un stream, que permite leer la data. Todo objeto puede ser considerado un stream que se puede transmitir al server, y el pipe es la función con que se va a reconvertir.
  const saveImage = Fs.createWriteStream(path)
  //fs.createReadStream( path, options ), se pueden pasar parámetros, pero es opcional

  //la respuesta de axios va a requerir varios parámetros, y este stream le indica que es un archivo grande
  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  //va a convertir la data que viene para guardarla
  response.data.pipe(saveImage)

  // la promesa va a escuchar con on para ver si funciona o no
  return new Promise((resolve, reject) => {
    saveImage.on('finish', resolve)
    saveImage.on('error', reject)
  })
}

downloadImage()  