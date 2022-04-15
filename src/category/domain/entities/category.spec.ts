import { UniqueEntityId } from '../../../@seedwork/domain/unique-entity-id.vo'
import { omit } from "lodash"
import { validate as uuidValidate } from 'uuid'

import { Category, CategoryProps } from "./category"

describe('Category Tests', () => {
  test('constructor of category', () => {
    let category = new Category({name: 'Movie'})
    const props = omit(category.props, 'created_at')
    expect(props).toStrictEqual({
      name: 'Movie',
      description: null,
      is_active: true
    })
    expect(category.props.created_at).toBeInstanceOf(Date)

    category = new Category({
      name: 'Movie',
      description: 'some description',
      is_active: false
    })
    const created_at = new Date()
    expect(category.props).toStrictEqual({
      name: 'Movie',
      description: 'some description',
      is_active: false,
      created_at
    })
  })

  test('id field', () => {
    type CategoryData = { props: CategoryProps, id?: UniqueEntityId }
    const data: CategoryData[] = [
      { props: { name: 'Movie' } },
      { props: { name: 'Movie' }, id: new UniqueEntityId() },
    ]

    data.forEach(it => {
      const category = new Category(it.props, it.id)
      expect(category.id).not.toBeNull()
      expect(category.id).toBeInstanceOf(UniqueEntityId)
    })
  })
})