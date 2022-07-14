document.addEventListener('click', (event) => {
  const id = event.target.dataset.id;
  const li = event.target.closest('li');
  if(event.target.dataset.type === 'remove') { 
    remove(id).then(() => {
      li.remove();
    });
  } else if(event.target.dataset.type === 'update') {
    const newTitle = prompt('Введите новое название');
    if(newTitle === null) return;
    else update(id, newTitle).then(()=> {
      const note = li.querySelector('.note');
      note.innerText = newTitle;
    });
  }
});

async function remove (id) {
  await fetch(`/${id}`, {
    method: 'DELETE'
  })
};

async function update(id, changedName) {
  await fetch(`/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: changedName})
  })
};