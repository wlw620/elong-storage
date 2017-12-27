import estorge from "./estorge";

if (typeof define == 'function'  && define.amd) {
    // AMD
    define(function() {
        return estorge;
    });
} else if (typeof module !== 'undefined' && module.exports) {
    // CMD
    module.exports = estorge;
}