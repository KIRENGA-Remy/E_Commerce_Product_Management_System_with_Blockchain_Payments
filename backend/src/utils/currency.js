import axios from 'axios'

async function convertToBTC(amountInUSD) {
  try {
    // Use a cryptocurrency exchange API to get current BTC price
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    const btcPriceInUSD = response.data.bitcoin.usd;
    
    // Calculate equivalent BTC amount
    const btcAmount = amountInUSD / btcPriceInUSD;
    return parseFloat(btcAmount.toFixed(8)); // Return with 8 decimal places
  } catch (error) {
    console.error('Error converting to BTC:', error);
    throw new Error('Failed to convert currency');
  }
}

export default {
  convertToBTC
};