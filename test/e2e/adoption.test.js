import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/app.js';   // 👈 ahora sí usamos tu app.js real

describe('Tests funcionales para adoption.router.js', () => {
  let idCreado;

  it('POST /api/adoptions debe crear una adopción', async () => {
    const res = await request(app)
      .post('/api/adoptions')
      .send({ petId: 'PET123', userId: 'USER123', notes: 'Adopción de prueba' });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
    idCreado = res.body.id;
  });

  it('GET /api/adoptions debe devolver todas las adopciones', async () => {
    const res = await request(app).get('/api/adoptions');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('GET /api/adoptions/:id debe devolver una adopción específica', async () => {
    const res = await request(app).get(`/api/adoptions/${idCreado}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('id', idCreado);
  });

  it('PUT /api/adoptions/:id debe actualizar una adopción', async () => {
    const res = await request(app)
      .put(`/api/adoptions/${idCreado}`)
      .send({ notes: 'Actualizada' });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('notes', 'Actualizada');
  });

  it('DELETE /api/adoptions/:id debe eliminar una adopción', async () => {
    const res = await request(app).delete(`/api/adoptions/${idCreado}`);
    expect(res.status).to.equal(204);
  });

  it('GET /api/adoptions/:id debe devolver 404 si no existe', async () => {
    const res = await request(app).get(`/api/adoptions/${idCreado}`);
    expect(res.status).to.equal(404);
  });
});
