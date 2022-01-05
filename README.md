# audio library

This library can be used to interact with balena's [audio block](https://github.com/balenablocks/audio) to manipulate it's behavior at runtime.
The library connects to the PulseAudio server running on the audio block and exposes the most common use cases with an easy to use interface.

## Installation

Install by running:
```
npm install balena-audio
```

## Usage

```ts
import BalenaAudio from 'balena-audio'

const audioBlock: BalenaAudio = new BalenaAudio(process.env.PULSE_SERVER || '192.168.90.166:4317')

audioBlock.setVolume(75)

audioBlock.on('play', async (sink: Sink) => {
	console.log('Playing audio on sink:', sink.name)
})

audioBlock.on('stop', async (sink: Sink) => {
	console.log('Audio has stopped playing on sink:', sink.name)
})
```

## Class BalenaAudio

### APIs
**BalenaAudio**
```ts
BalenaAudio(pulseServerAddress: string)
```

`pulseServerAddress` is the PulseAudio server address to connect to. The following formats are accepted:
- TCP socket: `tcp:<hostname>:<port>` or `<hostname>:<port>`
- UNIX socket: `unix:/run/pulse/pulseaudio.socket`

**listen**
```ts
audioBlock.listen()
```

Initiates a connection to the audio block. If the server is unreachable it will keep on trying until a connection succeeds or 10 minutes go by. 
This method needs to be called before calling any other method.


**setVolume**
```ts
audioBlock.setVolume(volume: number, sink?: string | number)
```

Sets the target sink's volume.

- `volume` is desired volume in percentage (0-100).
- (optional) `sink` is the sink to set the volume on, by it's PulseAudio sink name (`alsa_output.usb-soundcard-1.analog-stereo`) or index (`0`). If not specified the default sink will be used.

**getVolume**
```ts
audioBlock.getVolume(volume: number)
```

Gets the target sink's volume. Returns the result as a percentage (0-100).
- (optional) `sink` is the sink to set the volume on, by it's PulseAudio sink name (`alsa_output.usb-soundcard-1.analog-stereo`) or index (`0`). If not specified the default sink will be used.

### Events

**play/stop**

When the audio block starts or stops playing a sound on any sink, `play` or `stop` events are emitted. You can listen to them and attach callbacks to perform your own actions. A good use case for this is for example to turn on or off an external DAC that consumes a lot of power if always kept on.

```ts
audioBlock.on('play', async (sink: Sink) => {
	console.log('Playing audio on sink:', sink.name)
})

audioBlock.on('stop', async (sink: Sink) => {
	console.log('Audio has stopped playing on sink:', sink.name)
})
```
