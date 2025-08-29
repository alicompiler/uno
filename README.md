# Uno Game

online game with multiple players, it has different versions of the [UnoGame](https://www.unorules.com/).

players can create a game and invites others, or can join a game.

## Start The Game

in the root directory run the following command:

```bash
./start-game.sh
```

## Features

- Create Game
- Join Game
- Invite Players
- Play Game
  - Start The Game
  - Play Card
  - Withdraw Card
  - Skip Playing
  - Set Timer For Turns
  - Display Result

## Tech Stack

- Client:
  - React
  - Tailwindcss
- Server:
  - NodeJS App

## Tech Details

### Communication

clients can communicate with the server using rest api and websocket.

the rest api is used for non-real time actions, for example creating a game or joining a game.

websocket is used for real time communication for example entering a game, or starting a game, or play a card and
other similar actions, most communication is done via websocket.

### Authentication & Authorization

we decided to keep authentication very simple for better user experience, users should be able to join games or create games without login.

that being said we still need to identify users, so the simple id was to generate unique uuid on the client side and send it when communicating with the server.

its not ideal solution but there is no risk if any of these uuid got compromised, so we decided to go with with the simplest solution.
in the future we might introduce login via google to have better authentication.

regarding authorization, any one can create game and any one can join a game, for now the only action that required authorized users only is **StartGame**, so in data for any game, we store a flag to indicate if a user is an **admin** in game.

the creator of the game is set as an admin for that game.
in future we might introduce other features than can be performed by admins only, for example kicking someone from a game.

### Where The Data Live

for the sack of the simplicity of the deployment and development, we decided to store all data in the memory.

but we designed the game to make it simple to change it later if we decided to store the data somewhere.

this will cause all data to be lost one restart but thats okay for us for now.

in the future we might store the data on the file system as json or binary files. using files will keep deployment simple no extra dependencies.

### Extensible Code

we built the game keeping in mind it should be easily extensible.

to add a new card behavior you can easily add new class to define the new behavior.

add new uno version? create a new factory for the new version, define the set of cards of the desired behaviors and thats it (of course some UI change are required for the create game page).

soon we will keep game settings more dynamic to allow creating different versions easier. also this can allow game admins to tweak the rules a little bit.

that being said, there are still few things to be improved to keep the code more extensible.

also good set of automated tests for the game logic is added, but we are planning to add tests for everything, it will help us be confident adding new features.

### UI Events

every game can have this set of events:

- Player Joined
- Player Disconnected
- Game Started
- Card Played
- Skip No Card
- Cards Withdrawal
- Withdraw Pile Reset
- Game Finished

## Game Lifecycle

1. Game Created
2. Players Join Game
3. Game Started
   - New players can't join the game anymore
   - Joined players can disconnected and reconnect again
4. Players Do Actions
   - Play a card
   - Withdraw card
   - Skip Turn (cards must be drawn before)
5. Withdraw Pile Reset
   - This can only happens when the withdraw pile becomes empty
   - The discard pile is taken except for the top card and shuffled to be used as withdraw pile
6. Game Finished
   - This will happen when a player discard all his own cards
7. Game Removed From The Memory
   - This will happen when all player leaves the game and disconnect
   - This can happen even if the game is not finished

## Game Algorithm

### Start Game

1. Shuffle withdraw pile
2. For each player
   1. Take top 7 cards from the withdraw pile
3. Take top card in the withdraw pile and move it to the discard pile
   1. If the top card is wild card, the color will be chosen randomly
   2. if the card has special effects (behaviors), it will not affect anyone
4. Select first player randomly
5. Set game is started

### Behaviors Algorithm

TODO:

## Contribution

Contributions are welcome

If you’d like to contribute, please follow these steps:

1. **Fork** the repository
2. **Create a new branch** for your feature or fix

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes and commit them with a clear message

   ```bash
   git commit -m "Add: description of feature or fix"
   ```

4. Push to your fork

   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a Pull Request to the main branch of this repository

   Please make sure your changes follow the existing code style and include tests if applicable.

If you’re not sure where to start, feel free to check the issues

## Next

- UI should work on screen size
- cancel playing wild card when the color modal is opened
- show players cards: low,mid,high
- Add sound effects
- Better events/messages when card is played (and active player changed)
- Reset game action
- Better error message
- Show alert after clicking on the invite button
- Game settings
- Leave game (before starting the game)
- Kick player (by admin)
- Set player as an admin (by admin)
- More Tests
- UI Improvements + Better Animations
- CI/CD Configuration
- Uno Design Studio
  - Design your own uno version
