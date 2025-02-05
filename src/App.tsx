import React from "react";
// import Counter from "./components/Counter";
// import UserForm from "./components/UserForm";
// import RichTextEditor from "./components/RichTextEditor";
import { Provider } from "react-redux";
import store from "./store/Store";
import Auth from "./components/Auth";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Auth />
    </Provider>
  );
};

export default App;

