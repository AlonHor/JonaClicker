import { useEffect, useState } from 'react'
import './App.css'
import jona from './assets/jona.png'

function App() {
  interface Upgrade {
    name: string
    description: string
    price: number
  }

  const [count, setCount] = useState<number>(0)
  const [upgrades, setUpgrades] = useState<Upgrade[]>([])
  const [prestige, setPrestige] = useState<number>(0)
  const [prestigeNeeded, setPrestigeNeeded] = useState<number>(10000000)

  useEffect(() => {
    setPrestige(
      localStorage.getItem('prestige')
        ? parseInt(localStorage.getItem('prestige') as string)
        : 0
    )
    setPrestigeNeeded(
      localStorage.getItem('prestigeNeeded')
        ? parseInt(localStorage.getItem('prestigeNeeded') as string)
        : 10000000
    )
    setUpgrades(JSON.parse(localStorage.getItem('upgrades') as string) || [])
    setCount(
      localStorage.getItem('count')
        ? parseInt(localStorage.getItem('count') as string)
        : 0
    )
  }, [])

  useEffect(() => {
    localStorage.setItem('count', count.toString())
    localStorage.setItem('prestige', prestige.toString())
    localStorage.setItem('prestigeNeeded', prestigeNeeded.toString())
    localStorage.setItem('upgrades', JSON.stringify(upgrades))

    if (count >= prestigeNeeded) {
      console.log(count)
      console.log(prestigeNeeded)
      setPrestige((p) => p + 1)
      setCount(0)
      setPrestigeNeeded((p) => p * prestigeMultiplier)
      setUpgrades([])
      window.location.reload()
    }
  }, [count, prestige, prestigeNeeded, upgrades])

  const prestigeMultiplier = 2

  window.addEventListener('selectstart', (e) => {
    e.preventDefault()
  })

  let interval: any

  useEffect(() => {
    clearInterval(interval)
    interval = setInterval(() => {
      const multiplier = prestige === 0 ? 1 : prestigeMultiplier * prestige
      setCount(
        (c) =>
          c + upgrades.filter((u) => u.name === 'Grandma').length * multiplier
      ) // 2 cps
      setCount(
        (c) =>
          c + upgrades.filter((u) => u.name === 'Farm').length * 2 * multiplier
      ) // 4 cps
      setCount(
        (c) =>
          c +
          upgrades.filter((u) => u.name === 'Jitter').length * 4 * multiplier
      ) // 8 cps
      setCount(
        (c) =>
          c +
          upgrades.filter((u) => u.name === 'Jona').length *
            4 *
            1.75 *
            multiplier
      ) // 14 cps
      setCount(
        (c) =>
          c +
          upgrades.filter((u) => u.name === 'Balls').length * 10 * multiplier
      ) // 20 cps
      setCount(
        (c) =>
          c +
          upgrades.filter((u) => u.name === 'Autoclicker').length *
            4 *
            1.75 *
            2 *
            multiplier
      ) // 28 cps
      setCount(
        (c) =>
          c +
          upgrades.filter((u) => u.name === 'OP Autoclicker').length *
            4 *
            1.75 *
            2 *
            2 *
            multiplier
      ) // 56 cps
    }, 500)
  }, [upgrades])

  const availableUpgrades: Upgrade[] = [
    {
      name: 'Grandma',
      description: "A grandma's average cps is 2!",
      price: 50,
    },
    {
      name: 'Farm',
      description: 'Farms MMC players for clicks. Average cps is 4!',
      price: 200,
    },
    {
      name: 'Jitter',
      description:
        'Jitter clicking can be quite good. But ur not good at it. Average cps is 8!',
      price: 1000,
    },
    {
      name: 'Jona',
      description: 'Jona can click faster than you can. Average cps is 14!',
      price: 10000,
    },
    {
      name: 'Balls',
      description:
        "It's a new clicking method invented by Jona himself. It can do around 20 cps!",
      price: 50000,
    },
    {
      name: 'Autoclicker',
      description: 'Autoclickers are the best. This one can click 28 cps!',
      price: 100000,
    },
    {
      name: 'OP Autoclicker',
      description: 'OP Autoclickers are even better! Average cps is 56!',
      price: 1000000,
    },
  ]

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>
        <img src={jona} alt="jona" width={200} />
      </button>
      <button
        style={{
          position: 'absolute',
          top: '0',
          right: '0',
          backgroundColor: 'red',
          color: 'white',
          marginTop: '1em',
          marginRight: '1em',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={() => {
          setCount(0)
          setPrestige(0)
          setPrestigeNeeded(10000000)
          setUpgrades([])
          window.location.reload()
        }}
      >
        RESET
      </button>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          textAlign: 'left',
          paddingLeft: '2em',
          fontSize: '1.2em',
        }}
      >
        <br />
        prestige: {prestige}
        <br />
        prestige needed: {prestigeNeeded}
        <br />
        prestige multiplier: {prestigeMultiplier}
        <br />
      </div>
      <br />
      <div>
        <h1>{count}</h1>
      </div>
      <div
        style={{
          overflowY: 'scroll',
          height: '50vh',
          width: '50vw',
          backgroundColor: 'rgb(63, 63, 63)',
        }}
        className="card"
      >
        {availableUpgrades.map((upgrade) => (
          <div key={upgrade.name}>
            <button
              onClick={() => {
                if (count >= upgrade.price) {
                  setUpgrades([
                    ...upgrades,
                    {
                      name: upgrade.name,
                      description: upgrade.description,
                      price: upgrade.price,
                    },
                  ])
                  setCount((c) => c - upgrade.price)
                }
              }}
              style={{ marginBottom: '10px' }}
              className="card"
              disabled={count < upgrade.price}
            >
              <h2>
                {upgrade.name}{' '}
                {upgrades.filter((u) => u.name === upgrade.name).length}
              </h2>
              <h4>{upgrade.description}</h4>
              <p>Cost: {upgrade.price} clicks</p>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
