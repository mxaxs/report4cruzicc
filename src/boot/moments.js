// import something here
import Vue from 'vue';
import moment from 'moment';
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async (/* { app, router, Vue ... } */) => {
  // something to do
Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).format('DD/MM/YYYY HH[h]:mm[min]')
    }
} );

  Vue.filter( 'stripUnderscore', function ( value ) {
    if ( value ) {
     return value.replace( /_/g, ' ' );
    }
  })
}
