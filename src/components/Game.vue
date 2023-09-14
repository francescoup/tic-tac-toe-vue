<template>
<div class="player-container">
    <div class="players">
        <div :class="`circle-player ${players === 'X' ? 'active-player' : 'yellow'}`">X</div>
        <div class="player">
        <h3>Player X Score: {{ isWonX }} </h3> 
    </div>
    </div>
    
    <div class="players">
        <div :class="`circle-player ${players === 'O' ? 'active-player' : 'yellow'}`">O</div>
        <div class="player">
       <h3>Player O Score: {{ isWonO }}</h3> 
    </div>
    </div>
</div>
<div class="container">
    <div class="grid-element">
        <div class="cell" v-for="(cell, i) in cells" key="i" @click="playerTurn(i)">
            <h2 :style="`${cell === 'X' ? 'color:red' : 'color:white'}`">{{ cell }}</h2>  
        </div> 
    </div>
</div>
<div class="player-container">
    <button class="btn" type="button" @click="reset">New Game</button>
    <button class="btn" type="button" @click="resetScore">Reset Score</button>
</div>


</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const cells = computed( ()=> store.state.board ) 
const players = computed(()=> store.state.player)
const isWonX = computed(()=> store.state.wonX)
const isWonO = computed(()=> store.state.wonO)

function playerTurn(index){
    store.dispatch('increment', index)
}

function reset(){
    store.dispatch('reset')  
}

function resetScore(){
    store.dispatch('resetScore')
}

</script>

<style scoped>

.player-container{
    display: flex;
    justify-content: space-around;
    margin-bottom: 24px;
    gap:4px;
}
.active-player{
    background: #d9234b;
}
.yellow{
    background: #EFCB68;
    color: #242424;

}
.circle-player{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius:50%;
    box-shadow: 0px 0px 8px #413f3f;
    position: relative;
    top: 25px;
}
.players{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.player{
    display: flex;
    justify-content: center;
    background: #EFCB68;
    color: #242424;
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 1.2em 1.2em 0.2em 1.2em;
    font-size: 1em;
    
}

.container{
    padding:15px;
    border:3px dotted #EFCB68;
    border-radius:22px;
}
.grid-element{
    display: grid;
    border-radius:15px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    background-color: #EFCB68;
    padding:16px;
}


.cell{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 8rem;
    width: 8rem;
    font-family: "Montserrat Alternates", sans-serif;
}

.cell:nth-child(2), .cell:nth-child(8) {
    border-left: 1px dashed #242424;
    border-right: 1px dashed #242424;
    
  }
.cell:nth-child(4), .cell:nth-child(6) {
    border-top: 1px dashed #242424;
    border-bottom: 1px dashed #242424;
  }
.cell:nth-child(5) {
    border: 1px dashed #242424;
  }
.cell h2{
    font-size: 2rem;
}

.btn{
    margin-top:24px;
    background: #EFCB68;
    color: #242424;
}

@media screen and (max-width: 600px) {

    .container{
        display: grid;
        place-items:center ;
        padding:8px;
        border:2px dotted #EFCB68;
        border-radius:22px;
}

    .grid-element{
        display: grid;
        border-radius:15px;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        background-color: #EFCB68;
        padding:24px;
}
    .cell{
        width: 5rem;
        height:5rem;
    }
}


</style>