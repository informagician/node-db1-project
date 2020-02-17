const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/api/accounts', (req,res) => {
    const limit = req.query.limit
    const sortby = req.query.sortby
    const dir = req.query.sortdir
    db
    .select('*')
    .from('accounts')
    .limit(limit)
    .orderBy(sortby,dir)
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(err => {
        res.status(500).json({error: 'problem fetching all accounts'})
    })
})

server.get('/api/accounts/:id',(req,res) => {
    db('accounts')
    .where({id:req.params.id})
    .first()
    .then(account => {
        res.status(200).json(account)
    })
    .catch(err => {
        res.status(500).json({error: 'problem fetching account with ID'})
    })
})

server.post('/api/accounts', (req,res) => {
    db('accounts')
    .insert(req.body, 'id')
    .then(ids => {
        res.status(201).json()
    })
    .catch(err => {
        res.status(500).json({error: 'problem inserting to accounts'})
    })
})

server.put('/api/accounts/:id' ,(req,res) => {
    const id = req.params.id
    const changes = req.body
    db('accounts')
    .where({id})
    .update(changes)
    .then(count => {
        res.status(200).json(count)
    })
    .catch(err => {
        res.status(500).json({error: 'problem updating account'})
    })
})

server.delete('/api/accounts/:id', (req,res) => {
    const id = req.params.id
    db('accounts')
    .where({ id })
    .del()
    .then(count => {
        res.status(200).json(count)
    })
    .catch(err => {
        res.status(500).json({error: 'problem deleting account'})
    })
})

module.exports = server;