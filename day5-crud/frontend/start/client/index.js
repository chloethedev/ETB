import Web3 from 'web3';
import Crud from '../build/contracts/Crud.json';

let web3;
let crud;

const initWeb3 = () => {
  return new Promise((resolve, reject) => {
    if(typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      window.ethereum.enable()
        .then(() => {
          resolve(
            new Web3(window.ethereum)
          );
        })
        .catch(e => {
          reject(e);
        });
      return;
    }
    if(typeof window.web3 !== 'undefined') {
      return resolve(
        new Web3(window.web3.currentProvider)
      );
    }
    resolve(new Web3('http://localhost:9545'));
  });
};

const initContract = () => {
  const deploymentKey = Object.keys(Crud.networks)[0];
  return new web3.eth.Contract(
    Crud.abi, 
    Crud
      .networks[deploymentKey]
      .address
  );
};

const initApp = () => {
  const $create = document.getElementById('create');
  const $createResult = document.getElementById('create-result');
  const $read = document.getElementById('read');
  const $readResult = document.getElementById('read-result');
  const $edit = document.getElementById('edit');
  const $editResult = document.getElementById('edit-result');
  const $delete = document.getElementById('delete');
  const $deleteResult = document.getElementById('delete-result');
  let accounts = [];

  web3.eth.getAccounts()
  .then(_accounts => {
    accounts = _accounts;
  });

  $create.addEventListener('submit', e => {
    e.preventDefault();
    const name = e.target.elements[0].value;
    crud.methods
    .create(name)
      .send({from: accounts[0]})
      .then(() => {
        $createResult.innerHTML = `New user ${name} was successfully created`;
      })
      .catch(() => {
        $createResult.innerHTML = `Ooops... there was an error while trying to create a new user....`;
      });
  });

  $read.addEventListener('submit', e => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    crud.methods
    .read(id)
    .call()
    .then(result => {
      $readResult.innerHTML = `Id: ${result[0]} Name: ${result[1]}`;
    })
    .catch(() => {
      $readResult.innerHTML = `Ooops... there was a problem while trying to read user ${id}`;
    });
  });

  $edit.addEventListener('submit', e => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    const name = e.target.elements[1].value;
    crud.methods
    .update(id, name)
    .send({from: accounts[0]})
    .then (() => {
      $editResult.innerHTML = `Change name of user ${id} to ${name}`;
    })
    .catch(() => {
      $readResult.innerHTML = `Ooops... there was an error while trying to update user ${id}`
    });
  });

  $delete.addEventListener('submit', e => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    crud.methods
    .destroy(id)
    .send({from: accounts[0]})
    .then (() => {
      $deleteResult.innerHTML = `Id ${id} was sucessfully deleted`;
    })
    .catch(() => {
      $readResult.innerHTML = `Ooops... there was an error while trying to delete user ${id}`;
    }); 
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      crud = initContract();
      initApp(); 
    })
    .catch(e => console.log(e.message));
});
