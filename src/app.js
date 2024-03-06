const express = require('express');

const teams = [
    {
      id: 1,
      name: 'São Paulo Futebol Clube',
      initials: 'SPF',
    },
    {
      id: 2,
      name: 'Clube Atlético Mineiro',
      initials: 'CAM',
    },
  ];

const app = express();

// Ativando a recepção e interpretação de requisições no formato JSON
app.use(express.json());

// Criando endpoint do tipo get com a rota /teams
app.get('/teams', (req, res) => res.status(200).json({ teams }));

// Cadastrando times por meio do método POST
app.post('/teams', (req, res) => {
    const newTeam = { ...req.body };
    teams.push(newTeam);
  
    res.status(201).json({ team: newTeam });
  });

// Actualizando dados na aplicação por meio do método PUT
app.put('/teams/:id', (req, res) => {
    const { id } = req.params;
    const { name, initials } = req.body;
  
    const updateTeam = teams.find((team) => team.id === Number(id));
  
    if (!updateTeam) {
      return res.status(404).json({ message: 'Team not found' });
    }
  
    updateTeam.name = name;
    updateTeam.initials = initials;
    res.status(200).json({ updateTeam });
  });

// Pesquisando dados por meio do método GET usando parametro de rota
app.get('/teams/:id', (req, res) => {
  const { id } = req.params;
  const team = teams.find((element) => element.id === Number(id)); 
  if (!team) {
    return res.status(404).json({ message: 'Team not found' }); 
  }
  res.status(200).json({ team });
});

// Deletando dados por meio do método DELETE
app.delete('/teams/:id', (req, res) => {
    const { id } = req.params;
    const arrayPosition = teams.findIndex((team) => team.id === Number(id));
    teams.splice(arrayPosition, 1);
  
    res.status(200).end();
  });
module.exports = app;