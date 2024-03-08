const { response } = require('express');
const Producto = require('../models/producto');


const obtenerProductos = async (req, res) => {
    try {
        const producto = await Producto.find();
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const obtenerProductoid = async (req, res) => {

    try {

        const producto = await Producto.findById(req.params.id);

        if (!producto) {
            if(!producto) {
                res.status(404).json({ msg: 'No existe el producto' })
            }
        }

        res.json(producto);

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });

    }
}

const crearProducto = async (req, res) => {

    const { nombre, categoria, ubicacion, precio, fechaCreacion } = req.body;

    try {

        const existeProducto = await Producto.findOne({ nombre });

        if (existeProducto) {
            return res.status(400).json({
                ok: false,
                msg: 'El producto ya esta registrado'
            })
        }

        const producto = new Producto(req.body);

        await producto.save();

        res.json({
            ok: true,
            producto: producto
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const actualizarProducto = async (req, res = response) => {

    try {
        const { nombre, categoria, ubicacion, precio } = req.body;
        let producto = await Producto.findById(req.params.id);

        if(!producto) {
            res.status(404).json({ msg: 'No existe el producto' })
        }

        producto.nombre = nombre;
        producto.categoria = categoria;
        producto.ubicacion = ubicacion;
        producto.precio = precio;

        producto = await Producto.findOneAndUpdate({ _id: req.params.id },producto, { new: true} )
        res.json(producto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

const borrarProducto = async (req, res) => {

    try {
        
        const producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado'
            });
        }

        await Producto.findOneAndDelete({_id: req.params.id});

        res.status(200).json({
            ok: true,
            msg: 'Se elimino el producto'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error'
        });
    }
}

module.exports = { obtenerProductos, obtenerProductoid, crearProducto, actualizarProducto, borrarProducto }