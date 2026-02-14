import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppFooter from '~/components/AppFooter.vue'

describe('AppFooter', () => {
  it('renders copyright', async () => {
    const component = await mountSuspended(AppFooter)
    expect(component.text()).toContain('VoidZero Blog')
    expect(component.text()).toContain('All rights reserved')
  })
})
