// To parse this data:
//
//   import { Convert } from "./file";
//
//   const criptomoneda = Convert.toCriptomoneda(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Criptomoneda {
    currency:               string;
    id:                     string;
    status:                 string;
    price:                  string;
    price_date:             Date;
    price_timestamp:        Date;
    symbol:                 string;
    circulating_supply:     string;
    max_supply:             string;
    name:                   string;
    logo_url:               string;
    market_cap:             string;
    market_cap_dominance:   string;
    transparent_market_cap: string;
    num_exchanges:          string;
    num_pairs:              string;
    num_pairs_unmapped:     string;
    first_candle:           Date;
    first_trade:            Date;
    first_order_book:       Date;
    first_priced_at:        Date;
    rank:                   string;
    rank_delta:             string;
    high:                   string;
    high_timestamp:         Date;
    "1d":                   The1D;
}

export interface The1D {
    price_change:                      string;
    price_change_pct:                  string;
    volume:                            string;
    volume_change:                     string;
    volume_change_pct:                 string;
    market_cap_change:                 string;
    market_cap_change_pct:             string;
    transparent_market_cap_change:     string;
    transparent_market_cap_change_pct: string;
    volume_transparency:               VolumeTransparency[];
}

export interface VolumeTransparency {
    grade:             string;
    volume:            string;
    volume_change:     string;
    volume_change_pct: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toCriptomoneda(json: string): Criptomoneda[] {
        return cast(JSON.parse(json), a(r("Criptomoneda")));
    }

    public static criptomonedaToJson(value: Criptomoneda[]): string {
        return JSON.stringify(uncast(value, a(r("Criptomoneda"))), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Criptomoneda": o([
        { json: "currency", js: "currency", typ: "" },
        { json: "id", js: "id", typ: "" },
        { json: "status", js: "status", typ: "" },
        { json: "price", js: "price", typ: "" },
        { json: "price_date", js: "price_date", typ: Date },
        { json: "price_timestamp", js: "price_timestamp", typ: Date },
        { json: "symbol", js: "symbol", typ: "" },
        { json: "circulating_supply", js: "circulating_supply", typ: "" },
        { json: "max_supply", js: "max_supply", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "logo_url", js: "logo_url", typ: "" },
        { json: "market_cap", js: "market_cap", typ: "" },
        { json: "market_cap_dominance", js: "market_cap_dominance", typ: "" },
        { json: "transparent_market_cap", js: "transparent_market_cap", typ: "" },
        { json: "num_exchanges", js: "num_exchanges", typ: "" },
        { json: "num_pairs", js: "num_pairs", typ: "" },
        { json: "num_pairs_unmapped", js: "num_pairs_unmapped", typ: "" },
        { json: "first_candle", js: "first_candle", typ: Date },
        { json: "first_trade", js: "first_trade", typ: Date },
        { json: "first_order_book", js: "first_order_book", typ: Date },
        { json: "first_priced_at", js: "first_priced_at", typ: Date },
        { json: "rank", js: "rank", typ: "" },
        { json: "rank_delta", js: "rank_delta", typ: "" },
        { json: "high", js: "high", typ: "" },
        { json: "high_timestamp", js: "high_timestamp", typ: Date },
        { json: "1d", js: "1d", typ: r("The1D") },
    ], false),
    "The1D": o([
        { json: "price_change", js: "price_change", typ: "" },
        { json: "price_change_pct", js: "price_change_pct", typ: "" },
        { json: "volume", js: "volume", typ: "" },
        { json: "volume_change", js: "volume_change", typ: "" },
        { json: "volume_change_pct", js: "volume_change_pct", typ: "" },
        { json: "market_cap_change", js: "market_cap_change", typ: "" },
        { json: "market_cap_change_pct", js: "market_cap_change_pct", typ: "" },
        { json: "transparent_market_cap_change", js: "transparent_market_cap_change", typ: "" },
        { json: "transparent_market_cap_change_pct", js: "transparent_market_cap_change_pct", typ: "" },
        { json: "volume_transparency", js: "volume_transparency", typ: a(r("VolumeTransparency")) },
    ], false),
    "VolumeTransparency": o([
        { json: "grade", js: "grade", typ: "" },
        { json: "volume", js: "volume", typ: "" },
        { json: "volume_change", js: "volume_change", typ: "" },
        { json: "volume_change_pct", js: "volume_change_pct", typ: "" },
    ], false),
};
