import { InvalidUuidError } from '../errors/invalid-uuid.error'
import { UniqueEntityId } from './unique-entity-id.vo'
import { validate as uuidValidate } from 'uuid'


describe('UniqueEntityId Unit Tests', () => {
  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate')
  
  beforeEach(() =>  validateSpy.mockClear())

  it('should throw error when uuid is invalid', () => {
    expect(() => new UniqueEntityId('fake id')).toThrow(new InvalidUuidError()) 
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  it('should accept a uuid passed in constructor', () => {
    const uuid = 'b4a07eea-4153-43c5-a745-41b21ea9d922'
    const vo = new UniqueEntityId(uuid)
    expect(vo.id).toBe(uuid)
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  it('should generated uuid with not passed constructor', () => {
    const vo = new UniqueEntityId()
    expect(uuidValidate(vo.id)).toBeTruthy()
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })
})