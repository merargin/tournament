class RequestProcessor {

    static get(url, params){
        let options = {
            method: "get",
        };
        if(params) {
            url += "?" + getAsQueryParams(params);
        }
        return window.fetch(url, options);
    }

    static post(url, data) {
        let options = {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };
        if(data) {
            options.body = getAsQueryParams(data);
        }
        return window.fetch(url, options);
    }

}
