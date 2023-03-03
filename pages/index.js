import ClubV1 from "../screens/ClubV1";

export async function getServerSideProps() {
    const dataProduts = await fetch(`https://adegueiro.club/api/sheetsProduts`)
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
    })
    .then((res) => {
        return res
    })

    const dataOperation = await fetch(`https://adegueiro.club/api/sheetsOperation`)
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
    })
    .then((res) => {
        return res
    })

    const dataCategory = await fetch(`https://adegueiro.club/api/sheetsCategory`)
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
    })
    .then((res) => {
        return res
    })

    const dataAvalit = await fetch(`https://adegueiro.club/api/sheetsAvalit`)
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
    })
    .then((res) => {
        return res
    })

    return {
        props: {
            gtm: "GTM-XXXXXXXX",
            listProduts: dataProduts.filterSheetProdut,
            listOperation: dataOperation,
            listCategory: dataCategory.dataSheetsCategory,
            listAvalit: dataAvalit.dataSheetsAvalit,
            pastaLogo: "lievi",
            logo: "logo-mult",
            titlePage: "Adegueiro Delivery",
            numberZap: 5561999186122,
            atacado: true,
            colorHead: "#343434",
            colorBody: "#ffffff",
            colorBodyItem: "#ffffff",
            colorBodyBar: "#343434",
            colorTitle: "#000",
            colorText: "#fff",
            colorButton: "#365685",
        }
    }
}

export default ClubV1;