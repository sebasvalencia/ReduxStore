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
      this.state = initialState;
  }

  get value(){
    return this.state;
  } //console.log(store.value); -> representa el state

  //tenemos q conocer el state
  dispatch(action){
    this.state = {
        ...this.state, //merge con el nuevo objecto
        todos: [...this.state.todos, action.payload ]
    };
    console.log(this.state);
  }

}
