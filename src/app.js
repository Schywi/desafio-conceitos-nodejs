const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  //const list = request.query;


  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body; 

  const repository = {
    id: uuid(), 
    title, 
    url,
    techs, 
    likes: 0,
  };
  
  if (!repository)  {
    return response.status(400).send();
  }; 

  repositories.push(repository);
  return response.json(repository);
  
});

app.put("/repositories/:id", (request, response) => {
    const {id} = request.params; 
    const {title, url, techs} = request.body; 

    
  const repositoryIndex = repositories.find(repository => repository.id === id); 
  
  if (!repositoryIndex)  {
    return response.status(400).send();
  }; 


  const repository = {
    id: uuid(), 
    title, 
    url,
    techs, 
    likes: 0, 
    };

 repositories[repositoryIndex] = repository;

  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const {id}  = request.params

  const repository = repositories.find(repository => repository.id === id)

  
  if (!repository)  {
    return response.status(400).send();
  }; 
  repositories.splice(repository, 1); 

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params; 

  const repository = repositories.find(repository => repository.id === id); 

  if (!repository)  {
    return response.status(400).send();
  }; 

  repository.like += 1 ; 
  
  return response.json(repository);
});

module.exports = app;
