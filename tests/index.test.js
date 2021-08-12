const trans = require('../task/trans.js');
const babel = require("@babel/core");

describe('block', () => {
  const input = `
    const a = 'perfectyang'
    const b = 'goood'
  `
  it('dev', () => {
    const {code} = babel.transform(input, {plugins: [
      [
       trans,
       {
        options: [
          {
            name: 'perfectyang'
          }
        ]
       }
      ]
    ]})
    expect(code).toMatchSnapshot();
  });
  // it('pro', () => {
  //   const {code} = babel.transform(input, {plugins: [
  //     [
  //      trans,
  //      {
  //        name: 'perfectyang'
  //      }
  //     ]
  //   ]})
  //   expect(code).toMatchSnapshot();
  // });

})
