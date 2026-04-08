const axios = require('axios');
require('dotenv').config();
const api = `http://localhost:${process.env.PORT || 3000}`;

// Altere para ids que existem no seu banco
const LIVRO_ID = 1;
const USUARIO_ID = 1;

describe("Empréstimos", () => {
    test("deve registrar um novo empréstimo", async () => {
        const res = await axios.post(`${api}/emprestimos`, {
            livro_id: LIVRO_ID,
            usuario_id: USUARIO_ID,
            data_devolucao_prevista: "2025-05-01",
        });
        expect(res.status).toBe(201);
        expect(res.data).toHaveProperty("id");
    });

    test("deve retornar uma lista de empréstimos", async () => {
        const res = await axios.get(`${api}/emprestimos`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
    });

    test("deve deletar um empréstimo", async () => {
        const res = await axios.delete(`${api}/emprestimos/1`);
        expect(res.status).toBe(204);
    });

    test("deve retornar 404 ao deletar empréstimo inexistente", async () => {
        try {
            await axios.delete(`${api}/emprestimos/9999999`);
        } catch (err) {
            expect(err.response.status).toBe(404);
        }
    });

    test("deve retornar um empréstimo pelo id", async () => {
        const res = await axios.get(`${api}/emprestimos/1`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('livro_id');
        expect(res.body).toHaveProperty('usuario_id');
        expect(res.body).toHaveProperty('data_devolucao_prevista');
    });

    test("deve retornar 404 para empréstimo inexistente", async () => {
        try {
            await axios.get(`${api}/emprestimos/99999`);
        } catch (err) {
            expect(err.response.status).toBe(404);
        }
    });

    test("deve retornar 400 ao registrar empréstimo sem livro_id", async () => {
        try {
            await axios.post(`${api}/emprestimos`, {
                usuario_id: USUARIO_ID,
                data_devolucao_prevista: "2025-05-01",
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });

    test("deve retornar 400 ao registrar empréstimo sem usuario_id", async () => {
        try {
            await axios.post(`${api}/emprestimos`, {
                livro_id: LIVRO_ID,
                data_devolucao_prevista: "2025-05-01",
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });

    test("deve retornar 400 ao registrar empréstimo sem data de devolução", async () => {
        try {
            await axios.post(`${api}/emprestimos`, {
                livro_id: LIVRO_ID,
                usuario_id: USUARIO_ID,
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });

    test("deve registrar a devolução de um empréstimo", async () => {
        const criado = await axios.post(`${api}/emprestimos`, {
            livro_id: LIVRO_ID,
            usuario_id: USUARIO_ID,
            data_devolucao_prevista: "2025-05-01",
        });

        const dataDevolucao = '2026-04-08';

        const res = await axios.put(`${api}/emprestimos/${criado.data.id}`, { data_devolucao_real: dataDevolucao });
        expect(res.status).toBe(200);

        const devolucaoBanco = res.data.data_devolucao_real.slice(0, 10);

        expect(devolucaoBanco).toBe(dataDevolucao);
    });

    test("deve retornar 404 ao devolver empréstimo inexistente", async () => {
        const dataDevolucao = '2026-04-08';

        try {
            await axios.put(`${api}/emprestimos/9999999`, { data_devolucao_real: dataDevolucao });
        } catch (err) {
            expect(err.response.status).toBe(404);
        }
    });

    test("deve listar empréstimos de um usuário específico", async () => {
        await axios.post(`${api}/emprestimos`, {
            livro_id: LIVRO_ID,
            usuario_id: USUARIO_ID,
            data_devolucao_prevista: "2025-05-01",
        });
        await axios.post(`${api}/emprestimos`, {
            livro_id: LIVRO_ID,
            usuario_id: USUARIO_ID,
            data_devolucao_prevista: "2025-05-01",
        });
        await axios.post(`${api}/emprestimos`, {
            livro_id: LIVRO_ID,
            usuario_id: USUARIO_ID + 1,
            data_devolucao_prevista: "2025-05-01",
        });

        const res = await axios.get(`${api}/emprestimos/usuario/1`);
        
        expect(res.status).toBe(200);
        expect(res.data.every(e => e.usuario_id === USUARIO_ID)).toBe(true);
        expect(res.data.length).toBeGreaterThanOrEqual(2);
    });

    test("deve retornar 400 ao emprestar livro já emprestado", async () => {
    });
});