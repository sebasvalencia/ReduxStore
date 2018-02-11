import * as fromActions from "./actions";

//creamos initialState object
//va  a tener la data de los todos

export const initialState = {
  loaded: false,
  loading: false,
  data: [{ label: "Eat pizza", complete: false }]
};

//para la primerea vez empieza con el initialState
//
export function reducer(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    //case "ADD_TODO": {
    case fromActions.ADD_TODO: {
      const todo = action.payload;
      const data = [...state.data, todo]; //creamos en nuevo arreglo
      //retornamos el nuevo state
      return {
        ...state,
        data: data
      };
    }
    case fromActions.REMOVE_TODO: {
      console.log(action.payload);
      const data = state.data.filter(
        todo => todo.label !== action.payload.label
      );
      return {
          ...state,
          data
      };
    }
  }

  return state; //retorna el estado al store
}
