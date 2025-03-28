var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
figma.showUI(__html__);
function translateText(text, sourceLanguage, targetLanguage) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var data, options, response, responseData, e_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    data = {
                        text: [text],
                        sourceLang: sourceLanguage,
                        targetLang: targetLanguage,
                    };
                    options = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    };
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, fetch("https://figma-plugin-translate.illuminarean.com/api/translate", options)];
                case 2:
                    response = _c.sent();
                    if (!("json" in response)) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseData = _c.sent();
                    return [2 /*return*/, (_b = (_a = responseData.data) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : ""];
                case 4: return [3 /*break*/, 6];
                case 5:
                    e_1 = _c.sent();
                    figma.notify("번역에 실패했습니다. 다시 시도해주세요.");
                    console.log(e_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/, null];
            }
        });
    });
}
// Figma 플러그인 UI에서 발생하는 이벤트 처리
figma.ui.onmessage = function (msg) { return __awaiter(_this, void 0, void 0, function () {
    var selectedLayers, textNode, originalText, translatedText;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(msg.type === "translate")) return [3 /*break*/, 2];
                selectedLayers = figma.currentPage.selection;
                if (!(selectedLayers.length > 0 && selectedLayers[0].type === "TEXT")) return [3 /*break*/, 2];
                textNode = selectedLayers[0];
                originalText = textNode.characters;
                figma.ui.postMessage({
                    originalText: originalText,
                    isLoading: true,
                });
                return [4 /*yield*/, translateText(originalText, msg.source, msg.target)];
            case 1:
                translatedText = _a.sent();
                figma.ui.postMessage({
                    translatedText: translatedText,
                    isLoading: false,
                });
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
