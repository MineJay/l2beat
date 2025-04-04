import { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import React, { useEffect } from 'react'

import { onlyDesktopModes } from '../../../../../.storybook/modes'
import { configureOverflowWrappers } from '../../../../scripts/configureOverflowWrappers'
import { configureProjectFilters } from '../../../../scripts/configureProjectFilters'
import { configureTabs } from '../../../../scripts/configureTabs'
import { configureTables } from '../../../../scripts/table/configureTables'
import { ScalingRiskView } from './ScalingRiskView'

const meta = {
  title: 'Pages/Scaling/RiskView',
  component: ScalingRiskView,
  args: {
    items: [
      {
        name: 'ZKSwap 1.0',
        slug: 'zkswap',
        provider: 'zkSync Lite',
        category: 'ZK Rollup',
        warning:
          'Version 3 of the protocol called ZkSpace is available and users are encouraged to move their assets there.',
        isArchived: true,
        isVerified: false,
        isUpcoming: undefined,
        stateValidation: {
          value: 'ZK proofs (SN)',
          description:
            'ZK-SNARKS are zero knowledge proofs that ensure state correctness, but require trusted setup.',
          sentiment: 'good',
        },
        dataAvailability: {
          value: 'On chain',
          description:
            'All of the data needed for proof construction is published on chain.',
          sentiment: 'good',
        },
        exitWindow: {
          value: '8 days delay',
          description:
            'The code that secures the system can be changed arbitrarily but users have some time to react.',
          sentiment: 'warning',
        },
        sequencerFailure: {
          value: 'Force exit to L1',
          description:
            'The user is only able to submit an L1 withdrawal request and force the sequencer to include it on L2. After that the user exits the system with their funds.',
          sentiment: 'good',
        },
        proposerFailure: {
          value: 'Escape hatch (ZK)',
          description:
            'Users are able to trustlessly exit by submitting a zero knowledge proof of funds.',
          sentiment: 'warning',
        },
        stage: { stage: 'NotApplicable' },
      },
      {
        name: 'Polygon Hermez',
        slug: 'hermez',
        provider: undefined,
        category: 'ZK Rollup',
        warning:
          'Hermez and Polygon have recently merged. Hermez and Polygon Hermez are two names for the same rollup.',
        isArchived: true,
        isVerified: true,
        isUpcoming: undefined,
        stateValidation: {
          value: 'ZK proofs (SN)',
          description:
            'ZK-SNARKS are zero knowledge proofs that ensure state correctness, but require trusted setup.',
          sentiment: 'good',
        },
        dataAvailability: {
          value: 'On chain',
          description:
            'All of the data needed for proof construction is published on chain.',
          sentiment: 'good',
        },
        exitWindow: {
          value: '7 days delay',
          description:
            'The code that secures the system can be changed arbitrarily but users have some time to react.',
          sentiment: 'warning',
        },
        sequencerFailure: {
          value: 'Force exit to L1',
          description:
            'The user is only able to submit an L1 withdrawal request and force the sequencer to include it on L2. After that the user exits the system with their funds.',
          sentiment: 'good',
        },
        proposerFailure: {
          value: 'Propose blocks (ZK)',
          description:
            'The user needs to run their own node and use it to propose new blocks to replace the validator. Proposing new blocks requires creating ZK proofs which are very computationally expensive.',
          sentiment: 'warning',
        },
        stage: { stage: 'NotApplicable' },
      },
      {
        name: 'ZKSwap 2.0',
        slug: 'zkswap2',
        provider: 'zkSync Lite',
        category: 'ZK Rollup',
        warning:
          'Version 3 of the protocol called ZkSpace is available and users are encouraged to move their assets there.',
        isArchived: true,
        isVerified: false,
        isUpcoming: undefined,
        stateValidation: {
          value: 'ZK proofs (SN)',
          description:
            'ZK-SNARKS are zero knowledge proofs that ensure state correctness, but require trusted setup.',
          sentiment: 'good',
        },
        dataAvailability: {
          value: 'On chain',
          description:
            'All of the data needed for proof construction is published on chain.',
          sentiment: 'good',
        },
        exitWindow: {
          value: '8 days delay',
          description:
            'The code that secures the system can be changed arbitrarily but users have some time to react.',
          sentiment: 'warning',
        },
        sequencerFailure: {
          value: 'Force exit to L1',
          description:
            'The user is only able to submit an L1 withdrawal request and force the sequencer to include it on L2. After that the user exits the system with their funds.',
          sentiment: 'good',
        },
        proposerFailure: {
          value: 'Escape hatch (ZK)',
          description:
            'Users are able to trustlessly exit by submitting a zero knowledge proof of funds.',
          sentiment: 'warning',
        },
        stage: { stage: 'NotApplicable' },
      },
      {
        name: 'Gluon',
        slug: 'gluon',
        category: 'Optimium',
        provider: undefined,
        warning:
          'LeverJ trading platform appears to be in a maintenance mode as the team moved to build NFT trading platform. Social medias associated with the project are silent since mid 2021.',
        isArchived: true,
        isVerified: true,
        isUpcoming: undefined,
        stateValidation: {
          value: 'Fraud proofs (!)',
          description:
            'Fraud proofs allow actors watching the chain to prove that the state is incorrect. Because the data is not present on chain the security of fraud proofs is severely weakened.',
          sentiment: 'warning',
        },
        dataAvailability: {
          value: 'External',
          description:
            'Proof construction relies fully on data that is NOT published on chain.',
          sentiment: 'bad',
        },
        exitWindow: {
          value: 'Yes',
          description:
            'The code that secures the system can be changed arbitrarily and without notice.',
          sentiment: 'bad',
        },
        sequencerFailure: {
          value: 'Exit to L1',
          description:
            'The user is only able to submit an L1 withdrawal request. After that the user exits the system with their funds.',
          sentiment: 'good',
        },
        proposerFailure: {
          value: 'Escape hatch (MP)',
          description:
            'Users are able to trustlessly exit by submitting a merkle proof of funds.',
          sentiment: 'good',
        },
        stage: { stage: 'NotApplicable' },
      },
      {
        name: 'OMG Network',
        slug: 'omgnetwork',
        category: 'Plasma',
        provider: undefined,
        warning: undefined,
        isArchived: true,
        isVerified: false,
        isUpcoming: undefined,
        stateValidation: {
          value: 'Exits only',
          description:
            'Exits from the network are subject to a period when they can be challenged. The internal network state is left unchecked.',
          sentiment: 'bad',
        },
        dataAvailability: {
          value: 'External',
          description:
            'Proof construction relies fully on data that is NOT published on chain.',
          sentiment: 'bad',
        },
        exitWindow: {
          value: 'Yes',
          description:
            'The code that secures the system can be changed arbitrarily and without notice.',
          sentiment: 'bad',
        },
        sequencerFailure: {
          value: 'Exit to L1',
          description:
            'The user is only able to submit an L1 withdrawal request. After that the user exits the system with their funds.',
          sentiment: 'good',
        },
        proposerFailure: {
          value: 'Escape hatch (?)',
          description:
            'Users are able to exit the system. The details are unknown.',
          sentiment: 'warning',
        },
        stage: { stage: 'NotApplicable' },
      },
      {
        name: 'L2.Finance-zk',
        slug: 'layer2financezk',
        category: 'Validium',
        provider: 'StarkEx',
        warning:
          'Layer2.finance-ZK has been shut down, users are encouraged to use optimistic rollup version.',
        isArchived: true,
        isVerified: false,
        isUpcoming: undefined,
        stateValidation: {
          value: 'ZK proofs (ST)',
          description:
            'ZK-STARKS are zero knowledge proofs that ensure state correctness.',
          sentiment: 'good',
        },
        dataAvailability: {
          value: 'External (DAC)',
          description:
            'Proof construction relies fully on data that is NOT published on chain. There exists a data availability committee (DAC) that is tasked with protecting and supplying the data.',
          sentiment: 'warning',
        },
        exitWindow: {
          value: 'Yes',
          description:
            'The code that secures the system can be changed arbitrarily and without notice.',
          sentiment: 'bad',
        },
        sequencerFailure: {
          value: 'Force exit to L1',
          description:
            'The user can force the sequencer to include their withdrawal transaction by submitting a request through L1. If the sequencer is down, the user can use the exit hatch to withdraw funds.',
          sentiment: 'good',
        },
        proposerFailure: {
          value: 'Escape hatch (MP)',
          description:
            'Users are able to trustlessly exit by submitting a merkle proof of funds.',
          sentiment: 'good',
        },
        stage: { stage: 'NotApplicable' },
      },
      {
        name: 'Arbitrum One',
        slug: 'arbitrum',
        category: 'Optimistic Rollup',
        provider: undefined,
        warning:
          'Fraud proof system is fully deployed but is not yet permissionless as it requires Validators to be whitelisted.',
        isArchived: undefined,
        isVerified: true,
        isUpcoming: undefined,
        stateValidation: {
          value: 'Fraud proofs (INT)',
          description:
            'Fraud proofs allow WHITELISTED actors watching the chain to prove that the state is incorrect. Interactive proofs (INT) require multiple transactions over time to resolve.',
          sentiment: 'warning',
        },
        dataAvailability: {
          value: 'On chain',
          description:
            'All of the data needed for proof construction is published on chain.',
          secondLine: 'Transactions',
          sentiment: 'good',
        },
        exitWindow: {
          value: '13d or no delay',
          description:
            'There is a 13 days delay for upgrades initiated by the DAO that can be canceled by the 9/12 Security Council multisig. This multisig can also upgrade with no delay',
          sentiment: 'warning',
          secondLine: 'by DAO decentralized',
          showWarning: true,
        },
        sequencerFailure: {
          value: 'Transact using L1',
          description:
            'In the event of sequencer failure, after 1d (5760 blocks) user can force the transaction to be included in the L2 chain by sending it to the L1.',
          sentiment: 'good',
        },
        proposerFailure: {
          value: 'Propose blocks',
          description:
            'Anyone can become a Validator after approximately 7 days (45818 blocks) of inactivity from the currently whitelisted Validators.',
          sentiment: 'good',
        },
        stage: { stage: 'NotApplicable' },
      },
      {
        name: 'Optimism',
        slug: 'optimism',
        category: 'Optimistic Rollup',
        provider: 'OP Stack',
        warning:
          'Fraud proof system is currently under development. Users need to trust block Proposer to submit correct L1 state roots.',
        isArchived: undefined,
        isVerified: true,
        isUpcoming: undefined,
        stateValidation: {
          value: 'In development',
          description:
            'Currently the system permits invalid state roots. More details in project overview.',
          sentiment: 'bad',
        },
        dataAvailability: {
          value: 'On chain',
          description:
            'All of the data needed for proof construction is published on chain.',
          secondLine: 'Transactions, compressed',
          sentiment: 'good',
        },
        exitWindow: {
          value: 'Yes',
          description:
            'The code that secures the system can be changed arbitrarily and without notice.',
          sentiment: 'bad',
          secondLine: 'by DAO centralized',
        },
        sequencerFailure: {
          value: 'Transact using L1',
          description:
            'The user is able to submit a transaction through L1 and force its inclusion on L2.',
          sentiment: 'good',
        },
        proposerFailure: {
          value: 'No mechanism',
          description:
            'If the whitelisted validator goes down, withdrawals cannot be processed. Users can still transact on L2.',
          sentiment: 'bad',
        },
        stage: { stage: 'NotApplicable' },
      },
      {
        name: 'dYdX',
        slug: 'dydx',
        category: 'ZK Rollup',
        provider: 'StarkEx',
        warning: undefined,
        isArchived: undefined,
        isVerified: true,
        isUpcoming: undefined,
        stateValidation: {
          value: 'ZK proofs (ST)',
          description:
            'ZK-STARKS are zero knowledge proofs that ensure state correctness.',
          sentiment: 'good',
        },
        dataAvailability: {
          value: 'On chain',
          description:
            'All of the data needed for proof construction is published on chain.',
          sentiment: 'good',
        },
        exitWindow: {
          value: 'Yes',
          description:
            'The code that secures the system can be changed arbitrarily and without notice.',
          sentiment: 'bad',
        },
        sequencerFailure: {
          value: 'Force trade/exit to L1',
          description:
            'The user can force the sequencer to include a trade or withdrawal transaction by submitting a request through L1. The user is required to find a counterparty for the trade by out of system means. If the sequencer is down, the user can use the exit hatch to withdraw funds.',
          sentiment: 'warning',
        },
        proposerFailure: {
          value: 'Escape hatch (MP)',
          description:
            'Users are able to trustlessly exit their collateral by submitting a merkle proof of funds. Positions will be closed using average price from the last batch state update.',
          sentiment: 'good',
        },
        stage: { stage: 'NotApplicable' },
      },
      {
        name: 'zkSync Era',
        slug: 'zksync-era',
        category: 'ZK Rollup',
        provider: 'ZK Stack',
        warning:
          'Withdrawals are delayed by 1d. The length of the delay can be arbitrarily set by a MultiSig.',
        isArchived: undefined,
        isVerified: true,
        isUpcoming: undefined,
        stateValidation: {
          value: 'ZK proofs',
          description:
            'Uses PLONK zero-knowledge proof system with KZG commitments.',
          sentiment: 'good',
        },
        dataAvailability: {
          value: 'On chain (SD)',
          description:
            'All of the data (SD = state diffs) needed for proof construction is published on chain.',
          sentiment: 'good',
        },
        exitWindow: {
          value: 'Yes',
          description:
            'The code that secures the system can be changed arbitrarily and without notice by the governor, that currently is a 4 / 7 Multisig.',
          sentiment: 'bad',
        },
        sequencerFailure: {
          value: 'Transact using L1',
          description:
            'L2 transactions can be forced through L1 by adding them to append only queue on L1, which is processed sequentially by Sequencer, meaning that the individual user cannot be censored. At the moment there is no mechanism that forces L2 Sequencer to empty the L1 queue.',
          sentiment: 'warning',
        },
        proposerFailure: {
          value: 'No mechanism',
          description:
            'Only whitelisted validators can update the state on L1, so in the event of failure the withdrawals are blocked.',
          sentiment: 'bad',
        },
        stage: { stage: 'NotApplicable' },
      },
      {
        name: 'Metis Andromeda',
        slug: 'metis',
        category: 'Optimium',
        provider: 'OVM',
        warning:
          'Fraud proof system is currently under development. Users need to trust block Proposer to submit correct L1 state roots.       Since April 2022 the transaction data is no longer kept on-chain, instead it is kept in MEMO distributed data storage system.       The optimistic challenge mechanism that allows Validators to force Sequencer to post missing data is not fully implemented yet.',
        isArchived: undefined,
        isVerified: true,
        isUpcoming: undefined,
        stateValidation: {
          value: 'In development',
          description:
            'Currently the system permits invalid state roots. More details in project overview.',
          sentiment: 'bad',
        },
        dataAvailability: {
          value: 'Optimistic (MEMO)',
          description:
            'Transaction data is kept in MEMO decentralized storage. Validators can force Sequencer to make data available on-chain via L1 contract call if they find that Sequencer did not push tx data to MEMO.     Challenge mechanism is not yet fully implemented.',
          sentiment: 'warning',
        },
        exitWindow: {
          value: 'Yes',
          description:
            'The code that secures the system can be changed arbitrarily and without notice.',
          sentiment: 'bad',
          secondLine: 'by private MSig',
          secondSentiment: 'bad',
        },
        sequencerFailure: {
          value: 'Transact using L1',
          description:
            'The user is able to submit a transaction through L1 and force its inclusion on L2.',
          sentiment: 'good',
        },
        proposerFailure: {
          value: 'No mechanism',
          description:
            'If the whitelisted validator goes down, withdrawals cannot be processed. Users can still transact on L2.',
          sentiment: 'bad',
        },
        stage: { stage: 'NotApplicable' },
      },
      {
        name: 'Loopring',
        slug: 'loopring',
        category: 'ZK Rollup',
        provider: undefined,
        warning: undefined,
        isArchived: undefined,
        isVerified: true,
        isUpcoming: undefined,
        stateValidation: {
          value: 'ZK proofs (SN)',
          description:
            'ZK-SNARKS are zero knowledge proofs that ensure state correctness, but require trusted setup.',
          sentiment: 'good',
        },
        dataAvailability: {
          value: 'On chain',
          description:
            'All of the data needed for proof construction is published on chain.',
          secondLine: 'Transactions',
          sentiment: 'good',
        },
        exitWindow: {
          value: 'Yes',
          description:
            'The code that secures the system can be changed arbitrarily and without notice.',
          sentiment: 'bad',
          secondLine: 'by private MSig',
          secondSentiment: 'bad',
        },
        sequencerFailure: {
          value: 'Force exit to L1',
          description:
            'The user is only able to submit an L1 withdrawal request and force the sequencer to include it on L2. After that the user exits the system with their funds.',
          sentiment: 'good',
        },
        proposerFailure: {
          value: 'Escape hatch (MP)',
          description:
            'Users are able to trustlessly exit by submitting a merkle proof of funds.',
          sentiment: 'good',
        },
        stage: { stage: 'NotApplicable' },
      },
      {
        name: 'Immutable X',
        slug: 'immutablex',
        category: 'Validium',
        provider: 'StarkEx',
        warning: undefined,
        isArchived: undefined,
        isVerified: true,
        isUpcoming: undefined,
        stateValidation: {
          value: 'ZK proofs (ST)',
          description:
            'ZK-STARKS are zero knowledge proofs that ensure state correctness.',
          sentiment: 'good',
        },
        dataAvailability: {
          value: 'External (DAC)',
          description:
            'Proof construction relies fully on data that is NOT published on chain. There exists a data availability committee (DAC) that is tasked with protecting and supplying the data.',
          sentiment: 'warning',
        },
        exitWindow: {
          value: '14d delay',
          description:
            'The code that secures the system can be changed arbitrarily but users have some time to react.',
          sentiment: 'warning',
        },
        sequencerFailure: {
          value: 'Force exit to L1',
          description:
            'The user can force the sequencer to include their withdrawal transaction by submitting a request through L1. If the sequencer is down, the user can use the exit hatch to withdraw funds.',
          sentiment: 'good',
        },
        proposerFailure: {
          value: 'Escape hatch (MP)',
          description:
            'Users are able to trustlessly exit by submitting a merkle proof of their assets. NFTs will be minted on L1 on exit.',
          sentiment: 'good',
        },
        stage: { stage: 'NotApplicable' },
      },
    ],
  },
  decorators: [
    (Story) => {
      useEffect(() => {
        configureTables()
        configureTabs()
        configureProjectFilters()
        configureOverflowWrappers()
      }, [])
      return <Story />
    },
  ],
  parameters: {
    chromatic: {
      modes: onlyDesktopModes,
    },
  },
} satisfies Meta<typeof ScalingRiskView>
export default meta

type Story = StoryObj<typeof ScalingRiskView>

export const Active: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByText('Active projects'), { delay: 25 })
  },
}

export const ActiveWithRollupsOnly: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByText('Active projects'), { delay: 25 })
    await userEvent.click(canvas.getByText('Show rollups only'))
  },
}

export const Archived: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByText('Archived projects'), { delay: 25 })
  },
}

export const ArchivedWithRollupsOnly: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByText('Archived projects'), { delay: 25 })
    await userEvent.click(canvas.getByText('Show rollups only'))
  },
}
