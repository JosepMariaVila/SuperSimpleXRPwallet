// ******************************************************
// ************* Get the Preferred Network **************
// ******************************************************

function getNet() {
  let net;
  if (document.getElementById("mn").checked) net = "wss://xrplcluster.com";
  return net;
} // End of getNet()


// *******************************************************
// ******************** Get Algorithm ********************
// *******************************************************

function getAlgo() {
  let algo;
  if (document.getElementById("ed").checked) algo = "ed25519";
  return algo;
} // End of getAlgo()


// *******************************************************
// ************* Create XRP Mainnet Account **************
// *******************************************************

async function getAccount2() {
  const wallet = xrpl.Wallet.generate("ed25519");
  console.log(wallet);

  standbyResultField.value =
    "Creating a wallet...\n" + "Wallet created:\n" + JSON.stringify(wallet);

  standbyAccountField.value = wallet.address;
  standbySeedField.value = wallet.seed;
  seeds.value = standbySeedField.value;
  standbyBalanceField.value = "";
  standbyAmountField.value = "";
  standbyDestinationField.value = "";
} // End of getAccount2()


// *******************************************************
// ********** Get Accounts from Seeds ********************
// *******************************************************

async function getAccountsFromSeeds() {
  let net = getNet();
  const client = new xrpl.Client(net);
  results = "Connecting to " + getNet() + "....";
  standbyResultField.value = results;
  await client.connect();
  results += "\nConnected.\n";
  standbyResultField.value = results;
  try {
    // -------------------------------------------------Find the test account wallets.
    let algo = getAlgo();

    const standby_wallet = xrpl.Wallet.fromSeed(seeds.value, {
      algorithm: algo,
    });

    // -------------------------------------------------------Get the current balance.
    const standby_balance = await client.getXrpBalance(standby_wallet.address);

    // ----------------------Populate the fields for Standby account.
    standbyAccountField.value = standby_wallet.address;
    standbySeedField.value = standby_wallet.seed;
    standbyBalanceField.value = standby_balance;
    standbyAmountField.value = "";
    standbyDestinationField.value = "";
  } catch (err) {
    console.log("Error submitting transaction:", err);
    standbyResultField.value = err;
  }
  client.disconnect();
} // End of getAccountsFromSeeds()


// *******************************************************
// ******************** Send XRP *************************
// *******************************************************

async function sendXRP() {
  results = "Connecting to the selected ledger.\n";
  standbyResultField.value = results;
  let net = getNet();
  results = "Connecting to " + getNet() + "....";
  const client = new xrpl.Client(net);
  await client.connect();

  results += "\nConnected. Sending XRP.";
  standbyResultField.value = results;
  let algo = getAlgo();

  const standby_wallet = xrpl.Wallet.fromSeed(standbySeedField.value, {
    algorithm: algo,
  });
  const sendAmount = standbyAmountField.value;

  results += "\nSending from account: " + standby_wallet.address;
  standbyResultField.value = results;

  // -------------------------------------------------------- Prepare transaction
  const prepared = await client.autofill({
    TransactionType: "Payment",
    Account: standby_wallet.address,
    Amount: xrpl.xrpToDrops(sendAmount),
    Destination: standbyDestinationField.value,
  });

  // ------------------------------------------------- Sign prepared instructions
  const signed = standby_wallet.sign(prepared);
  console.log(signed);

  // -------------------------------------------------------- Submit signed blob
  const tx = await client.submitAndWait(signed.tx_blob);
  console.log(tx);
  results +=
    "\nBalance changes: " +
    JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2);
  standbyResultField.value = results;

  standbyBalanceField.value = await client.getXrpBalance(
    standby_wallet.address
  );
  client.disconnect();
} // End of sendXRP()


async function reload() {
  window.location.reload();
}
