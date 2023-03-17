import "./App.scss";
import Tabs from "./components/Tabs";
import Layout from "./components/Layout";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import TemporaryDrawer from "./components/ProgressSteps/Drawer";

function App() {
  const data = useSelector((e) => e.users);
  return (
    <div className="App">
      {data.header ? <Header /> : ""}
      {data.navTab ? <Tabs /> : ""}
      <Layout />
      {data.footer ? <Footer /> : ""}
    </div>
  );
}

export default App;
