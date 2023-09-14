import { createStore } from "vuex";

export const store = createStore({
  state() {
    return {
      board: ["", "", "", "", "", "", "", "", ""],
      player: "X",
      winnerCombination: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ],
      status: null,
      collectedX: [],
      collectedY: [],
      darw: false,
      wonX: 0,
      wonO: 0,
    };
  },
  getters: {
    getCounter(state) {
      return state.board;
    },
    getWinner(state) {
      state.winnerCombination.forEach((element) => {
        if (element.every((tris) => state.collectedX.includes(tris))) {
          state.wonX++;
          return (state.status = "X");
        } else if (element.every((tris) => state.collectedY.includes(tris))) {
          state.wonO++;
          return (state.status = "O");
        }
      });
      return state.status;
    },
  },
  mutations: {
    getPlayer(state, payload) {
      if (state.board[payload] != "") {
        return null;
      } else {
        state.board[payload] = state.player;

        state.player = state.player === "X" ? "O" : "X";
        state.player === "O"
          ? state.collectedX.push(payload)
          : state.collectedY.push(payload);
      }
    },

    reset(state) {
      state.board = ["", "", "", "", "", "", "", "", ""];
      state.player = "X";
      state.collectedX = [];
      state.collectedY = [];
      state.status = null;
    },

    isDraw(state) {
      if (!state.board.includes("") && state.status === null) {
        return (state.status = "pareggio");
      }
    },
    resetScore(state) {
      state.wonX = 0;
      state.wonO = 0;
    },
  },
  actions: {
    increment(state, payload) {
      state.commit("getPlayer", payload);
      state.commit("isDraw");
    },
    reset(state) {
      state.commit("reset");
    },
    resetScore(state) {
      state.commit("resetScore");
    },
  },
});
