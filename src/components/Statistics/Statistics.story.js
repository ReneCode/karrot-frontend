import { storiesOf } from '@storybook/vue'

import AmountPicker from './AmountPicker'
import AmountBox from './AmountBox'
import PickupFeedback from './PickupFeedback'
import i18n from '@/i18n'

const amountPicker = `
<div style="padding: 2em">
  <AmountPicker/>
</div>
`

storiesOf('Statistics', module)
  .add('AmountPicker', () => ({
    components: { AmountPicker },
    template: amountPicker,
  }))
  .add('AmountBox', () => ({
    components: { AmountBox },
    template: '<div style="padding: 2em"><AmountBox :amount="20"/></div>',
  }))
  .add('PickupFeedback', () => ({
    components: { PickupFeedback },
    template: '<div style="padding: 2em"><PickupFeedback/></div>',
    i18n,
  }))
