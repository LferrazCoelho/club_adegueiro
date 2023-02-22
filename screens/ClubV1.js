import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function ClubV1({ gtm, listProduts, listOperation, listCategory, logo, numberZap, titlePage, 
    colorHead, colorBody, colorBodyItem, colorBodyBar, colorTitle, colorText, colorButton, atacado }) {

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

    const [typePaySend, setTypePaySend] = useState("Pix");
    const [totalCart, setTotalCart] = useState(0);
    
    const [quantUnd, setQuantUnd] = useState(0);
    const [radioUndOn, setRadioUndOn] = useState(false);
    const [radioCxOn, setRadioCxOn] = useState(false);

    const [nameColorSelect, setNameColorSelect] = useState("");

    const [descriptOn, setDescriptOn] = useState(false);
    const [especifOn, setEspecifOn] = useState(false);

    const [grupColor, setGrupColor] = useState("");
    const [arrayColor, setArrayColor] = useState([]);
    const [produtColor, setProdutColor] = useState([]);

    const [nameSend, setNameSend] = useState("");
    const [localSend, setLocalSend] = useState("");

    const [topFixed, setTopFixed] = useState("");
    
    const [alertInputSize, setAlertInputSize] = useState("border-gray-100");
    const [alertInputSizeTextOn, setAlertInputSizeTextOn] = useState(false);

    const countListCart = itemCart.length;

    useEffect(() => {
        setTotalCart(itemCart.reduce((a, b) => a + b.total, 0));
        console.log("uptotalcart")
    }, [totalCart, itemCart]);

    function subQuantUnd() {
        if (quantUnd === 0) {
            setQuantUnd(0)
        } else {
            setQuantUnd(quantUnd - 1)
        }
    }
    function somQuantUnd() {
        setQuantUnd(quantUnd + 1)
    }

    function openModalProdut(item) {
        setCardSelected(item);
        setModalProdut(true);
        setFixedOn("");
        setTopFixed("fixed top-0");
    };
    
    function openModalCart() {
        setTotalCart(itemCart.reduce((a, b) => a + b.total, 0));
        // console.log(totalCart);
        setModalCart(true)
        setFixedOn("")
        setTopFixed("fixed top-0")
    };

    function openModalAddCart() {
        
        if ( quantUnd === 0) {
            alert("Por favor, escolha pelo menos uma opção.");
            setAlertInputSize("border-2 border-red-300");
            setAlertInputSizeTextOn(true);
        } else {
            setModalAddCart(true);
            setAlertInputSize("border-gray-100");
            setAlertInputSizeTextOn(false);
        }
    };

    function AddCartAndSend() {
        if ( quantUnd === 0) {
            alert("Por favor, escolha pelo menos uma opção.");
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

    function openModalContact() {
        setModalContact(true)
    };

    function openModalImgSelect() {
        setModalImgSelect(true)
    };

    function AddCartAndFixedProdut() {
        handleAddItemCart()
        setModalAddCart(false)
        quantUnd(0);
    };

    function AddCartAndExitProdut() {
        handleAddItemCart()
        setTopFixed("")
        setQuantUnd(0);
        setModalAddCart(false)
        setModalProdut(false)
        setFixedOn("fixed")
    };

    function closeModalProdut() {
        setModalProdut(false)
        setFixedOn("fixed")
        setTopFixed("")
        setQuantUnd(0);
        setAlertInputSize("border-gray-100");
        setAlertInputSizeTextOn(false);
    };

    function closeModalCart() {
        setModalCart(false)
        setFixedOn("fixed")
        setTopFixed("")
    };

    function closeModalSendZap() {
        setModalSendZap(false)
    };

    function closeModalContact() {
        setModalContact(false)
    };

    function closeModalTanks() {
        window.location.reload();
    };

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    function deleteItemCart(key) {
        // setTempListCart([...itemCart]);
        const tempListCart = [...itemCart];
        tempListCart.splice(key, 1);
        setItemCart(tempListCart);
    };

    function moeda(number) {
        const formatado = number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return formatado;
    };


    const handleAddItemCart = () => {

        const totalTemp = cardSelected.valueUnd * quantUnd;

        const newItem = {
            ref: cardSelected.ref,
            img: cardSelected.ref,
            produt: cardSelected.produt,
            type: cardSelected.type,
            size: cardSelected.size,
            valueUnd: parseFloat(cardSelected.valueUnd),
            quantUnd: parseFloat(quantUnd),
            total: totalTemp,
        };

        const newItems = [...itemCart, newItem];

        setItemCart(newItems);

    };
    
    function sendZap() {
        // var headOrder = `Novo pedido Nº${Math.floor(Math.random() * 65536)} - ${nameOrder} \n`;
        var headOrder = `Olá, meu nome é ${nameSend}, gostaria de fazer o seguinte pedido:`;
        var bodyOrder = itemCart.map(function (item) {
            return `
\n${item.produt} - ${item.type} ${item.size}
${(item.quantUnd !== 0) ? `Unidades: ${item.quantUnd}` : ""}
Total item: ${moeda(item.quantUnd * item.valueUnd)} \n`;
        });
        // var totalOrder = ``;
        var totalOrder = `\nValor total do pedido: ${moeda(totalCart)}\n`;
        var payOrder = `Forma de pagamento: ${typePaySend}\n`;
        var localOrder = `Endereço da entrega: ${localSend}\n`;
        var idOrder = `\nPedido Nº${Math.floor(Math.random() * 65536)}`;

        headOrder = window.encodeURIComponent(headOrder);
        bodyOrder = window.encodeURIComponent(bodyOrder);
        totalOrder = window.encodeURIComponent(totalOrder);
        payOrder = window.encodeURIComponent(payOrder);
        localOrder = window.encodeURIComponent(localOrder);
        idOrder = window.encodeURIComponent(idOrder);

        window.open("https://api.whatsapp.com/send?phone=" + numberZap + "&text=" + headOrder + bodyOrder + totalOrder + payOrder + localOrder + idOrder, "_blank");
        setTimeout(function () { setModalTanks(true); }, 2000);
    }


    return (
        <>
            <Head>
                <title>{titlePage}</title>
                <link rel="icon" src={`/imgs/${logo}.png`} />
            </Head>

            <div 
                className={`${topFixed} min-h-screen bg-gray-50`} 
                // style={{ backgroundColor: colorBody }}
                >

                {/* Head Mobile */}
                <div className="md:hidden">
                    <div 
                        className="flex justify-center items-center py-6 shadow-md" 
                        // style={{ backgroundImage: url("/bg-01.gif") }}
                        // style={{ backgroundImage: `url(${BgHeadImg})` }}
                        style={{ backgroundColor: colorHead }}
                        >
                        <div className="flex justify-center items-center w-2/5">
                            <img
                                className="object-cover h-32"
                                src={`/imgs/${logo}.png`}
                            />
                        </div>
                        <div className="w-3/5 p-1">
                            <p className="text-yellow-500 text-base font-bold pb-1">Distribuidora de Bebidas</p>
                            <p className="text-white text-sm">QE 15 Conjunto M, Bloco A</p>
                            <p className="text-white text-sm pb-1">Guara 2</p>
                            {/* <p className="text-yellow-500 text-base font-bold pb-1">Faça seu pedido</p> */}
                            <div className="flex items-center">
                                <p className="text-white pr-2">Loja está</p>
                                {( infoBD.operation === "on" ) ? 
                                    <button className="bg-green-500 text-white px-2 py-1 rounded-lg">aberta</button>
                                    :  
                                    <button className="bg-red-500 text-white px-2 py-1 rounded"> fechada </button>
                                }
                            </div>
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

                {/* <div className="flex overflow-x-auto md:justify-center py-4 px-2 lg:overflow-x-hidden">
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
                </div> */}


                {/* Menu Categorias  */}
                <div 
                    className="flex md:justify-center px-4 py-4 overflow-x-auto"
                    style={{ backgroundColor: colorHead }}
                    >
                    <div className="flex justify-center items-center flex-nowrap">
                        {listCategory.map((item, key) =>
                            <p key={key}
                                className={`mx-2 text-sm text-white ${filterProdut === item.value && "text-base border border-white rounded-lg px-2 py-1"}`} onClick={() => setFilterProdut(item.value)}>
                                {item.name}
                            </p>
                        )}
                    </div>
                </div>

                {/* Lista de Produtos */}
                <div className="">
                    <div className="grid grid-cols-2 md:grid-cols-4 mt-5 gap-4 px-4 lg:px-20 xl:p-18">
                        {dataProdut.map((item, key) =>
                            item.category === filterProdut &&
                            <div className="drop-shadow-md rounded-lg flex relative border border-gray-100"
                                style={{ backgroundColor: colorBody }}
                                key={key}
                            >
                                <div 
                                    className=" md:grid-cols-1"
                                    onClick={() => openModalProdut(item)}
                                >
                                    <div className="">
                                        <img
                                            className="rounded-t-lg object-cover object-center h-44 md:rounded md:w-full md:h-96"
                                            src={`/imgs/produts/${item.ref}.png`}
                                            id="open-modal-img"
                                            onClick={() => openModalProdut(item)}
                                        />
                                    </div>
                                    <div className="py-1">
                                        <div className="w-full px-2 pb-2 pt-1"
                                            onClick={() => openModalProdut(item)}>
                                            <h3 className="text-lg font-bold md:text-base text-gray-900">
                                                {item.produt}
                                            </h3>
                                            <p className="text-base text-gray-900">
                                                {item.type} - {item.size}
                                            </p>
                                        </div>
                                        
                                        { (item.category === "cerveja")? 
                                            <div className="w-full flex items-center">
                                                <div className="w-full px-1 py-1 bg-green-600 mb-1">
                                                    <p className="text-sm font-bold text-center text-white">
                                                        {moeda(item.valueUnd * 1)} a unidade
                                                    </p>
                                                </div>
                                                {/* <div className="p-1 ml-1">
                                                    <p className="text-base" style={{ color: colorTitle }}>
                                                        {moeda(item.valueUnd * 1)}
                                                    </p>
                                                    <p className="text-sm" style={{ color: colorTitle }}>
                                                        a unidade
                                                    </p>
                                                </div> */}
                                            </div>
                                            :
                                            <div className="w-full">
                                                <div className="flex items-center px-2 pb-1">
                                                    <p className="text-lg text-white">
                                                        R$ {item.valueUnd}
                                                    </p>
                                                    <p className="ml-1 text-base text-white">
                                                        a und
                                                    </p>
                                                </div>
                                            </div>
                                        }

                                    </div>
                                </div>
                                {item.promo === "on" &&
                                    <div className="absolute shadow right-2 -top-2 bg-green-500 px-2 rounded text-sm text-white">
                                        {item.valuepromo}% off
                                    </div>
                                }
                                {item.rank === "on" &&
                                    <div className="absolute shadow right-2 -top-2 bg-green-500 px-2 py-1 rounded text-sm text-white">
                                        mais pedido
                                    </div>
                                }
                            </div>
                        )
                        }
                    </div>
                </div>

                <div className="h-sc1 pb-20"></div>
                
                {/* Modal Produto */}
                {modalProdut && (
                    <div
                        className="flex justify-center items-center inset-0 fixed bg-white"
                    >
                        <div className="w-screen h-screen pt-8 md:pt-0 md:flex md:w-full relative overflow-y-auto md:overflow-hidden">
                            {/* IMG Desktop */}
                            <div className="p-0 m-0 hidden md:block h-auto w-2/5">
                                <img
                                    className="h-full w-full object-cover object-top md:object-center"
                                    src={`/imgs/produts/${cardSelected.ref}.png`}
                                />
                            </div>
                            {/* IMG Mobile */}
                            <div className="flex justify-center items-center md:hidden bg-white">
                                <img
                                    className="h-44 md:h-auto md:w-2/5 object-cover object-center mb-8"
                                    src={`/imgs/produts/${cardSelected.ref}.png`}
                                    onClick={() => openModalImgSelect()}
                                />
                            </div>
                            <hr />
                            <div className="py-2 md:w-3/5 md:overflow-y-auto">
                                <div className="px-4 mt-3 mb-4 h-auto md:h-auto md:pt-8 md:px-8">
                                    <div className="flex items-center">
                                        <h3 className="text-lg font-bold">
                                            {cardSelected.produt} - {cardSelected.type}
                                        </h3>
                                    </div>

                                    <div className="mb-4 md:mb-8">
                                        <p className="text-base">Caixa com {cardSelected.quant} unidades - {cardSelected.size}</p>
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
                                            className={`md:w-2/5 mb-2 ${(alertInputSizeTextOn) ? "mb-4" : "" }`}
                                        >
                                            <div>
                                                <p>Quero pedir:</p>
                                            </div>
                                            {/* <div 
                                                className="flex justify-start items-center text-center mx-1"
                                                onClick={()=> onInputCx()}
                                            >
                                                <input
                                                    className={`h-6 w-6 mr-2 ${alertInputSize}`}
                                                    type="radio"
                                                    id="radioCx"
                                                    name="quantBeer"
                                                />
                                                <div className="">
                                                    <label className="text-base font-bold" for="radioCx">
                                                        Caixa por {moeda(cardSelected.valueCx)}
                                                    </label>
                                                </div> */}
                                                {/* <input
                                                    className={`w-2/5 px-2 ml-4 h-8 shadow rounded-md border bg-white border-gray-400 text-center ${alertInputSize} ${alertInputSize}`}
                                                    min="0"
                                                    max="50"
                                                    placeholder={sizeP}
                                                    type="number"
                                                    id="sizeP"
                                                    onChange={(event) => setSizeP(event.target.value)}
                                                /> */}
                                            {/* </div> */}
                                            {/* <div 
                                                className="flex justify-start items-center text-center mx-1 py-1 mt-2"
                                                onClick={()=> onInputUnd()}
                                            > */}
                                                {/* <input
                                                    className={`h-6 w-6 mr-2 ${alertInputSize}`}
                                                    type="radio"
                                                    id="radioUnd"
                                                    name="quantBeer"
                                                />
                                                <div className="">
                                                    <label className="text-base font-bold" for="radioUnd">
                                                        Unidade por {moeda(cardSelected.valueUnd)}
                                                    </label>
                                                </div> */}
                                                {/* <input
                                                    className={`w-2/5 px-2 ml-4 h-8 shadow rounded-md border bg-white border-gray-400 text-center ${alertInputSize} ${alertInputSize}`}
                                                    min="0"
                                                    max="50"
                                                    placeholder={sizeP}
                                                    type="number"
                                                    id="sizeP"
                                                    onChange={(event) => setSizeP(event.target.value)}
                                                /> */}
                                            {/* </div> */}
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
                                        {/* { alertInputSizeTextOn &&
                                                <div className="w-full md:w-2/5 mb-4">
                                                    <p className="mx-1 text-sm text-center text-red-300">digite a quantidade que deseja</p>
                                                </div>
                                        } */}
                                        {/* { radioUndOn && */}
                                            <div className="flex justify-center items-center py-2">
                                                <button
                                                    className="h-8 w-8 mx-2 rounded-full bg-white shadow-lg border border-gray-200"
                                                    onClick={() => subQuantUnd()}
                                                >
                                                    <p className="text-gray-900 font-bold">-</p>
                                                </button>
                                                <input
                                                    className={`text-gray-600 w-2/4 px-2 h-8 w-full rounded-md text-center shadow-lg border border-gray-200 ${alertInputSize}`}
                                                    min="0"
                                                    max="50"
                                                    placeholder={`${quantUnd} unidades`}
                                                    type="number"
                                                    id="quantUnd"
                                                    onChange={(event) => setQuantUnd(event.target.value)}
                                                />
                                                <button 
                                                    className="h-8 w-8 mx-2 rounded-full shadow-lg border border-gray-200"
                                                    onClick={() => somQuantUnd()}
                                                    >
                                                    
                                                    <p className="text-gray-900 font-bold">+</p>
                                                </button>
                                            </div>
                                         {/* } */}
                                        {/* // { radioCxOn && 
                                        //     <div className="flex justify-center items-center py-2">
                                        //         <button className="h-8 w-8 mx-2 rounded-full bg-white shadow-lg border border-gray-200">
                                        //             <p className="text-gray-900 font-bold">-</p>
                                        //         </button>
                                        //         <input
                                        //             className={`w-2/4 px-2 h-8 w-full rounded-md text-center shadow-lg border border-gray-200 ${alertInputSize}`}
                                        //             min="0"
                                        //             max="50"
                                        //             placeholder={`${quantCx} caixas`}
                                        //             type="number"
                                        //             id="quantCx"
                                        //             onChange={(event) => setQuantCx(event.target.value)}
                                        //         />
                                        //         <button className="h-8 w-8 mx-2 rounded-full shadow-lg border border-gray-200">
                                        //             <p className="text-gray-900 font-bold">+</p>
                                        //         </button>
                                        //     </div>
                                        // }
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
                                        {/* <button
                                            className="w-full bg-green-500 px-2 py-3 rounded-md text-sm text-white"
                                            onClick={() => AddCartAndSend()}
                                        >
                                            Finalizar pedido
                                        </button> */}
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

                {/* Modal Carrinho */}
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
                                                    src={`/imgs/produts/${item.ref}.png`}
                                                />
                                            </div>
                                            <div className="w-3/6 ml-1 px-1 py-2">
                                                <div className="">
                                                    <p className="text-gray-900 text-base">{item.produt}</p>
                                                    <p className="text-gray-600 text-sm">{item.type} - {item.size}</p>

                                                </div>
                                                {item.quantUnd !== 0 &&
                                                    <div className="flex">
                                                        <p className="text-gray-600 text-sm">Unidade: </p>
                                                        <p className="font-medium ml-2 text-sm uppercase">
                                                            {item.quantUnd}
                                                        </p>
                                                    </div>
                                                }
                                                <div className="">
                                                    <p className="text-gray-600 text-sm">Valor total: </p>
                                                    <p className="font-medium uppercase">
                                                        {moeda(item.total)}
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
                                <div className="flex-col justify-center items-center py-2">
                                    <p className="text-center pb-1">
                                        Total do carrinho: {moeda(totalCart)}
                                    </p>
                                    <button
                                        className="w-full bg-blue-500 px-2 py-2 rounded-md text-sm text-white"
                                        onClick={() => openModalSendZap()}
                                    >
                                        Finalizar pedido
                                    </button>
                                </div>
                                <button
                                    className="bg-gray-400 text-white absolute top-3 right-3 w-6 h-6 rounded-full text-xs"
                                    type="button"
                                    onClick={closeModalCart}
                                >x</button>
                            </div>
                        }
                    </div>
                )}

                {/* Modal Add Carrinho */}
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
                                        className="w-full bg-green-500 px-2 py-2 rounded-md text-sm text-white"
                                        onClick={() => AddCartAndSend()}
                                    >
                                        Finalizar pedido
                                    </button>
                                    {/* <button
                                        className="w-full border-2 border-blue-500 px-2 py-2 rounded-md text-sm text-blue-500"
                                        onClick={() => AddCartAndFixedProdut()}
                                    >
                                        Escolher outra cor
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal Contato */}
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

                {/* Modal Enviar Pedido Zap */}
                {modalSendZap && (
                    <div
                        className="flex justify-center items-center inset-0 fixed bg-black bg-opacity-50"
                    >
                        <div className="bg-white w-3/4 lg:w-1/3 rounded-xl shadow-md relative">
                            <div className="px-4 py-8">
                                <div className="flex flex-col items-center mb-4">
                                    <img
                                        className="w-16 h-16 mb-2"
                                        src={`/imgs/icons/icon-send-order.png`}
                                    />
                                </div>
                                <div className="">
                                    <p className="text-sm">
                                        Nome
                                    </p>
                                    <input
                                        className="px-2 py-2 mb-2 w-full shadow rounded-md border border-gray-100 text-center bg-white"
                                        placeholder="Digite seu nome ou apelido"
                                        type="text"
                                        onChange={(event) => setNameSend(event.target.value)}
                                    />
                                    <p className="text-sm">
                                        Endereço
                                    </p>
                                    <input
                                        className="px-2 py-2 mb-2 w-full shadow rounded-md border border-gray-100 text-center bg-white"
                                        placeholder="Digite seu endereço completo"
                                        type="text"
                                        onChange={(event) => setLocalSend(event.target.value)}
                                    />
                                    <p className="text-sm">
                                        Forma de Pagamento
                                    </p>
                                    {/* <input
                                        className="px-2 py-2 mb-2 w-full shadow rounded-md border border-gray-100 text-center bg-white"
                                        placeholder="Digite seu endereço completo"
                                        type="text"
                                        onChange={(event) => setTypePaySend(event.target.value)}
                                    /> */}
                                    <select 
                                        className="px-2 py-2 mb-2 w-full shadow rounded-md border border-gray-100 text-center bg-white"
                                        placeholder="Digite seu endereço completo"
                                        type="text"
                                        onChange={(event) => setTypePaySend(event.target.value)}
                                    >
                                        <option value="">escolha uma opção</option>
                                        <option value="dinheiro">Dinheiro</option>
                                        <option value="cartão débito">cartão débito</option>
                                        <option value="cartão crédito">Cartão crédito</option>
                                        <option value="pix">Pix</option>
                                    </select>
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

                {/* Modal Obrigado */}
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
                    <div className="flex justify-between items-center px-4 py-3">
                        <div
                            className=""
                            onClick={() => openModalContact()}
                        >
                            <img
                                className="w-4 h-4"
                                src={`/imgs/icons/icon-contact-white.png`}
                            />
                        </div>
                        <div
                            className="relative"
                            onClick={() => openModalCart()}
                            >
                            <img
                                className="w-4 h-4"
                                src={`/imgs/icons/icon-cart-white.png`}
                            />
                            {
                                countListCart > 0 &&
                                <div className="absolute bottom-2 -right-5 bg-red-500 rounded-full px-1">
                                    <p className="text-xs text-white">{countListCart}</p>
                                </div>
                            }
                        </div>
                        <div
                            className=""
                            onClick={() => topFunction()}
                        >
                            <img
                                className="w-4 h-4"
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
