const path = require("path");

const deployBlock = 5048780;
const stakingContract = "0xb02e538a08cFA00E9900cf94e33B161323d8D162";

const network = "optimism";

const dataSources = [
  {
    kind: "ethereum/contract",
    name: "stkLyraProxy",
    network,
    source: {
      address: stakingContract,
      startBlock: deployBlock,
      abi: "StakingRewards",
    },
    mapping: {
      kind: "ethereum/events",
      apiVersion: "0.0.5",
      language: "wasm/assemblyscript",
      file: "./src/mapping.ts",
      entities: ["TokenTransfer"], //This value is currently not used by TheGraph at all, it just cant be empty
      abis: [
        {
          name: "StakingRewards",
          file: "./abis/StakingRewards.json",
        },
      ],
      eventHandlers: [
        {
          event: "Staked(indexed address,uint256)",
          handler: "handleStaked",
        },
        {
          event: "Withdrawn(indexed address,uint256)",
          handler: "handleWithdrawn",
        },
      ],
    },
  },
];

module.exports = {
  specVersion: "0.0.2",
  description: "Lyra",
  repository: "https://github.com/lyra-finance/lyra-protocol-subgraph",
  schema: {
    file: "./schema.graphql",
  },
  dataSources,
};
