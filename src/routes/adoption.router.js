import { Router } from 'express';
const router = Router();

// Array temporal en memoria (para tests; luego lo podés conectar a MongoDB)
const adoptions = [];

// GET todas las adopciones
router.get('/', (req, res) => {
  res.status(200).json(adoptions);
});

// GET adopción por ID
router.get('/:id', (req, res) => {
  const adoption = adoptions.find(a => a.id === req.params.id);
  if (!adoption) {
    return res.status(404).json({ error: 'Adopción no encontrada' });
  }
  res.status(200).json(adoption);
});

// POST crear adopción
router.post('/', (req, res) => {
  const { petId, userId, notes } = req.body;
  if (!petId || !userId) {
    return res.status(400).json({ error: 'Campos obligatorios: petId y userId' });
  }
  const newAdoption = { id: Date.now().toString(), petId, userId, notes };
  adoptions.push(newAdoption);
  res.status(201).json(newAdoption);
});

// PUT actualizar adopción
router.put('/:id', (req, res) => {
  const adoption = adoptions.find(a => a.id === req.params.id);
  if (!adoption) {
    return res.status(404).json({ error: 'Adopción no encontrada' });
  }
  Object.assign(adoption, req.body);
  res.status(200).json(adoption);
});

// DELETE eliminar adopción
router.delete('/:id', (req, res) => {
  const index = adoptions.findIndex(a => a.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Adopción no encontrada' });
  }
  adoptions.splice(index, 1);
  res.status(204).send();
});

// 👇 Export default para que app.js lo pueda importar
export default router;
