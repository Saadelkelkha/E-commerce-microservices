const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 4000;
const mongoose = require("mongoose");
const Produit = require("./Produit");
const isAuthenticated = require("./isAuthenticated");

app.use(express.json());

mongoose.set('strictQuery',true);
mongoose.connect("mongodb://localhost/produit-service").then(()=>{
    console.log("Produit-service DB Connecter")
}).catch((err)=>console.log(err));

app.post("/produit/ajouter", isAuthenticated,(req, res, next)=>{
    const { nom, desciption, prix, stock} = req.body;
    const newProduit = new Produit({
        nom,
        desciption,
        prix,
        stock
    });

    newProduit.save().then(produit => res.status(201).json(produit))
    .catch(err => res.status(400).json({err}));
});

app.get("/produit/:id",(req, res, next)=>{
    const id = req.params.id;
    Produit.find({_id:id})
    .then(produits => res.status(201).json(produits))
    .catch(error => res.status(400).json({error}))
});

app.patch("/produit/:id/stock",(req,res)=>{
    const id = req.params.id;
    Produit.findOneAndUpdate(
        {id: id},
        {
            $inc:{stock:-1}
        }
    ).then(produits => res.status(201).json(produits))
    .catch(error => res.status(400).json({error}));
})

app.listen(PORT, ()=>{
    console.log(`Product-Service at ${PORT}`);
});