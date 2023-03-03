import { GoogleSpreadsheet } from 'google-spreadsheet';
import credentials from '../../credentials/keyClubAdeg.json';

export default async function(req, res) {

    const doc = new GoogleSpreadsheet('1YJUQTUl2RTqK1l6HY41vqKKmdUnW-itO9rM6CHY-2tA');
    
    await doc.useServiceAccountAuth({
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      });
    
    await doc.loadInfo();

    const sheetAvalit = doc.sheetsByIndex[2];
    const rowsAvalit = await sheetAvalit.getRows();
    const dataSheetsAvalit = rowsAvalit.map(({ name, star, avalit  }) => {
        return { name, star, avalit  };
    })
    
    res.send({
        dataSheetsAvalit
    })
}