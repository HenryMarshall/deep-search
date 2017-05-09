import search from "./search"
import setMark from "./setMark"
import clearMarks from "./clearMarks"
import { listenForHover, saveMatch } from "./matches"
import listenForDownload from "./listenForDownload"

function initialize() {
  listenForHover()
  listenForDownload()
}

export default {
  initialize,
  saveMatch,
  search,
  setMark,
  clearMarks,
}
