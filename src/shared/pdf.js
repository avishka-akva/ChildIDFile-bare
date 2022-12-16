import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { Asset } from "expo-asset";
import { manipulateAsync } from "expo-image-manipulator";
import { Platform } from "react-native";
import { requestPermissionsAsync, createAssetAsync } from "expo-media-library";

const pdfLogo = Asset.fromModule(require("../assets/pdfLogo.png"));

const generateHtml = async ({
  firstName,
  lastName,
  nickName,
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
  const logo = await manipulateAsync(pdfLogo.localUri ?? pdfLogo.uri, [], {
    base64: true,
  });

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
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-size: 16px;
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
          background-color: #FFFFFF;
          color: #FFFFFF;
          margin-right: 2px;
          border-radius: 5px;
        }
        .header-title {
          color: "#434343";
          font-size: 28px;  
        }
        section {
          margin-top: 40px;
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
        .user-image {
          width: 20%;
          margin-right: 20px;
          border: 1px solid #707070;
        }
        .name {
          font-size: 26px;
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
      </style>
    </head>
  `;

  return `
<html>
  ${head}
  <body>
    <header>
      <img src="data:image/jpeg;base64,${logo.base64}" class="logo"/>
      <h1 class="header-title">ChildID App</h1>
    </header>
    <main>
      <section>
        <div class="main-details">
          <img src="data:image/jpeg;base64,${image1}" class="user-image"/>
          <img src="data:image/jpeg;base64,${image2}" class="user-image"/>
          <div style="margin-left: 10px;">
            <p class="name">${firstName} ${lastName} (${nickName})</p>
            <p class="other-details">1997/12/05</p>
            <p class="other-details">${address}, ${city}, ${province}, ${country}</p>
            <p class="other-details">Zip code: ${postalCode}</p>
          </div>
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
              <p class="p-des">${characteristicOptions.join(", ")}</p>
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
      <section>
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
        <img src="data:image/jpeg;base64,${fingerPrint}" class="fingerprints-image content-mt"/>
      </section>
    </main>
  </body>
</html>
  `;
};

let generatePdf = async (props) => {
  try {
    const html = await generateHtml(props);

    const file = await printToFileAsync({
      html: html,
      base64: false,
      width: 794,
      height: 1123,
    });
    await shareAsync(file.uri, { UTI: ".pdf", mimeType: "application/pdf" });

    // const { uri } = await printToFileAsync({
    //   html,
    //   base64: false,
    //   height: 842,
    //   width: 595,
    // });
    // if (Platform.OS === "ios") {
    //   await shareAsync(file.uri, { UTI: ".pdf", mimeType: "application/pdf" });
    // } else {
    //   const permission = await requestPermissionsAsync();
    //   if (permission.granted) {
    //     await createAssetAsync(uri);
    //   }
    // }
  } catch (error) {
    console.error("🚀 ~ file: pdf.js:343 ~ generatePdf ~ error", error);
  }
};

export default generatePdf;
