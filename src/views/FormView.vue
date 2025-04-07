<!-- src/views/FormView.vue -->
<template>
  <div class="container">
    <div class="form-wrapper">
      <h1>Formulário de Cadastro</h1>
      <form @submit.prevent="handleSubmit">
        <!-- Campo Nome -->
        <div class="form-group" :class="{ 'form-group--invalid': isNomeInvalid }">
          <label for="nome">Nome</label>
          <input
            type="text"
            id="nome"
            v-model="nome"
            placeholder="Nome completo (sem abreviações)"
            required
          />
          <p v-if="isNomeInvalid" class="error-message">
            Campo deve conter 3 caracteres ou mais
          </p>
        </div>

        <!-- Campo CPF (somente números) -->
        <div class="form-group">
          <label for="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            v-model="cpf"
            placeholder="Ex.: 000.000.000-00"
            @input="onlyNumbers(cpf)"
            required
          />
        </div>

        <!-- Campo Telefone (somente números) -->
        <div class="form-group">
          <label for="telefone">Telefone</label>
          <input
            type="text"
            id="telefone"
            v-model="telefone"
            placeholder="Ex.: (00) 99999-9999"
            @input="onlyNumbers(telefone)"
            required
          />
        </div>

        <!-- Campo E-mail -->
        <div class="form-group">
          <label for="email">E-mail</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="seuemail@exemplo.com"
            required
          />
        </div>

        <!-- Botão Cadastrar -->
        <button 
          type="submit" 
          class="btn-submit"
          :disabled="isNomeInvalid"
        >
          Cadastrar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Campos do formulário
const nome = ref('')
const cpf = ref('')
const telefone = ref('')
const email = ref('')

// Validação simples para o campo "Nome completo": mínimo 3 caracteres
const isNomeInvalid = computed(() => {
  return nome.value.length > 0 && nome.value.length < 3
})

// Função para filtrar apenas números
function onlyNumbers(refField) {
  refField.value = refField.value.replace(/\D/g, '')
}

function handleSubmit() {
  if (isNomeInvalid.value) return

  const novoCadastro = {
    id: Date.now(),
    nome: nome.value,
    cpf: cpf.value,
    telefone: telefone.value,
    email: email.value
  }

  const cadastrosSalvos = JSON.parse(localStorage.getItem('cadastros')) || []
  cadastrosSalvos.push(novoCadastro)
  localStorage.setItem('cadastros', JSON.stringify(cadastrosSalvos))

  // Limpa os campos
  nome.value = ''
  cpf.value = ''
  telefone.value = ''
  email.value = ''

 
  router.push('/list')
}
</script>

<style scoped>
/* Guia de estilo para inputs conforme solicitado */
/* Container centralizado ocupando a altura total */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
}

/* Card do formulário */
.form-wrapper {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Título centralizado */
h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #333;
}

/* Agrupamento de cada campo */
.form-group {
  margin-bottom: 1.5rem;
}

/* Estado inválido para o input */
.form-group--invalid input {
  color: #eb4a46 !important;
  border-bottom: 1px solid #eb4a46 !important;
}

/* Mensagem de erro */
.error-message {
  font-size: 0.9rem;
  color: #eb4a46;
  margin-top: 0.3rem;
}

/* Labels */
label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #555;
}

/* Inputs com borda inferior e cores conforme o guia */
input[type="text"],
input[type="email"] {
  width: 100%;
  border: none;
  border-bottom: 1px solid #efeedd;
  padding: 0.5rem 0;
  font-size: 1rem;
  outline: none;
  color: #efeedd;
  transition: color 0.3s, border-color 0.3s;
}

/* Ao focar, altera para cores definidas */
input[type="text"]:focus,
input[type="email"]:focus {
  color: #333333;
  border-bottom-color: #333333;
}

/* Placeholder alinhado à esquerda */
::placeholder {
  text-align: left;
}

/* Botão de cadastro */
.btn-submit {
  width: 100%;
  background-color: #00c8b3;
  color: #fff;
  border: none;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* Hover no botão */
.btn-submit:hover:not(:disabled) {
  background-color: #00ab90;
}

/* Botão desabilitado */
.btn-submit:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
