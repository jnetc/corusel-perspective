document.addEventListener('DOMContentLoaded', function () {
  const next = document.getElementById('next');
  const prev = document.getElementById('prev');
  const perspective = document.getElementById('perspective');
  const corusel = document.getElementById('corusel');
  const items = [...document.querySelectorAll('.item')];
  // Initial values
  const amount = items.length;
  let position = { left: 0, front: 1, right: 2 };

  // Button handlers
  next.addEventListener('click', () => {
    position = moveToLeft(amount, position, items);
  });

  prev.addEventListener('click', () => {
    position = moveToRight(amount, position, items);
  });

  perspective.addEventListener('click', () => {
    corusel.classList.toggle('perspective');
  });

  // Pointer hadlers
  function pointerDownHandler(event) {
    event.currentTarget.addEventListener('pointermove', pointerMoveHandler);
    event.currentTarget.addEventListener('pointerup', pointerUpHandler);
    event.currentTarget.addEventListener('pointerout', pointerUpHandler);
  }

  function pointerMoveHandler(event) {
    // Check the right way movement
    if (event.movementX < 0) {
      position = moveToRight(amount, position, items);
      // Remove events after position change
      pointerUpHandler(event);
    }
    if (event.movementX > 0) {
      position = moveToLeft(amount, position, items);
      pointerUpHandler(event);
    }
  }
  function pointerUpHandler(event) {
    event.currentTarget.removeEventListener('pointermove', pointerMoveHandler);
    event.currentTarget.removeEventListener('pointerup', pointerUpHandler);
    event.currentTarget.removeEventListener('pointerout', pointerUpHandler);
  }

  corusel.addEventListener('pointerdown', pointerDownHandler);
});

function moveToLeft(amount, position, items) {
  // Decrement each step and loop between 0 - array length inside an array.
  position.left = (position.left + amount - 1) % amount;
  position.front = (position.front + amount - 1) % amount;
  position.right = (position.right + amount - 1) % amount;

  transitionCorusel(items, position);
  // Return value to memorize the current order
  return position;
}

function moveToRight(amount, position, items) {
  // Increment each step and loop between 0 - array length inside an array.
  position.left = (position.left + 1) % amount;
  position.front = (position.front + 1) % amount;
  position.right = (position.right + 1) % amount;

  transitionCorusel(items, position);
  return position;
}
// Replecing classes in an array
function transitionCorusel(array, position) {
  array.forEach(item => {
    // Find and reset element with those classes
    if (['left', 'right', 'front'].includes(item.classList[1])) {
      item.className = 'item';
    }
    // Set classes with current position
    array[position.left].className = 'item left';
    array[position.front].className = 'item front';
    array[position.right].className = 'item right';
  });
}
