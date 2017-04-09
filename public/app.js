function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = [];

  const subscribe = (listener) => (
    listeners.push(listener)
  );

  const getState = () => (state);

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(l => l());
  };

  return {
    subscribe,
    getState,
    dispatch,
  };
}

function reducer(state, action){
  if(action.type === 'ADD_MESSAGE'){
    return {
      messages: state.messages.concat(action.message),
    };
  }else if(action.type === 'DELETE_MESSAGE'){
    return {
      messages: [
        ...state.messages.slice(0, action.index),
        ...state.messages.slice(action.index+1, state.messages.length),
      ],
    }
  }else {
    return state;
  }
}

const initialState = { messages: [] };
const store = createStore(reducer, initialState);

//example: 2;
const listener = () => (
  console.log(store.getState())
);
store.subscribe(listener);

const addMessageAction1 = {
  type: 'ADD_MESSAGE',
  message: 'How do you read?',
};
store.dispatch(addMessageAction1);

const addMessageAction2 = {
  type: 'ADD_MESSAGE',
  message: 'I read you loud and clear, Houston.',
};
store.dispatch(addMessageAction2);

const deleteMessageAction = {
  type: 'DELETE_MESSAGE',
  index: 0,
};
store.dispatch(deleteMessageAction);


//example: 1
// const addMessageAction1 = {
//   type: 'ADD_MESSAGE',
//   message: 'How does it look, Neil?',
// };
// store.dispatch(addMessageAction1);
// const stateV1 = store.getState();
//
// const addMessageAction2 = {
//   type: 'ADD_MESSAGE',
//   message: 'Looking good.',
// };
// store.dispatch(addMessageAction2);
// const stateV2 = store.getState();
//
// console.log('state V1: ');
// console.log(stateV1);
// console.log('state V2: ');
// console.log(stateV2);
//
// const deleteMessageAction = {
//   type: 'DELETE_MESSAGE',
//   index: 0,
// };
//
// store.dispatch(deleteMessageAction);
// const stateV3 = store.getState();
//
// console.log('State V3: ');
// console.log(stateV3);
