const { response } = require('express');
const { dbConnection } = require('../DB/config');

const getAgentes = async (req, res = response) => {

    try {

        const pool = await dbConnection();
        const result = await pool.request().query('SELECT * FROM agente;');
        res.json(result.recordsets);

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}

const getAgentesById = async (req, res = response) => {

    const id = req.params.id;

    try {

        const pool = await dbConnection();
        const result = await pool.request().query(`SELECT * FROM [node_example].[dbo].[agente] WHERE id=${id};`);
        res.json(result.recordsets);

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}

const crearAgente = async (req, res = response) => {

    const { nombre, habilidad, puntos_ulti } = req.body;

    if (nombre == null || habilidad == null || puntos_ulti == null || nombre == '' || habilidad == '' || puntos_ulti == '') {
        return res.status(400).json({
            ok: false,
            msg: 'Bad request. Please fill all the fields'
        });
    }

    try {

        const pool = await dbConnection();
        await pool
            .request()
            .query(`INSERT INTO [node_example].[dbo].[agente] (nombre,habilidad,puntos_ulti) VALUES ('${nombre}', '${habilidad}', ${puntos_ulti});`);
        // .input("nombre", sql.VarChar, nombre)
        // .input("habilidad", sql.VarChar, habilidad)
        // .input("puntos_ulti", sql.Int, puntos_ulti)
        // .query(`INSERT INTO [node_example].[dbo].[agente] (nombre,habilidad,puntos_ulti) 
        // VALUES (@nombre,@habilidad,@puntos_ulti);`);
        res.json({
            ok: true,
            msg: nombre, habilidad, puntos_ulti
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}

const actualizarAgente = async (req, res = response) => {

    const { habilidad, puntos_ulti } = req.body;
    const id = req.params.id;

    if (habilidad == null || puntos_ulti == null || habilidad == '' || puntos_ulti == '') {
        return res.status(400).json({
            ok: false,
            msg: 'Bad request. Please fill all the fields'
        });
    }

    try {

        const pool = await dbConnection();
        await pool
            .request()
            .query(`UPDATE [node_example].[dbo].[agente] SET habilidad = '${habilidad}' , puntos_ulti = ${puntos_ulti} WHERE id =${id};`);
        //     .input("habilidad", sql.VarChar, habilidad)
        //     .input("puntos_ulti", sql.Int, puntos_ulti)
        //     .input("id", sql.Int, id)
        //     .query(`UPDATE agente
        // SET habilidad = @habilidad, puntos_ulti = @puntos_ulti 
        // WHERE id =@id`)
        res.json({
            ok: true,
            msg: habilidad, puntos_ulti
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}

const eliminarAgente = async (req, res = response) => {

    const id = req.params.id;

    try {

        const pool = await dbConnection();
        await pool
            .request()
            .query(`DELETE [node_example].[dbo].[agente] WHERE id =${id};`);
        res.json({
            ok: true,
            msg: `El agente con id = ${id} fue eliminado`
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}

module.exports = {
    getAgentes,
    getAgentesById,
    crearAgente,
    actualizarAgente,
    eliminarAgente
}