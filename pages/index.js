import ClubV1 from "../screens/ClubV1";

export async function getServerSideProps() {
    const dataProduts = await fetch(`http://localhost:3000/api/sheetsProduts`)
    // const dataProduts = await fetch(`https://club-adegueiro.vercel.app/api/sheets`)
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
    })
    .then((res) => {
        return res
    })

    const dataOperation = await fetch(`http://localhost:3000/api/sheetsOperation`)
    // const dataOperation = await fetch(`https://club-adegueiro.vercel.app/api/sheetsOperation`)
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
    })
    .then((res) => {
        return res
    })

    const listCategory = [
        {value: "cerveja", name: "Cervejas"},
        {value: "whisky", name: "Whiskys"},
        {value: "vodka", name: "Vodkas"},
        {value: "gin", name: "Gins"},
        {value: "cigarros", name: "Tabacos"},
        {value: "refrigerante", name: "Refrigerantes"},
        {value: "suco", name: "Sucos"},
        {value: "diversos", name: "Diversos"}
    ]

    return {
        props: {
            gtm: "GTM-XXXXXXXX",
            listProduts: dataProduts.filterSheetProdut,
            listOperation: dataOperation,
            listCategory: listCategory,
            pastaLogo: "lievi",
            logo: "logo-mult",
            titlePage: "LIEVI Fitness",
            numberZap: 5532998306328,
            atacado: true,
            colorHead: "#292626",
            colorBody: "#121111",
            colorBodyItem: "#292626",
            colorBodyBar: "#292626",
            colorTitle: "#fff",
            colorText: "#fff",
            colorButton: "#365685",
        }
    }
}

export default ClubV1;