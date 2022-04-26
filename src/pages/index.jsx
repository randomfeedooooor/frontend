import { useStarknetCall } from '@starknet-react/core'
import Head from 'next/head'
import { useMemo, useState } from 'react'
import { useOracleContract } from '~/hooks/oracle'
import { bigNumberishArrayToDecimalStringArray } from 'starknet/dist/utils/number'
import styles from '../styles/Home.module.css'
import { Paper } from '@mui/material'
import 'css-doodle'
import ReactDOM from 'react-dom';

const Home = () => {

  // const doodle = useRef(null); 

  // const doodle = this.refs.doodle; 
  // const doodle = document.querySelector('css-doodle'); 

  const [ randomGrid, setRandomGrid ] = useState(7) 
  const [ randomClover, setRandomClover ] = useState(5) 
  const [ randomHue, setRandomHue ] = useState(180)

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

      // between 7 and 20 
      setRandomGrid(Math.floor(Math.random()*8 + 7));
      console.log('grid: ', randomGrid); 
      setRandomClover(Math.floor(Math.random()*2 + 3)); 
      console.log('clover: ', randomClover); 
      setRandomHue(Math.floor(Math.random()*360 + 40));
      console.log('hue: ', randomHue); 

      // doodle.current.update(`
      // :doodle {
      //   @grid: ${randomGrid} / 100vmax;
      //   background: #0a0c27;
      // }
      // @shape: clover ${randomClover};
      // background: hsla(
      //   calc(${randomHue} - @i * 4), 40%, 40%, @r.9
      // );
      // transform:
      //   scale(@r(.2, 1.5))
      //   translate(@m1.@r(±50%));
      // transition: @r(5s) ease;    
      // `)

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
        <css-doodle>
          {`
      :doodle {
        @grid: ${randomGrid} / 100vmax;
        background: #0a0c27;
      }
      @shape: clover ${randomClover};
      background: hsla(
        calc(${randomHue} - @i * 4), 40%, 40%, @r.9
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

          {/* <div>
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
          </div> */}

        </div>
      </main>
    </div>
  )
}

export default Home
