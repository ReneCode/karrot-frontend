<template>
  <SidenavBox>
    <div slot="name"><i class="fa fa-fw fa-shopping-cart"></i>{{ $t("GROUP.STORES") }}</div>
    <div slot="tools">
      <router-link :to="{name: 'storeCreate'}">
        <q-btn class="text-white" small flat>
          <q-icon size="1em" name="fa-plus-circle" />
          {{ $t("BUTTON.CREATE") }}
        </q-btn>
      </router-link>
    </div>
    <div>
      <q-list highlight no-border>
        <q-item
          v-for="store in stores" :key="store.id"
          link :to="{name: 'store', params: { storeId: store.id }}">
          {{ store.name }}
        </q-item>
      </q-list>
    </div>
  </SidenavBox>
</template>

<script>
import { QBtn, QList, QItem, QIcon } from 'quasar'
import SidenavBox from './SidenavBox'

export default {
  props: {
    stores: { required: true },
  },
  components: {
    SidenavBox, QBtn, QList, QItem, QIcon,
  },
}
</script>

<style scoped lang="stylus">
  .fa
    margin-right: .3em
</style>
