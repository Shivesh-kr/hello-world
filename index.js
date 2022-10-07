const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('asset'));

app.use(function(req, res, next){
    console.log('middleware 1 is called');
    next();
});


var ContactLists = [

    {
        name : "Shivesh",
        phone : "849578"

    },
    {
        name : "Golu",
        phone : "761655"
    },
    {
        name : "Arpan",
        phone : "349849757"
    }

]

app.get('/',function(req,res){
    // console.log(__dirname);
    // res.send('<h1>Cool, it is running! or is it ?</h1>')
    Contact.find({name:"sk"}, function(err, contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }

        return res.render('home',{title : "ContactLists", contact_list : contacts});

        });
    });

app.post('/create_contact', function(req, res){
    // return res.redirect('/')
   // console.log(req);
   /*
   console.log(req.body);
   console.log(req.body.name);
   console.log(req.body.phone);
   */
//    ContactLists.push({
//       name : req.body.name,
//       phone : req.body.phone
//    });

    Contact.create({
        name: req.body.name,
        phone: req.body.phone 
    },function(err, newContact){
        if(err){
            console.log('error in creating a contact');
            return;
        }

        console.log('********', newContact);
        return res.redirect('back');
    });

//     return res.redirect('/');
 });

app.get('/delete-contact/:phone',function(req,res){
    console.log(req.query);
    let phone = req.query.phone;

    let ContactIndex = ContactLists.findIndex(contact => contact.phone == phone);

    if(ContactIndex != -1){
        ContactLists.splice(ContactIndex,1);
    }
    return res.redirect('back');
});


app.listen(port, function(err){
    if(err){
        console.log('Error in running the server',err);
    }
    console.log('Yup! My express server is running on port',port);
});
