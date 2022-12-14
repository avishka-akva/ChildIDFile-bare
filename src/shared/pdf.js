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

  const getEmergencyContactTableBody = () => {
    let body = "";
    for (let i = 0; i < emergencyContacts.length; i++) {
      const element = emergencyContacts[i];
      body += `
      <tr>
        <td>${element.name}</td>
        <td>${element.relationship}</td>
        <td>${element.cell}</td>
        <td>${element.home}</td>
        <td>${element.address}</td>
      </tr>
      `;
    }
    return body;
  };

  const getTrustedContactTableBody = () => {
    let body = "";
    for (let i = 0; i < trustedContacts.length; i++) {
      const element = trustedContacts[i];
      body += `
      <tr>
        <td>${element.name}</td>
        <td>${element.name}</td>
        <td>${element.contactNumber}</td>
        <td>${element.contactNumber}</td>
        <td>${element.address}</td>
      </tr>
      `;
    }
    return body;
  };

  return `
<html>
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
      }
      header {
        padding: 30px;
        padding-top: 0px;
        border-bottom: 1px solid #707070;
        display: flex;
        justify-content: center;
	      align-items: center;
      }
      .logo {
        width: 50px;
        background-color: #FFFFFF;
        color: #FFFFFF;
        margin-right: 20px;
      }
      .header-title {
        color: "#434343";
        font-size: 32px;  
      }
      section {
        margin-top: 40px;
        break-inside: avoid;
      }
      .sub-title {
        font-size: 24px;
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
        width: 160px;
        margin-right: 20px;
        border: 1px solid #707070;
      }
      .name {
        font-size: 28px;  
      }
      .other-details {
        font-size: 24px;  
      }
      .row {
        display: flex;
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
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }
      th {
        background-color: #EFEFEF;
        color: #434343;
      }
      .fingerprints-image {
        width: 60%;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <header>
        <img src="data:image/jpeg;base64,${logo.base64}" class="logo"/>
        <h1 class="">ChildID App</h1>
    </header>
    <main>
      <section>
        <div class="main-details">
        <img src="data:image/jpeg;base64,${image1}" class="user-image"/>
        <img src="data:image/jpeg;base64,${image2}" class="user-image"/>
        <div>
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
          <div class="row">
            <div>
              <label>Gender</label> <lable>:</lable> 
            </div>
            <div>
              <label>Male</label>
            </div>
          </div>
          <div class="row">
            <div>
              <label>Race/Ethnicity</label> <lable>:</lable> 
            </div>
            <div>
              <label>Male</label>
            </div>
          </div>
          <div class="row">
            <div>
              <label>Hair Color</label> <lable>:</lable> 
            </div>
            <div>
              <label>Male</label>
            </div>
          </div>
          <div class="row">
            <div>
              <label>Eye Color</label> <lable>:</lable> 
            </div>
            <div>
              <label>Male</label>
            </div>
          </div>
          <div><label>Height</label> : <label>12 Lorem</label></div>
          <div><label>Weight</label> : <label>12 Lorem</label></div>
        </div>
        <div class="column">
          <h2 class="sub-title">Distinguishing Characteristics</h2>
          <div class="row">
            <div>
              <label>My child wears or has</label> <lable>:</lable> 
            </div>
            <div style="flex:1;">
              <label>Glasses, Glasses, Glasses</label>
            </div>
          </div>
          <div class="row">
            <div>
              <label>Special Needs</label> <lable>:</lable> 
            </div>
            <div style="flex:1;">
              <label>Lorem ipsum dolor sit amet, elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</label>
            </div>
          </div>
          <div class="row">
            <div>
              <label>Others</label> <lable>:</lable> 
            </div>
            <div style="flex:1;">
              <label>Lorem ipsum dolor sit amet, elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</label>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h2 class="sub-title">Emergency Contact Information</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Relationship</th>
              <th>Primary Phone Number</th>
              <th>Secondary Phone Number</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            ${getEmergencyContactTableBody()}
          </tbody>
        </table>
      </section>

      <section>
        <h2 class="sub-title">Trusted Contact Information</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Relationship</th>
              <th>Primary Phone Number</th>
              <th>Secondary Phone Number</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            ${getTrustedContactTableBody()}
          </tbody>
        </table>
      </section>
      
      <section>
        <h2 class="sub-title">Medical Information</h2>
        <div>
          <div>
            <label>Physician's Name</label>
            <lable>:</lable> 
          </div>
          <div><label>${physicianName}</label></div>
        </div>
        <div>
          <div>
            <label>Clinic Name</label>
            <lable>:</lable> 
          </div>
          <div><label>${physicianOffice}</label></div>
        </div>
        <div>
          <div>
            <label>Blood Type</label>
            <lable>:</lable> 
          </div>
          <div><label>${bloodType}</label></div>
        </div>
        <div>
          <div>
            <label>Allergies/Conditions</label>
            <lable>:</lable> 
          </div>
          <div><label>${allergies}</label></div>
        </div>
        <div>
          <div>
            <label>Medications</label>
            <lable>:</lable> 
          </div>
          <div><label>${medications}</label></div>
        </div>
      </section>

      <section>
        <h2 class="sub-title">Fingerprints</h2>
        <img src="data:image/jpeg;base64,${fingerPrint}" class="fingerprints-image"/>
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
      height: 842,
      width: 595,
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
