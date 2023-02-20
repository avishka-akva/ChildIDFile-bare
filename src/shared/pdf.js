import { printToFileAsync, printAsync, Orientation } from "expo-print";
import { shareAsync } from "expo-sharing";
import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import { CHARACTERISTICS_OPTIONS } from "./const";
import {
  INDEX_LEFT,
  INDEX_RIGHT,
  LITTEL_LEFT,
  LITTEL_RIGHT,
  LOGO,
  MIDDEL_LEFT,
  MIDDEL_RIGHT,
  RING_LEFT,
  RING_RIGHT,
  THUMB_LEFT,
  THUMB_RIGHT,
} from "./fingerprints";
import { getExactAge } from "./date";
// import { Asset } from "expo-asset";
// import * as ImageManipulator from "expo-image-manipulator";
// import exampleImage from "../../assets/pdfLogo.png";
// import { StorageAccessFramework } from "expo-file-system";

const fingers = [
  { name: "Thumb Finger", leftFinger: THUMB_LEFT, rightFinger: THUMB_RIGHT },
  { name: "Index Finger", leftFinger: INDEX_LEFT, rightFinger: INDEX_RIGHT },
  { name: "Middle Finger", leftFinger: MIDDEL_LEFT, rightFinger: MIDDEL_RIGHT },
  { name: "Ring Finger", leftFinger: RING_LEFT, rightFinger: RING_RIGHT },
  { name: "Little Finger", leftFinger: LITTEL_LEFT, rightFinger: LITTEL_RIGHT },
];

