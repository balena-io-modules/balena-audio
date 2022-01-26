import BalenaAudio from '../lib/index'
const { PULSE_SERVER } = process.env

if (!PULSE_SERVER) {
	throw new Error('PULSE_SERVER is not defined')
}

async function main () {

  // Connect to audio block server
  let client = new BalenaAudio(PULSE_SERVER)
  console.log(await client.listen())

  // Set volume to 100%
  await client.setVolume(35)
  console.log(await client.getVolume())
  await client.setVolume(75)
	// wait for 5 seconds
	await new Promise(resolve => setTimeout(resolve, 5000))
  console.log(await client.getVolume())
}


main()
