<h2 align="center">Proffy Omnistack</h2>

___

<p align="center">
  <img src="https://ik.imagekit.io/vhx2sevqtq/logo_r4aB7pwiq.svg" width="300" heigth="300">
</p>


<p align="center">
  <a href="LICENSE">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-%23F8952D">
  </a>
</p>

___

<h3 align="center">
  <a href="#information_source-about">About</a>&nbsp;|&nbsp;
  <a href="#interrobang-reason">Reason</a>&nbsp;|&nbsp;
  <a href="#seedling-minimum-requirements">Requirements</a>&nbsp;|&nbsp;
  <a href="#rocket-technologies-used">Technologies</a>&nbsp;|&nbsp;
  <a href="#school_satchel-how-to-use">How to Use</a>&nbsp;|&nbsp;
  <a href="#link-how-to-contribute">How to Contribute</a>&nbsp;|&nbsp;
  <a href="#licença">License</a>
</h3>

___
<p align="center">
<img src="https://ik.imagekit.io/vhx2sevqtq/nlw_akx45EQyY.gif" width="1200">
</p>
<p align="center">
<img src="https://ik.imagekit.io/vhx2sevqtq/20200810_145048_xXAXrNBu7.gif" width="300">
</p>
<p align="center">
<img src="https://ik.imagekit.io/vhx2sevqtq/WhatsApp_Image_2020-08-10_at_14.56.47_iwNAEXI0K.jpeg" width="300">
</p>
<p align="center">
<img src="https://ik.imagekit.io/vhx2sevqtq/screenshot-localhost_3000-2020.08.10-14_31_51_Wmdc5pPa2.png" width="1200">
</p>

## :information_source: About

Proffy is your online study place, give your Whatsapp number so that students could find you or if you just want to study, no problem, search for teachers anytime you want.

## :interrobang: Reason

Connecting students and teachers is our mission, our challenge, and helping you is all we want.

## :seedling: Requisitos Mínimos

- NodeJS v12
- Yarn v1
- Expo (Install on Google Play or Apple Store)

## :rocket: Technologies Used

The project was developed using the following technologies

- Node (TypeScript)
- React (TypeScript)
- React Native (TypeScript)
- SQLite3
- Express

## :school_satchel: How to Use

1. Clone this repository
    ```bash
    $ git clone https://github.com/wejesuss/proffy-omnistack && cd proffy-omnistack
    # You can also download the zip in the repository page
    ```

2. Install Server Dependencies and Run
    ```bash
    $ cd server && yarn install
    # start the API
    $ yarn run dev
    ```

3. Install Web Dependencies and Run
    ```bash
    $ cd web && yarn install
    # start the website
    $ yarn start
    ```

4. Install the Mobile App Dependencies and Run
    ```bash
    $ cd mobile && yarn install
    # start the expo bundler
    $ yarn start
    ```
    
The server should be running on port `3333`, the console will print your IP address, make sure your mobile device and your PC are in the same network.

5. Change the IP address
    1. Open the `api.ts` file in `mobile\src\services\api.ts`
    2. Inline 4, change the `192.168.0.106` address to the IP address that the server printed to you

The website should be running on `http://localhost:3000/`.

Expo will open a page in the browser and you can read the QR Code with the Expo app you previously installed.

## :link: How to Contribute

- Fork this repostory

1. Using github CLI
    ```bash
    # You can also use the second option
    $ gh repo fork wejesuss/proffy-omnistack
    ```

2. Using the website
    1. You just need to click the 'Fork' button on the top of [this page](https://github.com/wejesuss/proffy-omnistack)

- Clone your fork
    ```bash
    $ git clone https://github.com/your-username/proffy-omnistack && cd proffy-omnistack
    # You can also download the zip in your repository page
    ```

- Create a branch with your changes
    ```bash
    $ git checkout -b my-awesome-changes
    ```

- Make the commit with your changes
    ```bash
    $ git commit -m 'fix: 42'
    ```

- Push your branch
    ```bash
    # Send the code to your remote branch
    $ git push origin my-awesome-changes
    ```

- Pull request

## Licença

This project is under the MIT license. See the [LICENSE](LICENSE) file.
