//conener subscribers del store , reducers, state
export class store {
  private subscribers: Function[];
  private reducers: {
    [key: string]: Function;
  };
  private state: {
    [key: string]: any;
  };


  constructor(reducers = {}, initialState = {}) {
      this.reducers = reducers;
      //this.state = initialState;
      this.state = this.reduce(initialState,{});//usarlo como una libreria
  }

  get value(){
    return this.state;
  } //console.log(store.value); -> representa el state

  //tenemos q conocer el state
  dispatch(action){
      this.state = this.reduce(this.state, action);
    /*this.state = {
        ...this.state, //merge con el nuevo objecto
        todos: [...this.state.todos, action.payload ]
    };
    console.log(this.state);*/
  }

  private reduce(state, action){
    //actiualizamos el state object llamando la funcion reducers
        const newState = {};
        for (const prop in this.reducers) {
            
            //se adiciona dinamicamente
            //newState.todos = this.reducers.todos()
            newState[prop] = this.reducers[prop](state[prop], action);//maneja cada propiedad
            
            
        }
        return newState;
  }

}
