const express = require("express");
const router = express();
const Registrasi = require('../models/registrasi')
const bcryptjs = require('bcryptjs')
var jwt = require('jsonwebtoken');


const JWT_SECRET = 'eriyfbercbieobu3hrurebuberHBububUOBUOUBuo3728u'

//CREATE
router.post("/registrasi", async (req, res) => {
    const {firstname,lastname,email,password} = req.body

    const encrypPassword = await bcryptjs.hash(password,10)

    const newUser = new Registrasi({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: encrypPassword,
    })
    
    try {
        const olduser = await Registrasi.findOne({email})
        if (olduser) {
            return res.send({ error: "Email Sudah Dipakai" });
         }

        const reg = await newUser.save()
        res.send({ message: "Account Created Successfully" });

    } catch (error) {
        res.json({message: error})
    }

});

router.post('/login', async (req,res)=>{
    const {email,password} = req.body

    const user = await Registrasi.findOne({email})

    if(!user){
        return res.json({status: 'error', message : 'Email Tidak Terdaftar!'})
    }

    if(await bcryptjs.compare(password, user.password)){
        const token = jwt.sign({email: user.email,}, JWT_SECRET)

        if (res.status(201)) {
            return res.json({status: 'ok', data: token, user: user})
        }else{
            return  res.json({error: 'Error '})
        }
    }

    res.json({status: 'error', message: 'Password Salah!'})
})

router.post('/onlyAdmin', async (req,res)=>{
    const { token } = req.body

    console.log(token);

    try{
        const user = jwt.verify(token.token,JWT_SECRET)
        
        const userEmail = user.email

        Registrasi.findOne({email: userEmail})
        .then((data)=>{
            res.send({ status:'ok', data:data })
        }).catch((err)=>{
            res.send({ status:'err', data:err })
        })
    }catch(err){
        // console.log(err);
        res.json({status: 'error', message: 'Token is invalid'});
    }
})


module.exports = router;