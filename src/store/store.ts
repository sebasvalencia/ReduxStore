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

}
