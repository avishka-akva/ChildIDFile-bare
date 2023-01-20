import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { Platform, ToastAndroid } from "react-native";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";
import { CHARACTERISTICS_OPTIONS } from "./const";
import {
  INDEX_LEFT,
  INDEX_RIGHT,
  LITTEL_LEFT,
  LITTEL_RIGHT,
  MIDDEL_LEFT,
  MIDDEL_RIGHT,
  RING_LEFT,
  RING_RIGHT,
  THUMB_LEFT,
  THUMB_RIGHT,
} from "./fingerprints";
// import { Asset } from "expo-asset";
// import * as ImageManipulator from "expo-image-manipulator";
// import exampleImage from "../../assets/pdfLogo.png";

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
            <th style="width:220px;">Secondary Phone Number</th>
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

    const head = `
  <head>
    <meta charset="utf-8" />
    <title>My Birth Letter</title>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0"
    />
    <style type="text/css">
        @import url('https://fonts.googleapis.com/css2?family=Sofia+Sans:wght@100;400&display=swap');

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
          font-family: 'Sofia Sans', sans-serif !important;
        }
        header {
          padding: 30px;
          padding-top: 0px;
          border-bottom: 1px solid #707070;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #FFFFFF;
        }
        .logo {
          width: 50px;
          height: auto;
          background-color: #FFFFFF;
          color: #FFFFFF;
          margin-right: 15px;
          padding: 0 !important;
        }
        .header-title {
          color: "#434343";
          font-size: 28px;  
        }
        section {
          margin-top: 20px;
          -webkit-column-break-inside: avoid;
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .page-break {
          break-inside: avoid;
        }
        .sub-title {
          font-size: 20px;
          font-weight: 300;
          color: #000000;
          padding: 10px;
          background: linear-gradient(90deg, rgba(211,179,240,1) 50%, rgba(255,255,255,1) 80%);
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
          width: 40%;
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
        }
        .column {
          flex: 1;
          align-self: stretch;
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
          width: 60%;
        }
        .content-mt {
          margin-top: 20px;
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
      </style>
    </head>
  `;
    return `
<html>
  ${head}
  <body>
    <header>
    <svg class="logo" width="121" height="92" viewBox="0 0 121 92" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <rect width="121" height="92" rx="10" fill="url(#pattern0)"/>
    <defs>
    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
    <use xlink:href="#image0_1_3" transform="translate(-0.0578512 -0.0751812) scale(0.00688705 0.00905797)"/>
    </pattern>
      <image 
        id="image0_1_3" 
        width="162" 
        height="127" 
        xlink:href="data:image/png;base64,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"
      />
    </defs>
    </svg>
      <h1 class="header-title">ChildID App</h1>
    </header>
    <main>
      <section  class="row">
          <div class="column">
            <h2 class="sub-title">Personal Information</h2>

            <div class="row content-mt sr-mb">
              <div class="sub-row sr-w-1">
                <label>Name</label> <lable>:</lable> 
              </div>
              <div>
                <label>${firstName} ${lastName} (${nickName})</label>
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
        <div class="column">
          <h2 class="sub-title">Physical Characteristics</h2>
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
        <div class="column">
          <h2 class="sub-title">Distinguishing Characteristics</h2>
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
      </section>
      <section class="page-break">
        <h2 class="sub-title">Emergency Contact Information</h2>
        ${getEmergencyContactTable()}
      </section>

      <section class="page-break">
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
                            ${finger.leftFinger}
                            ${finger.rightFinger}
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
        @import url('https://fonts.googleapis.com/css2?family=Sofia+Sans:wght@100;400&display=swap');

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
          font-family: 'Sofia Sans', sans-serif !important;
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
        }
        .dash-box {
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

    let FilePrintOptions = {};

    if (Platform.OS === "ios") {
      FilePrintOptions = {
        html: html,
        base64: false,
        margins: {
          left: 20,
          top: 20,
          right: 20,
          bottom: 20,
        },
      };
    } else {
      FilePrintOptions = {
        html: html,
        base64: false,
        width: 794,
        height: type === "finger" ? 400 : 1123,
      };
    }

    const file = await printToFileAsync(FilePrintOptions);

    if (share) {
      const newURI = FileSystem.cacheDirectory + PDF_NAME;
      await FileSystem.moveAsync({
        from: file.uri,
        to: newURI,
      });
      await shareAsync(newURI, { UTI: ".pdf", mimeType: "application/pdf" });
    } else {
      if (Platform.OS === "ios") {
        const newURI = FileSystem.cacheDirectory + PDF_NAME;
        await FileSystem.moveAsync({
          from: file.uri,
          to: newURI,
        });

        await shareAsync(newURI, {
          UTI: ".pdf",
          mimeType: "application/pdf",
        });
      } else {
        const downloadDir =
          StorageAccessFramework.getUriForDirectoryInRoot("Download");
        const permission =
          await StorageAccessFramework.requestDirectoryPermissionsAsync(
            downloadDir
          );

        if (!permission.granted) {
          return false;
        }

        const destinationUri = await StorageAccessFramework.createFileAsync(
          permission.directoryUri,
          PDF_NAME,
          "application/pdf"
        );

        const content = await StorageAccessFramework.readAsStringAsync(
          file.uri,
          {
            encoding: FileSystem.EncodingType.Base64,
          }
        );

        await StorageAccessFramework.writeAsStringAsync(
          destinationUri,
          content,
          {
            encoding: FileSystem.EncodingType.Base64,
          }
        );

        let newFolder = permission.directoryUri.split("Download");
        newFolder = newFolder[1].substring(3);

        ToastAndroid.showWithGravity(
          `Saved to Download/${newFolder} folder`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
    }
  } catch (error) {
    alert(error.message);
  }
};

export default generatePdf;
