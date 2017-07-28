
document.addEventListener("mousedown",popUp)
let levels
let keys

function startGame(level){
  levels = level
  keys = generateKeys(levels)
  nextLevel(0)
}

function nextLevel(currentLevel){
  if (currentLevel == (levels - 1)){
    swal("¡Has Ganado!", "¡Diste con la tecla!", "success")
    return document.addEventListener("mousedown",popUp)
  }

  swal({
    title:`Nivel actual ${currentLevel + 1}`,
    timer:1000,
    text: 'Sigue la secuencia de letras',
    showConfirmButton: false
  })

  for(let i = 0; i <= currentLevel; i++){
    setTimeout(() => activate(keys[i]),1000 * (1 + i))
  }

  let i = 0
  let currentKey = keys[i]

  setTimeout(() => window.addEventListener('keydown', onKeyDown),1100 * (1 + currentLevel))

  function onKeyDown(ev){
    if(ev.keyCode == currentKey)
    {
      activate(ev.keyCode,{success:true})
      i++
      if(i > currentLevel)
      {
        window.removeEventListener('keydown', onKeyDown)
        setTimeout(() => nextLevel(i), 1500)
      }
      currentKey = keys[i]
    } else {
      activate(ev.keyCode,{fail:true})
      window.removeEventListener('keydown', onKeyDown)
      document.addEventListener("mousedown",popUp)
      setTimeout(() => swal("¡Has perdido!", "¡Esa no era la tecla!", "error"), 1000)

    }
  }
}

function generateKeys(levels) {
  return new Array(levels).fill(0).map(generateRandomKey)
}

function generateRandomKey(){
  const min = 65
  const max = 90

  return Math.round(Math.random() * (max - min) + min)
}

function getElementByKeyCode(keyCode){
  return document.querySelector(`[data-key="${keyCode}"]`)
}

function activate(keyCode, opts = []) {
  const el = getElementByKeyCode(keyCode)
  el.classList.add('active')

  if (opts.success){
    el.classList.add('success')
  } else if (opts.fail){
    el.classList.add('fail')
  }

  setTimeout(() => desactivate(el), 350)
}

function desactivate(el){
  el.className = "key"
}

function popUp(ev){
  if(ev.target.id == "div_startGame") {
    swal({
      title: "Select a Level!",
      text: "A number among 1 to 100:",
      type: "input",
      showCancelButton: true,
      closeOnConfirm: false,
      animation: "slide-from-top",
      inputPlaceholder: "Level"
    },
    function(inputLevels){
      if (inputLevels === false) return false

      if (inputLevels === "") {
        swal.showInputError("You need to select a Level!")
        return false
      }
      swal("Nice!", "Go to: " + inputLevels, "success")
      document.removeEventListener("mousedown",popUp)
      startGame(parseInt(inputLevels) + 1)
    })
  }
}
