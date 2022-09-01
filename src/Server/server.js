import express from 'express';
import router from '../Routes/routes.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express()
const PORT = process.env.PORT || 8080

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', router)
app.use((req, res) => {
  res.status(404).send(`
                        <h1 style="text-align: center;">
                          { error: 404, message: ruta "${req.url}" no encontrada}
                        </h1>
                        <h2 style="text-align: center;">😬 Le quise poner mas onda que solo el objeto requerido en las diapos 😬</h2>
                        <div>
                          <img style="display: block; margin-left: auto; margin-right: auto; width: 50%;" src="https://i.pinimg.com/originals/fe/df/71/fedf7125acf620e856b6d09ef44eee51.gif" alt="Error 404 page not found"/>
                        </div>
                      `)
})
// Server conectado exitosamente
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
// Server con error
server.on("error", (err) => {
  console.log( `El servidor a tenido un error:${err}`)
})
