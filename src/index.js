import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { addTileLayer, validateIp } from "./helpers";
import icon from "../images/icon-location.svg";

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector(".search-bar__btn");

const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const timezoneInfo = document.querySelector("#timezone");
const ispIndo = document.querySelector("#isp");

const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40],
  // iconAnchor: [22, 94],
});

const mapArea = document.querySelector(".map");
const map = L.map(mapArea, {
  center: [51.505, -0.09],
  zoom: 13,
});

addTileLayer(map);

L.marker([51.505, -0.09], { icon: markerIcon }).addTo(map);

btn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKey);

function getData() {
  if (validateIp(ipInput.value)) {
    fetch(
      `https://geo.ipify.org/api/v2/country?apiKey=at_EJPw8rIExX3ENgGZLIOzxNwAJbkhu&ipAddress=${ipInput.value}`
    )
      .then((response) => response.json())
      .then((data) => setInfo(data));
  }
}

function handleKey(e) {
  if (e.key === "Enter") {
    getData();
  }
}

function setInfo(mapData) {
  ipInfo.textContent = mapData.ip;
  locationInfo.textContent = `${mapData.location.country} ${mapData.location.region}`;
  timezoneInfo.textContent = mapData.location.timezone;
  ispIndo.textContent = mapData.isp;
}
