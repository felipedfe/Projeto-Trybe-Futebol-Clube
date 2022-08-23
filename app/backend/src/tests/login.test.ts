import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
import { generateToken } from '../helpers/token';
// @ts-ignore
import chaiHttp = require('chai-http');
import User from '../database/models/user';

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const userMock = {
  id: 1,
  username: 'teste@email.com',
  role: 'admin-teste',
  email: 'teste@admin.com',
  password: '1234567'
}

const invalidUserMock = {
  id: 1,
  username: 'invalid@email.com',
  role: 'admin-invalid',
  email: 'invalid@admin.com',
  password: '1234567'
}

const userLoginBodyMock = {
  email: 'teste@email.com',
  password: '1234567'
}

describe('User', () => {
  describe('login', () => {

    beforeEach(() => {
      sinon.stub(User, 'findOne').resolves(userMock as User)
    })

    afterEach(() => {
      sinon.restore();
    })

    it('É possível fazer login com os dados corretos', async () => {
      const comparison = userMock.password === userLoginBodyMock.password

      sinon.stub(bcrypt, 'compare').resolves(comparison)

      const response = await chai.request(app).post('/login').send(userLoginBodyMock)

      expect(response.status).to.equal(200)
    });

    it('É retornado um erro se um e-mail não for digitado', async () => {
      userLoginBodyMock.email = '';

      const response = await chai.request(app).post('/login').send(userLoginBodyMock)

      expect(response.status).to.equal(400)
      expect(response.body.message).to.equal("All fields must be filled")
    });

    it('É retornado um erro se uma senha não for digitada', async () => {
      userLoginBodyMock.password = '';
      userLoginBodyMock.email = 'teste@email.com';

      const response = await chai.request(app).post('/login').send(userLoginBodyMock)

      expect(response.status).to.equal(400)
      expect(response.body.message).to.equal("All fields must be filled")
    });

    it('É retornado um erro se for digitado um e-mail inválido', async () => {
      userLoginBodyMock.email = 'invalid@email.com'
      userLoginBodyMock.password = '1234567'

      const comparison = userMock.email === userLoginBodyMock.email

      const response = await chai.request(app).post('/login').send(userLoginBodyMock)


      expect(response.status).to.equal(401)
      expect(response.body.message).to.equal("Incorrect email or password")
    });

    it('É retornado um erro se for digitada uma senha inválido', async () => {
      userLoginBodyMock.email = 'teste@email.com'
      userLoginBodyMock.password = '12345678'

      const comparison = userMock.email === userLoginBodyMock.email

      const response = await chai.request(app).post('/login').send(userLoginBodyMock)

      expect(response.status).to.equal(401)
      expect(response.body.message).to.equal("Incorrect email or password")
    });

    it('É retornado um erro se a senha digitada possuir menos de 6 caracteres', async () => {
      userLoginBodyMock.email = 'teste@email.com'
      userLoginBodyMock.password = '123'

      const comparison = userMock.email === userLoginBodyMock.email

      const response = await chai.request(app).post('/login').send(userLoginBodyMock)

      expect(response.status).to.equal(401)
      expect(response.body.message).to.equal("Password must have at least 6 characters")
    });
  })

  describe('validate', async () => {
    it('Será retornado o tipo de usuário caso o token seja válido', async () => {
      sinon.stub(User, 'findOne').resolves(userMock as User)
      const token = generateToken(userMock.email)
      const userRole = userMock.role;

      const response = await chai.request(app).get('/login/validate')
        .set('Authorization', token)

      expect(response.status).to.equal(200)
      expect(response.body.role).to.equal(userRole)
      sinon.restore();
    })

    it('Será retornado um erro caso não exista um token na requisição', async () => {
      const response = await chai.request(app).get('/login/validate')

      expect(response.status).to.equal(400)
      expect(response.body.message).to.equal('Token not found')
    })

    it('Será retornado um erro caso o token seja inválido', async () => {
      sinon.stub(User, 'findOne').resolves(null)
      const invalidToken = generateToken(invalidUserMock.email)

      const response = await chai.request(app).get('/login/validate')
        .set('Authorization', invalidToken)

      expect(response.status).to.equal(400)
      expect(response.body.message).to.equal('No user found')
    })
  })
});
