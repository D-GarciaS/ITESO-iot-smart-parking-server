import { Parkingslot } from '.'

let parkingslot

beforeEach(async () => {
  parkingslot = await Parkingslot.create({ number: 'test', section: 'test', occupied: 'test', preferential: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = parkingslot.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(parkingslot.id)
    expect(view.number).toBe(parkingslot.number)
    expect(view.section).toBe(parkingslot.section)
    expect(view.occupied).toBe(parkingslot.occupied)
    expect(view.preferential).toBe(parkingslot.preferential)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = parkingslot.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(parkingslot.id)
    expect(view.number).toBe(parkingslot.number)
    expect(view.section).toBe(parkingslot.section)
    expect(view.occupied).toBe(parkingslot.occupied)
    expect(view.preferential).toBe(parkingslot.preferential)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
