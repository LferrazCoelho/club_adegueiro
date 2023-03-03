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
    
    // const listCategory = [
    //     {value: "cerveja", name: "Cervejas"},
    //     {value: "destilado", name: "Destiladas"},
    //     {value: "vinho", name: "Vinhos"},
    //     {value: "refrigerante", name: "Refrigerantes"},
    //     {value: "suco", name: "Sucos"},
    //     {value: "agua", name: "Agua"},
    // ]

    // const listAvalit = [
    //     {name: "maylane gomes", star: "5", avalit: "O melhor atendimento e bebida gelada"},
    //     {name: "isasangaleti", star: "5", avalit: "Cerveja gelada, variedade de produtos e atendimento top!"},
    //     {name: "simplesegostoso Kyo", star: "5", avalit: "Atendimento muito bom, pra adultos e adultos com crianças. Dono e donas muito amigáveis e gentis. Vale muito a compra lá."},
    //     {name: "Pedro Rauber Luna", star: "5", avalit: "Cerveja super gelada , atendimento excelente!!"},
    //     {name: "Bruna Lucas", star: "5", avalit: "A distribuidora com cerveja mais gelada pelo Guará 2"},
    //     {name: "Lucas Leonam Lima da Silva", star: "5", avalit: "Excelente atendimento ! Muito completo ! Tá de parabéns !!!"},
    // ]

    return {
        props: {
            gtm: "GTM-XXXXXXXX",
            listProduts: dataProduts.filterSheetProdut,
            listOperation: dataOperation,
            listCategory: dataCategory,
            listAvalit: dataAvalit,
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