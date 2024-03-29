const jwt = require('jsonwebtoken')
const db = require("../models/index.js");

const showAllStores = async(req,res) => {
    try{
        const stores = await db.Store.findAll();

        return res.status(200).json({stores});
    }catch(error){
        return res.status(422).json({msg : error})
    }
}
const createNewClient =  async (req,res) => {
    const {storeid , clientname , clientpassword} = req.body
    if (!clientpassword || !storeid){
        return res.status(422).json({msg : 'Informe todos os dados'});
    }
    try{
        const existOtherPassword = await db.User.findOne({
            where : {clientpassword}
        })
        if(existOtherPassword){
            return res.status(422).json({msg : 'senha existente'});
        }
        const id = storeid;
        const existStore = await db.Store.findOne({
            where : {id}
        })
        if(!existStore){
            return res.status(422).json({msg : 'Loja nao existe'});
        }
        const status = 'peding';

        await db.User.create({
            clientname,
            clientpassword,
            storeid,
            status 
        });
        return res.status(200).json({msg : 'cadastro efetudado'});
    }catch(error){
        console.log(error);
        return res.status(500).json({msg : error});
    }

}
const showClients = async (req,res) => {
    const {storeid } = req.body
    if (!storeid){
        return res.status(422).json({msg : 'Informe todos os dados'});
    }

    try{
        const id = storeid
        const store = await db.Store.findOne({
            where : {id}
        })
        const users = await store.getUsers();
        return res.status(200).json({users})
    }catch{
        return res.status(422).json({msg : 'Loja Não autorizada'})
    }
}
const deleteClient = async (req,res) => {
    const {id} = req.body
    try{
        const user = await db.User.findByPk(id);

        if (!user){
            return res.status(422).json({msg: 'usuario nao encontrado'});
        }
        await user.destroy();
        return res.status(200).json({msg: 'usuario deletado'})
    }catch(err){
        return res.status(500).json({msg: 'erro na insersao'});
    }

}
const changeStatus = async (req,res) => {
    const {id} = req.body
    try{
        const user = await db.User.findByPk(id);

        if (!user){
            return res.status(422).json({msg: 'usuario nao encontrado'});
        }
        if (user.status === 'peding'){
            user.status = 'completed';
        }
        else{
            user.status = 'peding';
        }
        await user.save();
        return res.status(200).json({msg: user.status});
    }catch(error){
        return res.status(500).json({msg: error});
    }
}
module.exports = {createNewClient,showClients, deleteClient , changeStatus , showAllStores};