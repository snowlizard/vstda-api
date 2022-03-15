const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

const data = [
	{
		todoItemId: 0,
		name: 'an item',
		priority: 3,
		completed: false
	},
	{
		todoItemId: 1,
		name: 'another item',
		priority: 2,
		completed: false
	},
	{
		todoItemId: 2,
		name: 'a done item',
		priority: 1,
		completed: true
	}
];

// add your code here
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200).send({ "status": "ok" });
});

app.get('/api/TodoItems', (req, res) => {
    res.status(200).send(data);
});

app.get('/api/TodoItems/:id', (req, res) => {
    const todo = data.find( item => item.todoItemId == req.params.id);

    res.send(todo);
});

app.post('/api/TodoItems', (req, res) => {
    const inArray = data.find(todo => todo.todoItemId === req.body.todoItemId);
    
    inArray ?
    data.map( todo => {
        if(todo.todoItemId === req.body.todoItemId){
            todo = req.body
        }
    }) :
    data.push(req.body);

    res.status(201).send(req.body);
});

app.delete('/api/TodoItems/:id', (req, res) => {

    const todo = data.find( item => {
        return item.todoItemId == req.params.id
    });

    data.splice(data.indexOf(todo), 1);
    
    res.send(todo);
});

module.exports = app;
