import { getContract } from "thirdweb";
import { client } from "./client";
import { sepolia } from "thirdweb/chains";

const contractAddress = "0x0d895F8F933EB54D6Ea0B29D80e4a05c9B8ae6f0";

export const CONTRACT = getContract({
  client: client,
  chain: sepolia,
  address: contractAddress,
});
