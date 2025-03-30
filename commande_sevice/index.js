const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 4001;
const mongoose = require("mongoose");
const Commande = require("./commande");
const axios = require('axios');
const isAuthenticated = require("./isAuthenticated");

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost/commande-service").then(()=>{
    console.log("Commande-service DB Connecter")
}).catch((err)=>console.log(err));

app.use(express.json());

function prixTotal(produits) {
    let total = 0;
    for (let t = 0; t < produits.length; ++t) {
        total += produits[t][0].prix;
    };
    return total;
}

async function httpRequest(ids) {
    let produits = [];
    let proinfo = []
    for (let t = 0; t < ids.length; ++t) {
        try {
            const URL = `http://localhost:4000/produit/${ids[t]._id}`
            const response = await axios.get(URL, {
                headers: { 'Content-Type': 'application/json' }
            });
            if(response.data[0].stock > 0){
                produits.push(response.data);
                proinfo.push({_id : ids[t]._id, quantite : ids[t].quantite});
            }
        
        
        } catch (error) {
            continue;
        }
    }

    return [prixTotal(produits),proinfo];
}

app.post("/commande/ajouter", isAuthenticated,async (req, res, next) => {
    const { ids } = req.body;
    httpRequest(req.body.ids).then(data => {
        const newCommande = new Commande({
            produits :data[1],
            client_id: req.user.id,
            prix_total: data[0],
        });
        console.log(newCommande)
        newCommande.save().then(commande => res.status(201).json(commande))
        .catch(err => res.status(400).json({ err }));

        for (let t = 0; t < data[1].length; ++t) {
            const URL = `http://localhost:4000/produit/${data[1][t]._id}/stock`
            const response = axios.patch(URL, {
                headers: { 'Content-Type': 'application/json' }
            });
        }
    });
});

app.get("/commande/:id",(req, res, next)=>{
    const id = req.params.id;
    Commande.find({_id:id})
    .then(produits => res.status(201).json(produits))
    .catch(error => res.status(400).json({error}))
});

app.patch("/commande/:id/statut", isAuthenticated,(req,res)=>{
    const id = req.params.id;
    Commande.findOneAndUpdate(
        {_id: id},
        {
            $set:{statut:"Confirmée"}
        }
    ).then(produits => res.status(201).json(produits))
    .catch(error => res.status(400).json({error}));
})

app.listen(PORT, () => {
    console.log(`Commande-Service at ${PORT}`);
});