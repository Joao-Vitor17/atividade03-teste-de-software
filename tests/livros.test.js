const request = require('supertest');
const api = `http://localhost:${process.env.PORT || 3000}`;

test('POST /livros cria um livro', async () => {
    const res = await request(api).post('/livros').send({ titulo: 'Clean Code', autor: 'Martin Code' });
    expect(res.status).toBe(201);
    expect(res.body.titulo).toBe("Clean Code");
});

test('GET /livros/:id retorna livro', async () => {
    const res = await request(api).get('/livros/1');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('titulo');
});

test('GET /livros retorna lista de livros', async () => {
    const res = await request(api).get('/livros');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
});

test('GET /livros/:id retorna 404', async () => {
    const res = await request(api).get('/livros/9999');
    expect(res.status).toBe(404);
});