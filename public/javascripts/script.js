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

for (var i = 0; i < tables.length; i++) {
  tables[i].addEventListener('click', function (e) {
    this.classList.add('hide')
    filter.classList.toggle('show')

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
      form.classList.toggle('show-form')
    }, 10)
  })
}

filter.addEventListener('click',function () {
  big.style.width = preWidth + "px";
  big.style.height = preHeight + "px";
  big.style.top = preTop + "px";
  big.style.left = preLeft + "px";
  form.classList.toggle('show-form')

  setTimeout(function () {
    big.style.transition = "0"
    filter.classList.toggle('show')
    big.style=""
    for (let i = 0; i < tables.length; i++) {
      tables[i].classList.remove('hide');
    }
  }, 500)
})


