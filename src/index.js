import './style.css';
import weatherApp from "./main.js";

function page(pages){
    if (pages === "main") weatherApp();
}

page("main");