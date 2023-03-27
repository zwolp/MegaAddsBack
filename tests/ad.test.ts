import { AdRecord } from "../records/ad.record"

test('record returns data from database for one entry.', async() => {
  const ad = await AdRecord.getOne('test345');

  console.log(ad);

  expect(ad).toBeDefined();
  expect(ad.id).toBe('test345');
  expect(ad.name).toBe('testowy');
  expect(ad.price).toBe(70);
})

test('record returns null from database for unexisting entry.', async() => {
  const ad = await AdRecord.getOne('unexisting');

  expect(ad).toBeNull();
})