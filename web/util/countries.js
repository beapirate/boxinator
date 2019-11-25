const validDestinationCountries = [
    "Australia",
    "Brazil",
    "China",
    "Sweden"
  ];
  
const validDestinationCountriesLower = validDestinationCountries.map(i => i.toLowerCase());

const isValidDestinationCountry = (name) => {
    return validDestinationCountriesLower.indexOf(name.toLowerCase()) > -1;
  }

  export { validDestinationCountries, isValidDestinationCountry };