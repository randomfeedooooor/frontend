import { useStarknetCall, useStarknetTransactionManager } from '@starknet-react/core'
import Head from 'next/head'
import type { NextPage } from 'next'
import { useEffect, useMemo, useState } from 'react'
import { toBN } from 'starknet/dist/utils/number'
import { ConnectWallet } from '~/components/ConnectWallet'
import { IncrementCounter } from '~/components/IncrementCounter'
import { TransactionList } from '~/components/TransactionList'
import { useCounterContract } from '~/hooks/counter'
import { useOracleContract } from '~/hooks/oracle'
import { bigNumberishArrayToDecimalStringArray } from 'starknet/dist/utils/number'
import styles from '../styles/Home.module.css'

import 'tailwindcss/tailwind.css'
import Card from '@mui/material/Card';
import { Paper } from '@mui/material'

const Home: NextPage = () => {

  const { contract: counter } = useCounterContract()
  const { contract: oracleContract } = useOracleContract()

  // boilerplate 
  const { data: counterResult } = useStarknetCall({
    contract: counter,
    method: 'counter',
    args: [],
  })

  const counterValue = useMemo(() => {
    if (counterResult && counterResult.length > 0) {
      const value = toBN(counterResult[0])
      return value.toString(10)
    }
  }, [counterResult])

  // get random value 
  const { data: oracleResult, error } = useStarknetCall({
    contract: oracleContract,
    method: 'get_value',
    args: [
      "491260896305"
    ],
  })

  const randomNumber = useMemo(() => {
    if (oracleResult !== undefined) {
      const value = bigNumberishArrayToDecimalStringArray(oracleResult);
      return value[0];
    }
  }, [oracleResult])


  return (
    <div className={styles.container}>
      <Head>
        <title>Random Feed-ooooo-r</title>
        <meta name="description" content="generates random seeds for starknet"></meta>
      </Head>
      <main className={styles.main}>
        <canvas>


        </canvas>
        <h1 className={styles.title}>
          <div>Welcome to</div>
          <div>Random Feed-ooooo-r</div>
        </h1>

        <div style={{
          display: "flex",
          flexDirection: "column",

        }}>
          <Paper style={{
            marginTop: "4%",
            marginBottom: "4%"
          }}>
            <div>
              <h2 style={{
                paddingLeft: "4%"
              }}>Wallet</h2>

                <ConnectWallet/>



            </div>

          </Paper>

          <Paper elevation={3} style={{
            marginBottom: "4%"
          }}>
            <h2
              style={{
                paddingLeft: "4%"
                
              }}
            >Random Seed</h2>
            <p style={{
              paddingLeft: "4%",
              paddingRight: "4%"
            }}>{randomNumber}</p>

          </Paper>


          <Paper elevation={3} style={{
            marginBottom: "4%"
          }}>
            <h2 style={{
              paddingLeft: "4%"
            }}>Oracle Contract</h2>
            <p>Address: {oracleContract?.address}</p>
          </Paper>

          <Paper elevation={3}>
            <h2 style={{
              paddingLeft: "4%"
            }}>Recent Transactions</h2>
            <TransactionList />
          </Paper>
          <div>

          </div>
        </div>



      </main>

    </div>
  )
}

export default Home
