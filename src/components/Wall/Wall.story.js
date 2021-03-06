import { storiesOf } from '@storybook/vue'

import Wall from './Wall'
import WallCard from './WallCard'
import WallMessage from './WallMessage'
import WallFeedback from './WallFeedback'
import { messagesMock, leavablePickup, pickupsMock, feedbackMock, currentUserMock } from '>/mockdata'
import i18n from '@/i18n'
import router from '@/router'
import { createStore } from '>/helpers'

const store = createStore({
  auth: {
    getters: { user: () => currentUserMock },
  },
})

const defaultProps = {
  messages: messagesMock,
  emptyPickups: pickupsMock,
  joinedPickups: [leavablePickup],
  sendStatus: { isWaiting: false },
  messageReceiveStatus: { success: true },
}

storiesOf('Wall', module)
  .add('Wall', () => ({
    render: h => h(Wall, {
      props: defaultProps,
    }),
    i18n,
    router,
    store,
  }))
  .add('WallCard', () => ({
    components: { WallCard },
    template: '<div style="padding: 2em"><WallCard/></div>',
    data () {
      return {
        user: {
          id: 5,
          displayName: 'Lars Wolf',
        },
      }
    },
    i18n,
  }))

  .add('WallMessage', () => ({
    components: { WallMessage },
    template: '<div style="padding: 2em"><WallMessage :message="message"/></div>',
    data () {
      return {
        message: messagesMock[0],
      }
    },
    i18n,
    router,
  }))

  .add('WallFeedback', () => ({
    components: { WallFeedback },
    template: '<div style="padding: 2em"><WallFeedback :feedback="feedback"/></div>',
    data () {
      return {
        feedback: feedbackMock[0],
      }
    },
    i18n,
    router,
  }))
