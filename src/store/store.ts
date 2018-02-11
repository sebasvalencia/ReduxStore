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
      this.subscribers = [];
      this.reducers = reducers;
      //this.state = initialState;
      this.state = this.reduce(initialState,{});//usarlo como una libreria
  }

  get value(){
    return this.state;
  } //console.log(store.value); -> representa el state

  suscribe(fn){
      this.subscribers = [...this.subscribers, fn];//merge subscribers
      this.notify();
      return () =>{
          this.subscribers = this.subscribers.filter(sub => sub !== fn);
      }
  }
  //tenemos q conocer el state
  dispatch(action){
      this.state = this.reduce(this.state, action);
      this.notify();
    /*this.state = {
        ...this.state, //merge con el nuevo objecto
        todos: [...this.state.todos, action.payload ]
    };
    console.log(this.state);*/
  }

  private notify(){
      this.subscribers.forEach(fn => fn(this.value));//se le pasa el nuevo state
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
