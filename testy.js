const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs'); 
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// schema
const Schema = mongoose.Schema;
const mySchema = new Schema({
    fname: String,
    lname: String,
    username:String,
    email: String,
    mobile: String, 
    password: String 
});

const MyModel = mongoose.model('MyModel', mySchema, 'democol');

mongoose.connect('mongodb://localhost:27017/my_database', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database');
    })
    .catch(err => {
        console.error('Error connecting to database:', err);
    });

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Route to handle form submission
app.post('/submit', async (req, res) => {
    const { fname, lname, username, email, mobile, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDocument = new MyModel({
        fname,
        lname,
        username,
        email,
        mobile,
        password: hashedPassword 
    });

    newDocument.save()
        .then(doc => {
            console.log('Document saved successfully:', doc);
            res.sendFile(__dirname + '/public/success.html');
        })
        .catch(err => {
            console.error('Error saving document:', err);
            res.sendFile(__dirname + '/public/error.html');
        });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
