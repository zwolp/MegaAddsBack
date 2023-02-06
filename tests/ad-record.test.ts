import { AdRecord } from "../records/ad.record";

const defaultObj = {
  name: 'test name',
  description: 'blah blah',
  url: 'https://megak.pl',
  price: 0,
  lat: 9,
  lon: 9,
}

test('Can build AdRecord', () => {
  const ad = new AdRecord(defaultObj)

  expect(ad.name).toBe('test name');
  expect(ad.description).toBe('blah blah')
})

test('Validates invalid price', () => {
  expect(() => new AdRecord({
    ...defaultObj,
    price: -3,
  })).toThrow('Cena nie może być mniejsza niż 0 lub większa niż 9999999')
})