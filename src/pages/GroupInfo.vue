<script>
import { connect } from 'vuex-connect'
import router from '@/router'
import GroupInfoCard from '@/components/GroupJoin/GroupInfoCard'

export default connect({
  gettersToProps: {
    group: 'groups/activeGroupInfo',
    status: 'groups/joinStatus',
    isLoggedIn: 'auth/isLoggedIn',
  },
  methodsToEvents: {
    visit: (store, { groupId }) => router.push({ name: 'group', params: { groupId } }),
    join: ({ dispatch, getters }, { groupId, password }) => {
      if (getters['auth/isLoggedIn']) {
        dispatch('groups/join', { groupId, password })
      }
      else {
        dispatch('auth/setJoinGroupAfterLogin', { groupId, password })
        router.push({ name: 'signup' })
      }
    },
  },
})('GroupInfo', GroupInfoCard)
</script>
