let rowCount = 0;

document.getElementById('add-row-button').addEventListener('click', () => {
  rowCount++;
  const tableBody = document.querySelector('#dynamic-table tbody');
  
  const newRow = document.createElement('tr');

  const cell1 = document.createElement('td');
  cell1.textContent = rowCount;
  newRow.appendChild(cell1);

  const cell2 = document.createElement('td');
  cell2.textContent = `Sample Data ${rowCount}`;
  newRow.appendChild(cell2);

  tableBody.appendChild(newRow);
});
