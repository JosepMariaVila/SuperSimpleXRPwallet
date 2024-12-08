# supersimpleXRPwallet
A super simple javascript XRP wallet to create new accounts offline, check balances and send XRP.

It uses a seed to derive the account address and sign transactions, it uses ed25519 algorithm, so just use it with seeds created with ed25519 algo.

The ed25519 algorithm: seeds have 31 characters (sKdNVBLAmVjgcDrEfDSzTSBqsagHMEd).

Step by step guide to set up the wallet:

Create an empty folder in your desktop and download the 4 files.

Open the HTML file in your browser.

It works for the XRPL Mainet.

It allows to create a Mainnet account (which has to be activated later with XRP). Do it offline, it's purely mathematical.

It allows to check balances and send XRP. Warning: if you sign and send a transaction in the same computer, as it has internet conection, we can consider the private key compromised once broadcasted the transaction. So, each time you send XRP you should generat a new keyparir using a computer that never is connected to the internet and send your XRP there.

You can try it here: https://skunk-proper-smoothly.ngrok-free.app/tools/supersimpleXRPwallet/xrpwallet
