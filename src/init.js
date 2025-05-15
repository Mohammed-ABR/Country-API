async function getCountryData() {
    const countryName = document.getElementById("countryInput").value.trim();
    const resultDiv = document.getElementById("result");

    if (!countryName) {
    resultDiv.innerHTML = "<p>Please enter a country name.</p>";
    resultDiv.classList.remove("hidden");
    return;
    }

    resultDiv.innerHTML = "<p>Loading...</p>";
    resultDiv.classList.remove("hidden");

    try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    const data = await response.json();

    if (data.status === 404 || !data.length) {
        resultDiv.innerHTML = "<p>Country not found. Please check the spelling.</p>";
        return;
    }

    const country = data[0];

    const html = `
        <img class="flag" src="${country.flags?.svg || country.flags?.png}" alt="Flag of ${country.name.common}" />
        <div class="field"><span>Official Name:</span> ${country.name.official}</div>
        <div class="field"><span>Capital:</span> ${country.capital?.[0] || "N/A"}</div>
        <div class="field"><span>Region:</span> ${country.region}</div>
        <div class="field"><span>Subregion:</span> ${country.subregion || "N/A"}</div>
        <div class="field"><span>Population:</span> ${country.population.toLocaleString()}</div>
        <div class="field"><span>Area:</span> ${country.area} km²</div>
        <div class="field"><span>Languages:</span> ${country.languages ? Object.values(country.languages).join(", ") : "N/A"}</div>
        <div class="field"><span>Timezones:</span> ${country.timezones?.join(", ")}</div>
        <div class="field"><span>Google Map:</span> <a href="${country.maps.googleMaps}" target="_blank">Open Map</a></div>
    `;

    resultDiv.innerHTML = html;
    } catch (error) {
    resultDiv.innerHTML = "<p>Error fetching data. Please try again.</p>";
    console.error(error);
    }
}