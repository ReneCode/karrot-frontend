import { mount } from 'vue-test-utils'

import GroupMap from './GroupMap'
import { usersMock, storesMock } from '>/mockdata'

import Vue2Leaflet from 'vue2-leaflet'

/* vue2-leaflet library does not name its components, which vue-test-utils needs to find them
   so we give them names here... */
Vue2Leaflet.Map.name = 'Vue2LeafletMap'
Vue2Leaflet.TileLayer.name = 'Vue2LeafletTileLayer'
Vue2Leaflet.Popup.name = 'Vue2LeafletPopup'
Vue2Leaflet.Marker.name = 'Vue2LeafletMarker'

const defaultProps = {
  users: usersMock,
  stores: storesMock,
  showUsers: true,
  showStores: true,
  activeGroup: {},
}

describe('GroupMap', () => {
  it('renders users and stores', () => {
    let wrapper = mount(GroupMap, {
      propsData: defaultProps,
    })
    expect(wrapper.findAll(Vue2Leaflet.Map).length).toBe(1)
    expect(wrapper.findAll(Vue2Leaflet.Marker).length).toBe(usersMock.length + storesMock.length)
    expect(wrapper.findAll(Vue2Leaflet.Marker).hasProp('visible', true)).toBe(true)
    expect(wrapper.findAll(Vue2Leaflet.Popup).length).toBe(usersMock.length + storesMock.length)
  })

  it('renders just users', () => {
    let wrapper = mount(GroupMap, {
      propsData: {
        ...defaultProps,
        showStores: false,
      },
    })
    expect(wrapper.findAll(Vue2Leaflet.Marker).length).toBe(usersMock.length)
    expect(wrapper.findAll(Vue2Leaflet.Popup).length).toBe(usersMock.length)
  })

  it('renders just stores', () => {
    let wrapper = mount(GroupMap, {
      propsData: {
        ...defaultProps,
        showUsers: false,
      },
    })
    expect(wrapper.findAll(Vue2Leaflet.Marker).length).toBe(storesMock.length)
    expect(wrapper.findAll(Vue2Leaflet.Popup).length).toBe(storesMock.length)
  })
})
