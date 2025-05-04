export const generateBitcoinAddress = async () => {
    const response = await axios.post('/api/bitcoin/address');
    return response.data.address;
  };