document.addEventListener('DOMContentLoaded', () => {
    const addBabyForm = document.getElementById('addBabyForm');
    const babyRecordsContainer = document.getElementById('babyRecordsContainer');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
  
    addBabyForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      // Get the form field values
      const name = document.getElementById('nameInput').value;
      const gender = document.getElementById('genderInput').value;
      const weight = parseFloat(document.getElementById('weightInput').value);
      const ageInDays = parseInt(document.getElementById('ageInput').value);
      const dateOfBirth = document.getElementById('dobInput').value;
      const healthStatus = document.getElementById('healthInput').value;
  
      // Create the new infant record object
      const newInfant = {
        name,
        gender,
        weight,
        ageInDays,
        dateOfBirth,
        healthStatus
      };
  
      // Perform the fetch request to add the new infant record
      fetch('http://localhost:3000/infants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newInfant)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to add new infant record');
          }
          return response.json();
        })
        .then(data => {
          console.log('New infant record added:', data);
          // Add the new infant record to the baby records container
          const infantRecord = createInfantRecordElement(data);
          babyRecordsContainer.appendChild(infantRecord);
        })
        .catch(error => {
          console.error('Error adding new infant record:', error);
          // Handle the error appropriately
        });
  
      // Reset the form
      addBabyForm.reset();
    });
  
    searchButton.addEventListener('click', () => {
      const searchTerm = searchInput.value.trim().toLowerCase();
  
      if (searchTerm === '') {
        resetSearch();
        return;
      }
  
      fetch('http://localhost:3000/infants')
        .then(response => response.json())
        .then(data => {
          const searchResults = data.infants.filter(infant => infant.name.toLowerCase().includes(searchTerm));
  
          babyRecordsContainer.innerHTML = '';
  
          if (searchResults.length > 0) {
            searchResults.forEach(infant => {
              const infantRecord = createInfantRecordElement(infant);
              babyRecordsContainer.appendChild(infantRecord);
            });
          } else {
            const noResults = document.createElement('p');
            noResults.textContent = 'No results found.';
            babyRecordsContainer.appendChild(noResults);
          }
        })
        .catch(error => {
          console.error('Error retrieving infant records:', error);
          // Handle the error appropriately
        });
    });
  
    function resetSearch() {
      babyRecordsContainer.innerHTML = '';
  
      infants.forEach(infant => {
        const infantRecord = createInfantRecordElement(infant);
        babyRecordsContainer.appendChild(infantRecord);
      });
    }
  
    function createInfantRecordElement(infant) {
      const infantRecord = document.createElement('div');
      infantRecord.classList.add('infant-record');
  
      const name = document.createElement('p');
      name.textContent = `Name: ${infant.name}`;
      infantRecord.appendChild(name);
  
      const gender = document.createElement('p');
      gender.textContent = `Gender: ${infant.gender}`;
      infantRecord.appendChild(gender);
  
      const weight = document.createElement('p');
      weight.textContent = `Weight: ${infant.weight} kg`;
      infantRecord.appendChild(weight);
  
      const ageInDays = document.createElement('p');
      ageInDays.textContent = `Age (in days): ${infant.ageInDays}`;
      infantRecord.appendChild(ageInDays);
  
      const dob = document.createElement('p');
      dob.textContent = `Date of Birth: ${infant.dateOfBirth}`;
      infantRecord.appendChild(dob);
  
      const healthStatus = document.createElement('p');
      healthStatus.textContent = `Health Status: ${infant.healthStatus}`;
      infantRecord.appendChild(healthStatus);
  
      return infantRecord;
    }
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const babyRecordsContainer = document.getElementById('babyRecordsContainer');
  
    searchButton.addEventListener('click', () => {
      const searchTerm = searchInput.value.trim().toLowerCase();
  
      if (searchTerm === '') {
        resetSearch();
        return;
      }
  
      fetch('http://localhost:3000/infants')
        .then(response => response.json())
        .then(data => {
          const searchResults = data.infants.filter(infant => infant.name.toLowerCase().includes(searchTerm));
  
          babyRecordsContainer.innerHTML = '';
  
          if (searchResults.length > 0) {
            searchResults.forEach(infant => {
              const infantRecord = createInfantRecordElement(infant);
              babyRecordsContainer.appendChild(infantRecord);
            });
          } else {
            const noResults = document.createElement('p');
            noResults.textContent = 'No results found.';
            babyRecordsContainer.appendChild(noResults);
          }
        })
        .catch(error => {
          console.error('Error retrieving infant records:', error);
          // Handle the error appropriately
        });
    });
  
    function resetSearch() {
      babyRecordsContainer.innerHTML = '';
  
      infants.forEach(infant => {
        const infantRecord = createInfantRecordElement(infant);
        babyRecordsContainer.appendChild(infantRecord);
      });
    }
  
    function createInfantRecordElement(infant) {
      const infantRecord = document.createElement('div');
      infantRecord.classList.add('infant-record');
  
      const name = document.createElement('p');
      name.textContent = `Name: ${infant.name}`;
      infantRecord.appendChild(name);
  
      const gender = document.createElement('p');
      gender.textContent = `Gender: ${infant.gender}`;
      infantRecord.appendChild(gender);
  
      const weight = document.createElement('p');
      weight.textContent = `Weight: ${infant.weight} kg`;
      infantRecord.appendChild(weight);
  
      const ageInDays = document.createElement('p');
      ageInDays.textContent = `Age (in days): ${infant.ageInDays}`;
      infantRecord.appendChild(ageInDays);
  
      const dob = document.createElement('p');
      dob.textContent = `Date of Birth: ${infant.dateOfBirth}`;
      infantRecord.appendChild(dob);
  
      const healthStatus = document.createElement('p');
      healthStatus.textContent = `Health Status: ${infant.healthStatus}`;
      infantRecord.appendChild(healthStatus);
  
      return infantRecord;
    }
  });
  
  // search functionality 
  
  document.getElementById("searchButton").addEventListener("click", searchBaby);
  
  function searchBaby() {
    const searchInput = document.getElementById("searchInput").value;
    const url = "http://localhost:3000/infants?name=" + encodeURIComponent(searchInput);
  
    fetch(url)
      .then(response => response.json())
      .then(data => displayResults(data))
      .catch(error => console.log(error));
  }
  
  function displayResults(results) {
    const searchResultsContainer = document.getElementById("searchResults");
    searchResultsContainer.innerHTML = "";
  
    if (results.length === 0) {
      const noResultsMessage = document.createElement("p");
      noResultsMessage.textContent = "No results found.";
      searchResultsContainer.appendChild(noResultsMessage);
    } else {
      results.forEach(result => {
        const listItem = document.createElement("li");
        listItem.classList.add("baby-result");
  
        const babyName = document.createElement("h3");
        babyName.textContent = result.name;
  
        const babyDetails = document.createElement("p");
        babyDetails.innerHTML = `<strong>Gender:</strong> ${result.gender}<br>
                                 <strong>Weight:</strong> ${result.weight} kg<br>
                                 <strong>Age:</strong> ${result.ageInDays} days<br>
                                 <strong>Date of Birth:</strong> ${result.dateOfBirth}<br>
                                 <strong>Health Status:</strong> ${result.healthStatus}`;
  
        listItem.appendChild(babyName);
        listItem.appendChild(babyDetails);
        searchResultsContainer.appendChild(listItem);
      });
    }
  }
  
//   contact us page 
