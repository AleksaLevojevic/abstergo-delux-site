const multer = require('multer');
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const logger = require('morgan');

const app = express();

// View engine setup
app.set('view engine', 'ejs');

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// File upload config
const upload = multer({ dest: 'uploads/' });

// POST route to handle form submission
app.post('/send/kontakt', upload.array('files'), async (req, res) => {
  const { email, subject, text } = req.body;
  const files = req.files;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'testeraleksa010@gmail.com',
        pass: 'utky zqlr uzub vrvr'
      }
    });

    const attachments = files.map(file => ({
      filename: file.originalname,
      path: file.path
    }));
    const contactMessage = `
    ${text}

    Absender: ${email}
    `

    await transporter.sendMail({
        from: '"Kontaktformular" <testeraleksa010@gmail.com>',
        to: 'testeraleksa010@gmail.com', 
        subject: subject,
        text: contactMessage,
        replyTo: email, 
        attachments: attachments
    });

    files.forEach(file => fs.unlinkSync(file.path));

    res.render("kontakt",{success: "E-Mail erfolgreich gesendet!"})
  } catch (error) {
    console.error(error);
    res.render("kontakt",{error: "Fehler beim Senden der E-Mail."})
  }
});
const uploadBewerbung = multer({ dest: 'uploads/' });

app.post('/send/bewerben', uploadBewerbung.none(), async (req, res) => {
  const { firstname, surname, email, salary, work, date, text } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'testeraleksa010@gmail.com',
        pass: 'utky zqlr uzub vrvr' 
      }
    });

    const message = `
    Neue Bewerbung erhalten:

    Name: ${firstname} ${surname}
    Email: ${email}
    Gehaltsvorstellung: ${salary} €
    Beschäftigungsform: ${work}
    Möglicher Arbeitsbeginn: ${date}

    Nachricht:
    ${text}
    `;

    await transporter.sendMail({
      from: '"Bewerbungsformular" <testeraleksa010@gmail.com>',
      to: 'testeraleksa010@gmail.com',
      subject: `Neue Bewerbung von ${firstname} ${surname}`,
      text: message,
      replyTo: email
    });

    res.render('bewerben', { success: 'Bewerbung erfolgreich gesendet!' });
  } catch (error) {
    console.error(error);
    res.render('bewerben', { error: 'Fehler beim Senden der Bewerbung.' });
  }
});


// Routes
app.get('/', (req, res) => res.render('mainsite.ejs'));
app.get('/bewerben', (req, res) => res.render('bewerben.ejs'));
app.get('/kontakt', (req, res) => res.render('kontakt.ejs'));
app.get('/impressum', (req, res) => res.render('impresum.ejs'));
app.get('/datenschutz', (req, res) => res.render('datenschutz.ejs'));


// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
