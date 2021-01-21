<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="print-hide" elevated>
      <q-toolbar >
        <q-btn
          flat
          dense
          round
          icon="print"
          aria-label="Menu"
          label ="IMPRIMIR"
          @click="print()"
        />
        <q-toolbar-title>
         
        </q-toolbar-title>

        <div>Report Sphere</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
//import EssentialLink from 'components/EssentialLink.vue'

//import report from 'components/report.vue'

export default {
  name: 'MainLayout',
  
  data () {
    return {
      leftDrawerOpen: false,
      
    }
  },
  methods: {
    print() {
      window.print();
    }
  },
}
</script>
