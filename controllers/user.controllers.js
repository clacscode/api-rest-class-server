const { response, request, json } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const userGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    // const usuarios = await Usuario.find(query)
    //     .skip(desde)
    //     .limit(limite);

    // const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(desde)
            .limit(limite)
    ]);

    res.json({
        total,
        usuarios
    });
}

const userPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    console.log('resto:', resto)
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    console.log('usuario:', usuario)

    res.json(resto);
}

const userPost = async (req, res = response) => {

    const { nombre, correo, password, role } = req.body;

    const usuario = new Usuario({ nombre, correo, password, role });

    // Encriptar la contrasenia
    const salt = bcryptjs.genSaltSync(); // param: 10 default value
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar usuario
    await usuario.save();

    res.json({
        usuario
    });
}

const userDelete = async (req = request, res = response) => {

    // Eliminar fisicamente
    // const usuario = await Usuario.findByIdAndDelete(id);
    const { id } = req.params; // http://localhost:3005/api/usuarios/1

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        usuario
    });
}

module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete
}