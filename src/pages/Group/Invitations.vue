<script>
import { connect } from 'vuex-connect'
import InvitationsUI from '@/components/Group/InvitationsUI'

export default connect({
  gettersToProps: {
    invitations: 'invitations/list',
    listStatus: 'invitations/listStatus',
    sendStatus: 'invitations/sendStatus',
    requestError: 'invitations/sendError',
  },
  actionsToEvents: {
    submit: 'invitations/send',
  },
  lifecycle: {
    mounted: ({ dispatch }) => dispatch('invitations/fetchForActiveGroup'),
  },
})('GroupInvitations', InvitationsUI)
</script>
