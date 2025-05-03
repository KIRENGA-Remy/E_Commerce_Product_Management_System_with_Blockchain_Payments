// import * as bitcoin from 'bitcoinjs-lib';
// import axios from 'axios';

// class BitcoinService {
//   constructor() {
//     this.network = bitcoin.networks.testnet; // Use testnet for development
//     this.apiUrl = 'https://blockstream.info/testnet/api';
//   }

//   generateAddress() {
//     const keyPair = bitcoin.ECPair.makeRandom({ network: this.network });
//     const { address } = bitcoin.payments.p2pkh({
//       pubkey: keyPair.publicKey,
//       network: this.network
//     });
//     return {
//       address,
//       privateKey: keyPair.toWIF()
//     };
//   }

//   async checkTransaction(address, amount) {
//     try {
//       const response = await axios.get(`${this.apiUrl}/address/${address}/utxo`);
//       const utxos = response.data;
      
//       let totalReceived = 0;
//       utxos.forEach(utxo => {
//         totalReceived += utxo.value;
//       });
      
//       // Convert amount from BTC to satoshis
//       const expectedAmount = Math.floor(amount * 100000000);
      
//       return totalReceived >= expectedAmount;
//     } catch (error) {
//       console.error('Error checking transaction:', error);
//       return false;
//     }
//   }
// }

// export default new BitcoinService();






// src/services/BitcoinService.js
import * as bitcoin from 'bitcoinjs-lib';
import axios from 'axios';
import * as ecc from 'tiny-secp256k1';
import { BIP32Factory } from 'bip32';

// Initialize bitcoinjs-lib with ecc library
bitcoin.initEccLib(ecc);
const bip32 = BIP32Factory(ecc);

class BitcoinService {
  constructor() {
    this.network = bitcoin.networks.testnet; // Use testnet for development
    this.apiUrl = 'https://blockstream.info/testnet/api';
  }

  generateAddress() {
    // Generate a random key pair
    const keyPair = bip32.makeRandom({ network: this.network });
    const { address } = bitcoin.payments.p2pkh({
      pubkey: keyPair.publicKey,
      network: this.network
    });
    
    return {
      address,
      privateKey: keyPair.toWIF()
    };
  }

  async checkTransaction(address, amount) {
    try {
      const response = await axios.get(`${this.apiUrl}/address/${address}/utxo`);
      const utxos = response.data;
      
      let totalReceived = 0;
      utxos.forEach(utxo => {
        totalReceived += utxo.value;
      });
      
      // Convert amount from BTC to satoshis
      const expectedAmount = Math.floor(amount * 100000000);
      
      return totalReceived >= expectedAmount;
    } catch (error) {
      console.error('Error checking transaction:', error);
      return false;
    }
  }
}

export default new BitcoinService();