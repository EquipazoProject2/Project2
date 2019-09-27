document.addEventListener('DOMContentLoaded', () => {
  console.log('IronGenerator JS imported successfully!');
}, false);
let preWidth
let preHeight
let preLeft
let preTop
let tables = document.querySelectorAll('.table');
let filter = document.querySelectorAll('.filter')[0];
let big = document.querySelectorAll('.img-big')[0];
let form = document.querySelectorAll('.view-form')[0];
let hidden = document.querySelectorAll('input[type="hidden"]')[0];



for (var i = 0; i < tables.length; i++) {
  tables[i].setAttribute("data-table", i+1)
  tables[i].addEventListener('click', function (e) {
    this.classList.add('hide')
    filter.classList.toggle('show')

    hidden.setAttribute("value", this.getAttribute("data-table"))
    preWidth = this.getBoundingClientRect().width
    preHeight = this.getBoundingClientRect().height
    preLeft = this.getBoundingClientRect().left
    preTop = this.getBoundingClientRect().top

    console.log(preLeft,preTop,preWidth,preHeight)

    big.style.width = preWidth + "px";
    big.style.height = preHeight + "px";
    big.style.top = preTop + "px";
    big.style.left = preLeft + "px";
    
    setTimeout(function () {
      big.style.transition = "0.5s all ease"
      big.style.top = `${window.innerHeight / 2 - preHeight / 2}px`;
      big.style.left = `${window.innerWidth / 2 - preWidth/2}px`;
    }, 10)
    setTimeout(function () {
      form.classList.toggle('show-form')
    }, 500)
  })
}

filter.addEventListener('click',function () {
  big.style.width = preWidth + "px";
  big.style.height = preHeight + "px";
  big.style.top = preTop + "px";
  big.style.left = preLeft + "px";
  form.classList.toggle('show-form')
  filter.style="transition:0.5s all ease"
  setTimeout(() => {
    filter.style="opacity:0"
  }, 1);
  setTimeout(function () {
    big.style.transition = "0"
    filter.classList.toggle('show')
    filter.style = "opacity:1"
    big.style=""
    for (let i = 0; i < tables.length; i++) {
      tables[i].classList.remove('hide');
    }
  }, 500)
})



