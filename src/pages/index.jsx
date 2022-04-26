import { useStarknetCall, useStarknetTransactionManager } from '@starknet-react/core'
import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import { toBN } from 'starknet/dist/utils/number'
import { ConnectWallet } from '~/components/ConnectWallet'
import { IncrementCounter } from '~/components/IncrementCounter'
import { TransactionList } from '~/components/TransactionList'
import { useCounterContract } from '~/hooks/counter'
import { useOracleContract } from '~/hooks/oracle'
import { bigNumberishArrayToDecimalStringArray } from 'starknet/dist/utils/number'
import styles from '../styles/Home.module.css'

import Card from '@mui/material/Card';
import { Paper } from '@mui/material'
import 'css-doodle'
import { Html } from 'next/document'

const Home = () => {

  const { contract: counter } = useCounterContract()
  const { contract: oracleContract } = useOracleContract()
  const [randomColor, setRandomColor] = useState()
  const [randomGrid, setRandomGrid] = useState()


  // boilerplate 
  // const { data: counterResult } = useStarknetCall({
  //   contract: counter,
  //   method: 'counter',
  //   args: [],
  // })

  // const counterValue = useMemo(() => {
  //   if (counterResult && counterResult.length > 0) {
  //     const value = toBN(counterResult[0])
  //     return value.toString(10)
  //   }
  // }, [counterResult])

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
      console.log('value: ', value);
      const hex = value[0].toString(16);
      console.log('hex: ', hex);

      const six = `0x${hex.substring(0, 6)}`
      console.log('six: ', six);
      setRandomColor(six);
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

        <h1 className={styles.title}
          style={{
            font: 'roboto',
            position: 'static',
            color: "white"
          }}>
          <div>Welcome to</div>
          <div>Random Feed-ooooo-r</div>
        </h1>

        {/* 
        3 to 20 for @grid
        left border color
        top border color 
        shape 3 to 5 random 
        
        S and L both from 40 to 100 
      */}
      <css-doodle click-to-update>
        {`
      :doodle {
        @grid: 7 / 100vmax;
        background: #0a0c27;
      }
      @shape: clover 5;
      background: hsla(
        calc(360 - @i * 4), 40%, 40%, @r.9
      );
      transform:
        scale(@r(.2, 1.5))
        translate(@m1.@r(±50%));
      transition: @r(5s) ease;
          `
      }
      </css-doodle>

        <div style={{
          position: "fixed",
          top: '40%',
          display: "flex",
          flexDirection: "column",

        }}>

          <Paper elevation={3} style={{
            marginBottom: "4%",
            backgroundColor: "black"
          }}>
            <h2
              style={{
                paddingLeft: "4%",
                color: "white"
              }}
            >Random Seed</h2>
            <p style={{
              paddingLeft: "4%",
              paddingRight: "4%",
              color: "white"
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
            }}>Past Seeds</h2>
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
