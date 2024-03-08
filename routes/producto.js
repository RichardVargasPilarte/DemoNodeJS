/*
    Ruta: /api/productos
*/

const { Router } = require('express');
const { body } = require('express-validator');

const { obtenerProductos, obtenerProductoid ,crearProducto, actualizarProducto, borrarProducto } = require('../controllers/producto');

const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');

router.get( '/', obtenerProductos );

router.get('/:id', obtenerProductoid);

router.post(
    '/',
    [
        body('nombre', 'El nombre es obligatorio').not().isEmpty(),
        body('categoria', 'La categoria es obligatoria').not().isEmpty(),
        body('ubicacion', 'La ubicacion es obligatoria').not().isEmpty(),
        body('precio', 'El precio es obligatorio').not().isEmpty(),
        validarCampos
    ]
    ,
    crearProducto
);

router.put('/:id',
    [
        body('nombre', 'El nombre es obligatorio').not().isEmpty(),
        body('categoria', 'La categoria es obligatoria').not().isEmpty(),
        body('ubicacion', 'La ubicacion es obligatoria').not().isEmpty(),
        body('precio', 'El precio es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarProducto
);

router.delete('/:id', borrarProducto);


module.exports = router;