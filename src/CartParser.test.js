import CartParser from './CartParser';

let parser;

beforeEach(() => {
  parser = new CartParser();

});

// describe('CartParser - unit tests', () => {
// 	// Add your unit tests here.
// });
describe('validate', () => {
it('should return array after it was called', () => {
    expect(parser.validate('0xxxxxxx')).toBeInstanceOf(Array)
    expect(parser.validate('a')).toBeInstanceOf(Array)
    expect(parser.validate('456464')).toBeInstanceOf(Array)
  })
});

describe('validate', () => {
it('should throw error when it is called with an empty string', () => {
    try{
      expect(parser.validate('')).toEqual(0)
    }catch(e) {
      expect(e).toBeInstanceOf(TypeError)
    }
  })
});

describe('validate', () => {
it('should throw error when it is called with not a string', () => {
    try{
      expect(parser.validate(undefined)).toEqual(0)
    }catch(e) {
      expect(e).toBeInstanceOf(TypeError)
    }
    try{
      expect(parser.validate(NaN)).toEqual(0)
    }catch(e) {
      expect(e).toBeInstanceOf(TypeError)
    }
    try{
      expect(parser.validate(null)).toEqual(0)
    }catch(e) {
      expect(e).toBeInstanceOf(TypeError)
    }
    try{
      expect(parser.validate([])).toEqual(0)
    }catch(e) {
      expect(e).toBeInstanceOf(TypeError)
    }
    try{
      expect(parser.validate({})).toEqual(0)
    }catch(e) {
      expect(e).toBeInstanceOf(TypeError)
    }
    try{
      expect(parser.validate()).toEqual(0)
    }catch(e) {
      expect(e).toBeInstanceOf(TypeError)
    }
    try{
      expect(parser.validate(1)).toEqual(0)
    }catch(e) {
      expect(e).toBeInstanceOf(TypeError)
    }
  })
});

describe('validate', () => {
it('should return array with object with errors when file doesn`t match to scheme', () => {
    let resultArr1 = parser.validate('Product name,Price,Quantity\nMollis consequat,9.00')
    let resultArr2 = parser.validate('AnotherName,Price,Quantity')
    let resultArr3= parser.validate('Product name,Price,Quantity\nMollis consequat,9.00,stringInsteadOfNumber')
    let resultArr4 = parser.validate('Product name,Price,Quantity\nMollis consequat,stringInsteadOfNumber,2')
    let resultArr5 = parser.validate('Product name,Price')
    expect(resultArr1.length).toBeGreaterThan(0);
    expect(resultArr2.length).toBeGreaterThan(0);
    expect(resultArr3.length).toBeGreaterThan(0);
    expect(resultArr4.length).toBeGreaterThan(0);
    expect(resultArr5.length).toBeGreaterThan(0);
    })
  });

describe('calcTotal', () => {
it('should return a number', () => {
    const result = parser.calcTotal([{price:5,quantity:7},{price:5,quantity:7}])
    expect(typeof result).toEqual("number");
  })
});

describe('calcTotal', () => {
it('should take an array with objects due to scheme. Objects have to include keys: "price" and "quantity" ', () => {
    const result1 = parser.calcTotal([{price:5,quantity:'string'},{price:5,quantity:7}])
    const result2 = parser.calcTotal([{price:5,anotherKey:5},{price:5,quantity:7}])
    const result3 = parser.calcTotal([{price:5},{price:5,quantity:7}])
    expect(result1).toEqual(NaN);
    expect(result2).toEqual(NaN);
    expect(result3).toEqual(NaN);
  })
});

describe('parseLine', () => {
  it('should return this structure object: {"id": "id", "name": "name", "price": {price}, "quantity": {quantity}}', () => {
    const result = parser.parseLine('Tvoluptatem,10.32,1')
    expect(typeof result).toEqual('object');
    expect(Object.keys(result).length).toEqual(4);
  })
});
describe('parseLine', () => {
it('should throw error when it is called with not a string', () => {
    try{
      expect(parser.parseLine()).toEqual(0)
    }catch(e) {
      expect(e).toBeInstanceOf(TypeError)
    }
    try{
      expect(parser.parseLine(undefined)).toEqual(0)
    }catch(e) {
      expect(e).toBeInstanceOf(TypeError)
    }
    try{
      expect(parser.parseLine(NaN)).toEqual(0)
    }catch(e) {
      expect(e).toBeInstanceOf(TypeError)
    }
    try{
      expect(parser.parseLine([])).toEqual(0)
    }catch(e) {
      expect(e).toBeInstanceOf(TypeError)
    }
    try{
      expect(parser.parseLine({})).toEqual(0)
    }catch(e) {
      expect(e).toBeInstanceOf(TypeError)
    }
  })
});

describe('parse', () => {
it('should throw error when path isn`t correct', () => {
    try {
      expect(parser.parse('./randomPath/cart.csv')).toEqual(0)
    } catch (error) {
      expect(error.code).toEqual("ENOENT")
    }
  })
});

describe('CartParser - integration test', () => {
  it('should parse given file and return an object with keys: "items", "total" if the path is correct', () => {
    expect(typeof parser.parse('./samples/cart.csv')).toEqual('object')
    let keysArr = Object.keys(parser.parse('./samples/cart.csv'))
    expect(keysArr.includes("items")).toEqual(true)
    expect(keysArr.includes("total")).toEqual(true)
  })
});