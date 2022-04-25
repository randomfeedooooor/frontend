import { useStarknet, useStarknetInvoke } from '@starknet-react/core'
import React from 'react'
import { useOracleContract } from '~/hooks/oracle'

export function RandomOracle() {
  const { account } = useStarknet()
  const { contract: oracle } = useOracleContract()
  const { invoke } = useStarknetInvoke({ contract: oracle, method: 'get_value' })

  if (!account) {
    return null
  }

  return (
    <div>
      <button onClick={() => invoke({ args: ['491260896305'] })}>Get Random Seed</button>
    </div>
  )
}
