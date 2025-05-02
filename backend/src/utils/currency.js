import axios from 'axios'

export const convertToBTC = async (usdAmount) => {
  try {
    // Use a cryptocurrency exchange API to get current BTC price
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');

    if (!response.data.bitcoin || !response.data.bitcoin.usd) {
        throw new Error('Could not fetch Bitcoin price');
      }

    const btcPriceInUSD = response.data.bitcoin.usd;
    
    // Calculate equivalent BTC amount
    const btcAmount = usdAmount / btcPriceInUSD;
    return parseFloat(btcAmount.toFixed(8)); // Return with 8 decimal places
  } catch (error) {
    console.error('Error converting to BTC:', error);
    throw new Error('Failed to convert currency');
  }
}