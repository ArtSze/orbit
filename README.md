# Orbit

Orbit is a browser-based Euclidean sequencer built by [Artur Szerejko](https://github.com/ArtSze).

[Live Link](https://orbit.recurse.com/)

## Project Details

The app was built with React, Tone.js, TypeScript, and Material-UI.

There are two modes available: 'tonal', which uses three triangle-wave oscillators with controllable pitch, and 'percussive' which features drum samples.

Orbit features a mixer containing faders that correspond to each voice's level as well as the levels for chorus and reverb effects.

Programmed sequences can be downloaded as MIDI files, allowing you to import them into your DAW of choice, e.g. Logic Pro, Ableton, Pro Tools, Bitwig.

## Installation

In order to run this application locally:

1. Clone the repository to your local machine.

```shell
git clone git@github.com:ArtSze/orbit.git
cd orbit
```

2. Install the dependencies with `yarn`.

```shell
 yarn install
```

3. Start the client server.

```shell
yarn start
```

<a href='http://www.recurse.com' title='Made with love at the Recurse Center'><img src='https://cloud.githubusercontent.com/assets/2883345/11325206/336ea5f4-9150-11e5-9e90-d86ad31993d8.png' height='20px'/></a>
