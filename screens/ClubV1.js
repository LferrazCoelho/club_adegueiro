import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import TagManager from 'react-gtm-module';

function ClubV1({ gtm, listProduts, listOperation, listCategory, pastaLogo, logo, numberZap, titlePage, colorHead, colorBody, colorBodyItem, colorBodyBar, colorTitle, colorText, colorButton, atacado }) {

    const [dataProdut, setDataProdut] = useState(listProduts);
    const [dataOperation, setDbOperation] = useState(listOperation);
    const [filterProdut, setFilterProdut] = useState("cerveja");
    const [infoBD, setInfoBD] = useState(dataOperation.dataSheetsOperation[0]);

    const [modalProdut, setModalProdut] = useState(false);
    const [modalCart, setModalCart] = useState(false);
    const [modalAddCart, setModalAddCart] = useState(false);
    const [modalTableSize, setModalTableSize] = useState(false);
    const [modalContact, setModalContact] = useState(false);
    const [modalSendZap, setModalSendZap] = useState(false);
    const [modalTanks, setModalTanks] = useState(false);
    const [modalImgSelect, setModalImgSelect] = useState(false);
    const [fixedOn, setFixedOn] = useState("fixed");

    const [cardSelected, setCardSelected] = useState([]);
    const [itemCart, setItemCart] = useState([]);

    const [sizeP, setSizeP] = useState(0);
    const [sizeM, setSizeM] = useState(0);
    const [sizeG, setSizeG] = useState(0);
    const [sizeGG, setSizeGG] = useState(0);
    const [idColorSelect, setIdColorSelect] = useState("");
    const [nameColorSelect, setNameColorSelect] = useState("");

    const [descriptOn, setDescriptOn] = useState(false);
    const [especifOn, setEspecifOn] = useState(false);

    const [grupColor, setGrupColor] = useState("");
    const [arrayColor, setArrayColor] = useState([]);
    const [produtColor, setProdutColor] = useState([]);

    const [nameOrder, setNameOrder] = useState("");

    const [topFixed, setTopFixed] = useState("");
    
    const [alertInputSize, setAlertInputSize] = useState("border-gray-100");
    const [alertInputSizeTextOn, setAlertInputSizeTextOn] = useState(false);

    const countListCart = itemCart.length;

    useEffect(() => {
        setIdColorSelect(cardSelected.capa);
        setGrupColor(cardSelected.color);
    }, [modalProdut]);

    useEffect(() => {
        grupColor !== undefined && setArrayColor(grupColor.split(","));
    }, [grupColor]);

    // useEffect(() => {
    //     setProdutColor(arrayColor.map(id => dataColor.find(obj => obj.id == id) || {}))
    // }, [arrayColor]);

    useEffect(() => {
        for (var i = 0; i < produtColor.length; i++) {
            if (produtColor[i].id === idColorSelect) {
                setNameColorSelect(produtColor[i].name)
            }
        }
    }, [produtColor]);

    function openModalProdut(item) {
        setCardSelected(item);
        setModalProdut(true);
        setFixedOn("");
        setTopFixed("fixed top-0");
    };

    function openModalCart() {
        setModalCart(true)
        setFixedOn("")
        setTopFixed("fixed top-0")
    };

    function openModalAddCart() {
        if ( sizeP + sizeM + sizeG + sizeGG === 0) {
            alert("Por favor, escolha pelo menos uma opções de tamanho.");
            setAlertInputSize("border-2 border-red-300");
            setAlertInputSizeTextOn(true);
        } else {
            setModalAddCart(true)
            setAlertInputSize("border-gray-100");
            setAlertInputSizeTextOn(false);
        }
    };

    function AddCartAndSend() {
        if ( sizeP + sizeM + sizeG + sizeGG === 0) {
            alert("Por favor, escolha pelo menos uma opções de tamanho.");
            setAlertInputSize("border-2 border-red-300");
            setAlertInputSizeTextOn(true);
        } else {
            handleAddItemCart();
            setModalSendZap(true);
            setAlertInputSize("border-gray-100");
            setAlertInputSizeTextOn(false);
        }
    };

    function openModalSendZap() {
        setModalSendZap(true)
    };

    function openModalTableSize() {
        setModalTableSize(true)
    };

    function openModalContact() {
        setModalContact(true)
    };

    function openModalImgSelect() {
        setModalImgSelect(true)
    };

    function AddCartAndFixedProdut() {
        handleAddItemCart()
        setModalAddCart(false)
        setSizeP(0);
        setSizeM(0);
        setSizeG(0);
        setSizeGG(0);
        document.getElementById('sizeP').value = "";
        document.getElementById('sizeM').value = "";
        document.getElementById('sizeG').value = "";
        document.getElementById('sizeGG').value = "";
    };

    function AddCartAndExitProdut() {
        handleAddItemCart()
        setTopFixed("")
        setSizeP(0);
        setSizeM(0);
        setSizeG(0);
        setSizeGG(0);
        setModalAddCart(false)
        setModalProdut(false)
        setFixedOn("fixed")
    };

    function closeModalProdut() {
        setModalProdut(false)
        setFixedOn("fixed")
        setTopFixed("")
        setSizeP(0);
        setSizeM(0);
        setSizeG(0);
        setSizeGG(0);
        setIdColorSelect("")
        setAlertInputSize("border-gray-100");
        setAlertInputSizeTextOn(false);
    };

    function closeModalCart() {
        setModalCart(false)
        setFixedOn("fixed")
        setTopFixed("")
    };

    // function closeModalAddCart() {
    //     setModalAddCart(false)
    //     setFixedOn("fixed")
    //     setTopFixed("")
    //     setSizeP(0);
    //     setSizeM(0);
    //     setSizeG(0);
    //     setSizeGG(0);
    //     setIdColorSelect("")
    // };

    function closeModalSendZap() {
        setModalSendZap(false)
        //     setFixedOn("fixed")
        //     setTopFixed("")
        //     setSizeP(0);
        //     setSizeM(0);
        //     setSizeG(0);
        //     setSizeGG(0);
        //     setColorSelect("")
    };

    function closeModalTableSize() {
        setModalTableSize(false)
    };

    function closeModalImgSelect() {
        setModalImgSelect(false)
    };

    function closeModalContact() {
        setModalContact(false)
    };

    function completeOrder() {
        setModalSendZap(false)
        setModalCart(false)
        setModalProdut(false)
        setModalTanks(true)
    };

    function closeModalTanks() {
        setModalTanks(false)
        setFixedOn("fixed")
        setTopFixed("")
        // setItemCart([])
    };

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    function deleteItemCart(key) {
        const tempListCart = [...itemCart];
        tempListCart.splice(key, 1);
        setItemCart(tempListCart);
    };

    function moeda(number) {
        const formatado = number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return formatado;
    };


    const handleAddItemCart = () => {
        const refTemp = cardSelected.ref;
        const idTemp = idColorSelect;
        // const corTemp = nameColorSelect;

        const selectAddProdutColor = dataColor.filter(dataColor => dataColor.id === idTemp);
        console.log(selectAddProdutColor)

        const newItem = {
            ref: refTemp,
            id: idTemp,
            cor: selectAddProdutColor[0].name,
            img: idTemp,
            sizeP: parseFloat(sizeP),
            sizeM: parseFloat(sizeM),
            sizeG: parseFloat(sizeG),
            sizeGG: parseFloat(sizeGG),
            // value: parseFloat(cardSelected.price),
            value: (atacado === false) ? parseFloat(cardSelected.price) : parseFloat(cardSelected.priceatacado),
        };

        const newItems = [...itemCart, newItem];

        setItemCart(newItems);
    };
    
    function sendZap() {
        var headOrder = `Novo pedido Nº${Math.floor(Math.random() * 65536)} - ${nameOrder} \n`;
        var footerOrder = `\n ${nameOrder}, em alguns instantes montarei seu pedido!`;
        var bodyOrder = itemCart.map(function (item) {
            return `
REF: ${item.ref}-${item.id}
Cor: ${item.cor}
${(item.sizeP !== 0) ? `P - Quant: ${item.sizeP} \n` : ""}${(item.sizeM !== 0) ? `M - Quant: ${item.sizeM} \n` : ""}${(item.sizeG !== 0) ? `G - Quant: ${item.sizeG} \n` : ""}${(item.sizeGG !== 0) ? `GG - Quant: ${item.sizeGG}` : ""}
Valor Total: R$ ${moeda(item.value * (item.sizeP + item.sizeM + item.sizeG + item.sizeGG))} \n`;
        });
        headOrder = window.encodeURIComponent(headOrder);
        bodyOrder = window.encodeURIComponent(bodyOrder);
        footerOrder = window.encodeURIComponent(footerOrder);

        window.open("https://api.whatsapp.com/send?phone=" + numberZap + "&text=" + headOrder + bodyOrder + footerOrder, "_blank");
        setTimeout(function () { completeOrder(); }, 5000);
    }


    return (
        <>
            <Head>
                <title>{titlePage}</title>
                <link rel="icon" src={`/imgs/${logo}.png`} />
            </Head>

            <div className={`${topFixed} min-h-screen`} style={{ backgroundColor: colorBody }}>

                {/* Head Mobile */}
                <div className="md:hidden">
                    <div className="py-6 shadow-md" style={{ backgroundColor: colorHead }}>
                        <div className="flex justify-center items-center">
                            <img
                                className="object-cover w-2/5"
                                src={`/imgs/${logo}.png`}
                            />
                        </div>
                        <div className="flex justify-center items-center">
                            <p className="text-white pr-2">Loja está</p>
                            {( infoBD.operation === "on" ) ? 
                                <button className="bg-green-500 text-white px-2 py-1 rounded-lg">aberto</button>
                                :  
                                <button className="bg-red-500 text-white px-2 py-1 rounded"> fechada </button>
                            }
                        </div>
                    </div>
                </div>

                {/* Head Desktop */}
                <div className="hidden md:block">
                    <div className="py-6 px-12 shadow-md" style={{ backgroundColor: colorHead }}>
                        <div className="flex justify-between items-center">
                            <img
                                className="object-cover w-32 h-auto"
                                src={`/imgs/${logo}.png`}
                            />

                            <div className="flex justify-center items-center">
                                <div
                                    className="mx-4"
                                    onClick={() => openModalContact()}
                                >
                                    <img
                                        className="w-4 h-4"
                                        src={`/imgs/icons/icon-contact-white.png`}
                                    />
                                </div>
                                <div
                                    className="relative mx-4"
                                    onClick={() => openModalCart()}
                                >
                                    <img
                                        className="w-5 h-5"
                                        src={`/imgs/icons/icon-cart-white.png`}
                                    />
                                    {
                                        countListCart > 0 &&
                                        <div className="absolute bottom-2 -right-5 bg-red-500 rounded-full px-2">
                                            <p className="text-sm text-white">{countListCart}</p>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex overflow-x-auto md:justify-center py-4 px-2 lg:overflow-x-hidden">
                    <div className="flex flex-nowrap">
                        <p></p>
                        {dataProdut.map((item, key) =>
                            item.promo === "on" &&
                            <div className="rounded w-24 h-30 ml-3" key={key}>
                                <img
                                    className="rounded-lg object-cover object-top w-full h-28 md:rounded"
                                    src={`/imgs/produts/${item.ref}.jpg`}
                                    id="open-modal-img"
                                    onClick={() => openModalProdut(item)}
                                />
                                <div className="pt-1 pb-2">
                                    <p className="text-white text-centerx text-base font-medium border border-white rounded">
                                        {item.valuepromo}% OFF
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex md:justify-center px-4 py-4 overflow-x-auto" style={{ color: colorTitle }}>
                    <div className="flex justify-center items-center flex-nowrap">
                        {listCategory.map((item, key) =>
                            <p key={key}
                                className={`mx-2 text-sm${filterProdut === item.value && "text-base border border-white rounded-lg px-2 py-1"}`} onClick={() => setFilterProdut(item.value)}>
                                {item.name}
                            </p>
                        )}
                    </div>
                </div>

                <div className="">
                    <div className="grid grid-cols-1 md:grid-cols-4 mt-5 gap-4 px-4 lg:px-20 xl:p-18">
                        {dataProdut.map((item, key) =>
                            item.category === filterProdut &&
                            <div className="shadow-md rounded-lg flex relative"
                                style={{ backgroundColor: colorBodyItem }}
                                key={key}
                            >
                                <div 
                                    className="grid grid-cols-3 md:grid-cols-1"
                                    onClick={() => openModalProdut(item)}
                                >
                                    <div className="flex">
                                        <img
                                            className="rounded-l-lg object-cover w-32 h-36 md:rounded md:w-full md:h-96"
                                            src={`/imgs/produts/${item.ref}.jpg`}
                                            id="open-modal-img"
                                            onClick={() => openModalProdut(item)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 col-span-2 place-content-between p-4">
                                        <div className="flex w-full"
                                            onClick={() => openModalProdut(item)}>
                                            <h3 className="text-lg font-bold md:text-base"
                                                style={{ color: colorTitle }}>{item.produt}</h3>
                                        </div>
                                        <div className="w-full">
                                            <div className="flex justify-between items-center">
                                                <p className="text-lg" style={{ color: colorTitle }}>
                                                    R$ {item.valueCx}
                                                </p>
                                                <p className="text-base" style={{ color: colorTitle }}>
                                                    com {item.quant}
                                                </p>
                                                {/* {moeda(item.value * 1)} */}
                                                {/* {moeda(item.price * 1)} */}
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <p className="text-lg" style={{ color: colorTitle }}>
                                                R$ {item.valueUnd}
                                                </p>
                                                <p className="text-base" style={{ color: colorTitle }}>
                                                    a und
                                                </p>
                                                {/* {moeda(item.value * 1)} */}
                                                {/* {moeda(item.price * 1)} */}
                                            </div>
                                            {/* <button
                                                className="px-2 py-1 rounded-md text-sm text-white"
                                                onClick={() => openModalProdut(item)}
                                                id="btn-cta-home"
                                                style={{ backgroundColor: colorButton }}
                                            >
                                                ver produto
                                            </button> */}
                                        </div>
                                    </div>
                                </div>
                                {item.promo === "on" &&
                                    <div className="absolute shadow right-2 -top-2 bg-green-500 px-2 rounded text-sm text-white">
                                        {item.valuepromo}% off
                                    </div>
                                }
                            </div>
                        )
                        }
                    </div>
                </div>

                <div className="h-sc1 pb-20"></div>

                {modalProdut && (
                    <div
                        className="flex justify-center items-center inset-0 fixed bg-white"
                    >
                        <div className="w-screen h-screen pt-8 md:pt-0 md:flex md:w-full relative overflow-y-auto md:overflow-hidden">
                            {/* IMG Desktop */}
                            <div className="p-0 m-0 hidden md:block h-auto w-2/5">
                                <img
                                    className="h-full w-full object-cover object-top md:object-center"
                                    src={`/imgs/produts/${cardSelected.ref}.jpg`}
                                />
                            </div>
                            {/* IMG Mobile */}
                            <div className="flex justify-center items-center md:hidden bg-white">
                                <img
                                    className="h-64 md:h-auto h-full md:w-2/5 object-cover object-center"
                                    src={`/imgs/produts/${cardSelected.ref}.jpg`}
                                    onClick={() => openModalImgSelect()}
                                />
                            </div>
                            <hr />
                            <div className="py-2 md:w-3/5 md:overflow-y-auto">
                                <div className="px-4 mt-3 mb-4 h-auto md:h-auto md:pt-8 md:px-8">
                                    <div className="flex items-center">
                                        <h3 className="text-lg font-bold">
                                            {cardSelected.produt}
                                        </h3>
                                    </div>

                                    <div className="mb-8 md:mb-8">
                                        <p className="text-base">Caixa com {cardSelected.quant} - {cardSelected.size}</p>
                                        {/* <p className="text-base font-bold">
                                            
                                            R$ {cardSelected.valueUnd} a unidade
                                        </p>
                                        {cardSelected.promo === "on" &&
                                            <p className="text-sm font-medium text-green-500">
                                                {cardSelected.valuepromo}% off para pagamento a vista
                                            </p>
                                        } */}
                                    </div>

                                    {/* <div className="md:hidden">
                                        <div className="md:w-2/5 mb-2 border border-gray-100 rounded-md shadow">
                                            <div
                                                className={`flex justify-between items-center px-2 py-1 bg-gray-50`}
                                                onClick={() => setDescriptOn(!descriptOn)}
                                            >
                                                   <p>Descrição</p>
                                                <p>{descriptOn ?
                                                        <img className="w-3 h-3" src={`/imgs/icons/icon-t.png`} />
                                                    :
                                                    <img className="w-3 h-3" src={`/imgs/icons/icon-b.png`} />
                                                }</p>
                                            </div>
                                            <div className={`${descriptOn ? "block" : "hidden"} px-2 py-3`}>
                                                <p>{cardSelected.descript}</p>
                                            </div>
                                        </div>
                                    </div> */}

                                    <div className="flex-col justify-center items-center mb-2">
                                        {/* <div className="w-full md:w-2/5 mb-4">
                                            <select
                                                className="h-8 px-2 w-full shadow rounded-md border border-gray-100 bg-white"
                                                onChange={(event) => setIdColorSelect(event.target.value)}
                                                placeholder="Cor"
                                                id="selectColor"
                                            >
                                                <option className="px-2" value={cardSelected.capa}>Escolha uma Cor</option>
                                                {produtColor.map((item, key) =>
                                                    <option value={item.id} key={key}>{item.name}</option>
                                                )}
                                            </select>
                                        </div> */}

                                        <div 
                                            className={`md:w-2/5 mb-6 ${(alertInputSizeTextOn) ? "mb-4" : "" }`}
                                        >
                                            <div className="flex justify-start items-center text-center mx-1">
                                                <input
                                                    className={`h-6 w-6 mr-2 ${alertInputSize}`}
                                                    min="0"
                                                    max="50"
                                                    placeholder={sizeP}
                                                    type="radio"
                                                    id="sizeP"
                                                    name="quantBeer"
                                                    onChange={(event) => setSizeP(event.target.value)}
                                                />
                                                <div className="">
                                                    <p className="text-base font-bold">
                                                        Caixa por R$ {cardSelected.valueCx}
                                                    </p>
                                                </div>
                                                {/* <input
                                                    className={`w-2/5 px-2 ml-4 h-8 shadow rounded-md border bg-white border-gray-400 text-center ${alertInputSize} ${alertInputSize}`}
                                                    min="0"
                                                    max="50"
                                                    placeholder={sizeP}
                                                    type="number"
                                                    id="sizeP"
                                                    onChange={(event) => setSizeP(event.target.value)}
                                                /> */}
                                            </div>
                                            <div className="flex justify-start items-center text-center mx-1 py-1 mt-2">
                                                <input
                                                    className={`h-6 w-6 mr-2 ${alertInputSize}`}
                                                    min="0"
                                                    max="50"
                                                    placeholder={sizeP}
                                                    type="radio"
                                                    id="sizeP"
                                                    name="quantBeer"
                                                    onChange={(event) => setSizeP(event.target.value)}
                                                />
                                                <div className="">
                                                    <p className="text-base font-bold">
                                                        Unidade por R$ {cardSelected.valueUnd}
                                                    </p>
                                                </div>
                                                {/* <input
                                                    className={`w-2/5 px-2 ml-4 h-8 shadow rounded-md border bg-white border-gray-400 text-center ${alertInputSize} ${alertInputSize}`}
                                                    min="0"
                                                    max="50"
                                                    placeholder={sizeP}
                                                    type="number"
                                                    id="sizeP"
                                                    onChange={(event) => setSizeP(event.target.value)}
                                                /> */}
                                            </div>
                                            {/* <div className="w-1/2 text-center mx-1">
                                                <p className="text-base font-bold">
                                                    R$ {cardSelected.valueCx}
                                                </p>
                                                <p>Quant de Caixas</p>
                                                <input
                                                    className={`px-2 h-8 w-full shadow rounded-md border bg-white text-center ${alertInputSize}`}
                                                    min="0"
                                                    max="50"
                                                    placeholder={sizeP}
                                                    type="number"
                                                    id="sizeP"
                                                    onChange={(event) => setSizeP(event.target.value)}
                                                />
                                            </div>
                                            <div className="w-1/2 text-center mx-1">
                                                <p>Quant de unidades</p>
                                                <p>Quant de unidades</p>
                                                <input
                                                    className={`px-2 h-8 w-full shadow rounded-md border bg-white text-center ${alertInputSize}`}
                                                    min="0"
                                                    max="50"
                                                    placeholder={sizeM}
                                                    type="number"
                                                    id="sizeM"
                                                    onChange={(event) => setSizeM(event.target.value)}
                                                />
                                            </div> */}
                                        </div>
                                        { alertInputSizeTextOn &&
                                                <div className="w-full md:w-2/5 mb-4">
                                                    <p className="mx-1 text-sm text-center text-red-300">digite a quantidade que deseja</p>
                                                </div>
                                        }
                                        <div className="flex justify-center items-center py-2">
                                            <button className="h-8 w-8 mx-2 rounded-full bg-white shadow-lg border border-gray-200">
                                                <p className="text-gray-900 font-bold">-</p>
                                            </button>
                                            <input
                                                className={`w-2/4 px-2 h-8 w-full rounded-md text-center shadow-lg border border-gray-200 ${alertInputSize}`}
                                                min="0"
                                                max="50"
                                                placeholder={sizeM}
                                                type="number"
                                                id="sizeM"
                                                onChange={(event) => setSizeM(event.target.value)}
                                            />
                                            <button className="h-8 w-8 mx-2 rounded-full shadow-lg border border-gray-200">
                                                <p className="text-gray-900 font-bold">+</p>
                                            </button>
                                        </div>
                                        {/* descriçao e especificaçoes mobile */}
                                        {/* <div className="md:hidden">
                                            <div className="md:w-2/5 mb-2 border border-gray-100 rounded-md shadow">
                                                <div
                                                    className={`flex justify-between items-center px-2 py-1 bg-gray-50`}
                                                    onClick={() => setDescriptOn(!descriptOn)}
                                                >
                                                    <p>Descrição</p>
                                                    <p>{descriptOn ?
                                                        <img className="w-3 h-3" src={`/imgs/icons/icon-t.png`} />
                                                        :
                                                        <img className="w-3 h-3" src={`/imgs/icons/icon-b.png`} />
                                                    }</p>
                                                </div>
                                                <div className={`${descriptOn ? "block" : "hidden"} px-2 py-3`}>
                                                    <p>{cardSelected.descript}</p>
                                                </div>
                                            </div>
                                            <div className="md:w-2/5 mb-2 border border-gray-100 rounded-md shadow">
                                                <div
                                                    className={`flex justify-between items-center px-2 py-1 bg-gray-50`}
                                                    onClick={() => setEspecifOn(!especifOn)}
                                                >
                                                    <p>Especificações</p>
                                                    <p>{especifOn ?
                                                        <img className="w-3 h-3" src={`/imgs/icons/icon-t.png`} />
                                                        :
                                                        <img className="w-3 h-3" src={`/imgs/icons/icon-b.png`} />
                                                    }</p>
                                                </div>
                                                <div className={`${especifOn ? "block" : "hidden"} px-2 py-3`}>
                                                    <p className="text-sm">Tipo: {cardSelected.type}</p>
                                                    <p className="text-sm">Tem bojo: {cardSelected.bojo}</p>
                                                    <p className="text-sm">Composição: {cardSelected.composition}</p>
                                                    <p className="text-sm">Garantia: {cardSelected.garantia}</p>
                                                </div>
                                            </div>
                                        </div>

                                        descriçao e especificaçoes desktop
                                        <div className="hidden md:block">
                                            <div className="w-full mb-2 border border-gray-100 rounded-md shadow">
                                                <div
                                                    className="flex justify-between items-center px-2 py-1 bg-gray-50"
                                                >
                                                    <p>Descrição</p>
                                                </div>
                                                <div className="px-2 py-2">
                                                    <p className="text-sm">{cardSelected.descript}</p>
                                                </div>
                                            </div>
                                            <div className="w-full mb-2 border border-gray-100 rounded-md shadow">
                                                <div
                                                    className="flex justify-between items-center px-2 py-1 bg-gray-50"
                                                >
                                                    <p>Especificações</p>
                                                </div>
                                                <div className="px-2 py-2">
                                                    <p className="text-sm">Tipo: {cardSelected.type}</p>
                                                    <p className="text-sm">Tem bojo: {cardSelected.bojo}</p>
                                                    <p className="text-sm">Composição: {cardSelected.composition}</p>
                                                    <p className="text-sm">Garantia: {cardSelected.garantia}</p>
                                                </div>
                                            </div>
                                        </div> */}

                                        {/* <div className="md:w-2/5 mb-28 md:mb-4">
                                            <button
                                                className="w-full border-2 border-gray-500 px-1 py-1 rounded-md text-sm mr-2"
                                                // onClick={() => openModalTableSize()}
                                                onClick={() => alert("Em breve tabela de medidas")}
                                            >
                                                Tabela de medidas
                                            </button>
                                        </div> */}

                                    </div>
                                </div>

                                {/* CTA desktop */}
                                <div className="hidden md:block">
                                    <div className="flex justify-center md:w-3/5 mb-2 px-8">
                                        <button
                                            className="w-full bg-green-600 px-2 py-2 rounded-md text-sm text-white mr-2"
                                            onClick={() => openModalAddCart()}
                                        >
                                            Adicionar carrinho
                                        </button>
                                        <button
                                            className="w-full bg-green-500 px-2 py-1 rounded-md text-sm text-white"
                                            onClick={() => AddCartAndSend()}
                                        >
                                            Finalizar pedido
                                        </button>
                                    </div>
                                </div>

                                {/* CTA mobile */}
                                <div className="md:hidden">
                                    <div className="flex justify-center md:w-3/5 pt-4 pb-2 px-4 fixed inset-x-0 bottom-0">
                                        <button
                                            className="w-full bg-green-600 px-2 py-3 rounded-md text-sm text-white mr-2"
                                            onClick={() => openModalAddCart()}
                                        >
                                            Adicionar carrinho
                                        </button>
                                        <button
                                            className="w-full bg-green-500 px-2 py-3 rounded-md text-sm text-white"
                                            onClick={() => AddCartAndSend()}
                                        >
                                            Finalizar pedido
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Exit desktop */}
                            <div className="hidden md:block">
                                <button
                                    className="bg-gray-600 text-white absolute top-2 right-2 w-8 h-8 rounded-full text-sm"
                                    type="button"
                                    onClick={closeModalProdut}
                                >x</button>
                            </div>
                        </div>
                        {/* Exit mobile */}
                        <div className="md:hidden">
                            <button
                                className="bg-gray-600 text-white absolute top-2 right-2 w-8 h-8 rounded-full text-sm fixed"
                                type="button"
                                onClick={closeModalProdut}
                            >x</button>
                        </div>
                    </div>
                )}

                {modalCart && (
                    <div
                        className="flex justify-center items-center inset-0 fixed bg-black bg-opacity-50"
                    >
                        {(countListCart === 0) ?
                            <div className="bg-white w-5/6 lg:w-1/3 rounded-xl shadow-md relative">
                                <div className="flex flex-col justify-center items-center py-8 px-2">
                                    <img
                                        className="w-16 h-16 mx-2 mb-2"
                                        src={`/imgs/icons/icon-zero-item.png`}
                                    />
                                    <p>Sem items no carrinho</p>
                                </div>
                                <button
                                    className="bg-gray-400 text-white absolute top-3 right-3 w-6 h-6 rounded-full text-sm"
                                    type="button"
                                    onClick={closeModalCart}
                                >x</button>
                            </div>
                            :
                            <div className="bg-white w-5/6 lg:w-1/3 rounded-xl shadow-md relative px-2">
                                <div className="flex justify-center items-center py-2">
                                    <strong>Items do Carrinho</strong>
                                </div>
                                <div className="h-96 overflow-y-auto">
                                    {itemCart.map((item, key) =>
                                        <div className="flex justify-center items-center py-1" key={key}>
                                            <div className="w-2/6 ml-1">
                                                <img
                                                    className="w-full h-auto rounded-xl object-cover object-top"
                                                    src={`/imgs/produts/${item.ref}.jpg`}
                                                />
                                            </div>
                                            <div className="w-3/6 ml-1 px-1 py-2">
                                                {item.p !== 0 &&
                                                    <div className="flex">
                                                        <p className="text-gray-600 text-sm">Tamanho P: </p>
                                                        <p className="font-medium ml-2 text-sm uppercase">{item.sizeP}</p>
                                                    </div>
                                                }
                                                {item.m !== 0 &&
                                                    <div className="flex">
                                                        <p className="text-gray-600 text-sm">Tamanho M: </p>
                                                        <p className="font-medium ml-2 text-sm uppercase">{item.sizeM}</p>
                                                    </div>
                                                }
                                                {item.g !== 0 &&
                                                    <div className="flex">
                                                        <p className="text-gray-600 text-sm">Tamanho G: </p>
                                                        <p className="font-medium ml-2 text-sm uppercase">{item.sizeG}</p>
                                                    </div>
                                                }
                                                {item.gg !== 0 &&
                                                    <div className="flex">
                                                        <p className="text-gray-600 text-sm">Tamanho GG: </p>
                                                        <p className="font-medium ml-2 text-sm uppercase">{item.sizeGG}</p>
                                                    </div>
                                                }
                                                <div className="">
                                                    <p className="text-gray-600 text-sm">Valor total: </p>
                                                    <p className="font-medium uppercase">{moeda(item.value * (item.sizeP + item.sizeM + item.sizeG + item.sizeGG))}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex justify-center w-1/6 text-red-500">
                                                <img
                                                    className="w-4 h-4"
                                                    src={`/imgs/icons/icon-delete.png`}
                                                    onClick={() => deleteItemCart(key)}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <p>
                                        Total de produtos: {countListCart}
                                    </p>
                                    <button
                                        className="w-auto bg-blue-500 px-2 py-2 rounded-md text-sm text-white"
                                        onClick={() => openModalSendZap()}
                                    >
                                        Finalizar pedido
                                    </button>
                                </div>
                                <button
                                    className="bg-gray-400 text-white absolute top-3 right-3 w-6 h-6 rounded-full text-sm"
                                    type="button"
                                    onClick={closeModalCart}
                                >x</button>
                            </div>
                        }
                    </div>
                )}

                {modalAddCart && (
                    <div
                        className="flex justify-center items-center inset-0 fixed bg-black bg-opacity-50"
                    >
                        <div className="bg-white w-3/4 lg:w-1/3 rounded-xl shadow-md relative">
                            <div className="px-4 py-8">
                                <div className="flex flex-col items-center mb-4">
                                    <img
                                        className="w-16 h-16 mb-2"
                                        src={`/imgs/icons/icon-add-item.png`}
                                    />
                                    <p>
                                        Produto adicionado!
                                    </p>
                                </div>
                                <div className="">
                                    <button
                                        className="w-full bg-blue-500 px-2 py-2 rounded-md text-sm text-white mb-2"
                                        onClick={() => AddCartAndExitProdut()}
                                    >
                                        Ver outros produtos
                                    </button>
                                    <button
                                        className="w-full border-2 border-blue-500 px-2 py-2 rounded-md text-sm text-blue-500"
                                        onClick={() => AddCartAndFixedProdut()}
                                    >
                                        Escolher outra cor
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {modalTableSize && (
                    <div
                        className="flex justify-center items-center inset-0 fixed bg-black bg-opacity-50"
                    >
                        <img
                            className="bg-white w-3/4 lg:w-1/3 rounded-xl shadow-md relative"
                            src={`/imgs/icons/table-size.jpg`}
                        />
                        <button
                            className="bg-gray-400 text-white absolute top-3 right-3 w-6 h-6 rounded-full text-sm"
                            type="button"
                            onClick={closeModalTableSize}
                        >
                            x
                        </button>
                    </div>
                )}

                {modalImgSelect && (
                    <div
                        className="flex justify-center items-center inset-0 fixed bg-black bg-opacity-80"
                    >
                        <img
                            className="w-4/5 h-4/5 object-cover object-center rounded-xl shadow-md relative"
                            src={`/imgs/produts/${cardSelected.ref}.jpg`}
                        />
                        <button
                            className="bg-gray-500 text-white absolute top-3 right-3 w-6 h-6 rounded-full text-sm"
                            type="button"
                            onClick={closeModalImgSelect}
                        >
                            x
                        </button>
                    </div>
                )}

                {modalContact && (
                    <div
                        className="flex justify-center items-center inset-0 fixed bg-black bg-opacity-70"
                    >
                        <div className="w-3/4 lg:w-1/3 rounded-xl shadow-md relative">
                            <div className="px-4 py-12">
                                <div className="flex flex-col justify-center items-center px-8">
                                    <div
                                        className="flex items-center w-full py-2 px-4 bg-white border rounded-md shadow-md mb-4"
                                        onClick={() => window.open("https://api.whatsapp.com/send?phone=" + numberZap + "_blank")}
                                    >
                                        <img
                                            className="w-10 h-10 mr-4"
                                            src={`/imgs/icons/whatsapp.png`}
                                        />
                                        <p className="">Whatsapp</p>
                                    </div>

                                    {/* <div
                                        className="flex items-center w-full py-2 px-4 bg-white border rounded-md shadow-md mb-4"
                                        onClick={() => window.open(`tel:${numberZap}`)}
                                    >
                                        <img
                                            className="w-10 h-10 mr-4"
                                            src={`/links/${pastaLogo}/phone.png`}
                                        />
                                        <p className="">Ligação</p>
                                    </div> */}

                                    { !atacado ? 
                                        <div
                                            className="flex items-center w-full py-2 px-4 bg-white border rounded-md shadow-md"

                                            onClick={() => alert("em breve LIEVI Fitness Varejo no Instagram")}
                                            
                                        >
                                            <img
                                                className="w-10 h-10 mr-4"
                                                src={`/imgs/icons/instagram.png`}
                                            />
                                            <p className="">Instagram</p>
                                        </div>
                                        :
                                        <div
                                            className="flex items-center w-full py-2 px-4 bg-white border rounded-md shadow-md"

                                            onClick={() => window.open("https://www.instagram.com/lievifitness/")}                                            
                                        >
                                            <img
                                                className="w-10 h-10 mr-4"
                                                src={`/imgs/icons/instagram.png`}
                                            />
                                            <p className="">Instagram</p>
                                        </div>
                                    }
                                </div>
                            </div>
                            <button
                                className="bg-white absolute top-3 right-3 w-6 h-6 rounded-full text-sm"
                                type="button"
                                onClick={closeModalContact}
                            >
                                x
                            </button>
                        </div>
                    </div>
                )}

                {modalSendZap && (
                    <div
                        className="flex justify-center items-center inset-0 fixed bg-black bg-opacity-50"
                    >
                        <div className="bg-white w-3/4 lg:w-1/3 rounded-xl shadow-md relative">
                            <div className="px-4 py-8">
                                <div className="flex flex-col items-center mb-4">
                                    <img
                                        className="w-16 h-16 mb-2"
                                        src={`/imgs/ions/icon-send-order.png`}
                                    />
                                    <p>
                                        Qual seu nome?
                                    </p>
                                </div>
                                <div className="">
                                    <input
                                        className="px-2 py-2 mb-2 w-full shadow rounded-md border border-gray-100 text-center bg-white"
                                        placeholder="Seu nome ou da Empresa"
                                        type="text"
                                        onChange={(event) => setNameOrder(event.target.value)}
                                    />
                                    <button
                                        className="w-full bg-blue-500 px-2 py-2 rounded-md text-sm text-white"
                                        onClick={() => sendZap()}
                                    >
                                        Finalizar pedido
                                    </button>
                                </div>
                            </div>
                            <button
                                className="bg-gray-400 text-white absolute top-3 right-3 w-6 h-6 rounded-full text-sm"
                                type="button"
                                onClick={closeModalSendZap}
                            >x</button>
                        </div>
                    </div>
                )}

                {modalTanks && (
                    <div
                        className="flex justify-center items-center inset-0 fixed bg-black bg-opacity-50"
                    >
                        <div className="bg-white w-3/4 lg:w-1/3 rounded-xl shadow-md relative">
                            <div className="px-4 py-8">
                                <div className="flex flex-col items-center mb-4">
                                    <img
                                        className="w-auto h-16 mb-2"
                                        src={`/imgs/icons/icon-tanks.png`}
                                    />
                                    <p>
                                        Obrigado por nos escolher!
                                    </p>
                                </div>
                                <div className="">
                                    <button
                                        className="w-full bg-blue-500 px-2 py-2 rounded-md text-sm text-white"
                                        onClick={() => closeModalTanks()}
                                    >
                                        volte sempre
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* fixed desktop */}
                <div 
                    className={`hidden md:block right-2 bottom-2 ${fixedOn} px-3 py-4 rounded-md`}
                    style={{ backgroundColor: colorBodyBar }}
                >
                    <div className="flex flex-col justify-center items-center">
                        <div
                            className="relative m-2"
                            onClick={() => openModalCart()}
                        >
                            <img
                                className="w-6 h-6"
                                src={`/imgs/icons/icon-cart-white.png`}
                            />
                            {
                                countListCart > 0 &&
                                <div className="absolute bottom-3 -right-4 bg-red-500 rounded-full px-2">
                                    <p className="text-sm text-white">{countListCart}</p>
                                </div>
                            }
                        </div>
                        <div
                            className="m-2"
                            onClick={() => openModalContact()}
                        >
                            <img
                                className="w-5 h-5"
                                src={`/imgs/icons/icon-contact-white.png`}
                            />
                        </div>
                    </div>
                </div>




                {/* fixed Mobile */}
                <div
                    className={`shadow-xl rounded-t-lg h-sc1 w-full ${fixedOn} inset-x-0 bottom-0 md:hidden`}
                    style={{ backgroundColor: colorBodyBar }}
                >
                    <div className="flex justify-between items-center px-6 py-4">
                        <div
                            className=""
                            onClick={() => openModalContact()}
                        >
                            <img
                                className="w-5 h-5"
                                src={`/imgs/icons/icon-contact-white.png`}
                            />
                        </div>
                        <div
                            className="relative"
                            onClick={() => openModalCart()}
                        >
                            <img
                                className="w-6 h-6"
                                src={`/imgs/icons/icon-cart-white.png`}
                            />
                            {
                                countListCart > 0 &&
                                <div className="absolute bottom-2 -right-5 bg-red-500 rounded-full px-2">
                                    <p className="text-sm text-white">{countListCart}</p>
                                </div>
                            }
                        </div>
                        <div
                            className=""
                            onClick={() => topFunction()}
                        >
                            <img
                                className="w-5 h-5"
                                src={`/imgs/icons/icon-t-white.png`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ClubV1;
