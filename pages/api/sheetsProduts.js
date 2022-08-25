import { GoogleSpreadsheet } from 'google-spreadsheet';
import credentials from '../../credentials/keyClubAdeg.json';

export default async function(req, res) {

    const doc = new GoogleSpreadsheet('1YJUQTUl2RTqK1l6HY41vqKKmdUnW-itO9rM6CHY-2tA');
    
    await doc.useServiceAccountAuth({
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      });
    
    await doc.loadInfo();
    
    const sheetProduts = doc.sheetsByIndex[0];
    const rowsProduts = await sheetProduts.getRows();
    const dataSheetsProduts = rowsProduts.map(({ ref, produt, type, size, quant, category, valueUnd, valueCx, promo, rank, status  }) => {
        return { ref, produt, type, size, quant, category, valueUnd, valueCx, promo, rank, status };
    })

    const filterSheetProdut = dataSheetsProduts.filter(dataFilter => (dataFilter.status === "on"));

    res.send({
        filterSheetProdut
    })
}