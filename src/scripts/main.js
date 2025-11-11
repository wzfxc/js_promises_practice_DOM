'use strict';

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  const onClick = () => {
    resolve('First promise was resolved');
    document.removeEventListener('click', onClick);
  };

  document.addEventListener('click', onClick);
});

firstPromise.then(() => {
  const div = document.createElement('div');

  div.textContent = 'First promise was resolved';
  div.dataset.qa = 'notification';
  div.classList.add('success');
  document.body.appendChild(div);
});

firstPromise.catch(() => {
  const div = document.createElement('div');

  div.textContent = 'First promise was rejected';
  div.dataset.qa = 'notification';
  div.classList.add('error');
  document.body.appendChild(div);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

secondPromise.then(() => {
  const div = document.createElement('div');

  div.textContent = 'Second promise was resolved';
  div.dataset.qa = 'notification';
  div.classList.add('success');
  document.body.appendChild(div);
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = 0;
  let rightClick = 0;

  const onClick = () => {
    leftClick++;

    if (leftClick >= 1 && rightClick >= 1) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', onClick);
      document.removeEventListener('contextmenu', onContext);
    }
  };

  const onContext = (e) => {
    e.preventDefault();
    rightClick++;

    if (leftClick >= 1 && rightClick >= 1) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', onClick);
      document.removeEventListener('contextmenu', onContext);
    }
  };

  document.addEventListener('click', onClick);
  document.addEventListener('contextmenu', onContext);
});

thirdPromise.then(() => {
  const div = document.createElement('div');

  div.textContent = 'Third promise was resolved';
  div.dataset.qa = 'notification';
  div.classList.add('success');
  document.body.appendChild(div);
});
