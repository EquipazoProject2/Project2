
let suma = document.querySelectorAll(".experience-container-input .suma")
let resta = document.querySelectorAll(".experience-container-input .resta")

let cSuma = document.querySelectorAll(".cocktails .suma")
let cResta = document.querySelectorAll(".cocktails .resta")

let hidden = document.querySelectorAll('input[type="hidden"]')[0]



let cocktails=[]

for (let i = 0; i < suma.length; i++) {
  suma[i].addEventListener('click', function () {
    console.log(this.parentNode.childNodes)
    let att=this.parentNode.childNodes[9].getAttribute("value")
    att++
    this.parentNode.childNodes[9].setAttribute("value", att)
    console.log(this.parentNode.childNodes)
    this.parentNode.childNodes[7].innerHTML++
    
  })

}

for (let i = 0; i < resta.length; i++) {
  resta[i].addEventListener('click', function () {
    let att = this.parentNode.childNodes[9].getAttribute("value")
    if (att>0) {
      
      att--
      console.log(att)
      this.parentNode.childNodes[9].setAttribute("value", att)
      this.parentNode.childNodes[7].innerHTML--
    }
  })

}


for (let i = 0; i < cSuma.length; i++) {
  cSuma[i].addEventListener('click', function () {
    this.previousSibling.previousSibling.innerHTML++
    cocktails.push(this.parentNode.childNodes[1].innerHTML)
    hidden.setAttribute("value", cocktails)
    console.log(cocktails)
  })

}

for (let i = 0; i < cResta.length; i++) {
  cResta[i].addEventListener('click', function () {
    if (this.nextSibling.nextSibling.innerHTML > 0) {
      this.nextSibling.nextSibling.innerHTML--
      cocktails.splice(cocktails.indexOf(this.parentNode.childNodes[1].innerHTML),1)
      hidden.setAttribute("value", cocktails) 
      console.log(cocktails)

    }
  })

}