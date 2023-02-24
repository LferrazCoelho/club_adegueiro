import ClubV1 from "../screens/ClubV1";

export async function getServerSideProps() {
    // const dataProduts = await fetch(`http://localhost:3000/api/sheetsProduts`)
    const dataProduts = await fetch(`https://club-adegueiro.vercel.app/api/sheetsProduts`)
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
    })
    .then((res) => {
        return res
    })

    // const dataOperation = await fetch(`http://localhost:3000/api/sheetsOperation`)
    const dataOperation = await fetch(`https://club-adegueiro.vercel.app/api/sheetsOperation`)
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
        {value: "destilado", name: "Destiladas"},
        {value: "vinho", name: "Vinhos"},
        {value: "refrigerante", name: "Refrigerantes"},
        {value: "suco", name: "Sucos"},
        {value: "agua", name: "Agua"},
        {value: "cigarros", name: "Tabacos"},
        {value: "salgado", name: "Salgados"},
        // {value: "whisky", name: "Whiskys"},
        // {value: "vodka", name: "Vodkas"},
        // {value: "gin", name: "Gins"},
        // {value: "diversos", name: "Diversos"}
    ]

    return {
        props: {
            gtm: "GTM-XXXXXXXX",
            listProduts: dataProduts.filterSheetProdut,
            listOperation: dataOperation,
            listCategory: listCategory,
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