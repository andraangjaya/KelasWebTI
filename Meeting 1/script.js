document.getElementById("loadBtn").addEventListener("click", async () => {
  const lokasiCard = document.getElementById("lokasiCard");
  const cuacaContainer = document.getElementById("cuacaContainer");
  const cuacaList = document.getElementById("cuacaList");

  lokasiCard.classList.add("hidden");
  cuacaContainer.classList.add("hidden");

  try {
    const res = await fetch(
      "https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=51.71.02.2001"
    );
    const data = await res.json();

    // ========== TAMPILKAN DATA LOKASI ==========
    const lokasi = data?.lokasi;
    if (lokasi) {
      document.getElementById("provinsi").textContent = lokasi.provinsi;
      document.getElementById("kotkab").textContent = lokasi.kotkab;
      document.getElementById("kecamatan").textContent = lokasi.kecamatan;
      document.getElementById("desa").textContent = lokasi.desa;
      lokasiCard.classList.remove("hidden");
    } else {
      lokasiCard.innerHTML = "<p>Data lokasi tidak ditemukan.</p>";
      lokasiCard.classList.remove("hidden");
    }

    // ========== TAMPILKAN DATA CUACA ==========
    const cuacaData = data.data[0].cuaca[0];
    if (Array.isArray(cuacaData)) {
      cuacaList.innerHTML = cuacaData
        .map(
          (item) => `
        <div class="cuaca-item">
          <img src="${item.image}" alt="${item.weather_desc}" />
          <div class="info">
            <p><strong>${item.local_datetime}</strong></p>
            <p>Cuaca: ${item.weather_desc}</p>
            <p>Suhu: ${item.t}°C | Kelembapan: ${item.hu}%</p>
            <p>Angin: ${item.ws} km/jam</p>
          </div>
        </div>
      `
        )
        .join("");
    } else {
      cuacaList.innerHTML = "<p>Data cuaca tidak tersedia.</p>";
    }
    cuacaContainer.classList.remove("hidden");
  } catch (error) {
    console.error("Gagal mengambil data:", error);
    lokasiCard.innerHTML =
      "<p>Terjadi kesalahan saat mengambil data lokasi.</p>";
    cuacaList.innerHTML = "<p>Terjadi kesalahan saat mengambil data cuaca.</p>";
    lokasiCard.classList.remove("hidden");
    cuacaContainer.classList.remove("hidden");
  }
});

// Fungsi bantu untuk format waktu lokal ke bahasa Indonesia
// function formatLocalTime(datetimeStr) {
//   const options = {
//     weekday: "long",
//     hour: "2-digit",
//     minute: "2-digit",
//     day: "numeric",
//     month: "long",
//   };
//   const dt = new Date(datetimeStr + "Z");
//   return dt.toLocaleString("id-ID", options);
// }
