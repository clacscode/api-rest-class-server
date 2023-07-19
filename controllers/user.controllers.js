const { response, request } = require('express');

const userGet = (req = request, res = response) => {

    const {q, name = 'No name', apikey} = req.query; // http://localhost:3005/api/usuarios?q=123&name=clacscode&apikey=090909

    res.json({
        msg: 'get API - controlador',
        q,
        name,
        apikey
    });
}

const userPut = (req, res = response) => {
    res.json({
        msg: 'put API - controlador'
    });
}

const userPost = (req, res = response) => {

    const body = req.body;
    const { nombre, edad } = body;

    res.json({
        msg: 'post API - controlador',
        nombre,
        edad
    });
}

const userDelete = (req = request, res = response) => {

    const { id } = req.params; // http://localhost:3005/api/usuarios/1

    res.json({
        msg: 'delete API - controlador',
        id
    });
}

module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete
}