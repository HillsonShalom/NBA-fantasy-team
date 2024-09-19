var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const URL = "https://nbaserver-q21u.onrender.com/api/filter";
// the request
export function search(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(URL, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(model)
            });
            if (!response.ok)
                throw new Error(`Status code ${response.status}`);
            const data = yield response.json();
            return data;
        }
        catch (e) {
            return e;
        }
    });
}
