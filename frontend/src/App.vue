<script setup>
import { ref, onMounted } from 'vue';
import { initSession, roll, getHistory, clearHistory } from './services/api.js';

const DICE = [4, 6, 8, 10, 12, 20, 100];

const result = ref(null);
const lastDie = ref('');
const history = ref([]);
const error = ref('');

onMounted(async () => {
  try {
    if (!localStorage.getItem('token')) await initSession();
    const data = await getHistory();
    history.value = data.history;
  } catch (e) {
    error.value = e.message;
  }
});

async function doRoll(sides) {
  error.value = '';
  lastDie.value = 'D' + sides;
  try {
    const data = await roll(sides);
    result.value = data.roll.result;
    history.value = data.history;
  } catch (e) {
    error.value = e.message;
  }
}

async function doClear() {
  try {
    const data = await clearHistory();
    history.value = data.history;
    result.value = null;
    lastDie.value = '';
  } catch (e) {
    error.value = e.message;
  }
}
</script>

<template>
  <div class="wrap">
    <h1>Dice Roller</h1>

    <div class="result-box">
      <p v-if="lastDie">{{ lastDie }}</p>
      <p class="big">{{ result ?? '-' }}</p>
    </div>

    <div class="dice">
      <button v-for="d in DICE" :key="d" @click="doRoll(d)">D{{ d }}</button>
    </div>

    <section class="history">
      <div class="history-top">
        <h2>History</h2>
        <button @click="doClear" :disabled="!history.length">Clear</button>
      </div>
      <ul v-if="history.length">
        <li v-for="h in history" :key="h.id">
          {{ h.label }} → {{ h.result }}
        </li>
      </ul>
      <p v-else class="empty">No rolls yet</p>
    </section>

    <p v-if="error" class="err">{{ error }}</p>
  </div>
</template>

<style scoped>
.wrap {
  max-width: 500px;
  margin: 0 auto;
  padding: 24px 16px;
}

h1 {
  text-align: center;
  margin-bottom: 24px;
}

.result-box {
  background: #2a2a2a;
  border-radius: 8px;
  padding: 32px;
  text-align: center;
  margin-bottom: 20px;
}

.big {
  font-size: 64px;
  font-weight: bold;
}

.dice {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 24px;
}

.dice button {
  padding: 16px;
  background: #333;
  color: #fff;
  border: 1px solid #555;
  border-radius: 6px;
  font-weight: bold;
}

.dice button:hover {
  background: #444;
}

.history {
  background: #2a2a2a;
  border-radius: 8px;
  padding: 16px;
}

.history-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.history-top h2 {
  font-size: 16px;
}

.history-top button {
  background: none;
  color: #f66;
  border: 1px solid #f66;
  padding: 6px 12px;
  border-radius: 4px;
}

.history-top button:disabled {
  opacity: 0.3;
}

.history ul {
  list-style: none;
}

.history li {
  padding: 8px 0;
  border-bottom: 1px solid #444;
}

.empty {
  color: #888;
}

.err {
  color: #f66;
  margin-top: 12px;
  text-align: center;
}
</style>