const generateHtml = async ({
  firstName,
  lastName,
  nickName,
  dob,
  address,
  city,
  province,
  country,
  postalCode,
  gender,
  race,
  hairColor,
  eyeColor,
  height,
  weight,
  characteristicOptions,
  specialNeeds,
  otherCharacteristic,
  image1,
  image2,
  emergencyContacts,
  trustedContacts,
  physicianName,
  physicianOffice,
  bloodType,
  allergies,
  medications,
  fingerPrint,
}) => {
  try {
    // not working in prod
    // const exampleImageUri = Image.resolveAssetSource(exampleImage).uri;

    // const exampleImageUri = Image.resolveAssetSource(exampleImage).uri;
    // const base64 = await StorageAccessFramework.readAsStringAsync(exampleImageUri, { encoding: 'base64' });

    // not working in prod
    // const asset = require("../../assets/pdfLogo.png");
    // await Asset.loadAsync(asset);
    // const pdfLogo = Asset.fromModule(asset);

    // not working in prod
    // const [{ localUri }] = await Asset.loadAsync(
    //   require("../../assets/pdfLogo.png")
    // );

    // not working in prod
    // const asset = require("../../assets/pdfLogo.png");
    // const localSrc = await copyFromAssets(asset);
    // let src = await processLocalImage(localSrc);

    // const asset = Asset.fromModule(require("../../assets/logo.png"));
    // const image = await manipulateAsync(asset.localUri ?? asset.uri, [], {
    //   base64: true,
    // });

    // ToastAndroid.showWithGravity(src, ToastAndroid.SHORT, ToastAndroid.CENTER);

    // pdfLogo.localUri ?? pdfLogo.uri
    // exampleImageUri
    // let logoImage = `<img src="data:image/jpeg;base64,${image.base64}" class="logo" alt="Logo"/>`;
    // let logoImage = `<img src="${src}" class="logo" alt="Logo"/>`;
    // let logoImage = `<img src="${exampleImageUri}" class="logo" alt="Logo"/>`;

    // if (Platform.OS === "ios") {
    //   const logo = await ImageManipulator.manipulateAsync(
    //     pdfLogo.localUri ?? pdfLogo.uri,
    //     [],
    //     {
    //       base64: true,
    //     }
    //   );

    //   logoImage = `<img src="data:image/jpeg;base64,${logo.base64}" class="logo"/>`;
    // }

    const characteristic = characteristicOptions.map(
      (option) =>
        CHARACTERISTICS_OPTIONS.find((item) => {
          return item.id === option;
        }).name
    );

    const getEmergencyContactTable = () => {
      let body = `
      <table class="content-mt">
        <thead>
          <tr>
            <th style="width:150px;">Name</th>
            <th style="width:150px;">Relationship</th>
            <th style="width:200px;">Primary Phone Number</th>
            <th style="width:220px;">Secondary Phone Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
    `;
      for (let i = 0; i < emergencyContacts.length; i++) {
        const element = emergencyContacts[i];
        body += `
      <tr>
        <td>${element.name}</td>
        <td>${element.relationship}</td>
        <td>${element.primaryPhoneNumber}</td>
        <td>${element.secondaryPhoneNumber}</td>
        <td>${element.address}</td>
      </tr>
      `;
      }

      body += `
        </tbody>
      <table>
    `;
      return body;
    };

    const getTrustedContactTable = () => {
      let body = `
      <table class="content-mt">
        <thead>
          <tr>
            <th style="width:150px;">Name</th>
            <th style="width:150px;">Relationship</th>
            <th style="width:200px;">Primary Phone Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
    `;
      for (let i = 0; i < trustedContacts.length; i++) {
        const element = trustedContacts[i];
        body += `
      <tr>
        <td>${element.name}</td>
        <td>${element.relationship}</td>
        <td>${element.primaryPhoneNumber}</td>
        <td>${element.address}</td>
      </tr>
      `;
      }
      body += `
        </tbody>
      <table>
    `;
      return body;
    };

    let contactMargingTop = "";

    if (Platform.OS === "ios" && trustedContacts.length > 1) {
      contactMargingTop = "margin-top: 200px;";
    }

    const head = `
  <head>
    <meta charset="utf-8" />
    <title>My Birth Letter</title>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0"
    />
    <style type="text/css">
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;600;700&family=Sofia+Sans:wght@100&display=swap');

        @page {
          margin: 24px;
        }
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-size: 16px;
        }
        body
        {
          font-family: 'Inter', sans-serif !important;
        }
        header {
          padding-bottom: 20px;
          padding-top: 0px;
          border-bottom: 1px solid #B9B9B9;
        }
        .logo {
          width: 21px;
          height: auto;
          background-color: #FFFFFF;
          color: #FFFFFF;
          margin-left: 10px;
          padding: 0 !important;
        }
        .header-title {
          font-weight: 600;
          font-size: 28px;
          line-height: 107.85%;
          text-align: center;
          letter-spacing: -0.06em;
          color: #434343;  
          margin-bottom: 6px;
        }
        .header-sub-title {
          font-weight: 400;
          font-size: 20px;
          line-height: 107.85%;
          text-align: center;
          letter-spacing: -0.06em;
          color: #434343;
        }
        section {
          margin-top: 12px;
        }
        .page-break {
          -webkit-column-break-inside: avoid;
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .emerrgecy-contact {
          ${contactMargingTop}
        }
        .sub-title {
          font-size: 24px;
          font-weight: 300;
          color: #FFFFFF;
          padding: 10px;
          background: #D3B3F0;
        }
        .main-details {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .user-image-container {
          display: flex !important;
          justify-content: flex-end !important;
          align-items: center !important;
          width: 100%;
        }
        .user-image {
          width: 45%;
          margin-left: 20px;
          border: 1px solid #707070;
        }
        .name {
          font-size: 28px;
          margin-bottom: 10px;
        }
        .other-details {
          font-size: 22px;
          margin-bottom: 10px;
        }
        .row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .column {
          flex: 1;
          align-self: stretch;
        }
        .main-card {
          border: 0.5px solid #B9B9B9;
        }
        .main-card-content {
          padding: 10;
        }
        table {
          border-collapse: collapse;
          width: 100%;
          border: 1px solid #ddd;
        }  
        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        td {
          vertical-align: top;
        }
        th {
          background-color: #EFEFEF;
          font-weight: normal;
          color: #434343;
        }
        .fingerprints-image {
          width: 80%;
        }
        .content-mt {
          margin-top: 10px;
        }
        .sub-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-right: 15px;
        }
        .sr-w-1 {
          width: 135px;
        }
        .sr-w-2 {
          width: 170px;
        }
        .sr-w-3 {
          width: 180px;
        }
        .sr-mb {
          margin-bottom: 15px;
        }
        .p-des {
          line-height: 18px; 
        }

        .dash-box {
          width: 40%;
          height: 175px;
          border-radius: 10px;
          border: 2px dashed #A352EB;
          margin-left: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .dash-box > p {
          margin: 20px;
          text-align: center;
          color: #434343;
        }

        .main {
          width: 95%;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
          flex-wrap: wrap;
          row-gap: 40px;
          margin-top: 40px;
          background: #FFFFFF;
        }
        .card {
          border-radius: 18px;
          background: #FFFFFF;
          box-shadow: 0 3px 6px #C8C8C8; 
          width: 30%;
          padding: 18px;
        }
        .box-title {
          text-align: center;
          color: "#000000";
          font-size: 16px;
          font-weight: normal;
        }
        .dash-box-container {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
        }
        .dash-box-item {
          width: 65px;
          height: 75px;
          border-radius: 10px;
          border: 2px dashed #A352EB;
        }
        .finger-side {
          text-align: center;
          color: "#9C9C9C";
          font-size: 14px;
          margin-bottom: 5px;
        }
        .left-finger {
          width: 38px;
          height: 38px;
          margin-right: 10px;
        }
        .right-finger {
          width: 38px;
          height: 38px;
          transform: scaleX(-1);
        }
        .footer {
          margin-top: 35px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .footer > label {
          font-weight: 500;
          font-size: 18px;
          line-height: 15px;
          letter-spacing: -0.06em;
          color: #000000;
        }
      </style>
    </head>
  `;
    return `
<html>
  ${head}
  <body>
    <header>
      <h1 class="header-title">${firstName} ${lastName}</h1>
      <h2 class="header-sub-title">${getExactAge(dob)} years old</h2>
    </header>
    <main>
      <section  class="row">
        <div class="column main-card">
          <h2 class="sub-title">Personal Information</h2>
          <div class="main-card-content">
            <div class="row content-mt sr-mb">
              <div class="sub-row sr-w-1">
                <label>Name</label> <lable>:</lable> 
              </div>
              <div>
                <label>${firstName} ${lastName}${
      nickName ? ` (${nickName})` : ""
    }</label>
              </div>
            </div>
            <div class="row content-mt sr-mb">
              <div class="sub-row sr-w-1">
                <label>Birthday</label> <lable>:</lable> 
              </div>
              <div>
                <label>${dob}</label>
              </div>
            </div>
            <div class="row content-mt sr-mb">
              <div class="sub-row sr-w-1">
                <label>Address</label> <lable>:</lable> 
              </div>
              <div>
                <label>${address}, ${city}, ${province}, ${country}</label>
              </div>
            </div>
            <div class="row content-mt sr-mb">
              <div class="sub-row sr-w-1">
                <label>Zip Code</label> <lable>:</lable> 
              </div>
              <div>
                <label>${postalCode}</label>
              </div>
            </div>
          </div>
        </div>

        <div class="column user-image-container">
          ${
            image1
              ? `<img src="data:image/jpeg;base64,${image1}" class="user-image"/>`
              : `<div class="dash-box"><p>Paste your child's photo here</p></div>`
          }
          ${
            image2
              ? `<img src="data:image/jpeg;base64,${image2}" class="user-image"/>`
              : `<div class="dash-box"><p>Paste your child's photo here</p></div>`
          }
        </div>
      </section>
      <section class="row">
        <div class="column main-card">
          <h2 class="sub-title">Physical Characteristics</h2>
          <div class="main-card-content">
            <div class="row content-mt sr-mb">
              <div class="sub-row sr-w-1">
                <label>Gender</label> <lable>:</lable> 
              </div>
              <div>
                <label>${gender}</label>
              </div>
            </div>
            <div class="row sr-mb">
              <div class="sub-row sr-w-1">
                <label>Race/Ethnicity</label> <lable>:</lable> 
              </div>
              <div>
                <label>${race}</label>
              </div>
            </div>
            <div class="row sr-mb">
              <div class="sub-row sr-w-1">
                <label>Hair Color</label> <lable>:</lable> 
              </div>
              <div>
                <label>${hairColor}</label>
              </div>
            </div>
            <div class="row sr-mb">
              <div class="sub-row sr-w-1">
                <label>Eye Color</label> <lable>:</lable> 
              </div>
              <div>
                <label>${eyeColor}</label>
              </div>
            </div>
            <div class="row sr-mb">
              <div class="sub-row sr-w-1">
                <label>Height</label> <lable>:</lable> 
              </div>
              <div>
                <label>${height}</label>
              </div>
            </div>
            <div class="row sr-mb">
              <div class="sub-row sr-w-1">
                <label>Weight</label> <lable>:</lable> 
              </div>
              <div>
                <label>${weight}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="column main-card" style="margin-left: 2px;">
          <h2 class="sub-title">Distinguishing Characteristics</h2>
          <div class="main-card-content">
            <div class="row content-mt sr-mb">
              <div  class="sub-row sr-w-3">
                <label>My child wears or has</label> <lable>:</lable> 
              </div>
              <div style="flex:1;">
                <p class="p-des">${characteristic.join(", ")}</p>
              </div>
            </div>
            <div class="row sr-mb">
              <div class="sub-row sr-w-1">
                <label>Special Needs</label> <lable>:</lable> 
              </div>
              <div style="flex:1;">
                <p class="p-des">${specialNeeds}</p>
              </div>
            </div>
            <div class="row sr-mb">
              <div class="sub-row sr-w-1">
                <label>Others</label> <lable>:</lable> 
              </div>
              <div style="flex:1;">
                <p class="p-des">${otherCharacteristic}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h2 class="sub-title">Emergency Contact Information</h2>
        ${getEmergencyContactTable()}
      </section>

      <section class="page-break emerrgecy-contact">
        <h2 class="sub-title">Trusted Contact Information</h2>
        ${getTrustedContactTable()}
      </section>
      
      <section class="page-break">
        <h2 class="sub-title">Medical Information</h2>
        <div class="row content-mt sr-mb">
          <div class="sub-row sr-w-2">
            <label>Physician's Name</label>
            <lable>:</lable> 
          </div>
          <div style="flex:1;"><p class="p-des">${physicianName}</p></div>
        </div>
        <div class="row sr-mb">
          <div class="sub-row sr-w-2">
            <label>Clinic Name</label><lable>:</lable> 
          </div>
          <div style="flex:1;"><p class="p-des">${physicianOffice}</p></div>
        </div>
        <div class="row sr-mb">
          <div class="sub-row sr-w-2">
            <label>Blood Type</label><lable>:</lable> 
          </div>
          <div style="flex:1;"><p class="p-des">${bloodType}</p></div>
        </div>
        <div class="row sr-mb">
          <div class="sub-row sr-w-2">
            <label>Allergies/Conditions</label><lable>:</lable> 
          </div>
          <div style="flex:1;"><p class="p-des">${allergies}</p></div>
        </div>
        <div class="row sr-mb">
          <div class="sub-row sr-w-2">
            <label>Medications</label><lable>:</lable> 
          </div>
          <div style="flex:1;"><p class="p-des">${medications}</p></div>
        </div>
      </section>

      <section class="page-break">
        <h2 class="sub-title">Fingerprints</h2>
        ${
          fingerPrint
            ? `<img src="data:image/jpeg;base64,${fingerPrint}" class="fingerprints-image content-mt"/>`
            : `<div class="main">
                ${fingers
                  .map(
                    (finger) =>
                      `<div class="card">
                        <h3 class="box-title">${finger.name}</h3>
                        <div class="dash-box-container">
                          <div>
                            <p class="finger-side">L</p>
                            <div class="dash-box-item"></div>
                          </div>
                          <div style="padding-top: 20px;">
                          </div>
                          <div>
                            <p class="finger-side">R</p>
                            <div class="dash-box-item"></div>
                          </div>
                        </div>
                      </div>`
                  )
                  .join(" ")}
              </div>`
        }
      </section>

      <section class="footer">
        <label>Created by ChildIDFile </label>
        ${LOGO}
      </section>
    </main>
  </body>
</html>
  `;
  } catch (error) {
    throw error;
  }
};

const genarateFingerHtml = async () => {
  const head = `
  <head>
    <meta charset="utf-8" />
    <title>My Birth Letter</title>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0"
    />
    <style type="text/css">
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;600;700&family=Sofia+Sans:wght@100&display=swap');

        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-size: 16px;
        }
        body
        {
          font-family: 'Inter', sans-serif !important;
          background: #FFFFFF;
        }
        main {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
          flex-wrap: wrap;
          row-gap: 40px;
          margin-top: 40px;
          background: #FFFFFF;
        }
        h1 {
          color: "#434343";
          font-size: 18px;
          margin-bottom: 6px;
          font-weight: normal;
        }
        .des {
          color: "#000000";
          font-size: 14px;
        }
        .card {
          border-radius: 18px;
          background: #FFFFFF;
          border: 1px solid #C8C8C8;
          width: 420px;
          padding: 18px;
        }
        .box-title {
          text-align: center;
          color: "#000000";
          font-size: 16px;
          font-weight: normal;
        }
        .dash-box-container {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
        }
        .dash-box-item {
        }
        .dash-box {
          width: 92px;
          height: 104px;
          border-radius: 10px;
          border: 2px dashed #A352EB;
          margin-bottom: 5px;
        }
        .finger-side {
          text-align: center;
          color: "#9C9C9C";
          font-size: 14px;
          margin-bottom: 5px;
        }
        .left-finger {
          width: 64px;
          height: 64px;
          margin-right: 10px;
        }
        .right-finger {
          width: 64px;
          height: 64px;
          transform: scaleX(-1);
        }
      </style>
    </head>
  `;

  return `
  <html>
    ${head}
    <body>
      <header>
        <h1>Fingerprints</h1>
        <p class="des">Please print this document, use an ink pad and place your child's finger print in the relevant boxes. Then scan the 
        document and upload back to the application.</p>
        </header>
      <main>
        ${fingers
          .map(
            (finger) =>
              `<div class="card">
                <h3 class="box-title">${finger.name}</h3>
                <div class="dash-box-container">
                  <div class="dash-box-item">
                    <p class="finger-side">L</p>
                    <div class="dash-box"></div>
                  </div>
                  <div style="padding-top: 20px;">
                    ${finger.leftFinger}
                    ${finger.rightFinger}
                  </div>
                  <div class="dash-box-item">
                    <p class="finger-side">R</p>
                    <div class="dash-box"></div>
                  </div>
                </div>
              </div>`
          )
          .join(" ")}
      </main>
    </body>
  </html>
  `;
};

let generatePdf = async (type = "main", props, share = false) => {
  try {
    let html;

    let PDF_NAME = "childId.pdf";

    switch (type) {
      case "main":
        html = await generateHtml(props);
        PDF_NAME = `${props.firstName}_${props.lastName}_${new Date()
          .toJSON()
          .slice(0, 10)
          .replace(/-/g, "_")}.pdf`;
        break;
      case "finger":
        PDF_NAME = "finger_print.pdf";
        html = await genarateFingerHtml();
        break;
      default:
        html = await generateHtml(props);
        break;
    }

    let FilePrintOptions = { html: html, base64: false };
    if (Platform.OS === "ios") {
      FilePrintOptions.margins = {
        left: 20,
        top: 20,
        right: 20,
        bottom: 20,
      };
      if (type === "finger") {
        FilePrintOptions.height = 794;
        FilePrintOptions.width = 1123;
      } else {
        FilePrintOptions.width = 794;
        FilePrintOptions.height = 1123;
      }
    } else {
      if (type === "finger") {
        FilePrintOptions.orientation = Orientation.landscape;
      } else {
        FilePrintOptions.width = 794;
        FilePrintOptions.height = 1123;
      }
    }

    if (share || Platform.OS === "ios") {
      const file = await printToFileAsync(FilePrintOptions);
      let newURI = FileSystem.cacheDirectory + PDF_NAME;
      newURI = newURI.replace(/ +/g, "_");
      await FileSystem.moveAsync({
        from: file.uri,
        to: newURI,
      });
      await shareAsync(newURI, { UTI: ".pdf", mimeType: "application/pdf" });
    } else {
      const file = await printAsync(FilePrintOptions);
      // const downloadDir =
      //   StorageAccessFramework.getUriForDirectoryInRoot("Download");
      // const permission =
      //   await StorageAccessFramework.requestDirectoryPermissionsAsync(
      //     downloadDir
      //   );

      // if (!permission.granted) {
      //   return false;
      // }

      // const destinationUri = await StorageAccessFramework.createFileAsync(
      //   permission.directoryUri,
      //   PDF_NAME,
      //   "application/pdf"
      // );

      // const content = await StorageAccessFramework.readAsStringAsync(file.uri, {
      //   encoding: FileSystem.EncodingType.Base64,
      // });

      // await StorageAccessFramework.writeAsStringAsync(destinationUri, content, {
      //   encoding: FileSystem.EncodingType.Base64,
      // });

      // let newFolder = permission.directoryUri.split("Download");
      // newFolder = newFolder[1].substring(3);

      // ToastAndroid.showWithGravity(
      //   `Saved to Download/${newFolder} folder`,
      //   ToastAndroid.SHORT,
      //   ToastAndroid.CENTER
      // );
    }
  } catch (error) {
    console.log("🚀 ~ file: pdf.js:911 ~ generatePdf ~ error", error);
    alert(error.message);
  }
};

export default generatePdf;
