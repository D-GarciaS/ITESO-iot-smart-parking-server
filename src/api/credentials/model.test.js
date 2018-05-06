import { Credentials } from '.'

let credentials

beforeEach(async () => {
  credentials = await Credentials.create({ barcode: 'test', userId: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = credentials.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(credentials.id)
    expect(view.barcode).toBe(credentials.barcode)
    expect(view.userId).toBe(credentials.userId)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = credentials.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(credentials.id)
    expect(view.barcode).toBe(credentials.barcode)
    expect(view.userId).toBe(credentials.userId)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
