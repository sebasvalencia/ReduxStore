import * as fromStore from "./store"; //acceder al store
import { renderTodos } from "./utils";

const input = document.querySelector("input") as HTMLInputElement;
const button = document.querySelector("button") as HTMLButtonElement;
const destroy = document.querySelector(".unsubscribe") as HTMLButtonElement;
const todoList = document.querySelector(".todos") as HTMLLIElement;

//registramos el reducer, en el store (index.ts)
const reducers = {
  todos: fromStore.reducer //contiene una funcion q maneja todos los state del todo
};

/*estructura de la data
const state = {
  todos:{
    loaded: false,
    loading: false,
    data: []
  }
}
*/

//vamos a enganchar al reducer
const store = new fromStore.store({ reducers });

/*const store = new fromStore.store(
  {},
  {
    todos: [{ label: "Eat pizza", complete: false }]
  }
);*/
//console.log(store.value);

button.addEventListener(
  "click",
  () => {
    if (!input.value.trim()) return;

    const payload = { label: input.value, complete: false };

    //dispatch this payload into action - creando la action
    store.dispatch({
      type: "ADD_TODO",
      payload: payload
    });

    console.log(store.value);

    //console.log(payload);
    //como enviar las acciones

    input.value = "";
  },
  false
);

const unsubscribe = store.suscribe(state => {
  renderTodos(state.todos.data);
});

destroy.addEventListener('click', unsubscribe, false);

todoList.addEventListener("click", function(event) {
  const target = event.target as HTMLButtonElement;
  if (target.nodeName.toLowerCase() === "button") {
    console.log(target);
  }
});

store.suscribe(state => console.log("STATE:::", state));
