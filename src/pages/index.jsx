import { useStarknetCall } from '@starknet-react/core'
import Head from 'next/head'
import { useMemo } from 'react'
import { useOracleContract } from '~/hooks/oracle'
import { bigNumberishArrayToDecimalStringArray } from 'starknet/dist/utils/number'
import styles from '../styles/Home.module.css'
import { Paper } from '@mui/material'
import 'css-doodle'

const Home = () => {
  const { contract: oracleContract } = useOracleContract()
  const { data: oracleResult } = useStarknetCall({
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
      return value[0];
    }
  }, [oracleResult])


  return (
    <div className={styles.container}>
      <Head>
        <title>randomfeedooooor</title>
        <meta name="description" content="generates random seeds for starknet"></meta>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}
          style={{
            // font: 'roboto',
            // position: 'static',
            color: "white"
          }}>
          <div>Welcome to</div>
          <div>randomfeedooooor</div>
        </h1>
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
          <Paper elevation={3} style={{marginBottom: "2em", padding: "1em"}}>
            <h2>Current random value</h2>
            <p>{randomNumber}</p>
          </Paper>
          <Paper elevation={3} style={{marginBottom: "2em", padding: "1em"}}>
            <h2>Oracle Contract</h2>
            <p>{oracleContract?.address}</p>
          </Paper>
        </div>
      </main>
    </div>
  )
}

export default Home
