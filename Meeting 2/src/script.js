document.getElementById("loadBtn").addEventListener("click", async () => {
  const response = await fetch(
    "https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=51.71.02.2001"
  );
  if (!response.ok) return;

  const data = await response.json();
  const cuaca = data.data[0].cuaca[0][0];

  document.getElementById("deskripsi").textContent = cuaca.weather_desc;
  document.getElementById("waktu").textContent = cuaca.datetime;
  document.getElementById("humidity").textContent = cuaca.hu + "%";
  document.getElementById("temp").textContent = cuaca.t + " °C";
});
