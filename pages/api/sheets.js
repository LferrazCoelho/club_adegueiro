import { GoogleSpreadsheet } from 'google-spreadsheet';
import credentials from '../../credentials/keyClubAdeg.json';

export default async function(req, res) {

    const doc = new GoogleSpreadsheet('1YJUQTUl2RTqK1l6HY41vqKKmdUnW-itO9rM6CHY-2tA');
    
    await doc.useServiceAccountAuth({
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      });
    
    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    const dataSheets = rows.map(({ ref, produt, size, quant, category, valueUnd, valueCx, promo, status  }) => {
        return { ref, produt, size, quant, category, valueUnd, valueCx, promo, status };
    })
    
    const filterSheetProdut = dataSheets.filter(dataFilter => (dataFilter.status === "on"));

    res.send({
        filterSheetProdut
    })
}