import { RoosterEgg__factory, USDC__factory } from "../../typechain";
import { MacroChain, toWei, verifyContract } from "../../utils";

const main = async () => {
  const { deployer, users, owner } = await MacroChain.init();

  //Deploy USDC
  const usdc = await deployer<USDC__factory>("USDC", [], true);
  for (let i = 1; i < 10; i++) {
    await usdc.transfer(users[i].address, toWei(1000, 6));
  }

  //Deploy RoosterEgg
  const usdcAddr = usdc.address;
  const uri = "https://mds-roosterwars-backend-test.azurewebsites.net/egg/metadata/";
  const initialTokenId = 1;
  await deployer<RoosterEgg__factory>("RoosterEgg", [usdcAddr, owner.address, initialTokenId, uri], true);
};

main()
  .then(async () => await verifyContract("RoosterEgg"))
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
