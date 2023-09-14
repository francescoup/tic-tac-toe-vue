<template>

    <div v-if="isWinner" class="backdrop">
        <Presence>
            <Motion
                v-show="isWinner"
                :initial="{ opacity: 0, scale: 0 }"
                :animate="{ opacity: 1, scale: 1 }"
                :exit="{ opacity: 0, scale: 0.6 }"
                class="modal"
            >
            <h2 v-if="isWinner === 'pareggio'">You Drew</h2>
            <h2 v-else>the winner is: {{ isWinner }}</h2>
            <button @click="reset">New Game</button>
            </Motion>
        </Presence>
    </div>
    
</template>

<script setup>

import { computed } from 'vue';
import { useStore } from 'vuex';
import { Motion, Presence } from 'motion/vue'

const store = useStore()

const isWinner = computed(()=> store.getters.getWinner)

function reset(){
    store.dispatch('reset')  
}

</script>

<style>
.backdrop{
    position: fixed;
    top:0;
    left:0;
    background: rgba(0, 0,0, 0.5);
    width: 100%;
    height: 100%;
}
.modal{
    background: white;
    width: 350px;
    margin: 100px auto;
    padding:3rem;
    border-radius:10px;
    z-index: 9;
    color:rgb(43, 42, 42);
}

@media screen and (max-width: 600px) {
    .modal{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: white;
    width: 100vw;
    height:100vh;
    border-radius: 0px;
    margin: 0 auto;
    padding:0px;
    z-index: 9;
    color:rgb(43, 42, 42);
}
}

</style>