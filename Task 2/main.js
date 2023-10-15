const API_URL = 'https://app.currencyapi.com/cur_live_jWkv9zqwZQANGklAFddd377vCm4aiKhQV3LAupqo';

async function loadCurrencies() {
  try {
    const response = await axios.get(`${API_URL}/currencies`);
    const currencies = response.data;
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');

    for (const currency in currencies) {
      const option = document.createElement('option');
      option.value = currency;
      option.text = currency;
      fromCurrencySelect.appendChild(option);
      toCurrencySelect.appendChild(option.cloneNode(true));
    }
  } catch (error) {
    console.error('Ошибка при загрузке списка валют:', error);
  }
}

// Функция для выполнения конвертации валют
async function convertCurrency() {
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  const amount = parseFloat(document.getElementById('amount').value);

  try {
    const response = await axios.get(`${API_URL}/convert`, {
      params: {
        from: fromCurrency,
        to: toCurrency,
        amount: amount,
      },
    });
    const result = response.data.result;
    document.getElementById('result').textContent = result;
  } catch (error) {
    console.error('Ошибка при конвертации валют:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadCurrencies);
document.getElementById('amount').addEventListener('input', convertCurrency);
document.getElementById('fromCurrency').addEventListener('change', convertCurrency);
document.getElementById('toCurrency').addEventListener('change', convertCurrency);
