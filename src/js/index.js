//require("@babel/polyfill");
import axios from "axios";
import search from "./model/search";

let see = new search("pasta");

see.doSearch().then((r) => console.log(r));
