import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useElectionResultsStore = defineStore('electionResults', () => {
  const results = ref(0)

  return { results }
})
