import * as bitcoin from 'bitcoinjs-lib'
import axios from 'axios'

class BitCoinService{
    constructor() {
        this.network = bitcoin.networks.testnet; // Use testnet for development
        this.apiUrl = 'https://blockstream.info/testnet/api';
      }
      
    generateAddress(){
        const keyPair = bitcoin.ECPair.makeRandom({network: this.network});
        const { address} = bitcoin.payments.p2wpkh({
            pubkey: keyPair.publicKey,
            network: this.network
        })
        return {
            address, 
            privateKey: keyPair.toWIF()
        }
    }

    async checkTransaction(address, amount) {
        try {
            const response = await axios.get(`${this.apiUrl}/address/${address}/utxo`);
            const utxos = response.data;
            
            let totalReceived = 0;
            utxos.forEach(utxo => {
                totalReceived += utxo.value;
            })
            // Convert amount from BTC to satoshis
            const expectedAmount = Math.floor(amount * 100000000);
            console.log(`Total Received: ${totalReceived} satoshis, Expected: ${expectedAmount} satoshis`);
            return totalReceived >= expectedAmount;
            
        } catch (err) {
            console.error("Error checking transaction: ", err.message || err);
            throw new Error("Failed to verify transaction");
        }
    }
}

export default new BitCoinService()