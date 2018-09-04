const axios = require("axios");

function asyncRunner(generator, result) {
    let promise = generator.next(result);
 
    if (!promise.done) {
        promise.value.then(result => {
            asyncRunner(generator, result);
        });
    }
}

function* getDetails(boardId, listId, cardId) {
    const board = yield axios.get(`http://localhost:3001/api/boards/${boardId}`).then(result => new Promise((resolve, reject) =>{
        resolve(result.data);
    }));
 
    const list = yield axios.get(`http://localhost:3001/api/lists/${listId}`).then(result => new Promise((resolve, reject) =>{
        resolve(result.data);
    }));
 
    const card = yield axios.get(`http://localhost:3001/api/cards/${cardId}`).then(result => new Promise((resolve, reject) =>{
        resolve(result.data);
    }));
 
    console.log('Boards:', board);
    console.log('List:', list);
    console.log('Card:', card);
};
 
asyncRunner(getDetails(1, 12, 23));