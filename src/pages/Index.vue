<template>
  <q-page class="flex">
    <div v-show="!nowShow"  class="flex flex-center absolute-center">Um momento...</div>
    <div v-show="nowShow" class="col vertical-top full-width">
    <div class="text-h5 text-center q-mb-lg print-only">RELATÓRIO DE PASSAGEM DE CUIDADOS</div>
      <q-card v-for="(leito, index) in leitos" :key="index" v-for-callback="{key:index,array:leitos,callback:callBack}" class="my-card q-mb-sm" flat bordered>
      <q-card-section horizontal>
        <div class="col-4">
        <img key="" class="full-width"
          :src="(leito.pulseira)? leito.pulseira:'statics/bed-place-holder2.jpg'"
        ></div>
        <div class="col q-ml-md text-body1">
          <div class="row text-h5">LEITO {{leito.leito}} - CID:{{leito.cid.codigo}}</div>
          <div class="row text-bold"></div>
          <div class="row">{{leito.cid.nome}}</div>
          <div class="row"><div class="col-8">ADMISSÃO: {{leito.admissao | formatDate}}</div><div class="col-4">CRM: {{leito.medicos[leito.medicos.length-1].crm}}</div></div>
          <div class="row content-center">Pendências:</div>
          <div class="flex flex-block">
          <div v-for="(item,key, index) in leito" :key="index">
              <q-badge class="q-pa-xs q-ml-xs" v-if="item === true" color="blue">
                {{key.toUpperCase() | stripUnderscore}}
              </q-badge>
          </div>
          </div>
        </div>
      </q-card-section>
      </q-card>
      <div class="text-body1 text-center">A TRANSFERENCIA DE CUIDADOS ocorre neste momento com um total de {{leitos.length}} leitos ocupados.</div>
      <div class="row no-wrap justify-between q-mx-lg q-my-lg">
        <q-card class="signblock">
            <q-card-section class="text-center">
              <strong>FINALIZANDO PLANTÃO</strong>
            </q-card-section>
            <q-separator />
            <q-card-section style="height:120px" class="flex flex-center">
              <div class="text-grey">carimbo/assinatura</div>
            </q-card-section>
          </q-card>
          <q-card class="signblock">
            <q-card-section class="text-center">
              <strong>ASSUMINDO PLANTÃO</strong>
            </q-card-section>
            <q-separator />
            <q-card-section style="height:120px" class="flex flex-center">
              <div class="text-grey">carimbo/assinatura</div>
            </q-card-section>
          </q-card>
      </div>
   </div>
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  directives: {
  forCallback(el, binding) {
      let element = binding.value
      if (element.key == element.array.length - 1)
      if (typeof element.callback === 'function') {
        element.callback()
      }
    }
},
  name: 'Relatorio',
  data () {
    return {
      leitos: {},
      token:null,
      nowShow:false,
    }
  },
  methods: {
    callBack() { this.nowShow = true; console.log('finished v-for')},
  },
  mounted() {
      var tokenURL = "https://api-rest.in/api/duty/activeduty";
      axios.get(tokenURL).then(response => this.token = response);
      var leitosURL = "https://api-rest.in/api/leitos/report/" + this.token;
      axios.get(leitosURL).then(response => (this.leitos = response.data.leitos));
    }
}
</script>
<style  scoped>
.my-card {
    width: 100%;
    page-break-inside: avoid;
  }
  .signblock {
    width:100%;
    max-width:380px;
  }
  
</style>