import bitcoin from 'bitcoinjs-lib'
import axios from 'axios'

class BitCoinService{
    constructor(networkType = 'testnet'){
        this.network = networkType === 'testnet' ? bitcoin.networks.testnet : bitcoin.networks.bitcoin // use testnet for development or bitcoin for production
        this.apiUrl = networkType === 'testnet' ? 'https://blockstream.info/testnet/api' : 'https://blockstream.info/api'
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