<script setup>
import { onMounted, reactive } from 'vue';
import Message from './Message.vue';

const dadosAPI = reactive({
  paes: [],
  carnes: [],
  opcionaisData: [],
  nome: '',
  pao: '',
  carne: '',
  opcionais: [],
  status: "Solicitado",
  msg: ''
});

const getIngredientes = async () => {
  const req = await fetch("http://localhost:3000/ingredientes");
  const data = await req.json();
  // console.log(data);

  dadosAPI.paes = data.paes;
  dadosAPI.carnes = data.carnes;
  dadosAPI.opcionaisData = data.opcionais;
  // console.log(dadosAPI)
};

const createBurger = async (e) => {
  e.preventDefault();

  // Obter todos os burgers existentes
  const reqBurgers = await fetch("http://localhost:3000/burgers");
  const burgers = await reqBurgers.json();

  // Determinar o próximo ID numérico
  const nextId = burgers.length ? Math.max(...burgers.map(b => b.id)) + 1 : 1;

  const data = {
    id: nextId, // Definir o ID manualmente
    nome: dadosAPI.nome,
    pao: dadosAPI.pao,
    carne: dadosAPI.carne,
    opcionais: dadosAPI.opcionais,
    status: "Solicitado"
  };

  const dataJson = JSON.stringify(data);

  const req = await fetch("http://localhost:3000/burgers", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: dataJson
  });

  // const res = await req.json();

  console.log(dataJson);

  // Exibir mensagem ao realizar o pedido
  dadosAPI.msg = `Pedido N°${dataJson.id} realizado com sucesso!`;

  // Limpar formulário ao criar pedido
  setTimeout(() => dadosAPI.msg = '', 3000);

  dadosAPI.nome = '';
  dadosAPI.pao = '';
  dadosAPI.carne = '';
  dadosAPI.opcionais = [];
};

onMounted(() => {
  getIngredientes();
});

</script>

<template>
  <div>
    <Message :msg="dadosAPI.msg" v-show="dadosAPI.msg"/>
    <div>
      <form id="burger-form" @submit="createBurger">
        <div class="input-container">
          <label for="nome">Nome do cliente:</label>
          <input 
           type="text" 
           id="nome" 
           name="nome"
           v-model="dadosAPI.nome"
           placeholder="Digite seu nome"
          >
        </div>

        <div class="input-container">
          <label for="pao">Escolha o pão:</label>
          <select name="pao" id="pao" v-model="dadosAPI.pao">
            <option disabled value="">Selecione o seu pão:</option>
            <option v-for="pao in dadosAPI.paes" :key="pao.id" :value="pao.tipo">{{ pao.tipo }}</option>
          </select>
        </div>

        <div class="input-container">
          <label for="carne">Escolha a carne:</label>
          <select name="carne" id="carne" v-model="dadosAPI.carne">
            <option disabled value="">Escolha o tipo do seu hambúrguer</option>
            <option v-for="carne in dadosAPI.carnes" :key="carne.id" :value="carne.tipo">{{ carne.tipo }}</option>
          </select>
        </div>

        <div id="opcionais-container" class="input-container">
          <label id="opcionais-title" for="opcionais">Selecione os opcionais:</label>
          <div class="checkbox-container"
           v-for="opcional in dadosAPI.opcionaisData" 
           :key="opcional.id"
          >
            <input 
             type="checkbox"
             name="opcionais"
             v-model="dadosAPI.opcionais"
             :value="opcional.tipo"
            >
            <span>{{ opcional.tipo }}</span>
          </div>
        </div>

        <div class="input-container">
          <input
           class="submit-btn"
           type="submit"
           value="Criar meu hambúrguer"
          >
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
  #burger-form {
    max-width: 300px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  label {
    font-weight: bold;
    margin-bottom: 15px;
    color: #222;;
    padding: 5px 10px;
    border-left: 4px solid #fcba03;
  }

  input, select {
    padding: 5px 10px;
    width: 300px;
  }

  #opcionais-container {
    flex-direction: row;
    flex-wrap: wrap;
  }

  #opcionais-title {
    width: 100%;
  }

  .checkbox-container {
    display: flex;
    align-items: flex-start;
    width: 50%;
    margin-bottom: 20px;
  }

  .checkbox-container span,
  .checkbox-container input {
    width: auto;
  }

  .checkbox-container span {
    margin-left: 6px;
    font-weight: bold;
  }

  .submit-btn {
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

  .submit-btn:hover {
    background-color: transparent;
    color: #222;
  }
</style>