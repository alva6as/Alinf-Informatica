const express = require('express');
const app = express();
require('dotenv').config();
const path =require('path');
const hbs =require('hbs');
const mysql =require('mysql2');
const nodemailer =require('nodemailer');
const { setEngine, getDiffieHellman } = require('crypto');
const PORT = process.env.PORT;


//Conexion a la Base de Datos

const conexion = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

if(conexion.connect()){
    console.log('conexion exitosa!')
};


conexion.connect(function(err) {
    if (err) {
      console.error('error en la conexion' + err.stack);
      return;
    }
   
    console.log('conectado a la base de datos');
  });


//Configurar MiddlelWares

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));



//conexion.end();

app.get('/', (req, res, next) => {
    res.render('index', {
      titulo: 'Bienvenidos a la app'
    })
});




app.get('/about', (req, res, next) => {
  res.render('about', {
    titulo: 'sobre nosotros'
  })
});

app.get('/main', (req, res, next) => {
  res.render('main', {
    titulo: 'pagina principal'
  })
});



app.get('/were', (req, res, next) => {
  res.render('were', {
    titulo: 'ubicacion'
  })
});



app.get('/contact', (req, res) => {
  res.render('contact', {
    titulo: 'Formulario para suscripcion'
  })
});

app.post('/contact', (req, res) =>{
    
  const{ nombre, email } = req.body;

   

  if(nombre == '' || email == '' ){

      let validacion = 'Rellene los campos vacios...';
  
      res.render('contact', {
          titulo: 'Formulario de Suscripcion',
          validacion
      });
     }else{   
        console.log(nombre);
        console.log(email);

         
       async function envioMail(){ 
          let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',   
          port: 465, 
          secure: true, 
          auth: { 
              user: 'contacto.alinf@gmail.com',  
              pass: process.env.PASS
          }
         });                
       

       let envio = await transporter.sendMail({
          from: process.env.USEREMAIL, 
          to: `${email}`, 
          subject: 'Suscripcion de contacto', 
          html: 'Muchas gracias por contactar con nosostros, estaremos enviando su consulta a la brevedad.' // CUERPO DEL MENSJ, se puede enviar fotos pero habria que enviarles un object no un subject
       }) 

        res.render('enviado',{
          titulo: 'Mail Enviado',
          nombre,
          email  
        })
       }
       envioMail(); // lo ejecuto
      }
})  




//Config motor plantillas
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'))


app.listen(PORT, () => {
    console.log(`El servidor esta trabajando en el puerto ${PORT}`);
});

