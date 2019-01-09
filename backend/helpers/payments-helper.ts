export class PaymentsHelper {
    public static paymentsDataParser(proxyResData: any) {
        try {
            const output = [];
            const resData = JSON.parse(proxyResData);
            if (resData && resData instanceof Array) {
                for (let i = 0; i < resData.length; i++) {
                    if (resData[i].row_11) {
                        output.push(resData[i]);
                    }
                }
                return JSON.stringify(output);
            } else {
                return proxyResData;
            }
        } catch (e) {
            console.log('/Payment/GetPaymentsData parsing error');
            return proxyResData;
        }
    }
}
