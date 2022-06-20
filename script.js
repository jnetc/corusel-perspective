document.addEventListener('DOMContentLoaded', function () {
  const next = document.getElementById('next');
  const prev = document.getElementById('prev');
  const perspective = document.getElementById('perspective');
  const corusel = document.getElementById('corusel');
  const items = [...document.querySelectorAll('.item')];

  const amount = items.length;
  let left = 0;
  let front = 1;
  let right = 2;

  next.addEventListener('click', () => {
    left = (left + 1) % amount;
    front = (front + 1) % amount;
    right = (right + 1) % amount;
    transitionCorusel(items, left, front, right);
  });

  prev.addEventListener('click', () => {
    left = (left + amount - 1) % amount;
    front = (front + amount - 1) % amount;
    right = (right + amount - 1) % amount;
    transitionCorusel(items, left, front, right);
  });

  perspective.addEventListener('click', () => {
    corusel.classList.toggle('perspective');
  });
});

function transitionCorusel(array, left, front, right) {
  array.forEach(item => {
    if (['left', 'right', 'front'].includes(item.classList[1])) {
      item.className = 'item';
    }
    array[left].className = 'item left';
    array[front].className = 'item front';
    array[right].className = 'item right';
  });
}
