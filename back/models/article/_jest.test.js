const services = require('./services')
const mongoose = require('mongoose')
require('dotenv').config()

beforeEach(async()=>{
  await mongoose.connect(process.env.MONGO_URI)
});

afterEach(async()=>{
  await mongoose.connect(process.env.MONGO_URI)
});

describe('getArticles',()=>{
  it('should return all Articles', async()=>{
    const res = await services.getArticles({})
    console.log(res)
    expect(res.success).toBe(true)
    expect(res.payload.length).toBeGreaterThan(0)
  });
  it('should return specified Article', async()=>{
    const res = await services.getArticles({filter:{_id:'6458ea73b59387ade44b21cc'}})
    console.log(res)
    expect(res.success).toBe(true)
    expect(res.payload.length).toBe(1)
    expect(res.payload[0].identifier).toBe('my_name_is')
  });
})
