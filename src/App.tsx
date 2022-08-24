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

  window.addEventListener('selectstart', (e) => {
    e.preventDefault()
  })

  let interval: any

  useEffect(() => {
    clearInterval(interval)
    interval = setInterval(() => {
      setCount((c) => c + upgrades.filter((u) => u.name === 'Grandma').length) // 2 cps
      setCount((c) => c + upgrades.filter((u) => u.name === 'Farm').length * 2) // 4 cps
      setCount(
        (c) => c + upgrades.filter((u) => u.name === 'Jitter').length * 4
      ) // 8 cps
      setCount(
        (c) => c + upgrades.filter((u) => u.name === 'Jona').length * 4 * 1.75
      ) // 14 cps
      setCount(
        (c) =>
          c +
          upgrades.filter((u) => u.name === 'Autoclicker').length * 4 * 1.75 * 2
      ) // 28 cps
      setCount(
        (c) =>
          c +
          upgrades.filter((u) => u.name === 'OP Autoclicker').length *
            4 *
            1.75 *
            2 *
            2
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
      name: 'Autoclicker',
      description: 'Autoclickers are the best. Average cps is 28!',
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
