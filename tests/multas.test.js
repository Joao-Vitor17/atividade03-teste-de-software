const axios = require('axios');
require('dotenv').config();
const api = `http://localhost:${process.env.PORT || 3000}`;

describe("Multas", () => {
    test("deve registrar uma nova multa", async () => {
        const res = await axios.post(`${api}/multas`, {
            emprestimo_id: 68,
            tipo: "danificado",
            valor: 15,
            descricao: "Morderam o livro"
        });
        expect(res.status).toBe(201);
        expect(res.data).toHaveProperty("id");
    });

    test("deve retornar uma lista de multas", async () => {
        const res = await axios.get(`${api}/multas`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
    });

    test("deve retornar uma multa pelo id", async () => {
        const res = await axios.get(`${api}/multas/2`);

        expect(res.status).toBe(200);

        expect(res.data).toHaveProperty('id');
        expect(res.data).toHaveProperty('emprestimo_id');
        expect(res.data).toHaveProperty('quitado');
        expect(res.data).toHaveProperty('tipo');
        expect(res.data).toHaveProperty('valor');
        expect(res.data).toHaveProperty('descricao');
    });

    test("deve deletar uma multa", async () => {
        const res = await axios.delete(`${api}/multas/1`);
        expect(res.status).toBe(204);
    });

    test("deve retornar 404 ao deletar multa inexistente", async () => {
        try {
            await axios.delete(`${api}/multas/99999`);
        } catch (err) {
            expect(err.response.status).toBe(404);
        }
    });

    test("deve retornar 404 para multa inexistente", async () => {
        try {
            await axios.get(`${api}/emprestimos/99999`);
        } catch (err) {
            expect(err.response.status).toBe(404);
        }
    });
});