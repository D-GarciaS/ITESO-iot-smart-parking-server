import { Slotrequest } from '.'

let slotrequest

beforeEach(async () => {
  slotrequest = await Slotrequest.create({ plates: 'test', driver: 'test', passenger: 'test', retry: 'test', successful: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = slotrequest.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(slotrequest.id)
    expect(view.plates).toBe(slotrequest.plates)
    expect(view.driver).toBe(slotrequest.driver)
    expect(view.passenger).toBe(slotrequest.passenger)
    expect(view.retry).toBe(slotrequest.retry)
    expect(view.successful).toBe(slotrequest.successful)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = slotrequest.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(slotrequest.id)
    expect(view.plates).toBe(slotrequest.plates)
    expect(view.driver).toBe(slotrequest.driver)
    expect(view.passenger).toBe(slotrequest.passenger)
    expect(view.retry).toBe(slotrequest.retry)
    expect(view.successful).toBe(slotrequest.successful)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
