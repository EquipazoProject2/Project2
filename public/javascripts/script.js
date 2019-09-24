document.addEventListener('DOMContentLoaded', () => {
  console.log('IronGenerator JS imported successfully!');
}, false);

let tables = document.querySelectorAll('.table');
let filter = document.querySelectorAll('.filter')[0];
let big = document.querySelectorAll('.img-big')[0];

for (var i = 0; i < tables.length; i++) {
  tables[i].addEventListener('click', function (e) {
    this.classList.toggle('hide')
    filter.classList.toggle('show')
    big.style.width = this.getBoundingClientRect().width + "px";
    big.style.height = this.getBoundingClientRect().height + "px";
    big.style.top = this.getBoundingClientRect().top + "px";
    big.style.left = this.getBoundingClientRect().left + "px";
    console.log(this.getBoundingClientRect())
    setTimeout(function () {
      big.style.transition = "0.2s all ease"
      // big.style.top = `calc(50%-${big.style.width})`;
      big.style.left = `40%`;
    }, 100)
  })
}


