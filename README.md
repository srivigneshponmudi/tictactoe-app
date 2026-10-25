# Tic Tac Toe

A two-player Tic-Tac-Toe game for Android. It runs in Expo Go. There is no server, database, or online account.

Two people share one phone. X goes first. Tap a square to place a mark. The game announces a winner or a draw. **Restart Game** clears the board and starts again with X.

This project uses Expo SDK 57 because that is the SDK the Expo Go app on Android phones supports while Expo SDK 58 is rolling out.

## Files

| File | What it does |
| --- | --- |
| `App.tsx` | The whole game: the board, turns, winner and draw checks, and the restart button. |
| `index.ts` | The starting point. It tells Expo to open `App`. |
| `package.json` | The app name, the libraries it needs, and the commands you can run. |
| `tsconfig.json` | TypeScript settings. It reuses Expo's recommended settings. |
| `app.json` | Expo settings: the name shown on the phone and the Android package name. |
| `.gitignore` | Tells Git to skip installed libraries, build folders, and secret files. |

## What you need first

Install these on your laptop if you do not already have them:

1. [Node.js LTS](https://nodejs.org/) — this includes `npm`, which installs the libraries.
2. [Git](https://git-scm.com/download/win) — this tracks your code and uploads it to GitHub.
3. The **Expo Go** app from the Google Play Store on your Android phone.

Close and reopen the terminal after installing Node.js or Git so the new commands are found.

## Install and start

In this project folder, run:

```powershell
npm install
npm start
```

`npm install` downloads the libraries into a `node_modules` folder. That folder is large and is not saved in Git.

`npm start` starts the Expo development server and shows a QR code in the terminal.

To check TypeScript without starting the app:

```powershell
npm run typecheck
```

## Test on your Android phone

1. Connect the phone and the laptop to the **same Wi-Fi network**. Guest networks and public Wi-Fi often block phones from talking to laptops. A normal home network is the easiest choice.
2. Turn off any VPN on the phone and the laptop.
3. On the laptop, run `npm start` in this folder.
4. Open **Expo Go** on the phone.
5. In Expo Go, tap **Scan QR code** and scan the QR code shown in the terminal.
6. The game should open. Pass the phone between the two players.

You can also type the `exp://...` address from the terminal into Expo Go if the camera cannot scan the code.

## If the phone cannot connect

Try these in order:

1. Confirm both devices are on the same Wi-Fi, not mobile data, and that a VPN is off.
2. On Windows, allow Node.js through the firewall when Windows asks. If you previously blocked it, open **Windows Security → Firewall → Allow an app** and allow **Node.js** on private networks.
3. Restart the server and clear its cache:

   ```powershell
   npx expo start --clear
   ```

4. Some routers isolate devices from each other. If the QR code still fails, start a tunnel instead. This sends the connection through Expo's servers and is slower, but it works across stricter networks:

   ```powershell
   npx expo start --tunnel
   ```

   Scan the new QR code. The first time, Expo may ask to install a small helper for the tunnel. That helper is only for this connection. It is not part of the game.
5. Update **Expo Go** from the Play Store. This project is SDK 57. An Expo Go build that only supports a different SDK will refuse to open it.
6. If the app shows a red error about a missing package, stop the server and run `npm install` again, then `npm start`.

## Save the project on GitHub

These commands are for you to run. Nothing here creates a GitHub repository or uploads code by itself.

GitHub will ask you to sign in in the browser. Do not paste passwords, tokens, or keys into any file in this project.

### 1. Create the first local commit

```powershell
git init
git add .
git commit -m "Add a two-player Tic-Tac-Toe app."
```

`git init` starts version control in this folder. `git add .` stages the project files. `git commit` saves that snapshot on your computer. `node_modules` stays out because `.gitignore` excludes it.

### 2. Create a GitHub repository and upload it

Install [GitHub CLI](https://cli.github.com/) if you want the short version, then sign in once with `gh auth login`. From this folder:

```powershell
gh repo create tic-tac-toe --public --source=. --remote=origin --push
```

That creates an empty GitHub repository, connects this folder to it, and uploads the commit.

Without GitHub CLI, create an empty repository named `tic-tac-toe` at [github.com/new](https://github.com/new). Do not add a README or `.gitignore` there, because this folder already has both. Then run:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/tic-tac-toe.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username. `git push` uploads the commit. Later changes are uploaded with `git add`, `git commit`, and `git push`.
