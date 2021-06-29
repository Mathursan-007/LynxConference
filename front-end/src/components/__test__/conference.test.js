const { cleanup } =  require('@testing-library/react');
const ChangeColour = require('../../functions/ChangeColour');
const Plan = require('../functions/PriceOfType')
const Password = require('../functions/PasswordCheck')
const CheckArrayCount = require('../../functions/CheckArrayCount')
const CheckStatus = require('../../functions/CheckStatus')
const CheckPath = require('../../functions/CheckPath')
const { configure } =  require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

afterEach(() => {
    cleanup();
})

configure({adapter: new Adapter()});
test('bootstrap classes working', () => {
    expect(ChangeColour('approved')).toBe('bg-danger');
});
test('check plan price', () => {
    expect(Plan('Basic')).toBe(2000);
});
test('check password', () => {
    expect(Password('aaaa','aaaa')).toBeTruthy();
});
test('check array count', () => {
    expect(CheckArrayCount(3,5)).toBeTruthy();
});
test('check status', () => {
    expect(CheckStatus("approved")).toBeTruthy();
});
test('check path', () => {
    expect(CheckPath("/admin")).toBeTruthy();
});
