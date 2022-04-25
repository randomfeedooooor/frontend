import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'

import oracleAbi from '~/abi/oracle.json'

export function useOracleContract() {
  return useContract({
    abi: oracleAbi as Abi,
    address: '0x039d1bb4904cef28755c59f081cc88a576ecdf42240fb73dd44ddd003848ce33',
  })
}
