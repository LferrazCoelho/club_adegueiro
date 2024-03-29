import Head from 'next/head'
import Script from 'next/script'
import React, { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function ClubV1({ listProduts, listOperation, listCategory, listAvalit, logo, numberZap, titlePage, 
    colorHead, colorBody, colorBodyBar }) {

    const [dataProdut, setDataProdut] = useState(listProduts);
    const [dataOperation, setDbOperation] = useState(listOperation);
    const [filterProdut, setFilterProdut] = useState("cerveja");
    const [infoBD, setInfoBD] = useState(dataOperation.dataSheetsOperation[0]);

    const [modalProdut, setModalProdut] = useState(false);
    const [modalCart, setModalCart] = useState(false);
    const [modalAddCart, setModalAddCart] = useState(false);
    const [modalContact, setModalContact] = useState(false);
    const [modalAvalit, setModalAvalit] = useState(false);
    const [modalSendZap, setModalSendZap] = useState(false);
    const [modalTanks, setModalTanks] = useState(false);
    const [fixedOn, setFixedOn] = useState("fixed");

    const [cardSelected, setCardSelected] = useState([]);
    const [itemCart, setItemCart] = useState([]);

    const [typePaySend, setTypePaySend] = useState("Pix");
    const [totalCart, setTotalCart] = useState(0);
    
    const [quantUnd, setQuantUnd] = useState(1);

    const [descriptOn, setDescriptOn] = useState(false);
    const [especifOn, setEspecifOn] = useState(false);

    const [nameSend, setNameSend] = useState("");
    const [localSend, setLocalSend] = useState("");

    const [topFixed, setTopFixed] = useState("");
    
    const [alertInputSize, setAlertInputSize] = useState("border-gray-100");
    const [alertInputSizeTextOn, setAlertInputSizeTextOn] = useState(false);

    const countListCart = itemCart.length;

    useEffect(() => {
        setTotalCart(itemCart.reduce((a, b) => a + b.total, 0));
    }, [totalCart, itemCart]);

    function subQuantUnd() {
        if (quantUnd === 1) {
            setQuantUnd(1);
        } else {
            setQuantUnd(quantUnd - 1);
        }
    }

    function somQuantUnd() {
        setQuantUnd(quantUnd + 1);
    }

    function somCxOne() {
        var cx = cardSelected.quant;
        setQuantUnd(cx * 1);
    }

    function somCxDuo() {
        var cx = cardSelected.quant;
        setQuantUnd(cx * 2);
    }

    function oneQuant() {
        setQuantUnd(1);
    }

    function openModalProdut(item) {
        setQuantUnd(1);
        setCardSelected(item);
        setModalProdut(true);
        setFixedOn("hidden");
    };
    
    function openModalCart() {
        setModalProdut(false);
        setModalAddCart(false);
        setModalContact(false);
        setModalSendZap(false);
        setModalTanks(false);
        setTotalCart(itemCart.reduce((a, b) => a + b.total, 0));
        setModalCart(true);
        setFixedOn("hidden");
    };

    function openModalTank() {
        setModalProdut(false);
        setModalAddCart(false);
        setModalContact(false);
        setModalSendZap(false);
        setModalCart(false)
        setModalTanks(true);
    }

    function openModalAddCart() {
        
        if ( quantUnd === 0) {
            alert("Por favor, adicione pelo menos uma unidade.");
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
            alert("Por favor, adicione pelo menos uma unidade.");
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
        setModalCart(false);
        setModalSendZap(true);
    };

    function openModalContact() {
        setModalContact(true);
    };

    function openModalAvalit() {
        setModalAvalit(true);
    };

    function AddCartAndExitProdut() {
        handleAddItemCart();
        setTopFixed("");
        setQuantUnd(0);
        setModalAddCart(false);
        setModalProdut(false);
        setFixedOn("fixed");
    };

    function AddCartAndOpenCart() {
        handleAddItemCart();
        setTopFixed("");
        setQuantUnd(0);
        setModalAddCart(false);
        setModalProdut(false);
        setFixedOn("fixed");
        openModalCart();
    };

    function closeModalProdut() {
        setModalProdut(false);
        setFixedOn("fixed");
        setTopFixed("");
        setQuantUnd(0);
        setAlertInputSize("border-gray-100");
        setAlertInputSizeTextOn(false);
    };

    function closeModalCart() {
        setModalCart(false);
        setFixedOn("fixed");
        setTopFixed("");
    };

    function closeModalSendZap() {
        setModalSendZap(false);
        setFixedOn("fixed");
        setTopFixed("");
    };

    function closeModalContact() {
        setModalContact(false);
    };

    function closeModalAvalit() {
        setModalAvalit(false);
    };

    function closeModalTanks() {
        setQuantUnd(1);
        setItemCart([]);
        setTotalCart(0);
        setFixedOn("fixed");
        setTopFixed("");
        setModalTanks(false);
    };

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

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
        var headOrder = `Olá, meu nome é ${nameSend}, gostaria de fazer o seguinte pedido: \n`;
        var bodyOrder = itemCart.map(function (item) {
            return `
${item.produt} - ${item.type} ${item.size}
${(item.quantUnd !== 0) ? `${item.quantUnd} unds` : ""}
`});
        var payOrder = `\nPagamento: ${typePaySend}\n`;
        var localOrder = `Endereço da entrega:\n${localSend}\n`;
        var idOrder = `\nPedido Nº${Math.floor(Math.random() * 65536)}`;

        headOrder = window.encodeURIComponent(headOrder);
        bodyOrder = window.encodeURIComponent(bodyOrder);
        payOrder = window.encodeURIComponent(payOrder);
        localOrder = window.encodeURIComponent(localOrder);
        idOrder = window.encodeURIComponent(idOrder);

        window.open("https://api.whatsapp.com/send?phone=" 
        + numberZap + "&text=" + headOrder + bodyOrder + payOrder + localOrder + idOrder,
         "_blank");
        setTimeout( openModalTank() , 2000);
    }


    return (
        <>
            <Head>
                <title>{titlePage}</title>
                <link rel="icon" src={`/imgs/logo-white.png`} />
            </Head>
            <Script id="google-tag-manager" strategy="afterInteractive">
                {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-W9KXLSN');
                `}
            </Script>

            <div 
                className={`${topFixed} min-h-screen bg-gray-50`} 
                // style={{ backgroundColor: colorBody }}
                >

                {/* Head Mobile */}
                <div className="md:hidden">
                    <div 
                        className="flex justify-center items-center py-2 shadow-md" 
                        style={{ backgroundColor: colorHead }}
                        >
                        <div className="flex justify-center items-center w-2/5">
                            <img
                                className="object-cover h-28"
                                src={`/imgs/${logo}.png`}
                            />
                        </div>
                        <div className="w-3/5 p-1">
                            <p className="text-yellow-500 text-base font-bold pb-1">Distribuidora de Bebidas</p>
                            <div className="flex-col items-center">
                                {( infoBD.operation === "on" ) ?
                                    <>
                                        <div className="flex items-center mb-1">
                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                            <p className="text-white text-sm pl-3">Loja aberta</p>
                                        </div>
                                        <div className="flex">
                                            <img
                                                className="h-4"
                                                src={`/imgs/icons/icon-time.png`}
                                            />
                                            <p className="pl-2 text-white text-sm">Entrega em até 30min</p>
                                        </div>
                                        <div 
                                            className="flex items-center"
                                            onClick={() => openModalAvalit()}
                                        >
                                            <img
                                                className="h-4"
                                                src={`/imgs/icons/avalit.png`}
                                            />
                                            <p  className="text-base text-white pl-2">
                                                {listAvalit.length} avaliações
                                            </p>
                                        </div>
                                    </>
                                    :  
                                    <>
                                        <div className="flex items-center mb-1">
                                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                            <p className="text-white text-sm pl-2">Loja fechada</p>
                                        </div>
                                        <div className="flex">
                                            <p className="text-white text-sm">Entrega amanhã a partir das 10:00hs</p>
                                        </div>
                                        <div className="flex items-center">
                                            <img
                                                className="h-4"
                                                src={`/imgs/icons/avalit.png`}
                                            />
                                            <p  className="text-base text-white pl-2">
                                                {dataAvalit.length} avaliações
                                            </p>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* Menu Categorias Mobile */}
                <div 
                    className="flex md:justify-center px-4 py-4 overflow-x-auto md:hidden"
                    style={{ backgroundColor: colorHead }}
                    >
                    <div className="flex justify-center items-center flex-nowrap">
                        {listCategory.map((item, key) =>
                            <p key={key}
                                className={`mx-2 text-sm text-white ${filterProdut === item.value && "text-base border border-white rounded-lg px-2 py-1"}`} onClick={() => setFilterProdut(item.value)}
                                id="btn-menu"
                            >
                                {item.name}
                            </p>
                        )}
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
                            <div>
                                <div className="w-ful p-1">
                                    <div className="flex items-center">
                                        {(infoBD.operation === "on") ?
                                            <>
                                                <div className="flex items-center mx-3 my-1">
                                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                                    <p className="text-white text-sm pl-3">Loja aberta</p>
                                                </div>
                                                <div className="flex items-center mx-3 my-1 ">
                                                    <img
                                                        className="h-4"
                                                        src={`/imgs/icons/icon-time.png`}
                                                    />
                                                    <p className="pl-2 text-white text-sm">Entrega em até 30min</p>
                                                </div>
                                                <div
                                                    className="flex items-center mx-3 my-1"
                                                    onClick={() => openModalAvalit()}
                                                >
                                                    <img
                                                        className="h-4"
                                                        src={`/imgs/icons/avalit.png`}
                                                    />
                                                    <p className="text-base text-white pl-2">
                                                        {listAvalit.length} avaliações
                                                    </p>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="flex items-center mb-1">
                                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                    <p className="text-white text-sm pl-2">Loja fechada</p>
                                                </div>
                                                <div className="flex">
                                                    <p className="text-white text-sm">Entrega amanhã a partir das 10:00hs</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <img
                                                        className="h-4"
                                                        src={`/imgs/icons/avalit.png`}
                                                    />
                                                    <p className="text-base text-white pl-2">
                                                        {dataAvalit.length} avaliações
                                                    </p>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                                {/* Menu Categorias Desktop */}
                                <div
                                    className="flex md:justify-center px-4 py-4 overflow-x-auto"
                                    style={{ backgroundColor: colorHead }}
                                >
                                    <div className="flex justify-center items-center flex-nowrap">
                                        {listCategory.map((item, key) =>
                                            <p key={key}
                                                className={`mx-2 text-sm text-white ${filterProdut === item.value && "text-base border border-white rounded-lg px-2 py-1"}`} onClick={() => setFilterProdut(item.value)}
                                                id="btn-menu"
                                            >
                                                {item.name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

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
                                    id="open-modalProdut-div"
                                    onClick={() => openModalProdut(item)}
                                >
                                    <div className="rounded-lg">
                                        <img
                                            className="rounded-t-lg object-cover object-center h-36 md:rounded md:w-full md:h-96"
                                            src={`/imgs/produts/${item.ref}.png`}
                                            // src={`/imgs/produts/cerv.png`}
                                            id="open-modalProdut-img"
                                            onClick={() => openModalProdut(item)}
                                        />
                                    </div>
                                    <div className="py-1">
                                        <div 
                                            className="w-full px-2 pb-2 pt-1"
                                            onClick={() => openModalProdut(item)}
                                            id="open-modalProdut-info"
                                        >
                                            <h3 className="text-sm font-bold md:text-base text-gray-900">
                                                {item.produt}
                                            </h3>
                                            <p className="text-sm text-gray-900">
                                                {item.type} - {item.size}
                                            </p>
                                        </div>
                                        
                                        {/* { (item.category === "cerveja")?  */}
                                            <div className="flex w-full justify-between items-center px-3">
                                                <p className="text-base font-bold text-gray-900">
                                                    {moeda(item.valueUnd * 1)}
                                                </p>
                                                <div className="w-6 h-6 bg-gray-800 rounded-full mb-1">
                                                    <p className="text-sm font-bold text-center text-white">
                                                        +
                                                    </p>
                                                </div>
                                            </div>
                                        {/* } */}

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
                        className="flex justify-center items-center inset-0 fixed bg-black bg-opacity-50"
                    >
                        <div className="
                            w-screen h-screen relative overflow-y-auto bg-white
                            md:flex md:w-full md:overflow-hidden md:w-[60vw] md:h-[80vh] md:rounded-lg
                            ">
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
                                    className="w-full md:h-auto object-cover object-center"
                                    src={`/imgs/produts/${cardSelected.ref}.png`}
                                />
                            </div>
                            <div className="py-2 md:w-3/5 md:overflow-y-auto">
                                <div className="px-4 mt-3 mb-4 h-auto md:h-auto md:pt-8 md:px-8">
                                    <div className="flex items-center">
                                        <h3 className="text-lg font-bold">
                                            {cardSelected.produt} - {cardSelected.type}
                                        </h3>
                                    </div>

                                    <div className="mb-4 md:mb-8">
                                        <p className="text-base">Caixa com {cardSelected.quant} unidades - {cardSelected.size}</p>
                                        <p className="text-base font-bold mt-1">
                                            Total {moeda(quantUnd * cardSelected.valueUnd)}
                                        </p>
                                    </div>

                                    <div className="flex-col justify-center items-center mb-2">

                                        <div 
                                            className={`md:w-2/5 mb-2 ${(alertInputSizeTextOn) ? "mb-4" : "" }`}
                                        >
                                        </div>
                                            <div className="flex justify-center items-center py-2 md:w-2/3">
                                                <button
                                                    className={`bg-gray-800 h-6 w-8 mx-2 rounded-full shadow-lg ${alertInputSize}`}
                                                    id="btn-SubQuant-Produt"
                                                    onClick={() => subQuantUnd()}
                                                >
                                                    <p className="text-white font-bold text-sm">-</p>
                                                </button>
                                                <div
                                                    className={`w-2/4 px-2 h-8 w-full rounded-md text-center shadow-lg border border-gray-100 ${alertInputSize}`}
                                                >
                                                    <p className="text-base md:text-sm md:m-1">
                                                        {quantUnd} unidades
                                                    </p>
                                                </div>
                                                <button 
                                                    className={`bg-gray-800 h-6 w-8 mx-2 rounded-full shadow-lg ${alertInputSize}`}
                                                    id="btn-SomQuant-Produt"
                                                    onClick={() => somQuantUnd()}
                                                >
                                                    <p className="text-white font-bold text-sm">+</p>
                                                </button>
                                            </div>
                                            <div className="flex justify-center items-center py-2 mt-4">
                                                <button 
                                                    className="w-full px-2 py-1 mx-2 rounded shadow-lg border border-gray-200"
                                                    id="btn-SomOneCx-Produt"
                                                    onClick={() => somCxOne()}
                                                >
                                                    <p className="text-gray-600 text-sm">1 caixa</p>
                                                </button>
                                                <button 
                                                    className="w-full px-2 py-1 mx-2 rounded shadow-lg border border-gray-200"
                                                    id="btn-SomTwoCx-Produt"
                                                    onClick={() => somCxDuo()}
                                                >
                                                    <p className="text-gray-600 text-sm">2 caixas</p>
                                                </button>
                                                <button 
                                                    className="w-full px-2 py-1 mx-2 rounded shadow-lg border border-gray-200"
                                                    id="btn-ResetQuant-Produt"
                                                    onClick={() => oneQuant()}
                                                >
                                                    <p className="text-gray-600 text-sm">1 unidade</p>
                                                </button>
                                            </div>
                                    </div>
                                </div>

                                {/* CTA desktop */}
                                <div className="hidden md:block">
                                    <div className="flex justify-center md:w-3/5 mb-2 px-8">
                                        <button
                                            className="w-full bg-green-600 px-1 py-2 rounded-md text-sm text-white mr-2"
                                            id="btn-addCart-Pc"
                                            onClick={() => openModalAddCart()}
                                        >
                                            Adicionar carrinho
                                        </button>
                                    </div>
                                </div>

                                {/* CTA mobile */}
                                <div className="md:hidden">
                                    <div className="flex justify-center md:w-3/5 pt-4 pb-2 px-4 fixed inset-x-0 bottom-0">
                                        <button
                                            className="w-full bg-green-600 px-2 py-3 rounded-md text-sm text-white mr-2"
                                            id="btn-addCart-Mobile"
                                            onClick={() => openModalAddCart()}
                                        >
                                            Adicionar carrinho
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Exit desktop */}
                            <div className="hidden md:block">
                                <button
                                    className="bg-white text-gray-800 absolute top-2 right-2 w-8 h-8 rounded-full text-sm"
                                    type="button"
                                    onClick={closeModalProdut}
                                >x</button>
                            </div>
                        </div>
                        {/* Exit mobile */}
                        <div className="md:hidden">
                            <button
                                className="bg-white text-gray-800 absolute top-2 right-2 w-8 h-8 rounded-full text-sm fixed"
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
                                    <p className="text-base mb-2">Seu barril está vazio</p>
                                    <button
                                        className="w-3/5 bg-green-500 px-2 py-2 rounded-md text-sm text-white"
                                        onClick={closeModalCart} 
                                    >
                                        adicionar bebidas
                                    </button>
                                </div>
                                {/* <button
                                    className="bg-gray-400 text-white absolute top-3 right-3 w-6 h-6 rounded-full text-sm"
                                    type="button"
                                    onClick={closeModalCart}
                                >x</button> */}
                            </div>
                            :
                            <div className="bg-white w-5/6 lg:w-1/3 rounded-xl shadow-md relative px-2">
                                <div className="flex justify-center items-center py-2">
                                    <strong>Itens do Barril</strong>
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
                                                    <p className="text-gray-600 text-sm">{item.quantUnd}x {item.size}</p>
                                                </div>
                                                {/* {item.quantUnd !== 0 &&
                                                    <div className="flex">
                                                        <p className="text-gray-600 text-sm">Unidade: </p>
                                                        <p className="font-medium ml-2 text-sm uppercase">
                                                            {item.quantUnd}
                                                        </p>
                                                    </div>
                                                } */}
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
                                    <p className="text-center pb-2">
                                        Total do Barril: {moeda(totalCart)}
                                    </p>
                                    <button
                                        className="w-full bg-green-500 px-2 py-2 rounded-md text-sm text-white"
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
                                        className="w-full bg-gray-800 px-2 py-2 rounded-md text-sm text-white mb-2"
                                        onClick={() => AddCartAndExitProdut()}
                                    >
                                        Ver outros produtos
                                    </button>
                                    <button
                                        className="w-full bg-green-500 px-2 py-2 rounded-md text-sm text-white"
                                        onClick={() => AddCartAndOpenCart()}
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

                                    <div
                                        className="flex items-center w-full py-2 px-4 bg-white border rounded-md shadow-md mb-4"
                                        onClick={() => window.open(`tel:${numberZap}`)}
                                    >
                                        <img
                                            className="w-10 h-10 mr-4"
                                            src={`/imgs/icons/phone.png`}
                                        />
                                        <p className="">Ligação</p>
                                    </div>
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

                {/* Modal Avaliacoes */}
                {modalAvalit && (
                    <div
                        className="flex justify-center items-center inset-0 fixed bg-black bg-opacity-70"
                    >
                        <div className="w-full lg:w-1/3 rounded-xl shadow-md relative">
                            <div className="px-4 py-12">
                                <div className="flex flex-col items-center px-8 h-96 overflow-y-auto">
                                    {listAvalit.map((item, key) =>
                                        <div className="flex-col items-center w-full py-2 px-4 bg-white border rounded-md shadow-md mb-4" key={key}>
                                            <div className="flex items-center">
                                                <div className="flex items-center justify-center bg-gray-900 h-8 w-8 rounded-full">
                                                    <img className="h-4"src={`/imgs/icons/like.png`}/>
                                                </div>
                                                <p className="pl-2">{item.name}</p>
                                            </div>
                                            <div className="flex items-center my-2">
                                                {(item.star == "5") && 
                                                    <>
                                                        <img className="h-4 pr-1"src={`/imgs/icons/avalit-yellow.png`}/><img className="h-4 pr-1"src={`/imgs/icons/avalit-yellow.png`}/><img className="h-4 pr-1"src={`/imgs/icons/avalit-yellow.png`}/><img className="h-4 pr-1"src={`/imgs/icons/avalit-yellow.png`}/><img className="h-4 pr-1"src={`/imgs/icons/avalit-yellow.png`}/>
                                                    </>
                                                }
                                                {(item.star == "4") && 
                                                    <>
                                                        <img className="h-4 pr-1"src={`/imgs/icons/avalit-yellow.png`}/>
                                                    </>
                                                }
                                            </div>
                                            <p className="">"{item.avalit}"</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button
                                className="bg-white absolute top-3 right-3 w-6 h-6 rounded-full text-sm"
                                type="button"
                                onClick={closeModalAvalit}
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
                                    <p className="text-base">
                                        Nome
                                    </p>
                                    <input
                                        className="px-2 py-2 mb-3 w-full shadow rounded-md border border-gray-100 text-center bg-white"
                                        placeholder="Digite seu nome ou apelido"
                                        type="text"
                                        onChange={(event) => setNameSend(event.target.value)}
                                    />
                                    <p className="text-base">
                                        Endereço
                                    </p>
                                    <input
                                        className="px-2 py-2 mb-3 w-full shadow rounded-md border border-gray-100 text-center bg-white"
                                        placeholder="Digite seu endereço completo"
                                        type="text"
                                        onChange={(event) => setLocalSend(event.target.value)}
                                    />
                                    <p className="text-base">
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
                                        Pedido enviado!
                                    </p>
                                    <p>
                                        
                                    </p>
                                </div>
                                <div className="">
                                    <button
                                        className="w-full bg-pink-500 px-2 py-2 mx-1 my-1 rounded-md text-sm text-white"
                                        onClick={() => parent.location='https://www.instagram.com/sou_adegueiro/'}
                                    >
                                        Visitar nosso Instagram 
                                    </button>
                                    <button
                                        className="w-full bg-green-500 px-2 py-2 mx-1 my-1 rounded-md text-sm text-white"
                                        onClick={() => parent.location='https://wa.me/5561999186122/'}
                                    >
                                         Atendimento pelo Whatsapp
                                    </button>
                                    <button
                                        className="w-full bg-blue-500 px-2 py-2 mx-1 my-1 rounded-md text-sm text-white"
                                        onClick={() => closeModalTanks()}
                                    >
                                        Voltar para o site
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* fixed desktop */}
                <div 
                    className={`hidden md:block right-2 bottom-2 ${fixedOn} px-2 py-1 rounded-md`}
                    style={{ backgroundColor: colorBodyBar }}
                >
                    <div className="flex flex-col justify-center items-center">
                        <div
                            className="relative m-2"
                            onClick={() => openModalCart()}
                        >
                            <img
                                className="w-4 h-4"
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
                                className="w-4 h-4"
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
                                className="w-5 h-5"
                                src={`/imgs/icons/icon-contact.png`}
                            />
                        </div>
                        <div
                            className="relative"
                            onClick={() => openModalCart()}
                            >
                            <img
                                className="w-5 h-5"
                                src={`/imgs/icons/icon-cart-white.png`}
                            />
                            {
                                countListCart > 0 &&
                                <div className="absolute bottom-2 -right-5 bg-red-500 rounded-full px-2">
                                    <p className="text-xs text-white">{countListCart}</p>
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
