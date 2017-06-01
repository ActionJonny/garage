process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();

const server = require('../server');

const configuration = require('../knexfile').test;
const database = require('knex')(configuration);

chai.use(chaiHttp);
