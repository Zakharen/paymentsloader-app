export class RequestHelper {
    public static paramsParser(params: string) {
        if (!params) {
            return;
        }
        if (params.startsWith('/') && params.length > 1) {
            return params.substring(1);
        }
        return params;
    }
}
