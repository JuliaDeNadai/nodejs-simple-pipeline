import request from 'supertest'
import {app} from '../../src/server.js'

describe('Server', () => {

  it('Must start server', () => {
    request(app)
      .get('/healthcheck')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
      });
  })

})