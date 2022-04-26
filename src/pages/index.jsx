import { useStarknetCall } from '@starknet-react/core'
import Head from 'next/head'
import { useMemo, useState } from 'react'
import { useOracleContract } from '~/hooks/oracle'
import { bigNumberishArrayToDecimalStringArray } from 'starknet/dist/utils/number'
import styles from '../styles/Home.module.css'
import { Paper } from '@mui/material'
import 'css-doodle'

const Home = () => {

  const [ previousSeeds, setPreviousSeeds ] = useState([]) 
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

      // update array
      setPreviousSeeds([...previousSeeds, value[0]])

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
        <h1 style={{
          font: 'roboto',
          color: "white"
        }}>
          <div>Welcome to</div>
        </h1>
        <h1 className={styles.title}
          style={{
            // font: 'roboto',
            // position: 'static',
            color: "white",
            zIndex: "1"
          }}>
          <div>random-feed-ooooo-r</div>
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
          justifyContent: "middle"
        }}>
          <div style={{
            justifyContent: "middle"
          }}>
          <h1 style={{
              color: "white",
              textAlign: "center"
            }}>Current Seed</h1>

            <h2 style={{
              wordWrap: "break-word",
              color: "white",
              textAlign: "center"
            }}>{randomNumber}</h2>
          </div>
            
          <div>
          <h1 style={{
              color: "white",
              textAlign: "center"
            }}>Oracle Contract</h1>
            <h2 style={{
              color: "white",
              textAlign: "center"
            }}>{oracleContract?.address}</h2>
          </div>

          <div>
            <h1 style={{
              color: "white",
              textAlign: "center"
            }}>Previous Seeds</h1>
            <p style={{
              color: "white",
              textAlign: "center"
            }}>{previousSeeds.map((item, i) => {
              return <h2 key={i}>{item}</h2>
            })}
            </p>
          </div>

        </div>
      </main>
    </div>
  )
}

export default Home
