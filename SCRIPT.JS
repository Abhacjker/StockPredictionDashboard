function generateRecommendations() {
  const amount = parseFloat(document.getElementById("investmentAmount").value);
  if (!amount || amount <= 0) {
    alert("Please enter a valid investment amount!");
    return;
  }

  const stocks = [
    { name: "RELIANCE.NS", price: 2873.65, growth: 8 },
    { name: "TCS.NS", price: 3888.20, growth: 6 },
    { name: "HDFCBANK.NS", price: 1574.40, growth: 5 },
    { name: "INFY.NS", price: 1460.85, growth: 7 },
    { name: "ICICIBANK.NS", price: 1126.70, growth: 9 },
  ];

  const investPerStock = amount / stocks.length;
  let totalReturn = 0;

  const tableBody = document.querySelector("#resultsTable tbody");
  tableBody.innerHTML = "";

  stocks.forEach(stock => {
    const expectedReturn = investPerStock * (1 + stock.growth / 100);
    totalReturn += expectedReturn;

    const row = `
      <tr>
        <td>${stock.name}</td>
        <td>₹${stock.price.toFixed(2)}</td>
        <td>${stock.growth}%</td>
        <td>₹${investPerStock.toFixed(2)}</td>
        <td>₹${expectedReturn.toFixed(2)}</td>
      </tr>`;
    tableBody.insertAdjacentHTML("beforeend", row);
  });

  document.getElementById("resultsSection").style.display = "block";
  document.getElementById("totalReturn").innerText = "₹" + totalReturn.toFixed(2);

  const ctx = document.getElementById('returnChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: stocks.map(s => s.name),
      datasets: [{
        label: 'Expected Return (₹)',
        data: stocks.map(s => (investPerStock * (1 + s.growth / 100)).toFixed(2)),
        backgroundColor: ['#0066ff', '#00cc99', '#ffaa00', '#ff6699', '#6633ff']
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });
}
