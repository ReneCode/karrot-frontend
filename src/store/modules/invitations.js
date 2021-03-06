import Vue from 'vue'
import invitations from '@/services/api/invitations'
import { indexById, onlyHandleAPIError } from '@/store/helpers'
import router from '@/router'

export const types = {
  REQUEST_LIST: 'Request List',
  RECEIVE_LIST: 'Receive List',
  RECEIVE_LIST_ERROR: 'Receive List Error',

  REQUEST_SEND: 'Request Send',
  RECEIVE_SEND: 'Receive Send',
  RECEIVE_SEND_ERROR: 'Receive Send Error',

  REQUEST_ACCEPT: 'Request Accept',
  RECEIVE_ACCEPT: 'Receive Accept',
  RECEIVE_ACCEPT_ERROR: 'Receive Accept Error',

  CLEAR: 'Clear',
}

function initialState () {
  return {
    entries: {},
    idList: [],
    listStatus: {
      isWaiting: false,
      error: null,
    },
    sendStatus: {
      isWaiting: false,
      error: null,
    },
    acceptStatus: {
      isWaiting: false,
      error: null,
      success: false,
    },
  }
}

export const state = initialState()

export const getters = {
  listStatus: state => state.listStatus,
  sendStatus: state => state.sendStatus,
  sendError: (state, getters) => field => getters.sendStatus.error && getters.sendStatus.error[field] && getters.sendStatus.error[field][0],
  acceptStatus: state => state.acceptStatus,
  list: state => state.idList.map(i => state.entries[i]),
}

export const actions = {
  /**
   * Fetch sent invitations for active group
   */
  async fetchForActiveGroup ({ commit, dispatch, rootGetters }) {
    const groupId = rootGetters['group/activeGroupId']
    commit(types.REQUEST_LIST)
    try {
      const list = await invitations.listByGroupId(groupId)
      commit(types.RECEIVE_LIST, { list })
    }
    catch (error) {
      commit(types.RECEIVE_LIST_ERROR, { error })
    }
  },

  /**
   * Send invitation to e-mail
   */
  async send ({ commit, rootGetters }, email) {
    commit(types.REQUEST_SEND)
    let invited
    try {
      invited = await invitations.create({
        email,
        group: rootGetters['groups/activeGroupId'],
      })
    }
    catch (error) {
      onlyHandleAPIError(error, data => commit(types.RECEIVE_SEND_ERROR, data))
      return
    }
    commit(types.RECEIVE_SEND, { invited })
  },

  /**
   * Accept invitation with token
   */
  async accept ({ commit, dispatch }, token) {
    commit(types.REQUEST_ACCEPT)
    try {
      await invitations.accept(token)
      commit(types.RECEIVE_ACCEPT)
      // Current group has changed, refresh user data
      await dispatch('auth/check', { root: true })
      dispatch('alerts/create', { type: 'inviteAcceptSuccess' }, { root: true })
      router.push('/')
    }
    catch (error) {
      onlyHandleAPIError(error, data => commit(types.RECEIVE_ACCEPT_ERROR, data))
      dispatch('alerts/create', { type: 'inviteAcceptError' }, { root: true })
      router.push({ name: 'groupsGallery' })
    }
  },

  /**
   * Reset all state
   */
  clear ({ commit }) {
    commit(types.CLEAR)
  },
}

export const mutations = {
  [types.REQUEST_LIST] (state) {
    state.listStatus = {
      isWaiting: true,
      error: null,
    }
  },
  [types.RECEIVE_LIST] (state, { list }) {
    state.listStatus = {
      isWaiting: false,
      error: null,
    }
    state.entries = indexById(list)
    state.idList = list.map(e => e.id)
  },
  [types.RECEIVE_LIST_ERROR] (state, { error }) {
    state.listStatus = {
      isWaiting: false,
      error,
    }
  },

  [types.REQUEST_SEND] (state) {
    state.sendStatus = {
      isWaiting: true,
      error: null,
    }
  },
  [types.RECEIVE_SEND] (state, { invited }) {
    state.sendStatus = {
      isWaiting: false,
      error: null,
    }
    Vue.set(state.entries, invited.id, invited)
    state.idList.push(invited.id)
  },
  [types.RECEIVE_SEND_ERROR] (state, { error }) {
    state.sendStatus = {
      isWaiting: false,
      error,
    }
  },

  [types.REQUEST_ACCEPT] (state) {
    state.acceptStatus = {
      isWaiting: true,
      error: null,
      success: false,
    }
  },
  [types.RECEIVE_ACCEPT] (state) {
    state.acceptStatus = {
      isWaiting: false,
      error: null,
      success: true,
    }
  },
  [types.RECEIVE_ACCEPT_ERROR] (state, { error }) {
    state.acceptStatus = {
      isWaiting: false,
      error,
      success: false,
    }
  },

  [types.CLEAR] (state) {
    Object.entries(initialState())
      .forEach(([prop, value]) => Vue.set(state, prop, value))
  },
}
