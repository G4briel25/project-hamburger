<script setup>
import { onMounted, reactive } from "vue";
import Message from './Message.vue';

  const pedido = reactive({
    burgers: '',
    burger_id: '',
    status: [],
    msg: ''
  });

  const getPedidos = async () => {
    const req = await fetch('http://localhost:3000/burgers');
    const data = await req.json();

    pedido.burgers = data;

    // console.log(pedido.burgers);
  };

  const getStatus = async () => {
    const req = await fetch('http://localhost:3000/status');
    const data = await req.json();

    pedido.status = data;

    // console.log(pedido.status)
  };

  const deleteBurger = async (id) => {
    const req = await fetch(`http://localhost:3000/burgers/${id}`, {
      method: 'DELETE'
    });

    const res = await req.json();

    pedido.msg = `Pedido N°${res.id} removido com sucesso!`;

    setTimeout(() => pedido.msg = '', 3600);

    getPedidos();

  };

  const updatedBurger = async (event, id) => {
    const option = event.target.value;

    const dataJson = JSON.stringify({status: option});

    const req = await fetch(`http://localhost:3000/burgers/${id}`, {
      method: 'PATCH',
      headers: {"Content-Type": "application/json"},
      body: dataJson
    });

    const res = await req.json()

    pedido.msg = `Pedido N°${res.id} foi atualizado para ${res.status}`;

    setTimeout(() => pedido.msg = '', 3600);
  };

  onMounted(() => {
    getPedidos();
    getStatus();
  });

</script>

<template>
  <Message :msg="pedido.msg" v-show="pedido.msg"/>
  <div id="burger-table">
    <div>
      <div id="burger-table-heading">
        <div class="order-id">#:</div>
        <div>Cliente:</div>
        <div>Pão:</div>
        <div>Carne:</div>
        <div>Opcionais:</div>
        <div>Ações:</div>
      </div>
    </div>
    <div id="burger-table-rows">
      <div class="burger-table-row" v-for="burger in pedido.burgers" :key="burger.id">
        <div class="order-number">{{ burger.id }}</div>
        <div>{{ burger.nome }}</div>
        <div>{{ burger.pao }}</div>
        <div>{{ burger.carne }}</div>
        <div>
          <ul>
            <li v-for="(opcional, index) in burger.opcionais" :key="index">
              {{ opcional }}
            </li>
          </ul>
        </div>
        <div>
          <select name="status" class="status" @change="updatedBurger($event, burger.id)">
            <option value="" disabled>Selecione</option>
            <option v-for="s in pedido.status" :key="s.id" :value="s.tipo" :selected="burger.status === s.tipo">
              {{ s.tipo }}
            </option>
          </select>
          <button class="delete-btn" @click="deleteBurger(burger.id)">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

  #burger-table {
    max-width: 1200px;
    margin: 0 auto;
  }

  #burger-table-heading,
  #burger-table-rows,
  .burger-table-row {
    display: flex;
    flex-wrap: wrap;
  }

  #burger-table-heading {
    font-weight: bold;
    padding: 12px;
    border-bottom: 3px solid #333;
  }

  .burger-table-row {
    width: 100%;
    padding: 12px;
    border-bottom: 1px solid #CCC;
  }

  #burger-table-heading div,
  .burger-table-row div {
    width: 19%;
  }

  #burger-table-heading .order-id,
  .burger-table-row .order-number {
    width: 5%;
  }

  select {
    padding: 12px 6px;
    margin-right: 12px;
  }

  .delete-btn {
    background-color: #222;
    color:#fcba03;
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;
  }
  
  .delete-btn:hover {
    background-color: transparent;
    color: #222;
  }
  
</style>