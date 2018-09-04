function TrelloApp(currState, action) {
  switch(action.type) {
    case 'ADD_CARD':
      const list = currState.currentBoard.lists.find(list => list.id === action.payload.listId);
      const index = currState.currentBoard.lists.indexOf(list);
      const newList = Object.assign({}, list, {
        cards: [...list.cards, { id: '' + Math.random()*89793113, text: action.payload.text }]
      });
      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: [
            ...currState.currentBoard.lists.slice(0, index),
            newList,
            ...currState.currentBoard.lists.slice(index+1)
          ]
        })
      });

    case 'EDIT_BOARD':
      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          id: currState.currentBoard.id,
          name: action.payload.name,
          lists: [
            ...currState.currentBoard.lists
          ]
        })
      });

    case 'CREATE_LIST':
        const newlist = {
              id: '' + Math.random() * 89793113,
              name: action.payload.name,
              cards: []
            };
      
        return Object.assign({}, currState, {
          currentBoard: Object.assign({}, currState.currentBoard, {
            lists: [
              ...currState.currentBoard.lists, newlist
            ]
          })
        });
      
    case 'EDIT_CARD':
      const editList = currState.currentBoard.lists.find(list => list.id === action.payload.listId);
      const editIndex = currState.currentBoard.lists.indexOf(editList);
      const editCard = editList.cards.find(card => card.id === action.payload.cardId);
      const editIndexCard = editList.cards.indexOf(editCard);
      const editUpdateCard = { id : editCard.id, text : action.payload.text };

      const editedList = Object.assign({}, editList, {
        cards: [
          ...editList.cards.slice(0, editIndexCard),
          editUpdateCard,
          ...editList.cards.slice(editIndexCard + 1)
        ]
      });
      
      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: [
            ...currState.currentBoard.lists.slice(0, editIndex),
            editedList,
            ...currState.currentBoard.lists.slice(editIndex + 1)
          ]
        })
      });
     

    case 'MOVE_LIST':
      const movieList = currState.currentBoard.lists.find(list => list.id === action.payload.fromId);
      const movieIndex = currState.currentBoard.lists.indexOf(movieList);
      const tileList = currState.currentBoard.lists.find(list => list.id === action.payload.toId);
      const tileIndex = currState.currentBoard.lists.indexOf(tileList);
      const listItems = currState.currentBoard.lists[movieIndex];

      const afterRemoveList = Object.assign({}, currState.currentBoard, {
        lists: [
          ...currState.currentBoard.lists.slice(0, movieIndex),
          ...currState.currentBoard.lists.slice(movieIndex + 1)
        ]
      });

      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
              lists: [
                ...afterRemoveList.lists.slice(0, tileIndex),
                listItems,
                ...afterRemoveList.lists.slice(tileIndex)
              ]
          })
      });

    case 'EDIT_LIST':
      const editListItem = currState.currentBoard.lists.find(list => list.id === action.payload.listId);
      const editListItemIndex = currState.currentBoard.lists.indexOf(editListItem);
      const updateList = {
        id: editListItem.id,
        name: action.payload.name,
        cards: editListItem.cards
      };

      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: [
            ...currState.currentBoard.lists.slice(0, editListItemIndex),
            updateList,
            ...currState.currentBoard.lists.slice(editListItemIndex + 1)
          ]
        })
      });
      
    case 'MOVE_CARD':
    const movieCardlist = currState.currentBoard.lists.find(list => list.id === action.payload.listId);
    const movieCardlistIndex = currState.currentBoard.lists.indexOf(movieCardlist);
    const firstCard = currState.currentBoard.lists[movieCardlistIndex].cards.find(card => card.id === action.payload.fromIndex);
    const firstCardIndex = currState.currentBoard.lists[movieCardlistIndex].cards.indexOf(firstCard);
    const tileCard = currState.currentBoard.lists[movieCardlistIndex].cards.find(card => card.id === action.payload.toIndex);
    const tileCardIndex = currState.currentBoard.lists[movieCardlistIndex].cards.indexOf(tileCard);
    const moveCardCurrent = currState.currentBoard.lists[movieCardlistIndex].cards[firstCardIndex];

    const currentLastList = Object.assign({}, movieCardlist, {
      cards: [ ...movieCardlist.cards.slice(0, firstCardIndex),
      ...movieCardlist.cards.slice(firstCardIndex + 1)]
    })

    const upadtedListItem = Object.assign({}, currentLastList, {
      cards: [
        ...currentLastList.cards.slice(0, tileCardIndex),
        moveCardCurrent,
        ...currentLastList.cards.slice(tileCardIndex)
      ]
    })

    return Object.assign({}, currState, {
      currentBoard: Object.assign({}, currState.currentBoard, {
        lists: [
          ...currState.currentBoard.lists.slice(0, movieCardlistIndex),
          upadtedListItem,
          ...currState.currentBoard.lists.slice(movieCardlistIndex + 1)
        ]
      })
    });

    default:
      return currState;
  }
}

/*
  {
    currentBoard: {
      id: ,
      name: ,
      lists: [{
        id: ,
        name: ,
        text: 
      }]
    }
  }
  {
    type: 'ADD_CARD',
    payload: {
      listId: '',
      text: ''
    }
  }
  {
    type: 'CREATE_LIST',
    payload: {
      name: ''
    }
  }
  {
    type: 'EDIT_CARD',
    payload: {
      listId: ,
      cardId: ,
      newText: 
    }
  }
  {
    type: 'DELETE_CARD',
    payload: {
      listId: '',
      cardId: ''
    }
  }
  {
    type: 'DELETE_LIST',
    payload: {
      listId: ''
    }
  }
  {
    type: 'MOVE_CARD',
    payload: {
      fromListId: ,
      toListId: ,
      toListPosition: 
    }
  }
  {
    type: 'MOVE_LIST',
    payload: {
      fromPosition: '',
      toPosition: ''
    }
  }
  {
    type: 'EDIT_LIST',
    payload: {
      listId: '',
      newName:
    }
  }
  {
    type: 'EDIT_BOARD',
    payload: {
      newName:
    }
  }
*/

module.exports = TrelloApp;